import {
    Command
} from 'commander'
import 'source-map-support/register'
import {
    devCmd
} from './commands/dev'
import {
    buildCmd
} from './commands/build'
import {
    parseOpt
} from './utils'

const program = new Command()

program.option('mode', 'Crane environment mode')

program
    .command('dev')
    .description('Run development server')
    .action(async function () {
        parseOpt(program.opts())
        await devCmd(program)
    })

program
    .command('build')
    .description('Build production version')
    .action(async function () {
        parseOpt(program.opts())
        await buildCmd(program)
    })

program.parse(process.argv)
