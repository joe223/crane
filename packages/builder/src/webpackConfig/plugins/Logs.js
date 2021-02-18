import WebpackBar from 'webpackbar'
import formatErrors from 'friendly-errors-webpack-plugin/src/core/formatErrors'
import { logger } from '@cranejs/shared'
import readline from 'readline'

const defaultFormatters = [
    require('friendly-errors-webpack-plugin/src/formatters/moduleNotFound'),
    require('friendly-errors-webpack-plugin/src/formatters/eslintError'),
    require('friendly-errors-webpack-plugin/src/formatters/defaultError'),
]

export default class Logs extends WebpackBar {
    apply(compiler) {
        super.apply(compiler);

        // if (process.stdout.isTTY) {
        //     const blank = '\n'.repeat(process.stdout.rows)

        //     console.log(blank)
        //     readline.cursorTo(process.stdout, 0, 0)
        //     readline.clearScreenDown(process.stdout)
        // }

        compiler.hooks.done.tap('WebpackNiceLog', (stats) => {
            const hasErrors = stats.hasErrors();
            const hasWarnings = stats.hasWarnings();
            const messages = stats.toJson('errors-warnings')

            if (hasErrors) {
                logger.debug(formatErrors(messages.errors, defaultFormatters, 'error'))
                formatErrors(messages.errors, defaultFormatters, 'error').forEach(item => {
                    console.log(item)
                })
            }

            if (hasWarnings) {
                formatErrors(messages.errors, defaultFormatters, 'warning').forEach(item => {
                    console.log(item)
                })
            }
        });
    }
}
