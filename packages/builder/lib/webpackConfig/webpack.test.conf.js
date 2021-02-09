"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genConfig;

var _shared = require("@cranejs/shared");

function genConfig(module) {
  const webpackConfig = merge(baseWebpackConfig, {
    output: {
      path: _shared.config.assetsRoot,
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production' ? _shared.config.build.assetsPublicPath : _shared.config.dev.assetsPublicPath
    },
    mode: 'development',
    // use inline sourcemap for karma-sourcemap-loader
    module: {
      rules: utils.styleLoaders(module)
    },
    devtool: 'inline-cheap-module-source-map',
    resolveLoader: {
      alias: {
        // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
        // see discussion at https://github.com/vuejs/vue-loader/issues/724
        'scss-loader': 'sass-loader'
      }
    },
    plugins: []
  }); // no need for app entry during tests

  delete webpackConfig.entry;
  return webpackConfig;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2sudGVzdC5jb25mLmpzIl0sIm5hbWVzIjpbImdlbkNvbmZpZyIsIm1vZHVsZSIsIndlYnBhY2tDb25maWciLCJtZXJnZSIsImJhc2VXZWJwYWNrQ29uZmlnIiwib3V0cHV0IiwicGF0aCIsImNvbmZpZyIsImFzc2V0c1Jvb3QiLCJmaWxlbmFtZSIsInB1YmxpY1BhdGgiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJidWlsZCIsImFzc2V0c1B1YmxpY1BhdGgiLCJkZXYiLCJtb2RlIiwicnVsZXMiLCJ1dGlscyIsInN0eWxlTG9hZGVycyIsImRldnRvb2wiLCJyZXNvbHZlTG9hZGVyIiwiYWxpYXMiLCJwbHVnaW5zIiwiZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFZSxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEyQjtBQUN0QyxRQUFNQyxhQUFhLEdBQUdDLEtBQUssQ0FBQ0MsaUJBQUQsRUFBb0I7QUFDM0NDLElBQUFBLE1BQU0sRUFBRTtBQUNKQyxNQUFBQSxJQUFJLEVBQUVDLGVBQU9DLFVBRFQ7QUFFSkMsTUFBQUEsUUFBUSxFQUFFLFdBRk47QUFHSkMsTUFBQUEsVUFBVSxFQUNOQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUNNTixlQUFPTyxLQUFQLENBQWFDLGdCQURuQixHQUVNUixlQUFPUyxHQUFQLENBQVdEO0FBTmpCLEtBRG1DO0FBUzNDRSxJQUFBQSxJQUFJLEVBQUUsYUFUcUM7QUFVM0M7QUFDQWhCLElBQUFBLE1BQU0sRUFBRTtBQUNKaUIsTUFBQUEsS0FBSyxFQUFFQyxLQUFLLENBQUNDLFlBQU4sQ0FBbUJuQixNQUFuQjtBQURILEtBWG1DO0FBYzNDb0IsSUFBQUEsT0FBTyxFQUFFLGdDQWRrQztBQWUzQ0MsSUFBQUEsYUFBYSxFQUFFO0FBQ1hDLE1BQUFBLEtBQUssRUFBRTtBQUNIO0FBQ0E7QUFDQSx1QkFBZTtBQUhaO0FBREksS0FmNEI7QUFzQjNDQyxJQUFBQSxPQUFPLEVBQUU7QUF0QmtDLEdBQXBCLENBQTNCLENBRHNDLENBMEJ0Qzs7QUFDQSxTQUFPdEIsYUFBYSxDQUFDdUIsS0FBckI7QUFFQSxTQUFPdkIsYUFBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5Db25maWcobW9kdWxlKSB7XG4gICAgY29uc3Qgd2VicGFja0NvbmZpZyA9IG1lcmdlKGJhc2VXZWJwYWNrQ29uZmlnLCB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgcGF0aDogY29uZmlnLmFzc2V0c1Jvb3QsXG4gICAgICAgICAgICBmaWxlbmFtZTogJ1tuYW1lXS5qcycsXG4gICAgICAgICAgICBwdWJsaWNQYXRoOlxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyBjb25maWcuYnVpbGQuYXNzZXRzUHVibGljUGF0aFxuICAgICAgICAgICAgICAgICAgICA6IGNvbmZpZy5kZXYuYXNzZXRzUHVibGljUGF0aCxcbiAgICAgICAgfSxcbiAgICAgICAgbW9kZTogJ2RldmVsb3BtZW50JyxcbiAgICAgICAgLy8gdXNlIGlubGluZSBzb3VyY2VtYXAgZm9yIGthcm1hLXNvdXJjZW1hcC1sb2FkZXJcbiAgICAgICAgbW9kdWxlOiB7XG4gICAgICAgICAgICBydWxlczogdXRpbHMuc3R5bGVMb2FkZXJzKG1vZHVsZSksXG4gICAgICAgIH0sXG4gICAgICAgIGRldnRvb2w6ICdpbmxpbmUtY2hlYXAtbW9kdWxlLXNvdXJjZS1tYXAnLFxuICAgICAgICByZXNvbHZlTG9hZGVyOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgIC8vIG5lY2Vzc2FyeSB0byB0byBtYWtlIGxhbmc9XCJzY3NzXCIgd29yayBpbiB0ZXN0IHdoZW4gdXNpbmcgdnVlLWxvYWRlcidzID9pbmplY3Qgb3B0aW9uXG4gICAgICAgICAgICAgICAgLy8gc2VlIGRpc2N1c3Npb24gYXQgaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1sb2FkZXIvaXNzdWVzLzcyNFxuICAgICAgICAgICAgICAgICdzY3NzLWxvYWRlcic6ICdzYXNzLWxvYWRlcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXSxcbiAgICB9KVxuXG4gICAgLy8gbm8gbmVlZCBmb3IgYXBwIGVudHJ5IGR1cmluZyB0ZXN0c1xuICAgIGRlbGV0ZSB3ZWJwYWNrQ29uZmlnLmVudHJ5XG5cbiAgICByZXR1cm4gd2VicGFja0NvbmZpZ1xufVxuIl19