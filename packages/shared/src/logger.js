import Chalk from 'chalk'
import Debug from 'debug'

const debug = Debug('Baker')

export const logger = {
    info (msg, desc) {
        console.log(Chalk.bgCyanBright('[Baker Info]'), msg)
        desc && console.log(desc)
    },
    error (msg) {
        console.log(Chalk.bgRedBright('[Baker Error]'), msg instanceof Error
            ? msg.message
            : msg
        )
        console.log(msg)
    },
    success (msg, desc) {
        console.log(Chalk.bgGreenBright('[Baker Succeed]'), msg)
        desc && console.log(desc)
    },
    debug (msg) {
        console.log(msg)
        debug(msg)
    }
}
