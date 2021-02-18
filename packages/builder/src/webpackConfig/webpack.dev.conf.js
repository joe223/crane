import { config, logger } from '@cranejs/shared'
import merge from 'webpack-merge'
import deepMerge from 'deepmerge'
import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import genBaseWebpackConfig from './webpack.base.conf'
import * as utils from './utils'


export default function (
    pageConfig,
    moduleName,
    clientEnv,
    buildType
) {
    const baseConfig = genBaseWebpackConfig(
        pageConfig,
        moduleName,
        clientEnv,
        buildType
    )

    baseConfig.merge({
        mode: 'development',
        module: {
            rule: utils.styleLoaders({
                sourceMap: config.dev.cssSourceMap,
                extract: false,
                usePostCSS: true,
            }),
        },
        // cheap-module-eval-source-map is faster for development
        devtool: config.dev.devtool,

        devServer: deepMerge({
            clientLogLevel: 'warning',
            hot: true,
            contentBase: false, // since we use CopyWebpackPlugin.
            compress: true,
            quiet: true, // necessary for FriendlyErrorsPlugin
        }, config.devServer),
        plugin: {
            HotModuleReplacementPlugin: {
                plugin: webpack.HotModuleReplacementPlugin
            },
        },
    })

    return baseConfig
}
