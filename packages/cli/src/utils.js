export function parseOpt(opt) {
    process.env.CRANE_BUILD_MODE = opt.mode || 'development'
}
