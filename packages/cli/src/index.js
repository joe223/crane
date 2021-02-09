import { Command } from 'commander'
import 'source-map-support/register'
import { devCmd } from './commands/dev'
import { buildCmd } from './commands/build'
import { parseOpt } from './utils'
import { cleanWorkspace } from '@cranejs/shared'

const program = new Command()

program.option('--mode <mode>', 'Crane environment mode')

program
    .command('dev')
    .description('Run development server')
    .action(async function () {
        process.env.NODE_ENV = 'development'
        parseOpt(program.opts())
        await devCmd(program)
    })

program
    .command('build')
    .description('Build production version')
    .action(async function () {
        process.env.NODE_ENV = 'production'
        parseOpt(program.opts())
        cleanWorkspace()
        await buildCmd(program)
    })

program.parse(process.argv)
