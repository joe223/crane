import { builder, createBuilderConfig } from '@cranejs/builder'
import { clientEnv } from './config/env'
import { config } from './config'
import { logger,BuildType } from '@cranejs/shared'

export async function createBuildTask (modules, buildType) {
    const buildConfigMap = config.pages
    const builderConfig = modules.map((moduleName) => {
        return createBuilderConfig(
            buildConfigMap[moduleName],
            moduleName,
            clientEnv,
            buildType)
    })

    return async function () {
        return builder(builderConfig, buildType === BuildType.dev)
    }
}
