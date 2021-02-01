'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true
})
exports.validateBuildConfig = validateBuildConfig
exports.resolvePath = resolvePath
exports.createBuilderConfig = createBuilderConfig
exports.builder = builder

var _path = _interopRequireDefault(require('path'))

var _core = require('@cranejs/core')

var _shared = require('@cranejs/shared')

var _miniCssExtractPlugin = _interopRequireDefault(require('mini-css-extract-plugin'))

var _webpack = _interopRequireDefault(require('webpack'))

var _webpackDevServer = _interopRequireDefault(require('webpack-dev-server'))

var _webpackMerge = _interopRequireDefault(require('webpack-merge'))

var _copyWebpackPlugin = _interopRequireDefault(require('copy-webpack-plugin'))

var _htmlWebpackPlugin = _interopRequireDefault(require('html-webpack-plugin'))

function _interopRequireDefault (obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

const cwd = process.cwd()

function validateBuildConfig (buildConfig, moduleName) {
    if (!buildConfig.entry && (!buildConfig.entries || buildConfig.entries.length === 0)) {
        _shared.logger.error(`module [${moduleName}] required a entry`)

        process.exit(1)
    }
}

function resolvePath (filePath) {
    return _path.default.isAbsolute(filePath) ? filePath : _path.default.join(cwd, './modules', filePath)
}

function createBuilderConfig (buildConfig, moduleName, clientEnv, buildType) {
    validateBuildConfig(buildConfig, moduleName)
    const conf = {
        entry: {},
        plugins: []
    }

    const configBuilder = require(`./webpackConfig/webpack.${buildType}.conf`)

    buildConfig.output = buildConfig.output || moduleName // Single entry file

    if (buildConfig.entry) {
        const defaultEntryName = 'index'
        const entry = buildConfig
        entry.templateParameters = {
            WEB_ENV: clientEnv,
            ...entry.templateParameters
        }
        conf.entry[defaultEntryName] = resolvePath(entry.entry)
        conf.plugins.push(genHtmlWebpackPluginConfig(buildType, entry, defaultEntryName, 'index.html')) // Multiple entry file
    } else {
        Object.keys(buildConfig.entries)
            .forEach(entryName => {
                const entry = buildConfig.entries[entryName]
                entry.templateParameters = {
                    WEB_ENV: clientEnv,
                    ...entry.templateParameters
                }
                conf.entry[entryName] = resolvePath(entry.entry)
                conf.plugins.push(genHtmlWebpackPluginConfig(buildType, entry, entryName, entry.output || `${entryName}/index.html`))
            })
    }

    if (buildType === _shared.BuildType.prod) {
        conf.plugins.push(new _miniCssExtractPlugin.default({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: buildType === _shared.BuildType.prod ? '[name].[chunkhash].css' : '[name].css',
            chunkFilename: buildType === _shared.BuildType.prod ? '[id].[chunkhash].css' : '[id].css'
        }))
    } // conf.plugins.push(...customPlugins.pluginsList)
    // Set public static assets
    // copy custom static assets

    if (buildConfig.static) {
        const staticAssets = [{
            from: resolvePath(buildConfig.static),
            to: _core.config.assetsSubDirectory,
            globOptions: {
                dot: false
            }
        }]
        conf.plugins.push(new _copyWebpackPlugin.default({
            patterns: staticAssets,
            options: {
                concurrency: 100
            }
        }))
    }

    const webpackConfig = (0, _webpackMerge.default)(configBuilder(buildConfig), {
        output: {
            path: _path.default.join(_core.config.assetsRoot, buildConfig.output),
            filename: '[name].[chunkhash].js',
            publicPath: _path.default.join(_path.default.sep, buildConfig.output, _path.default.sep)
        },
        plugins: [new _webpack.default.EnvironmentPlugin(clientEnv)]
    }, conf, buildConfig.webpack || {})
    return webpackConfig
}

function builder (builderConfig, dev = false) {
    _shared.logger.debug(builderConfig[0].module.rules[14])

    if (dev) {
        const options = _core.config.devServer
        const server = new _webpackDevServer.default((0, _webpack.default)(builderConfig), options)
        server.listen(options.port, 'localhost', function (err) {
            if (err) {
                console.log(err)
            }

            console.log('WebpackDevServer listening at localhost:', options.port)
        })
    } else {
        (0, _webpack.default)(builderConfig)
    }
}

/**
 * The default for options.templateParameter
 * Generate the template parameters
 */


function genTemplateParametersGenerator (entry) {
    return function templateParametersGenerator (compilation, assets, options) {
        // Try to use absolute path while loading stylesheet
        if (assets.extracted && assets.extracted.css) {
            assets.extracted.css.forEach(css => {
                if (!_path.default.isAbsolute(css.file) && css.file.indexOf(assets.publicPath) < 0) {
                    css.file = _path.default.join(assets.publicPath, css.file)
                }
            })
        }

        return {
            title: entry.title || entry.templateParameters.title,
            ...entry.templateParameters,
            compilation,
            webpackConfig: compilation.options,
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


function genHtmlWebpackPluginConfig (buildType, entry, entryName, filename = 'index.html') {
    const template = entry.template ? resolvePath(entry.template) : _path.default.join(__dirname, '../template/index.pug')

    if (buildType === _shared.BuildType.dev) {
        return new _htmlWebpackPlugin.default({
            filename,
            template,
            inject: true,
            chunks: ['vendors', entryName],
            title: entry.title || entry.templateParameters.title,
            templateParameters: genTemplateParametersGenerator(entry)
        })
    } else {
        return new _htmlWebpackPlugin.default({
            filename,
            template,
            inject: true,
            chunks: ['vendors', entryName],
            title: entry.title || entry.templateParameters.title,
            templateParameters: genTemplateParametersGenerator(entry),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference

            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'auto'
        })
    }
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjd2QiLCJwcm9jZXNzIiwidmFsaWRhdGVCdWlsZENvbmZpZyIsImJ1aWxkQ29uZmlnIiwibW9kdWxlTmFtZSIsImVudHJ5IiwiZW50cmllcyIsImxlbmd0aCIsImxvZ2dlciIsImVycm9yIiwiZXhpdCIsInJlc29sdmVQYXRoIiwiZmlsZVBhdGgiLCJwYXRoIiwiaXNBYnNvbHV0ZSIsImpvaW4iLCJjcmVhdGVCdWlsZGVyQ29uZmlnIiwiY2xpZW50RW52IiwiYnVpbGRUeXBlIiwiY29uZiIsInBsdWdpbnMiLCJjb25maWdCdWlsZGVyIiwicmVxdWlyZSIsIm91dHB1dCIsImRlZmF1bHRFbnRyeU5hbWUiLCJ0ZW1wbGF0ZVBhcmFtZXRlcnMiLCJXRUJfRU5WIiwicHVzaCIsImdlbkh0bWxXZWJwYWNrUGx1Z2luQ29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJlbnRyeU5hbWUiLCJCdWlsZFR5cGUiLCJwcm9kIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJmaWxlbmFtZSIsImNodW5rRmlsZW5hbWUiLCJzdGF0aWMiLCJzdGF0aWNBc3NldHMiLCJmcm9tIiwidG8iLCJjb25maWciLCJhc3NldHNTdWJEaXJlY3RvcnkiLCJnbG9iT3B0aW9ucyIsImRvdCIsIkNvcHlXZWJwYWNrUGx1Z2luIiwicGF0dGVybnMiLCJvcHRpb25zIiwiY29uY3VycmVuY3kiLCJ3ZWJwYWNrQ29uZmlnIiwiYXNzZXRzUm9vdCIsInB1YmxpY1BhdGgiLCJzZXAiLCJ3ZWJwYWNrIiwiRW52aXJvbm1lbnRQbHVnaW4iLCJidWlsZGVyIiwiYnVpbGRlckNvbmZpZyIsImRldiIsImRlYnVnIiwibW9kdWxlIiwicnVsZXMiLCJkZXZTZXJ2ZXIiLCJzZXJ2ZXIiLCJXZWJwYWNrRGV2U2VydmVyIiwibGlzdGVuIiwicG9ydCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJnZW5UZW1wbGF0ZVBhcmFtZXRlcnNHZW5lcmF0b3IiLCJ0ZW1wbGF0ZVBhcmFtZXRlcnNHZW5lcmF0b3IiLCJjb21waWxhdGlvbiIsImFzc2V0cyIsImV4dHJhY3RlZCIsImNzcyIsImZpbGUiLCJpbmRleE9mIiwidGl0bGUiLCJodG1sV2VicGFja1BsdWdpbiIsImZpbGVzIiwidGVtcGxhdGUiLCJfX2Rpcm5hbWUiLCJIdG1sV2VicGFja1BsdWdpbiIsImluamVjdCIsImNodW5rcyIsIm1pbmlmeSIsInJlbW92ZUNvbW1lbnRzIiwiY29sbGFwc2VXaGl0ZXNwYWNlIiwicmVtb3ZlQXR0cmlidXRlUXVvdGVzIiwiY2h1bmtzU29ydE1vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDRCxHQUFSLEVBQVo7O0FBRU8sU0FBU0UsbUJBQVQsQ0FDSEMsV0FERyxFQUVIQyxVQUZHLEVBR0w7QUFDRSxNQUFJLENBQUNELFdBQVcsQ0FBQ0UsS0FBYixLQUNJLENBQUNGLFdBQVcsQ0FBQ0csT0FBYixJQUF3QkgsV0FBVyxDQUFDRyxPQUFaLENBQW9CQyxNQUFwQixLQUErQixDQUQzRCxDQUFKLEVBRUU7QUFDRUMsbUJBQU9DLEtBQVAsQ0FBYyxXQUFVTCxVQUFXLG9CQUFuQzs7QUFDQUgsSUFBQUEsT0FBTyxDQUFDUyxJQUFSLENBQWEsQ0FBYjtBQUNIO0FBQ0o7O0FBRU0sU0FBU0MsV0FBVCxDQUFzQkMsUUFBdEIsRUFBZ0M7QUFDbkMsU0FBT0MsY0FBS0MsVUFBTCxDQUFnQkYsUUFBaEIsSUFDREEsUUFEQyxHQUVEQyxjQUFLRSxJQUFMLENBQVVmLEdBQVYsRUFBZSxXQUFmLEVBQTRCWSxRQUE1QixDQUZOO0FBR0g7O0FBRU0sU0FBU0ksbUJBQVQsQ0FDSGIsV0FERyxFQUVIQyxVQUZHLEVBR0hhLFNBSEcsRUFJSEMsU0FKRyxFQUtMO0FBQ0VoQixFQUFBQSxtQkFBbUIsQ0FDZkMsV0FEZSxFQUVmQyxVQUZlLENB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QUEsa0JBQWtCLEVBQUU2Qyw4QkFBOEIsQ0FBQ2pFLEtBQUQsQ0FOekI7QUFPekJpRixNQUFBQSxNQUFNLEVBQUU7QUFDSkMsUUFBQUEsY0FBYyxFQUFFLElBRFo7QUFFSkMsUUFBQUEsa0JBQWtCLEVBQUUsSUFGaEI7QUFHSkMsUUFBQUEscUJBQXFCLEVBQUUsSUFIbkIsQ0FJSjtBQUNBOztBQUxJLE9BUGlCO0FBY3pCO0FBQ0FDLE1BQUFBLGNBQWMsRUFBRTtBQWZTLEtBQXRCLENBQVA7QUFpQkg7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge1xuICAgIGNvbmZpZ1xufSBmcm9tICdAY3JhbmVqcy9jb3JlJ1xuaW1wb3J0IHsgbG9nZ2VyLCBCdWlsZFR5cGUgfSBmcm9tICdAY3JhbmVqcy9zaGFyZWQnXG5pbXBvcnQgTWluaUNzc0V4dHJhY3RQbHVnaW4gZnJvbSAnbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4nXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IFdlYnBhY2tEZXZTZXJ2ZXIgZnJvbSAnd2VicGFjay1kZXYtc2VydmVyJ1xuaW1wb3J0IG1lcmdlIGZyb20gJ3dlYnBhY2stbWVyZ2UnXG5pbXBvcnQgQ29weVdlYnBhY2tQbHVnaW4gZnJvbSAnY29weS13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBIdG1sV2VicGFja1BsdWdpbiBmcm9tICdodG1sLXdlYnBhY2stcGx1Z2luJ1xuXG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpXG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUJ1aWxkQ29uZmlnIChcbiAgICBidWlsZENvbmZpZyxcbiAgICBtb2R1bGVOYW1lXG4pIHtcbiAgICBpZiAoIWJ1aWxkQ29uZmlnLmVudHJ5XG4gICAgICAgICYmICghYnVpbGRDb25maWcuZW50cmllcyB8fCBidWlsZENvbmZpZy5lbnRyaWVzLmxlbmd0aCA9PT0gMClcbiAgICApIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yKGBtb2R1bGUgWyR7bW9kdWxlTmFtZX1dIHJlcXVpcmVkIGEgZW50cnlgKVxuICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGF0aCAoZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5pc0Fic29sdXRlKGZpbGVQYXRoKVxuICAgICAgICA/IGZpbGVQYXRoXG4gICAgICAgIDogcGF0aC5qb2luKGN3ZCwgJy4vbW9kdWxlcycsIGZpbGVQYXRoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbGRlckNvbmZpZyAoXG4gICAgYnVpbGRDb25maWcsXG4gICAgbW9kdWxlTmFtZSxcbiAgICBjbGllbnRFbnYsXG4gICAgYnVpbGRUeXBlXG4pIHtcbiAgICB2YWxpZGF0ZUJ1aWxkQ29uZmlnKFxuICAgICAgICBidWlsZENvbmZpZyxcbiAgICAgICAgbW9kdWxlTmFtZVxuICAgIClcblxuICAgIGNvbnN0IGNvbmYgPSB7XG4gICAgICAgIGVudHJ5OiB7fSxcbiAgICAgICAgcGx1Z2luczogW11cbiAgICB9XG4gICAgY29uc3QgY29uZmlnQnVpbGRlciA9IHJlcXVpcmUoYC4vd2VicGFja0NvbmZpZy93ZWJwYWNrLiR7YnVpbGRUeXBlfS5jb25mYClcblxuICAgIGJ1aWxkQ29uZmlnLm91dHB1dCA9IGJ1aWxkQ29uZmlnLm91dHB1dCB8fCBtb2R1bGVOYW1lXG5cbiAgICAvLyBTaW5nbGUgZW50cnkgZmlsZVxuICAgIGlmIChidWlsZENvbmZpZy5lbnRyeSkge1xuICAgICAgICBjb25zdCBkZWZhdWx0RW50cnlOYW1lID0gJ2luZGV4J1xuICAgICAgICBjb25zdCBlbnRyeSA9IGJ1aWxkQ29uZmlnXG5cbiAgICAgICAgZW50cnkudGVtcGxhdGVQYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgV0VCX0VOVjogY2xpZW50RW52LFxuICAgICAgICAgICAgLi4uZW50cnkudGVtcGxhdGVQYXJhbWV0ZXJzXG4gICAgICAgIH1cblxuICAgICAgICBjb25mLmVudHJ5W2RlZmF1bHRFbnRyeU5hbWVdID0gcmVzb2x2ZVBhdGgoZW50cnkuZW50cnkpXG4gICAgICAgIGNvbmYucGx1Z2lucy5wdXNoKGdlbkh0bWxXZWJwYWNrUGx1Z2luQ29uZmlnKFxuICAgICAgICAgICAgYnVpbGRUeXBlLFxuICAgICAgICAgICAgZW50cnksXG4gICAgICAgICAgICBkZWZhdWx0RW50cnlOYW1lLFxuICAgICAgICAgICAgJ2luZGV4Lmh0bWwnKSlcbiAgICAgICAgLy8gTXVsdGlwbGUgZW50cnkgZmlsZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGJ1aWxkQ29uZmlnLmVudHJpZXMpLmZvckVhY2goZW50cnlOYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5ID0gYnVpbGRDb25maWcuZW50cmllc1tlbnRyeU5hbWVdXG5cbiAgICAgICAgICAgIGVudHJ5LnRlbXBsYXRlUGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgICAgICBXRUJfRU5WOiBjbGllbnRFbnYsXG4gICAgICAgICAgICAgICAgLi4uZW50cnkudGVtcGxhdGVQYXJhbWV0ZXJzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbmYuZW50cnlbZW50cnlOYW1lXSA9IHJlc29sdmVQYXRoKGVudHJ5LmVudHJ5KVxuICAgICAgICAgICAgY29uZi5wbHVnaW5zLnB1c2goZ2VuSHRtbFdlYnBhY2tQbHVnaW5Db25maWcoXG4gICAgICAgICAgICAgICAgYnVpbGRUeXBlLFxuICAgICAgICAgICAgICAgIGVudHJ5LFxuICAgICAgICAgICAgICAgIGVudHJ5TmFtZSxcbiAgICAgICAgICAgICAgICBlbnRyeS5vdXRwdXQgfHwgYCR7ZW50cnlOYW1lfS9pbmRleC5odG1sYCkpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGlmIChidWlsZFR5cGUgPT09IEJ1aWxkVHlwZS5wcm9kKSB7XG4gICAgICAgIGNvbmYucGx1Z2lucy5wdXNoKG5ldyBNaW5pQ3NzRXh0cmFjdFBsdWdpbih7XG4gICAgICAgICAgICAvLyBPcHRpb25zIHNpbWlsYXIgdG8gdGhlIHNhbWUgb3B0aW9ucyBpbiB3ZWJwYWNrT3B0aW9ucy5vdXRwdXRcbiAgICAgICAgICAgIC8vIGJvdGggb3B0aW9ucyBhcmUgb3B0aW9uYWxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBidWlsZFR5cGUgPT09IEJ1aWxkVHlwZS5wcm9kID8gJ1tuYW1lXS5bY2h1bmtoYXNoXS5jc3MnIDogJ1tuYW1lXS5jc3MnLFxuICAgICAgICAgICAgY2h1bmtGaWxlbmFtZTogYnVpbGRUeXBlID09PSBCdWlsZFR5cGUucHJvZCA/ICdbaWRdLltjaHVua2hhc2hdLmNzcycgOiAnW2lkXS5jc3MnLFxuICAgICAgICB9KSlcbiAgICB9XG5cbiAgICAvLyBjb25mLnBsdWdpbnMucHVzaCguLi5jdXN0b21QbHVnaW5zLnBsdWdpbnNMaXN0KVxuXG5cbiAgICAvLyBTZXQgcHVibGljIHN0YXRpYyBhc3NldHNcbiAgICAvLyBjb3B5IGN1c3RvbSBzdGF0aWMgYXNzZXRzXG4gICAgaWYgKGJ1aWxkQ29uZmlnLnN0YXRpYykge1xuICAgICAgICBjb25zdCBzdGF0aWNBc3NldHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZnJvbTogcmVzb2x2ZVBhdGgoYnVpbGRDb25maWcuc3RhdGljKSxcbiAgICAgICAgICAgICAgICB0bzogY29uZmlnLmFzc2V0c1N1YkRpcmVjdG9yeSxcbiAgICAgICAgICAgICAgICBnbG9iT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBkb3Q6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG5cbiAgICAgICAgY29uZi5wbHVnaW5zLnB1c2gobmV3IENvcHlXZWJwYWNrUGx1Z2luKHtcbiAgICAgICAgICAgIHBhdHRlcm5zOiBzdGF0aWNBc3NldHMsXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29uY3VycmVuY3k6IDEwMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuXG5cbiAgICBjb25zdCB3ZWJwYWNrQ29uZmlnID0gbWVyZ2UoY29uZmlnQnVpbGRlcihidWlsZENvbmZpZyksIHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLmpvaW4oY29uZmlnLmFzc2V0c1Jvb3QsIGJ1aWxkQ29uZmlnLm91dHB1dCksXG4gICAgICAgICAgICBmaWxlbmFtZTogJ1tuYW1lXS5bY2h1bmtoYXNoXS5qcycsXG4gICAgICAgICAgICBwdWJsaWNQYXRoOiBwYXRoLmpvaW4ocGF0aC5zZXAsIGJ1aWxkQ29uZmlnLm91dHB1dCwgcGF0aC5zZXApXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIG5ldyB3ZWJwYWNrLkVudmlyb25tZW50UGx1Z2luKGNsaWVudEVudilcbiAgICAgICAgXVxuICAgIH0sIGNvbmYsIGJ1aWxkQ29uZmlnLndlYnBhY2sgfHwge30pXG5cbiAgICByZXR1cm4gd2VicGFja0NvbmZpZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRlciAoYnVpbGRlckNvbmZpZywgZGV2ID0gZmFsc2UpIHtcbiAgICBsb2dnZXIuZGVidWcoYnVpbGRlckNvbmZpZ1swXS5tb2R1bGUucnVsZXNbMTRdKVxuXG4gICAgaWYgKGRldikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gY29uZmlnLmRldlNlcnZlclxuICAgICAgICBjb25zdCBzZXJ2ZXIgPSBuZXcgV2VicGFja0RldlNlcnZlcih3ZWJwYWNrKGJ1aWxkZXJDb25maWcpLCBvcHRpb25zKVxuXG4gICAgICAgIHNlcnZlci5saXN0ZW4ob3B0aW9ucy5wb3J0LCAnbG9jYWxob3N0JywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnV2VicGFja0RldlNlcnZlciBsaXN0ZW5pbmcgYXQgbG9jYWxob3N0OicsIG9wdGlvbnMucG9ydCk7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2VicGFjayhidWlsZGVyQ29uZmlnKVxuICAgIH1cbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBmb3Igb3B0aW9ucy50ZW1wbGF0ZVBhcmFtZXRlclxuICogR2VuZXJhdGUgdGhlIHRlbXBsYXRlIHBhcmFtZXRlcnNcbiAqL1xuZnVuY3Rpb24gZ2VuVGVtcGxhdGVQYXJhbWV0ZXJzR2VuZXJhdG9yIChlbnRyeSkge1xuICAgIHJldHVybiBmdW5jdGlvbiB0ZW1wbGF0ZVBhcmFtZXRlcnNHZW5lcmF0b3IgKFxuICAgICAgICBjb21waWxhdGlvbixcbiAgICAgICAgYXNzZXRzLFxuICAgICAgICBvcHRpb25zXG4gICAgKSB7XG5cbiAgICAgICAgLy8gVHJ5IHRvIHVzZSBhYnNvbHV0ZSBwYXRoIHdoaWxlIGxvYWRpbmcgc3R5bGVzaGVldFxuICAgICAgICBpZiAoYXNzZXRzLmV4dHJhY3RlZCAmJiBhc3NldHMuZXh0cmFjdGVkLmNzcykge1xuICAgICAgICAgICAgYXNzZXRzLmV4dHJhY3RlZC5jc3MuZm9yRWFjaCgoY3NzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoY3NzLmZpbGUpICYmIGNzcy5maWxlLmluZGV4T2YoYXNzZXRzLnB1YmxpY1BhdGgpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjc3MuZmlsZSA9IHBhdGguam9pbihhc3NldHMucHVibGljUGF0aCwgY3NzLmZpbGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdGl0bGU6IGVudHJ5LnRpdGxlIHx8IGVudHJ5LnRlbXBsYXRlUGFyYW1ldGVycy50aXRsZSxcbiAgICAgICAgICAgIC4uLmVudHJ5LnRlbXBsYXRlUGFyYW1ldGVycyxcbiAgICAgICAgICAgIGNvbXBpbGF0aW9uLFxuICAgICAgICAgICAgd2VicGFja0NvbmZpZyxcbiAgICAgICAgICAgIGh0bWxXZWJwYWNrUGx1Z2luOiB7XG4gICAgICAgICAgICAgICAgZmlsZXM6IGFzc2V0cyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIGZvciBnZW5lcmF0aW5nIEhUTUxXZWJwYWNrUGx1Z2luIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gYnVpbGRUeXBlICdkZXYnIHwgJ3Byb2QnXG4gKiBAcGFyYW0ge3tcbiAqICB0aXRsZSxcbiAqICBlbnRyeSxcbiAqICBvdXRwdXQsXG4gKiAgdGVtcGxhdGU/LFxuICogIHRlbXBsYXRlUGFyYW1ldGVycz99fSBlbnRyeVxuICogQHBhcmFtIGVudHJ5TmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxGaWxlbmFtZVxuICogQHJldHVybnMge0h0bWxXZWJwYWNrUGx1Z2lufVxuICovXG5mdW5jdGlvbiBnZW5IdG1sV2VicGFja1BsdWdpbkNvbmZpZyAoXG4gICAgYnVpbGRUeXBlLFxuICAgIGVudHJ5LFxuICAgIGVudHJ5TmFtZSxcbiAgICBmaWxlbmFtZSA9ICdpbmRleC5odG1sJ1xuKSB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSBlbnRyeS50ZW1wbGF0ZVxuICAgICAgICA/IHJlc29sdmVQYXRoKGVudHJ5LnRlbXBsYXRlKVxuICAgICAgICA6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi90ZW1wbGF0ZS9pbmRleC5wdWcnKVxuXG4gICAgaWYgKGJ1aWxkVHlwZSA9PT0gQnVpbGRUeXBlLmRldikge1xuICAgICAgICByZXR1cm4gbmV3IEh0bWxXZWJwYWNrUGx1Z2luKHtcbiAgICAgICAgICAgIGZpbGVuYW1lLFxuICAgICAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgICAgICBpbmplY3Q6IHRydWUsXG4gICAgICAgICAgICBjaHVua3M6IFsndmVuZG9ycycsIGVudHJ5TmFtZV0sXG4gICAgICAgICAgICB0aXRsZTogZW50cnkudGl0bGUgfHwgZW50cnkudGVtcGxhdGVQYXJhbWV0ZXJzLnRpdGxlLFxuICAgICAgICAgICAgdGVtcGxhdGVQYXJhbWV0ZXJzOiBnZW5UZW1wbGF0ZVBhcmFtZXRlcnNHZW5lcmF0b3IoZW50cnkpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sV2VicGFja1BsdWdpbih7XG4gICAgICAgICAgICBmaWxlbmFtZSxcbiAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgaW5qZWN0OiB0cnVlLFxuICAgICAgICAgICAgY2h1bmtzOiBbJ3ZlbmRvcnMnLCBlbnRyeU5hbWVdLFxuICAgICAgICAgICAgdGl0bGU6IGVudHJ5LnRpdGxlIHx8IGVudHJ5LnRlbXBsYXRlUGFyYW1ldGVycy50aXRsZSxcbiAgICAgICAgICAgIHRlbXBsYXRlUGFyYW1ldGVyczogZ2VuVGVtcGxhdGVQYXJhbWV0ZXJzR2VuZXJhdG9yKGVudHJ5KSxcbiAgICAgICAgICAgIG1pbmlmeToge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNvbW1lbnRzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlV2hpdGVzcGFjZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZW1vdmVBdHRyaWJ1dGVRdW90ZXM6IHRydWVcbiAgICAgICAgICAgICAgICAvLyBtb3JlIG9wdGlvbnM6XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2thbmdheC9odG1sLW1pbmlmaWVyI29wdGlvbnMtcXVpY2stcmVmZXJlbmNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gbmVjZXNzYXJ5IHRvIGNvbnNpc3RlbnRseSB3b3JrIHdpdGggbXVsdGlwbGUgY2h1bmtzIHZpYSBDb21tb25zQ2h1bmtQbHVnaW5cbiAgICAgICAgICAgIGNodW5rc1NvcnRNb2RlOiAnYXV0bydcbiAgICAgICAgfSlcbiAgICB9XG59XG4iXX0=
