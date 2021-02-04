import { config } from '@cranejs/core'
import merge from 'webpack-merge'
import fs from 'fs'
import path from 'path'
import * as utils from './utils'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import CompressionWebpackPlugin from 'compression-webpack-plugin'
import genBaseWebpackConfig from './webpack.base.conf'

module.exports = function (pageConfig) {
    const baseWebpackConfig = genBaseWebpackConfig(pageConfig)
    const webpackConfig = merge(baseWebpackConfig, {
        module: {
            rules: utils.styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: true,
                usePostCSS: true,
            }),
        },
        devtool: config.build.productionSourceMap
            ? config.build.devtool
            : false,
        mode: 'production',
        optimization: {
            moduleIds: 'deterministic',
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
                minChunks: 2,
            },
            minimize: true,
        },
        plugins: [
            // extract css into its own file
            // Compress extracted CSS. We are using this plugin so that possible
            // duplicated CSS from different components can be deduped.
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? { safe: true, map: { inline: false } }
                    : { safe: true },
            }),
            // enable scope hoisting
            new webpack.optimize.ModuleConcatenationPlugin(),
        ],
    })

    if (config.build.productionGzip) {
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
                minRatio: 0.8,
            })
        )
    }

    return webpackConfig
}
