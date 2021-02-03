/**
 * Initialize node environment variables
 */

const path = require("path")
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const cwd = process.cwd()
const prefixRE = /^WEB_APP_/
const envPath = path.join(cwd, 'env')

export function createCliEnv () {
    const envConfig = {
        ...dotenv.config({
            debug: process.env.DEBUG,
            path: path.join(envPath, `.env.${process.env.CRANE_BUILD_MODE}`)
        }),
        ...dotenv.config({
            debug: process.env.DEBUG,
            path: path.join(envPath, '.env._base')
        })
    }
    const clientEnv = {}

    dotenvExpand(envConfig)

    Object.keys(process.env).forEach(key => {
        if (prefixRE.test(key)
            || key === 'NODE_ENV'
            || key === 'CRANE_BUILD_MODE'
        ) {
            clientEnv[key] = process.env[key]
        }
    })

    return clientEnv
}
