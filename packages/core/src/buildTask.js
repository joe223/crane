import { builder, createBuilderConfig } from '@cranejs/builder'
import { logger, BuildType, config, createCliEnv } from '@cranejs/shared'

export async function createBuildTask(modules, buildType) {
    const clientEnv = createCliEnv()
    const buildConfigMap = config.pages
    const builderConfig = modules.map((moduleName) => {
        return createBuilderConfig(
            buildConfigMap[moduleName],
            moduleName,
            clientEnv,
            buildType
        )
    })

    return async function () {
        return builder(builderConfig, buildType === BuildType.dev)
    }
}
