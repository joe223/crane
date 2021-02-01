const path = require('path')

class Debugger {
    constructor (options = {}) {
        this.enable = !!options.enable
    }

    apply (compiler) {
        const { enable } = this
        const debuggerPath = path.resolve(__dirname, 'debugger.js')

        function injectDebuggerEntry (local, entry) {
            if (!enable) return

            if (Array.isArray(entry) && (entry.indexOf(debuggerPath) === -1)) {
                entry.unshift(debuggerPath)
            } else if (typeof entry === 'object') {
                Object.keys(entry).forEach(key => {
                    if (Array.isArray(entry[key]) && (entry[key].indexOf(debuggerPath) === -1)) {
                        entry[key].unshift(debuggerPath)
                    } else if (typeof entry[key] === 'string' && entry[key] !== debuggerPath) {
                        entry[key] = [
                            debuggerPath,
                            entry[key]
                        ]
                    }
                })
            }
        }

        if (compiler.hooks) {
            compiler.hooks.entryOption.tap('Debugger', injectDebuggerEntry)
        } else {
            compiler.plugin('entry-option', injectDebuggerEntry)
        }
    }
}

module.exports = Debugger
