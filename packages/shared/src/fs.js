import path from 'path'
import rimraf from 'rimraf'
import { logger } from './logger'

const cwd = process.cwd()

export function cleanWorkspace() {
    try {
        rimraf.sync(path.join(cwd, 'dist'))
        logger.info('Clean dist directory')
    } catch (e) {
        console.error(e)
    }
    try {
        rimraf.sync(path.join(cwd, 'bundle_analyze'))
        logger.info('Clean bundle_analyze directory')
    } catch (e) {
        console.error(e)
    }
}
