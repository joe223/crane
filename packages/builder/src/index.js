import path from 'path'
import { config, logger, BuildType } from '@cranejs/shared'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const cwd = process.cwd()

function loadPlugin (name) {
    return require(require.resolve(name, {
        paths: [
            cwd,
            __dirname,
            path.resolve(__dirname, '../')
        ]
    })).default
}

export function validateBuildConfig(buildConfig, moduleName) {
    if (
        !buildConfig.entry &&
        (!buildConfig.entries || buildConfig.entries.length === 0)
    ) {
        logger.error(`module [${moduleName}] required a entry`)
        process.exit(1)
    }
}

export function resolvePath(filePath) {
    return path.isAbsolute(filePath)
        ? filePath
        : path.join(cwd, './modules', filePath)
}

export function createBuilderConfig(
    pageConfig,
    moduleName,
    clientEnv,
    buildType
) {
    const configBuilder = require(`./webpackConfig/webpack.${buildType}.conf`).default(pageConfig)
    const baseOutput = pageConfig.output || moduleName

    validateBuildConfig(pageConfig, moduleName)

    config.plugins.forEach(plugin => {
        let [resolvedPlugin, options] = typeof plugin === 'string'
            // string
            ? [loadPlugin(plugin)]
            // [plugin, option]
            : (
                Array.isArray(plugin)
                ? (typeof plugin[0] === 'function'
                    ? [plugin[0], plugin[1]]
                    : [loadPlugin(plugin[0]), plugin[1]])
                // function
                : [plugin]
            )

        resolvedPlugin({
            configBuilder,
            pageConfig,
            moduleName,
            clientEnv,
            buildType
        }, options)
    })

    const baseConfig = configBuilder.toConfig()
    const extendConfig = {
        entry: {},
        plugins: [],
    }

    // Single entry file
    if (pageConfig.entry) {
        const entry = pageConfig
        const defaultEntryName = 'index'

        entry.templateParameters = {
            WEB_ENV: clientEnv,
            ...entry.templateParameters,
        }

        extendConfig.entry[defaultEntryName] = resolvePath(entry.entry)
        extendConfig.plugins.push(
            genHtmlWebpackPluginConfig(
                buildType,
                entry,
                defaultEntryName,
                'index.html'
            )
        )
        // Multiple entry file
    } else {
        Object.keys(pageConfig.entries).forEach((entryName) => {
            const entry = pageConfig.entries[entryName]

            entry.templateParameters = {
                WEB_ENV: clientEnv,
                ...entry.templateParameters,
            }

            extendConfig.entry[entryName] = resolvePath(entry.entry)
            extendConfig.plugins.push(
                genHtmlWebpackPluginConfig(
                    buildType,
                    entry,
                    entryName,
                    entry.output || path.join(entryName, 'index.html')
                )
            )
        })
    }

    if (buildType === BuildType.prod) {
        extendConfig.plugins.push(
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[chunkhash].css',
                chunkFilename: '[id].[chunkhash].css'
            })
        )
    }


    // Set public static assets
    // copy custom static assets
    if (pageConfig.static) {
        const staticAssets = [
            {
                from: resolvePath(pageConfig.static),
                to: config.assetsSubDirectory,
                globOptions: {
                    dot: false,
                },
            },
        ]

        extendConfig.plugins.push(
            new CopyWebpackPlugin({
                patterns: staticAssets,
                options: {
                    concurrency: 100,
                },
            })
        )
    }

    const webpackConfig = merge(
        baseConfig,
        {
            output: {
                path: path.join(config.assetsRoot, baseOutput),
                filename: '[name].[chunkhash].js',
                publicPath: path.join(path.sep, baseOutput, path.sep),
            },
            plugins: [new webpack.EnvironmentPlugin(clientEnv)],
        },
        extendConfig,
        pageConfig.webpack || {}
    )

    return webpackConfig
}

export function builder(builderConfig, dev = false) {
    if (dev) {
        const options = config.devServer
        const server = new WebpackDevServer(webpack(builderConfig), options)

        server.listen(options.port, 'localhost', function (err) {
            if (err) {
                console.log(err)
            }
            console.log(
                'WebpackDevServer listening at localhost:',
                options.port
            )
        })
    } else {
        webpack(builderConfig, (err, stats) => {
            // https://webpack.js.org/api/node/#error-handling
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
                console.error(info.errors);
            }

            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }
        });
    }
}

/**
 * The default for options.templateParameter
 * Generate the template parameters
 */
function genTemplateParametersGenerator(entry) {
    return function templateParametersGenerator(compilation, assets, options) {
        // Try to use absolute path while loading stylesheet
        if (assets.extracted && assets.extracted.css) {
            assets.extracted.css.forEach((css) => {
                if (
                    !path.isAbsolute(css.file) &&
                    css.file.indexOf(assets.publicPath) < 0
                ) {
                    css.file = path.join(assets.publicPath, css.file)
                }
            })
        }
        return {
            title: entry.title || entry.templateParameters.title,
            ...entry.templateParameters,
            compilation,
            webpackConfig: entry.options,
            htmlWebpackPlugin: {
                files: assets,
                options: options,
            },
        }
    }
}

/**
 * Factory function for generating HTMLWebpackPlugin instance
 * @param {string} buildType 'dev' | 'prod'
 * @param {{
 *  title,
 *  entry,
 *  output,
 *  template?,
 *  templateParameters?}} entry
 * @param entryName
 * @param {string} htmlFilename
 * @returns {HtmlWebpackPlugin}
 */
function genHtmlWebpackPluginConfig(
    buildType,
    entry,
    entryName,
    filename = 'index.html'
) {
    const template = entry.template
        ? resolvePath(entry.template)
        : config.defaultTemplate

    if (buildType === BuildType.dev) {
        return new HtmlWebpackPlugin({
            filename,
            template,
            inject: true,
            chunks: ['vendors', entryName],
            title: entry.title || entry.templateParameters.title,
            templateParameters: genTemplateParametersGenerator(entry)
        })
    } else {
        return new HtmlWebpackPlugin({
            filename,
            template,
            inject: true,
            chunks: ['vendors', entryName],
            title: entry.title || entry.templateParameters.title,
            templateParameters: genTemplateParametersGenerator(entry),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'auto'
        })
    }
}
