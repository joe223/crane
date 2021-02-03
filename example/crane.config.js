module.exports = {
    pages: {
        'vue-page': {
            title: 'Vue App',
            entry: 'vue-page/index.jsx',
            template: 'vue-page/index.pug',
            jsxType: 'vue'
        },
        'react-page': {
            title: 'React App',
            entry: 'react-page/index.jsx',
            template: 'vue-page/index.pug',
            output: 'react-app',
            jsxType: 'react'
        }
    }
}
