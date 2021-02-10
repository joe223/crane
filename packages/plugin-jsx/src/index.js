import babelMerge from 'babel-merge'
import { logger } from '@cranejs/shared'

export default function ({
    configBuilder,
    pageConfig,
    moduleName,
    clientEnv,
    buildType
}, options = {}) {
    const isVueApp = pageConfig.jsxType === 'react' ? false : true
    const babelPreset = []

    if (isVueApp) {
        babelPreset.push([
            require.resolve('@vue/babel-preset-jsx'),
            options
        ])
    } else {
        babelPreset.push([
            require.resolve('@babel/preset-react'),
            options
        ])
    }

    configBuilder.module
        .rule('js')
            .use('babel')
                .tap((option = {}) => babelMerge(option, {
                    presets: [
                        ...babelPreset
                    ]
                }))
}
