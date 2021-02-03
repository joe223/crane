import {
    config
} from '@cranejs/core'

export default function genConfig (module) {
    const webpackConfig = merge(baseWebpackConfig, {
        output: {
            path: config.build.assetsRoot,
            filename: '[name].js',
            publicPath: process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
        },
        mode: 'development',
        // use inline sourcemap for karma-sourcemap-loader
        module: {
            rules: utils.styleLoaders(module)
        },
        devtool: '#inline-source-map',
        resolveLoader: {
            alias: {
                // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
                // see discussion at https://github.com/vuejs/vue-loader/issues/724
                'scss-loader': 'sass-loader'
            }
        },
        plugins: []
    })

    // no need for app entry during tests
    delete webpackConfig.entry

    return webpackConfig
}
