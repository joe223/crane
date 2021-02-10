import { config } from '@cranejs/shared'
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

export default function (pageConfig) {
    const baseConfig = genBaseWebpackConfig(pageConfig)

    baseConfig.merge({
        mode: 'production',
        module: {
            rule: utils.styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: true,
                usePostCSS: true,
            }),
        },
        devtool: config.build.productionSourceMap
            ? config.build.devtool
            : false,
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

    return baseConfig
}
