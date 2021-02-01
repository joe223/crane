import {
    config
} from '@cranejs/core'
import merge from 'webpack-merge'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = function (module) {
    const devWebpackConfig = merge(baseWebpackConfig, {
        mode: 'development',
        module: {
            rules: utils.styleLoaders(module, {
                sourceMap: config.dev.cssSourceMap,
                extract: false,
                usePostCSS: true
            })
        },
        // cheap-module-eval-source-map is faster for development
        devtool: config.dev.devtool,

        // these devServer options should be customized in /config/index.js
        devServer: {
            clientLogLevel: 'warning',
            hot: true,
            contentBase: false, // since we use CopyWebpackPlugin.
            compress: true,
            host: config.dev.host,
            port: PORT || config.dev.port,
            // disableHostCheck: true,
            open: config.dev.autoOpenBrowser,
            overlay: config.dev.errorOverlay
                ? { warnings: false, errors: true }
                : false,
            proxy: config.dev.proxyTable,
            quiet: true, // necessary for FriendlyErrorsPlugin
            watchOptions: {
                poll: config.dev.poll,
            },
            https: !!config.dev.https
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new FriendlyErrorsWebpackPlugin()
        ]
    })

    return devWebpackConfig
}
