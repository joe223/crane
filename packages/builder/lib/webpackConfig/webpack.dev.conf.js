"use strict";

var _shared = require("@cranejs/shared");

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
        sourceMap: _shared.config.dev.cssSourceMap,
        extract: false,
        usePostCSS: true
      })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: _shared.config.dev.devtool,
    devServer: {
      clientLogLevel: 'warning',
      hot: true,
      contentBase: false,
      // since we use CopyWebpackPlugin.
      compress: true,
      host: _shared.config.dev.host,
      port: PORT || _shared.config.dev.port,
      // disableHostCheck: true,
      open: _shared.config.dev.autoOpenBrowser,
      overlay: _shared.config.dev.errorOverlay ? {
        warnings: false,
        errors: true
      } : false,
      proxy: _shared.config.dev.proxyTable,
      quiet: true,
      // necessary for FriendlyErrorsPlugin
      watchOptions: {
        poll: _shared.config.dev.poll
      },
      https: !!_shared.config.dev.https
    },
    plugins: [new _webpack.default.HotModuleReplacementPlugin(), new _friendlyErrorsWebpackPlugin.default()]
  });
  return devWebpackConfig;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suZGV2LmNvbmYuanMiXSwibmFtZXMiOlsiUE9SVCIsInByb2Nlc3MiLCJlbnYiLCJOdW1iZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwicGFnZUNvbmZpZyIsImJhc2VXZWJwYWNrQ29uZmlnIiwiZGV2V2VicGFja0NvbmZpZyIsIm1vZGUiLCJydWxlcyIsInV0aWxzIiwic3R5bGVMb2FkZXJzIiwic291cmNlTWFwIiwiY29uZmlnIiwiZGV2IiwiY3NzU291cmNlTWFwIiwiZXh0cmFjdCIsInVzZVBvc3RDU1MiLCJkZXZ0b29sIiwiZGV2U2VydmVyIiwiY2xpZW50TG9nTGV2ZWwiLCJob3QiLCJjb250ZW50QmFzZSIsImNvbXByZXNzIiwiaG9zdCIsInBvcnQiLCJvcGVuIiwiYXV0b09wZW5Ccm93c2VyIiwib3ZlcmxheSIsImVycm9yT3ZlcmxheSIsIndhcm5pbmdzIiwiZXJyb3JzIiwicHJveHkiLCJwcm94eVRhYmxlIiwicXVpZXQiLCJ3YXRjaE9wdGlvbnMiLCJwb2xsIiwiaHR0cHMiLCJwbHVnaW5zIiwid2VicGFjayIsIkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luIiwiRnJpZW5kbHlFcnJvcnNXZWJwYWNrUGx1Z2luIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWixJQUFvQkcsTUFBTSxDQUFDRixPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBYixDQUF2Qzs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVVDLFVBQVYsRUFBc0I7QUFDbkMsUUFBTUMsaUJBQWlCLEdBQUcsMEJBQXFCRCxVQUFyQixDQUExQjtBQUNBLFFBQU1FLGdCQUFnQixHQUFHLDJCQUFNRCxpQkFBTixFQUF5QjtBQUM5Q0UsSUFBQUEsSUFBSSxFQUFFLGFBRHdDO0FBRTlDTCxJQUFBQSxNQUFNLEVBQUU7QUFDSk0sTUFBQUEsS0FBSyxFQUFFQyxLQUFLLENBQUNDLFlBQU4sQ0FBbUI7QUFDdEJDLFFBQUFBLFNBQVMsRUFBRUMsZUFBT0MsR0FBUCxDQUFXQyxZQURBO0FBRXRCQyxRQUFBQSxPQUFPLEVBQUUsS0FGYTtBQUd0QkMsUUFBQUEsVUFBVSxFQUFFO0FBSFUsT0FBbkI7QUFESCxLQUZzQztBQVM5QztBQUNBQyxJQUFBQSxPQUFPLEVBQUVMLGVBQU9DLEdBQVAsQ0FBV0ksT0FWMEI7QUFZOUNDLElBQUFBLFNBQVMsRUFBRTtBQUNQQyxNQUFBQSxjQUFjLEVBQUUsU0FEVDtBQUVQQyxNQUFBQSxHQUFHLEVBQUUsSUFGRTtBQUdQQyxNQUFBQSxXQUFXLEVBQUUsS0FITjtBQUdhO0FBQ3BCQyxNQUFBQSxRQUFRLEVBQUUsSUFKSDtBQUtQQyxNQUFBQSxJQUFJLEVBQUVYLGVBQU9DLEdBQVAsQ0FBV1UsSUFMVjtBQU1QQyxNQUFBQSxJQUFJLEVBQUUxQixJQUFJLElBQUljLGVBQU9DLEdBQVAsQ0FBV1csSUFObEI7QUFPUDtBQUNBQyxNQUFBQSxJQUFJLEVBQUViLGVBQU9DLEdBQVAsQ0FBV2EsZUFSVjtBQVNQQyxNQUFBQSxPQUFPLEVBQUVmLGVBQU9DLEdBQVAsQ0FBV2UsWUFBWCxHQUNIO0FBQUVDLFFBQUFBLFFBQVEsRUFBRSxLQUFaO0FBQW1CQyxRQUFBQSxNQUFNLEVBQUU7QUFBM0IsT0FERyxHQUVILEtBWEM7QUFZUEMsTUFBQUEsS0FBSyxFQUFFbkIsZUFBT0MsR0FBUCxDQUFXbUIsVUFaWDtBQWFQQyxNQUFBQSxLQUFLLEVBQUUsSUFiQTtBQWFNO0FBQ2JDLE1BQUFBLFlBQVksRUFBRTtBQUNWQyxRQUFBQSxJQUFJLEVBQUV2QixlQUFPQyxHQUFQLENBQVdzQjtBQURQLE9BZFA7QUFpQlBDLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUN4QixlQUFPQyxHQUFQLENBQVd1QjtBQWpCYixLQVptQztBQStCOUNDLElBQUFBLE9BQU8sRUFBRSxDQUNMLElBQUlDLGlCQUFRQywwQkFBWixFQURLLEVBRUwsSUFBSUMsb0NBQUosRUFGSztBQS9CcUMsR0FBekIsQ0FBekI7QUFxQ0EsU0FBT2xDLGdCQUFQO0FBQ0gsQ0F4Q0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25maWcgfSBmcm9tICdAY3JhbmVqcy9zaGFyZWQnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnd2VicGFjay1tZXJnZSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBnZW5CYXNlV2VicGFja0NvbmZpZyBmcm9tICcuL3dlYnBhY2suYmFzZS5jb25mJ1xuaW1wb3J0IEZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpbiBmcm9tICdmcmllbmRseS1lcnJvcnMtd2VicGFjay1wbHVnaW4nXG5cbi8vIGNvbnN0IEhPU1QgPSBwcm9jZXNzLmVudi5IT1NUXG5jb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCAmJiBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVClcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFnZUNvbmZpZykge1xuICAgIGNvbnN0IGJhc2VXZWJwYWNrQ29uZmlnID0gZ2VuQmFzZVdlYnBhY2tDb25maWcocGFnZUNvbmZpZylcbiAgICBjb25zdCBkZXZXZWJwYWNrQ29uZmlnID0gbWVyZ2UoYmFzZVdlYnBhY2tDb25maWcsIHtcbiAgICAgICAgbW9kZTogJ2RldmVsb3BtZW50JyxcbiAgICAgICAgbW9kdWxlOiB7XG4gICAgICAgICAgICBydWxlczogdXRpbHMuc3R5bGVMb2FkZXJzKHtcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IGNvbmZpZy5kZXYuY3NzU291cmNlTWFwLFxuICAgICAgICAgICAgICAgIGV4dHJhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVzZVBvc3RDU1M6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gY2hlYXAtbW9kdWxlLWV2YWwtc291cmNlLW1hcCBpcyBmYXN0ZXIgZm9yIGRldmVsb3BtZW50XG4gICAgICAgIGRldnRvb2w6IGNvbmZpZy5kZXYuZGV2dG9vbCxcblxuICAgICAgICBkZXZTZXJ2ZXI6IHtcbiAgICAgICAgICAgIGNsaWVudExvZ0xldmVsOiAnd2FybmluZycsXG4gICAgICAgICAgICBob3Q6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50QmFzZTogZmFsc2UsIC8vIHNpbmNlIHdlIHVzZSBDb3B5V2VicGFja1BsdWdpbi5cbiAgICAgICAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgICAgICAgaG9zdDogY29uZmlnLmRldi5ob3N0LFxuICAgICAgICAgICAgcG9ydDogUE9SVCB8fCBjb25maWcuZGV2LnBvcnQsXG4gICAgICAgICAgICAvLyBkaXNhYmxlSG9zdENoZWNrOiB0cnVlLFxuICAgICAgICAgICAgb3BlbjogY29uZmlnLmRldi5hdXRvT3BlbkJyb3dzZXIsXG4gICAgICAgICAgICBvdmVybGF5OiBjb25maWcuZGV2LmVycm9yT3ZlcmxheVxuICAgICAgICAgICAgICAgID8geyB3YXJuaW5nczogZmFsc2UsIGVycm9yczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3h5OiBjb25maWcuZGV2LnByb3h5VGFibGUsXG4gICAgICAgICAgICBxdWlldDogdHJ1ZSwgLy8gbmVjZXNzYXJ5IGZvciBGcmllbmRseUVycm9yc1BsdWdpblxuICAgICAgICAgICAgd2F0Y2hPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgcG9sbDogY29uZmlnLmRldi5wb2xsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGh0dHBzOiAhIWNvbmZpZy5kZXYuaHR0cHMsXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIG5ldyB3ZWJwYWNrLkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luKCksXG4gICAgICAgICAgICBuZXcgRnJpZW5kbHlFcnJvcnNXZWJwYWNrUGx1Z2luKCksXG4gICAgICAgIF0sXG4gICAgfSlcblxuICAgIHJldHVybiBkZXZXZWJwYWNrQ29uZmlnXG59XG4iXX0=