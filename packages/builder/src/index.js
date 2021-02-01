import path from 'path'
import {
    config
} from '@cranejs/core'
import { logger, BuildType } from '@cranejs/shared'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import merge from 'webpack-merge'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const cwd = process.cwd()

export function validateBuildConfig (
    buildConfig,
    moduleName
) {
    if (!buildConfig.entry
        && (!buildConfig.entries || buildConfig.entries.length === 0)
    ) {
        logger.error(`module [${moduleName}] required a entry`)
        process.exit(1)
    }
}

export function resolvePath (filePath) {
    return path.isAbsolute(filePath)
        ? filePath
        : path.join(cwd, './modules', filePath)
}

export function createBuilderConfig (
    buildConfig,
    moduleName,
    clientEnv,
    buildType
) {
    validateBuildConfig(
        buildConfig,
        moduleName
    )

    const conf = {
        entry: {},
        plugins: []
    }
    const configBuilder = require(`./webpackConfig/webpack.${buildType}.conf`)

    buildConfig.output = buildConfig.output || moduleName

    // Single entry file
    if (buildConfig.entry) {
        const defaultEntryName = 'index'
        const entry = buildConfig

        entry.templateParameters = {
            WEB_ENV: clientEnv,
            ...entry.templateParameters
        }

        conf.entry[defaultEntryName] = resolvePath(entry.entry)
        conf.plugins.push(genHtmlWebpackPluginConfig(
            buildType,
            entry,
            defaultEntryName,
            'index.html'))
        // Multiple entry file
    } else {
        Object.keys(buildConfig.entries).forEach(entryName => {
            const entry = buildConfig.entries[entryName]

            entry.templateParameters = {
                WEB_ENV: clientEnv,
                ...entry.templateParameters
            }

            conf.entry[entryName] = resolvePath(entry.entry)
            conf.plugins.push(genHtmlWebpackPluginConfig(
                buildType,
                entry,
                entryName,
                entry.output || `${entryName}/index.html`))
        })
    }
    if (buildType === BuildType.prod) {
        conf.plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: buildType === BuildType.prod ? '[name].[chunkhash].css' : '[name].css',
            chunkFilename: buildType === BuildType.prod ? '[id].[chunkhash].css' : '[id].css',
        }))
    }

    // conf.plugins.push(...customPlugins.pluginsList)


    // Set public static assets
    // copy custom static assets
    if (buildConfig.static) {
        const staticAssets = [
            {
                from: resolvePath(buildConfig.static),
                to: config.assetsSubDirectory,
                globOptions: {
                    dot: false
                }
            }
        ]

        conf.plugins.push(new CopyWebpackPlugin({
            patterns: staticAssets,
            options: {
                concurrency: 100,
            }
        }))
    }


    const webpackConfig = merge(configBuilder(buildConfig), {
        output: {
            path: path.join(config.assetsRoot, buildConfig.output),
            filename: '[name].[chunkhash].js',
            publicPath: path.join(path.sep, buildConfig.output, path.sep)
        },
        plugins: [
            new webpack.EnvironmentPlugin(clientEnv)
        ]
    }, conf, buildConfig.webpack || {})

    return webpackConfig
}

export function builder (builderConfig, dev = false) {
    logger.debug(builderConfig[0].module.rules[14])

    if (dev) {
        const options = config.devServer
        const server = new WebpackDevServer(webpack(builderConfig), options)

        server.listen(options.port, 'localhost', function (err) {
            if (err) {
                console.log(err);
            }
            console.log('WebpackDevServer listening at localhost:', options.port);
        })
    } else {
        webpack(builderConfig)
    }
}

/**
 * The default for options.templateParameter
 * Generate the template parameters
 */
function genTemplateParametersGenerator (entry) {
    return function templateParametersGenerator (
        compilation,
        assets,
        options
    ) {

        // Try to use absolute path while loading stylesheet
        if (assets.extracted && assets.extracted.css) {
            assets.extracted.css.forEach((css) => {
                if (!path.isAbsolute(css.file) && css.file.indexOf(assets.publicPath) < 0) {
                    css.file = path.join(assets.publicPath, css.file)
                }
            })
        }
        return {
            title: entry.title || entry.templateParameters.title,
            ...entry.templateParameters,
            compilation,
            webpackConfig,
            htmlWebpackPlugin: {
                files: assets,
                options: options
            }
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
function genHtmlWebpackPluginConfig (
    buildType,
    entry,
    entryName,
    filename = 'index.html'
) {
    const template = entry.template
        ? resolvePath(entry.template)
        : path.join(__dirname, '../template/index.pug')

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
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'auto'
        })
    }
}
