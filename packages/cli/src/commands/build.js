import {
    config,
    createBuildTask
} from '@cranejs/core'
import { BuildType } from '@cranejs/shared'

export async function buildCmd () {
    const modules = Object.keys(config.pages)
    const task = await createBuildTask(
        modules,
        BuildType.build
    )

    await task()
}
