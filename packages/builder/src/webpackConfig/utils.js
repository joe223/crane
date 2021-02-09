import MiniCssExtractPlugin from 'mini-css-extract-plugin'

function isUrlRequestable(url) {
    // Protocol-relative URLs
    if (/^\/\//.test(url)) {
        return false;
    }

    // `file:` protocol
    if (/^file:/i.test(url)) {
        return true;
    }

    // Absolute URLs
    if (/^\/\w+/i.test(url)) {
        return false
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !matchNativeWin32Path.test(url)) {
        return false;
    }

    // `#` URLs
    if (/^#/.test(url)) {
        return false;
    }

    return true;
}

export function cssLoaders(options) {
    options = options || {}

    // https://github.com/webpack-contrib/css-loader/issues/1157
    // https://github.com/webpack-contrib/css-loader/commit/bc19ddd8779dafbc2a420870a3cb841041ce9c7c
    const cssLoader = {
        loader: 'css-loader',
        options: {
            esModule: false,
            url(url) {
                return isUrlRequestable(url);
            },
            sourceMap: options.sourceMap
        },
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = [cssLoader]

        if (options.usePostCSS) {
            loaders.push(postcssLoader)
        }

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            })
        }

        return [
            options.extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        ].concat(loaders)
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus'),
    }
}

export function styleLoaders(options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader,
        })
    }

    return output
}
