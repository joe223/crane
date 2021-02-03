import deepmerge from 'deepmerge'
import path from 'path'

const cwd = process.cwd()
const defaultConfig = {
    useEslint: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    assetsRoot: path.resolve(cwd, './dist'),
    assetsSubDirectory: 'static',

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        hot: true,
        port: 8080,
        open: true,
        overlay: true
    },

    dev: {
        host: 'localhost',
        // Paths
        assetsSubDirectory: 'static',

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: process.env.NODE_ENV !== 'production',
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'inline-cheap-module-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Paths
        assetsRoot: path.resolve(cwd, './dist'),
        assetsSubDirectory: 'static',

        /**
         * Source Maps
         */

        productionSourceMap: process.env.MODE !== 'production',
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },

    pages: []
}
const config = deepmerge(defaultConfig, require(path.resolve(cwd, 'crane.config.js')))

export {
    config
}
