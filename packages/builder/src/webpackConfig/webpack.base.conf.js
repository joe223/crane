import { config, logger } from '@cranejs/shared'
import * as path from 'path'
import WebpackConfig from 'webpack-chain'
import createVueLoaderConfig from './vue-loader.conf'

const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
        formatter: require('eslint-friendly-formatter'),
    },
})
const assetsPath = (p) => path.join('assets', p)

export default function genBaseWebpackConfig(pageConfig) {
    const webpackConfig = new WebpackConfig()

    webpackConfig.merge({
        context: resolve('.'),
        resolve: {
            extensions: ['.js', '.vue', '.json', '.jsx'],
            alias: {
                '@': resolve('modules'),
            },
        },
        resolveLoader: {
            modules: [
                path.resolve(__dirname, '../../node_modules'),
                path.resolve(cwd, './node_modules')
            ],
        },
        module: {
            rule: {
                pug: {
                    test: /\.pug$/,
                    use: {
                        pug: {
                            loader: 'pug-loader',
                        }
                    }
                },
                vue: {
                    test: /\.vue$/,
                    use: {
                        vue: {
                            loader: 'vue-loader',
                            options: createVueLoaderConfig(pageConfig),
                        }
                    }
                },
                js: {
                    test: /\.(m?js|jsx)$/,
                    include: [
                        resolve('modules'),
                        resolve('test'),
                        resolve('__test__'),
                        require.resolve('webpack-dev-server/client'),
                    ],
                    use: {
                        babel: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            useBuiltIns: 'usage',
                                            corejs: 3,
                                            targets: {
                                                browsers: [
                                                    '> 1%',
                                                    'last 2 versions',
                                                    'not ie <= 8',
                                                ],
                                            },
                                        },
                                    ]
                                ]
                            },
                        }
                    }
                },
                image: {
                    test: /\.(png|jpe?g|gif|svg|apng)(\?.*)?$/,
                    use: {
                        url: {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                esModule: false,
                                name: assetsPath('img/[name].[hash:7].[ext]'),
                            },
                        }
                    }
                },
                media: {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    use: {
                        url: {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: assetsPath('media/[name].[hash:7].[ext]'),
                            },
                        }
                    }
                },
                font: {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: {
                        url: {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                esModule: false,
                                name: assetsPath('fonts/[name].[hash:7].[ext]'),
                            },
                        }
                    }
                },
            },
        },
        plugin: {
            VueLoaderPlugin: {
                plugin: VueLoaderPlugin
            }
        },
        node: {
            global: false,
            __filename: false,
            __dirname: false,
        }
    })

    return webpackConfig
}
