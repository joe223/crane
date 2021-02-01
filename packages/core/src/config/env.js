/**
 * Initialize node environment variables
 */

const path = require("path")
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const cwd = process.cwd()
const prefixRE = /^WEB_APP_/
const envPath = path.resolve(cwd, 'env')
const envConfig = {
    ...dotenv.config({
        debug: process.env.DEBUG,
        path: path.join(cwd, envPath, `.env.${process.env.MODE}`)
    }),
    ...dotenv.config({
        debug: process.env.DEBUG,
        path: path.join(cwd, envPath, '.env._base')
    })
}
const clientEnv = {}

dotenvExpand(envConfig)

Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key)
        || key === 'NODE_ENV'
        || key === 'MODE'
    ) {
        clientEnv[key] = process.env[key]
    }
})

export {
    clientEnv
}
