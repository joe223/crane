import Chalk from 'chalk'
import Debug from 'debug'

const debug = Debug('Baker')

export const logger = {
    info(msg, desc) {
        console.log(Chalk.hex('#333333').bgCyanBright('Baker'), msg)
        desc && console.log(desc)
    },
    error(msg) {
        console.log(
            Chalk.hex('#333333').bgRedBright('Baker'),
            msg instanceof Error ? msg.message : msg
        )
        console.log(msg)
    },
    success(msg, desc) {
        console.log(Chalk.hex('#333333').bgGreenBright('Baker'), msg)
        desc && console.log(desc)
    },
    debug(msg) {
        debug(msg)
    },
}
