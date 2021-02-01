"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
const defaultConfig = {
  useEslint: true,
  devtool: '#source-map',
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  assetsRoot: _path.default.resolve(cwd, './dist'),
  assetsSubDirectory: 'static',
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    hot: true
  },
  dev: {
    host: 'localhost',
    // host: '0.0.0.0',
    // Paths
    assetsSubDirectory: 'static',
    proxyTable: {},
    // Various Dev Server settings
    port: 8080,
    // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: process.env.NODE_ENV !== 'production',
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'inline-cheap-module-source-map',
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: _path.default.resolve(cwd, './dist'),
    assetsSubDirectory: 'static',

    /**
     * Source Maps
     */
    productionSourceMap: process.env.MODE !== 'production',
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  pages: []
};
const config = (0, _deepmerge.default)(defaultConfig, require(_path.default.resolve(cwd, 'crane.config.js')));
exports.config = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvaW5kZXguanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImRlZmF1bHRDb25maWciLCJ1c2VFc2xpbnQiLCJkZXZ0b29sIiwicHJvZHVjdGlvbkd6aXAiLCJwcm9kdWN0aW9uR3ppcEV4dGVuc2lvbnMiLCJhc3NldHNSb290IiwicGF0aCIsInJlc29sdmUiLCJhc3NldHNTdWJEaXJlY3RvcnkiLCJkZXZTZXJ2ZXIiLCJob3QiLCJkZXYiLCJob3N0IiwicHJveHlUYWJsZSIsInBvcnQiLCJhdXRvT3BlbkJyb3dzZXIiLCJlcnJvck92ZXJsYXkiLCJub3RpZnlPbkVycm9ycyIsInBvbGwiLCJlbnYiLCJOT0RFX0VOViIsInNob3dFc2xpbnRFcnJvcnNJbk92ZXJsYXkiLCJjYWNoZUJ1c3RpbmciLCJjc3NTb3VyY2VNYXAiLCJidWlsZCIsInByb2R1Y3Rpb25Tb3VyY2VNYXAiLCJNT0RFIiwiYnVuZGxlQW5hbHl6ZXJSZXBvcnQiLCJucG1fY29uZmlnX3JlcG9ydCIsInBhZ2VzIiwiY29uZmlnIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHQyxPQUFPLENBQUNELEdBQVIsRUFBWjtBQUNBLE1BQU1FLGFBQWEsR0FBRztBQUNsQkMsRUFBQUEsU0FBUyxFQUFFLElBRE87QUFFbEJDLEVBQUFBLE9BQU8sRUFBRSxhQUZTO0FBR2xCQyxFQUFBQSxjQUFjLEVBQUUsS0FIRTtBQUlsQkMsRUFBQUEsd0JBQXdCLEVBQUUsQ0FBQyxJQUFELEVBQU8sS0FBUCxDQUpSO0FBS2xCQyxFQUFBQSxVQUFVLEVBQUVDLGNBQUtDLE9BQUwsQ0FBYVQsR0FBYixFQUFrQixRQUFsQixDQUxNO0FBTWxCVSxFQUFBQSxrQkFBa0IsRUFBRSxRQU5GO0FBUWxCO0FBQ0FDLEVBQUFBLFNBQVMsRUFBRTtBQUNQQyxJQUFBQSxHQUFHLEVBQUU7QUFERSxHQVRPO0FBYWxCQyxFQUFBQSxHQUFHLEVBQUU7QUFDREMsSUFBQUEsSUFBSSxFQUFFLFdBREw7QUFFRDtBQUNBO0FBQ0FKLElBQUFBLGtCQUFrQixFQUFFLFFBSm5CO0FBS0RLLElBQUFBLFVBQVUsRUFBRSxFQUxYO0FBT0Q7QUFDQUMsSUFBQUEsSUFBSSxFQUFFLElBUkw7QUFRVztBQUNaQyxJQUFBQSxlQUFlLEVBQUUsS0FUaEI7QUFVREMsSUFBQUEsWUFBWSxFQUFFLElBVmI7QUFXREMsSUFBQUEsY0FBYyxFQUFFLElBWGY7QUFZREMsSUFBQUEsSUFBSSxFQUFFLEtBWkw7QUFZWTtBQUViO0FBQ0E7QUFDQTtBQUNBakIsSUFBQUEsU0FBUyxFQUFFRixPQUFPLENBQUNvQixHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFqQm5DO0FBa0JEO0FBQ0E7QUFDQUMsSUFBQUEseUJBQXlCLEVBQUUsS0FwQjFCOztBQXNCRDtBQUNSO0FBQ0E7QUFFUTtBQUNBbkIsSUFBQUEsT0FBTyxFQUFFLGdDQTNCUjtBQTZCRDtBQUNBO0FBQ0E7QUFDQW9CLElBQUFBLFlBQVksRUFBRSxJQWhDYjtBQWtDREMsSUFBQUEsWUFBWSxFQUFFO0FBbENiLEdBYmE7QUFrRGxCQyxFQUFBQSxLQUFLLEVBQUU7QUFDSDtBQUNBO0FBRUE7QUFDQW5CLElBQUFBLFVBQVUsRUFBRUMsY0FBS0MsT0FBTCxDQUFhVCxHQUFiLEVBQWtCLFFBQWxCLENBTFQ7QUFNSFUsSUFBQUEsa0JBQWtCLEVBQUUsUUFOakI7O0FBUUg7QUFDUjtBQUNBO0FBRVFpQixJQUFBQSxtQkFBbUIsRUFBRTFCLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWU8sSUFBWixLQUFxQixZQVp2QztBQWFIO0FBQ0F4QixJQUFBQSxPQUFPLEVBQUUsYUFkTjtBQWdCSDtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxjQUFjLEVBQUUsS0FwQmI7QUFxQkhDLElBQUFBLHdCQUF3QixFQUFFLENBQUMsSUFBRCxFQUFPLEtBQVAsQ0FyQnZCO0FBdUJIO0FBQ0E7QUFDQTtBQUNBO0FBQ0F1QixJQUFBQSxvQkFBb0IsRUFBRTVCLE9BQU8sQ0FBQ29CLEdBQVIsQ0FBWVM7QUEzQi9CLEdBbERXO0FBZ0ZsQkMsRUFBQUEsS0FBSyxFQUFFO0FBaEZXLENBQXRCO0FBa0ZBLE1BQU1DLE1BQU0sR0FBRyx3QkFBVTlCLGFBQVYsRUFBeUIrQixPQUFPLENBQUN6QixjQUFLQyxPQUFMLENBQWFULEdBQWIsRUFBa0IsaUJBQWxCLENBQUQsQ0FBaEMsQ0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKVxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgICB1c2VFc2xpbnQ6IHRydWUsXG4gICAgZGV2dG9vbDogJyNzb3VyY2UtbWFwJyxcbiAgICBwcm9kdWN0aW9uR3ppcDogZmFsc2UsXG4gICAgcHJvZHVjdGlvbkd6aXBFeHRlbnNpb25zOiBbJ2pzJywgJ2NzcyddLFxuICAgIGFzc2V0c1Jvb3Q6IHBhdGgucmVzb2x2ZShjd2QsICcuL2Rpc3QnKSxcbiAgICBhc3NldHNTdWJEaXJlY3Rvcnk6ICdzdGF0aWMnLFxuXG4gICAgLy8gaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25maWd1cmF0aW9uL2Rldi1zZXJ2ZXIvXG4gICAgZGV2U2VydmVyOiB7XG4gICAgICAgIGhvdDogdHJ1ZVxuICAgIH0sXG5cbiAgICBkZXY6IHtcbiAgICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICAgIC8vIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgICAgLy8gUGF0aHNcbiAgICAgICAgYXNzZXRzU3ViRGlyZWN0b3J5OiAnc3RhdGljJyxcbiAgICAgICAgcHJveHlUYWJsZToge30sXG5cbiAgICAgICAgLy8gVmFyaW91cyBEZXYgU2VydmVyIHNldHRpbmdzXG4gICAgICAgIHBvcnQ6IDgwODAsIC8vIGNhbiBiZSBvdmVyd3JpdHRlbiBieSBwcm9jZXNzLmVudi5QT1JULCBpZiBwb3J0IGlzIGluIHVzZSwgYSBmcmVlIG9uZSB3aWxsIGJlIGRldGVybWluZWRcbiAgICAgICAgYXV0b09wZW5Ccm93c2VyOiBmYWxzZSxcbiAgICAgICAgZXJyb3JPdmVybGF5OiB0cnVlLFxuICAgICAgICBub3RpZnlPbkVycm9yczogdHJ1ZSxcbiAgICAgICAgcG9sbDogZmFsc2UsIC8vIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uZmlndXJhdGlvbi9kZXYtc2VydmVyLyNkZXZzZXJ2ZXItd2F0Y2hvcHRpb25zLVxuXG4gICAgICAgIC8vIFVzZSBFc2xpbnQgTG9hZGVyP1xuICAgICAgICAvLyBJZiB0cnVlLCB5b3VyIGNvZGUgd2lsbCBiZSBsaW50ZWQgZHVyaW5nIGJ1bmRsaW5nIGFuZFxuICAgICAgICAvLyBsaW50aW5nIGVycm9ycyBhbmQgd2FybmluZ3Mgd2lsbCBiZSBzaG93biBpbiB0aGUgY29uc29sZS5cbiAgICAgICAgdXNlRXNsaW50OiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuICAgICAgICAvLyBJZiB0cnVlLCBlc2xpbnQgZXJyb3JzIGFuZCB3YXJuaW5ncyB3aWxsIGFsc28gYmUgc2hvd24gaW4gdGhlIGVycm9yIG92ZXJsYXlcbiAgICAgICAgLy8gaW4gdGhlIGJyb3dzZXIuXG4gICAgICAgIHNob3dFc2xpbnRFcnJvcnNJbk92ZXJsYXk6IGZhbHNlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTb3VyY2UgTWFwc1xuICAgICAgICAgKi9cblxuICAgICAgICAvLyBodHRwczovL3dlYnBhY2suanMub3JnL2NvbmZpZ3VyYXRpb24vZGV2dG9vbC8jZGV2ZWxvcG1lbnRcbiAgICAgICAgZGV2dG9vbDogJ2lubGluZS1jaGVhcC1tb2R1bGUtc291cmNlLW1hcCcsXG5cbiAgICAgICAgLy8gSWYgeW91IGhhdmUgcHJvYmxlbXMgZGVidWdnaW5nIHZ1ZS1maWxlcyBpbiBkZXZ0b29scyxcbiAgICAgICAgLy8gc2V0IHRoaXMgdG8gZmFsc2UgLSBpdCAqbWF5KiBoZWxwXG4gICAgICAgIC8vIGh0dHBzOi8vdnVlLWxvYWRlci52dWVqcy5vcmcvZW4vb3B0aW9ucy5odG1sI2NhY2hlYnVzdGluZ1xuICAgICAgICBjYWNoZUJ1c3Rpbmc6IHRydWUsXG5cbiAgICAgICAgY3NzU291cmNlTWFwOiB0cnVlXG4gICAgfSxcblxuICAgIGJ1aWxkOiB7XG4gICAgICAgIC8vIFRlbXBsYXRlIGZvciBpbmRleC5odG1sXG4gICAgICAgIC8vIGluZGV4OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vZGlzdC9pbmRleC5odG1sJyksXG5cbiAgICAgICAgLy8gUGF0aHNcbiAgICAgICAgYXNzZXRzUm9vdDogcGF0aC5yZXNvbHZlKGN3ZCwgJy4vZGlzdCcpLFxuICAgICAgICBhc3NldHNTdWJEaXJlY3Rvcnk6ICdzdGF0aWMnLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTb3VyY2UgTWFwc1xuICAgICAgICAgKi9cblxuICAgICAgICBwcm9kdWN0aW9uU291cmNlTWFwOiBwcm9jZXNzLmVudi5NT0RFICE9PSAncHJvZHVjdGlvbicsXG4gICAgICAgIC8vIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uZmlndXJhdGlvbi9kZXZ0b29sLyNwcm9kdWN0aW9uXG4gICAgICAgIGRldnRvb2w6ICcjc291cmNlLW1hcCcsXG5cbiAgICAgICAgLy8gR3ppcCBvZmYgYnkgZGVmYXVsdCBhcyBtYW55IHBvcHVsYXIgc3RhdGljIGhvc3RzIHN1Y2ggYXNcbiAgICAgICAgLy8gU3VyZ2Ugb3IgTmV0bGlmeSBhbHJlYWR5IGd6aXAgYWxsIHN0YXRpYyBhc3NldHMgZm9yIHlvdS5cbiAgICAgICAgLy8gQmVmb3JlIHNldHRpbmcgdG8gYHRydWVgLCBtYWtlIHN1cmUgdG86XG4gICAgICAgIC8vIG5wbSBpbnN0YWxsIC0tc2F2ZS1kZXYgY29tcHJlc3Npb24td2VicGFjay1wbHVnaW5cbiAgICAgICAgcHJvZHVjdGlvbkd6aXA6IGZhbHNlLFxuICAgICAgICBwcm9kdWN0aW9uR3ppcEV4dGVuc2lvbnM6IFsnanMnLCAnY3NzJ10sXG5cbiAgICAgICAgLy8gUnVuIHRoZSBidWlsZCBjb21tYW5kIHdpdGggYW4gZXh0cmEgYXJndW1lbnQgdG9cbiAgICAgICAgLy8gVmlldyB0aGUgYnVuZGxlIGFuYWx5emVyIHJlcG9ydCBhZnRlciBidWlsZCBmaW5pc2hlczpcbiAgICAgICAgLy8gYG5wbSBydW4gYnVpbGQgLS1yZXBvcnRgXG4gICAgICAgIC8vIFNldCB0byBgdHJ1ZWAgb3IgYGZhbHNlYCB0byBhbHdheXMgdHVybiBpdCBvbiBvciBvZmZcbiAgICAgICAgYnVuZGxlQW5hbHl6ZXJSZXBvcnQ6IHByb2Nlc3MuZW52Lm5wbV9jb25maWdfcmVwb3J0XG4gICAgfSxcblxuICAgIHBhZ2VzOiBbXVxufVxuY29uc3QgY29uZmlnID0gZGVlcG1lcmdlKGRlZmF1bHRDb25maWcsIHJlcXVpcmUocGF0aC5yZXNvbHZlKGN3ZCwgJ2NyYW5lLmNvbmZpZy5qcycpKSlcblxuZXhwb3J0IHtcbiAgICBjb25maWdcbn1cbiJdfQ==