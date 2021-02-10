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
        mode: 'development',
        module: {
            rule: utils.styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: true,
                usePostCSS: true,
            }),
        },
        devtool: 'inline-cheap-module-source-map',
    })

    return baseConfig
}
