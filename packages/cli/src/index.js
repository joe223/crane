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

const program = new Command()

program
    .command('dev')
    .description('Run development server')
    .action(devCmd)

program
    .command('build')
    .description('Build production version')
    .action(buildCmd)

program.parse(process.argv)
