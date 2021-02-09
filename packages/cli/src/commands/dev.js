import { createBuildTask } from '@cranejs/core'
import { config, BuildType } from '@cranejs/shared'

const { AutoComplete } = require('enquirer')

export async function devCmd() {
    const prompt = new AutoComplete({
        name: 'Run Dev Server',
        message: 'Pick your develop module with Spacebar',
        multiple: true,
        limit: 50,
        initial: 0,
        choices: Object.keys(config.pages),
    })
    const modules = await prompt.run()

    const task = await createBuildTask(modules, BuildType.dev)

    await task()
}
