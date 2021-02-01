import {
    config
} from '@cranejs/core'
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const vueLoaderConfig = require('./vue-loader.conf')
const cwd = process.cwd()

function resolve(dir) {
    return path.join(cwd, dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue|jsx)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('modules'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter')
    }
})
const assetsPath = p => path.join('static', p)

module.exports = {
    context: resolve('.'),
    resolve: {
        extensions: ['.js', '.vue', '.json', '.jsx'],
        alias: {
            '@': resolve('modules')
        }
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
    },
    module: {
        rules: [
            ...(config.useEslint ? [createLintingRule()] : []),
            {
               test: /\.pug$/,
               loader: 'pug-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [resolve('modules'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    node: {
        global: false,
        __filename: false,
        __dirname: false
    }
}
