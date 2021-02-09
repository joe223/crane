import path from 'path'
import { config } from '@cranejs/shared'
import * as utils from './utils'

const cwd = process.cwd()

export default function createVueLoaderConfig () {
    const isProduction = process.env.NODE_ENV === 'production'
    const sourceMapEnabled = isProduction
        ? config.build.productionSourceMap
        : config.dev.cssSourceMap

    return {
        loaders: utils.cssLoaders({
            sourceMap: sourceMapEnabled,
            extract: isProduction,
        }),
        cssSourceMap: sourceMapEnabled,
        transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
        },
        compiler: require(path.resolve(cwd, './node_modules/vue-template-compiler'))
    }
}
