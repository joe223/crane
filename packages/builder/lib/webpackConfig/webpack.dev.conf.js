"use strict";

var _core = require("@cranejs/core");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var utils = _interopRequireWildcard(require("./utils"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackBase = _interopRequireDefault(require("./webpack.base.conf"));

var _friendlyErrorsWebpackPlugin = _interopRequireDefault(require("friendly-errors-webpack-plugin"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = function (pageConfig) {
  const baseWebpackConfig = (0, _webpackBase.default)(pageConfig);
  const devWebpackConfig = (0, _webpackMerge.default)(baseWebpackConfig, {
    mode: 'development',
    module: {
      rules: utils.styleLoaders({
        sourceMap: _core.config.dev.cssSourceMap,
        extract: false,
        usePostCSS: true
      })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: _core.config.dev.devtool,
    devServer: {
      clientLogLevel: 'warning',
      hot: true,
      contentBase: false,
      // since we use CopyWebpackPlugin.
      compress: true,
      host: _core.config.dev.host,
      port: PORT || _core.config.dev.port,
      // disableHostCheck: true,
      open: _core.config.dev.autoOpenBrowser,
      overlay: _core.config.dev.errorOverlay ? {
        warnings: false,
        errors: true
      } : false,
      proxy: _core.config.dev.proxyTable,
      quiet: true,
      // necessary for FriendlyErrorsPlugin
      watchOptions: {
        poll: _core.config.dev.poll
      },
      https: !!_core.config.dev.https
    },
    plugins: [new _webpack.default.HotModuleReplacementPlugin(), new _friendlyErrorsWebpackPlugin.default()]
  });
  return devWebpackConfig;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suZGV2LmNvbmYuanMiXSwibmFtZXMiOlsiUE9SVCIsInByb2Nlc3MiLCJlbnYiLCJOdW1iZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwicGFnZUNvbmZpZyIsImJhc2VXZWJwYWNrQ29uZmlnIiwiZGV2V2VicGFja0NvbmZpZyIsIm1vZGUiLCJydWxlcyIsInV0aWxzIiwic3R5bGVMb2FkZXJzIiwic291cmNlTWFwIiwiY29uZmlnIiwiZGV2IiwiY3NzU291cmNlTWFwIiwiZXh0cmFjdCIsInVzZVBvc3RDU1MiLCJkZXZ0b29sIiwiZGV2U2VydmVyIiwiY2xpZW50TG9nTGV2ZWwiLCJob3QiLCJjb250ZW50QmFzZSIsImNvbXByZXNzIiwiaG9zdCIsInBvcnQiLCJvcGVuIiwiYXV0b09wZW5Ccm93c2VyIiwib3ZlcmxheSIsImVycm9yT3ZlcmxheSIsIndhcm5pbmdzIiwiZXJyb3JzIiwicHJveHkiLCJwcm94eVRhYmxlIiwicXVpZXQiLCJ3YXRjaE9wdGlvbnMiLCJwb2xsIiwiaHR0cHMiLCJwbHVnaW5zIiwid2VicGFjayIsIkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luIiwiRnJpZW5kbHlFcnJvcnNXZWJwYWNrUGx1Z2luIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWixJQUFvQkcsTUFBTSxDQUFDRixPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBYixDQUF2Qzs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVVDLFVBQVYsRUFBc0I7QUFDbkMsUUFBTUMsaUJBQWlCLEdBQUcsMEJBQXFCRCxVQUFyQixDQUExQjtBQUNBLFFBQU1FLGdCQUFnQixHQUFHLDJCQUFNRCxpQkFBTixFQUF5QjtBQUM5Q0UsSUFBQUEsSUFBSSxFQUFFLGFBRHdDO0FBRTlDTCxJQUFBQSxNQUFNLEVBQUU7QUFDSk0sTUFBQUEsS0FBSyxFQUFFQyxLQUFLLENBQUNDLFlBQU4sQ0FBbUI7QUFDdEJDLFFBQUFBLFNBQVMsRUFBRUMsYUFBT0MsR0FBUCxDQUFXQyxZQURBO0FBRXRCQyxRQUFBQSxPQUFPLEVBQUUsS0FGYTtBQUd0QkMsUUFBQUEsVUFBVSxFQUFFO0FBSFUsT0FBbkI7QUFESCxLQUZzQztBQVM5QztBQUNBQyxJQUFBQSxPQUFPLEVBQUVMLGFBQU9DLEdBQVAsQ0FBV0ksT0FWMEI7QUFZOUNDLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxjQUFjLEVBQUUsU0FEVDtBQUVQQyxNQUFBQSxHQUFHLEVBQUUsSUFGRTtBQUdQQyxNQUFBQSxXQUFXLEVBQUUsS0FITjtBQUdhO0FBQ3BCQyxNQUFBQSxRQUFRLEVBQUUsSUFKSDtBQUtQQyxNQUFBQSxJQUFJLEVBQUVYLGFBQU9DLEdBQVAsQ0FBV1UsSUFMVjtBQU1QQyxNQUFBQSxJQUFJLEVBQUUxQixJQUFJLElBQUljLGFBQU9DLEdBQVAsQ0FBV1csSUFObEI7QUFPUDtBQUNBQyxNQUFBQSxJQUFJLEVBQUViLGFBQU9DLEdBQVAsQ0FBV2EsZUFSVjtBQVNQQyxNQUFBQSxPQUFPLEVBQUVmLGFBQU9DLEdBQVAsQ0FBV2UsWUFBWCxHQUNIO0FBQUVDLFFBQUFBLFFBQVEsRUFBRSxLQUFaO0FBQW1CQyxRQUFBQSxNQUFNLEVBQUU7QUFBM0IsT0FERyxHQUVILEtBWEM7QUFZUEMsTUFBQUEsS0FBSyxFQUFFbkIsYUFBT0MsR0FBUCxDQUFXbUIsVUFaWDtBQWFQQyxNQUFBQSxLQUFLLEVBQUUsSUFiQTtBQWFNO0FBQ2JDLE1BQUFBLFlBQVksRUFBRTtBQUNWQyxRQUFBQSxJQUFJLEVBQUV2QixhQUFPQyxHQUFQLENBQVdzQjtBQURQLE9BZFA7QUFpQlBDLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUN4QixhQUFPQyxHQUFQLENBQVd1QjtBQWpCYixLQVptQztBQStCOUNDLElBQUFBLE9BQU8sRUFBRSxDQUNMLElBQUlDLGlCQUFRQywwQkFBWixFQURLLEVBRUwsSUFBSUMsb0NBQUosRUFGSztBQS9CcUMsR0FBekIsQ0FBekI7QUFxQ0EsU0FBT2xDLGdCQUFQO0FBQ0gsQ0F4Q0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25maWcgfSBmcm9tICdAY3JhbmVqcy9jb3JlJ1xuaW1wb3J0IG1lcmdlIGZyb20gJ3dlYnBhY2stbWVyZ2UnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscydcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5pbXBvcnQgZ2VuQmFzZVdlYnBhY2tDb25maWcgZnJvbSAnLi93ZWJwYWNrLmJhc2UuY29uZidcbmltcG9ydCBGcmllbmRseUVycm9yc1dlYnBhY2tQbHVnaW4gZnJvbSAnZnJpZW5kbHktZXJyb3JzLXdlYnBhY2stcGx1Z2luJ1xuXG4vLyBjb25zdCBIT1NUID0gcHJvY2Vzcy5lbnYuSE9TVFxuY29uc3QgUE9SVCA9IHByb2Nlc3MuZW52LlBPUlQgJiYgTnVtYmVyKHByb2Nlc3MuZW52LlBPUlQpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhZ2VDb25maWcpIHtcbiAgICBjb25zdCBiYXNlV2VicGFja0NvbmZpZyA9IGdlbkJhc2VXZWJwYWNrQ29uZmlnKHBhZ2VDb25maWcpXG4gICAgY29uc3QgZGV2V2VicGFja0NvbmZpZyA9IG1lcmdlKGJhc2VXZWJwYWNrQ29uZmlnLCB7XG4gICAgICAgIG1vZGU6ICdkZXZlbG9wbWVudCcsXG4gICAgICAgIG1vZHVsZToge1xuICAgICAgICAgICAgcnVsZXM6IHV0aWxzLnN0eWxlTG9hZGVycyh7XG4gICAgICAgICAgICAgICAgc291cmNlTWFwOiBjb25maWcuZGV2LmNzc1NvdXJjZU1hcCxcbiAgICAgICAgICAgICAgICBleHRyYWN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1c2VQb3N0Q1NTOiB0cnVlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGNoZWFwLW1vZHVsZS1ldmFsLXNvdXJjZS1tYXAgaXMgZmFzdGVyIGZvciBkZXZlbG9wbWVudFxuICAgICAgICBkZXZ0b29sOiBjb25maWcuZGV2LmRldnRvb2wsXG5cbiAgICAgICAgZGV2U2VydmVyOiB7XG4gICAgICAgICAgICBjbGllbnRMb2dMZXZlbDogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgaG90OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudEJhc2U6IGZhbHNlLCAvLyBzaW5jZSB3ZSB1c2UgQ29weVdlYnBhY2tQbHVnaW4uXG4gICAgICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgICAgIGhvc3Q6IGNvbmZpZy5kZXYuaG9zdCxcbiAgICAgICAgICAgIHBvcnQ6IFBPUlQgfHwgY29uZmlnLmRldi5wb3J0LFxuICAgICAgICAgICAgLy8gZGlzYWJsZUhvc3RDaGVjazogdHJ1ZSxcbiAgICAgICAgICAgIG9wZW46IGNvbmZpZy5kZXYuYXV0b09wZW5Ccm93c2VyLFxuICAgICAgICAgICAgb3ZlcmxheTogY29uZmlnLmRldi5lcnJvck92ZXJsYXlcbiAgICAgICAgICAgICAgICA/IHsgd2FybmluZ3M6IGZhbHNlLCBlcnJvcnM6IHRydWUgfVxuICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgICAgICBwcm94eTogY29uZmlnLmRldi5wcm94eVRhYmxlLFxuICAgICAgICAgICAgcXVpZXQ6IHRydWUsIC8vIG5lY2Vzc2FyeSBmb3IgRnJpZW5kbHlFcnJvcnNQbHVnaW5cbiAgICAgICAgICAgIHdhdGNoT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHBvbGw6IGNvbmZpZy5kZXYucG9sbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBodHRwczogISFjb25maWcuZGV2Lmh0dHBzLFxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBuZXcgd2VicGFjay5Ib3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbigpLFxuICAgICAgICAgICAgbmV3IEZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpbigpLFxuICAgICAgICBdLFxuICAgIH0pXG5cbiAgICByZXR1cm4gZGV2V2VicGFja0NvbmZpZ1xufVxuIl19