import {
    config
} from '@cranejs/core'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

console.log(`正在构建 production 版本，
    当前环境设置: ${process.env.NODE_ENV},
    当前 MODE 设置: ${process.env.MODE}`)


module.exports = function (module) {
    const webpackConfig = merge(baseWebpackConfig, {
        module: {
            rules: utils.styleLoaders(module, {
                sourceMap: config.build.productionSourceMap,
                extract: true,
                usePostCSS: true
            })
        },
        devtool: config.build.productionSourceMap ? config.build.devtool : false,
        mode: 'production',
        optimization: {
            moduleIds: 'hashed',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                },
                minChunks: 2
            },
            minimize: true
        },
        plugins: [
            // extract css into its own file
            // Compress extracted CSS. We are using this plugin so that possible
            // duplicated CSS from different components can be deduped.
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? { safe: true, map: { inline: false } }
                    : { safe: true }
            }),
            // keep module.id stable when vendor modules does not change
            new webpack.HashedModuleIdsPlugin(),
            // enable scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin()
        ]
    })

    if (config.build.productionGzip) {
        const CompressionWebpackPlugin = require('compression-webpack-plugin')

        webpackConfig.plugins.push(
            new CompressionWebpackPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    config.build.productionGzipExtensions.join('|') +
                    ')$'
                ),
                threshold: 10240,
                minRatio: 0.8
            })
        )
    }

    return webpackConfig
}
