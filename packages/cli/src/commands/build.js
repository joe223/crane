import { createBuildTask } from '@cranejs/core'
import { config, BuildType } from '@cranejs/shared'

export async function buildCmd() {
    const modules = Object.keys(config.pages)
    const task = await createBuildTask(modules, BuildType.prod)

    await task()
}
