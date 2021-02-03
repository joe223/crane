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
    // these devServer options should be customized in /config/index.js
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suZGV2LmNvbmYuanMiXSwibmFtZXMiOlsiUE9SVCIsInByb2Nlc3MiLCJlbnYiLCJOdW1iZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwicGFnZUNvbmZpZyIsImJhc2VXZWJwYWNrQ29uZmlnIiwiZGV2V2VicGFja0NvbmZpZyIsIm1vZGUiLCJydWxlcyIsInV0aWxzIiwic3R5bGVMb2FkZXJzIiwic291cmNlTWFwIiwiY29uZmlnIiwiZGV2IiwiY3NzU291cmNlTWFwIiwiZXh0cmFjdCIsInVzZVBvc3RDU1MiLCJkZXZ0b29sIiwiZGV2U2VydmVyIiwiY2xpZW50TG9nTGV2ZWwiLCJob3QiLCJjb250ZW50QmFzZSIsImNvbXByZXNzIiwiaG9zdCIsInBvcnQiLCJvcGVuIiwiYXV0b09wZW5Ccm93c2VyIiwib3ZlcmxheSIsImVycm9yT3ZlcmxheSIsIndhcm5pbmdzIiwiZXJyb3JzIiwicHJveHkiLCJwcm94eVRhYmxlIiwicXVpZXQiLCJ3YXRjaE9wdGlvbnMiLCJwb2xsIiwiaHR0cHMiLCJwbHVnaW5zIiwid2VicGFjayIsIkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luIiwiRnJpZW5kbHlFcnJvcnNXZWJwYWNrUGx1Z2luIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUdBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWixJQUFvQkcsTUFBTSxDQUFDRixPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBYixDQUF2Qzs7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVVDLFVBQVYsRUFBc0I7QUFDbkMsUUFBTUMsaUJBQWlCLEdBQUcsMEJBQXFCRCxVQUFyQixDQUExQjtBQUNBLFFBQU1FLGdCQUFnQixHQUFHLDJCQUFNRCxpQkFBTixFQUF5QjtBQUM5Q0UsSUFBQUEsSUFBSSxFQUFFLGFBRHdDO0FBRTlDTCxJQUFBQSxNQUFNLEVBQUU7QUFDSk0sTUFBQUEsS0FBSyxFQUFFQyxLQUFLLENBQUNDLFlBQU4sQ0FBbUI7QUFDdEJDLFFBQUFBLFNBQVMsRUFBRUMsYUFBT0MsR0FBUCxDQUFXQyxZQURBO0FBRXRCQyxRQUFBQSxPQUFPLEVBQUUsS0FGYTtBQUd0QkMsUUFBQUEsVUFBVSxFQUFFO0FBSFUsT0FBbkI7QUFESCxLQUZzQztBQVM5QztBQUNBQyxJQUFBQSxPQUFPLEVBQUVMLGFBQU9DLEdBQVAsQ0FBV0ksT0FWMEI7QUFZOUM7QUFDQUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1BDLE1BQUFBLGNBQWMsRUFBRSxTQURUO0FBRVBDLE1BQUFBLEdBQUcsRUFBRSxJQUZFO0FBR1BDLE1BQUFBLFdBQVcsRUFBRSxLQUhOO0FBR2E7QUFDcEJDLE1BQUFBLFFBQVEsRUFBRSxJQUpIO0FBS1BDLE1BQUFBLElBQUksRUFBRVgsYUFBT0MsR0FBUCxDQUFXVSxJQUxWO0FBTVBDLE1BQUFBLElBQUksRUFBRTFCLElBQUksSUFBSWMsYUFBT0MsR0FBUCxDQUFXVyxJQU5sQjtBQU9QO0FBQ0FDLE1BQUFBLElBQUksRUFBRWIsYUFBT0MsR0FBUCxDQUFXYSxlQVJWO0FBU1BDLE1BQUFBLE9BQU8sRUFBRWYsYUFBT0MsR0FBUCxDQUFXZSxZQUFYLEdBQ0g7QUFBRUMsUUFBQUEsUUFBUSxFQUFFLEtBQVo7QUFBbUJDLFFBQUFBLE1BQU0sRUFBRTtBQUEzQixPQURHLEdBRUgsS0FYQztBQVlQQyxNQUFBQSxLQUFLLEVBQUVuQixhQUFPQyxHQUFQLENBQVdtQixVQVpYO0FBYVBDLE1BQUFBLEtBQUssRUFBRSxJQWJBO0FBYU07QUFDYkMsTUFBQUEsWUFBWSxFQUFFO0FBQ1ZDLFFBQUFBLElBQUksRUFBRXZCLGFBQU9DLEdBQVAsQ0FBV3NCO0FBRFAsT0FkUDtBQWlCUEMsTUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQ3hCLGFBQU9DLEdBQVAsQ0FBV3VCO0FBakJiLEtBYm1DO0FBZ0M5Q0MsSUFBQUEsT0FBTyxFQUFFLENBQ0wsSUFBSUMsaUJBQVFDLDBCQUFaLEVBREssRUFFTCxJQUFJQyxvQ0FBSixFQUZLO0FBaENxQyxHQUF6QixDQUF6QjtBQXNDQSxTQUFPbEMsZ0JBQVA7QUFDSCxDQXpDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgY29uZmlnXG59IGZyb20gJ0BjcmFuZWpzL2NvcmUnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnd2VicGFjay1tZXJnZSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBnZW5CYXNlV2VicGFja0NvbmZpZyBmcm9tICcuL3dlYnBhY2suYmFzZS5jb25mJ1xuaW1wb3J0IEZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpbiBmcm9tICdmcmllbmRseS1lcnJvcnMtd2VicGFjay1wbHVnaW4nXG5cbi8vIGNvbnN0IEhPU1QgPSBwcm9jZXNzLmVudi5IT1NUXG5jb25zdCBQT1JUID0gcHJvY2Vzcy5lbnYuUE9SVCAmJiBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVClcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFnZUNvbmZpZykge1xuICAgIGNvbnN0IGJhc2VXZWJwYWNrQ29uZmlnID0gZ2VuQmFzZVdlYnBhY2tDb25maWcocGFnZUNvbmZpZylcbiAgICBjb25zdCBkZXZXZWJwYWNrQ29uZmlnID0gbWVyZ2UoYmFzZVdlYnBhY2tDb25maWcsIHtcbiAgICAgICAgbW9kZTogJ2RldmVsb3BtZW50JyxcbiAgICAgICAgbW9kdWxlOiB7XG4gICAgICAgICAgICBydWxlczogdXRpbHMuc3R5bGVMb2FkZXJzKHtcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IGNvbmZpZy5kZXYuY3NzU291cmNlTWFwLFxuICAgICAgICAgICAgICAgIGV4dHJhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVzZVBvc3RDU1M6IHRydWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGNoZWFwLW1vZHVsZS1ldmFsLXNvdXJjZS1tYXAgaXMgZmFzdGVyIGZvciBkZXZlbG9wbWVudFxuICAgICAgICBkZXZ0b29sOiBjb25maWcuZGV2LmRldnRvb2wsXG5cbiAgICAgICAgLy8gdGhlc2UgZGV2U2VydmVyIG9wdGlvbnMgc2hvdWxkIGJlIGN1c3RvbWl6ZWQgaW4gL2NvbmZpZy9pbmRleC5qc1xuICAgICAgICBkZXZTZXJ2ZXI6IHtcbiAgICAgICAgICAgIGNsaWVudExvZ0xldmVsOiAnd2FybmluZycsXG4gICAgICAgICAgICBob3Q6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50QmFzZTogZmFsc2UsIC8vIHNpbmNlIHdlIHVzZSBDb3B5V2VicGFja1BsdWdpbi5cbiAgICAgICAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgICAgICAgaG9zdDogY29uZmlnLmRldi5ob3N0LFxuICAgICAgICAgICAgcG9ydDogUE9SVCB8fCBjb25maWcuZGV2LnBvcnQsXG4gICAgICAgICAgICAvLyBkaXNhYmxlSG9zdENoZWNrOiB0cnVlLFxuICAgICAgICAgICAgb3BlbjogY29uZmlnLmRldi5hdXRvT3BlbkJyb3dzZXIsXG4gICAgICAgICAgICBvdmVybGF5OiBjb25maWcuZGV2LmVycm9yT3ZlcmxheVxuICAgICAgICAgICAgICAgID8geyB3YXJuaW5nczogZmFsc2UsIGVycm9yczogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3h5OiBjb25maWcuZGV2LnByb3h5VGFibGUsXG4gICAgICAgICAgICBxdWlldDogdHJ1ZSwgLy8gbmVjZXNzYXJ5IGZvciBGcmllbmRseUVycm9yc1BsdWdpblxuICAgICAgICAgICAgd2F0Y2hPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgcG9sbDogY29uZmlnLmRldi5wb2xsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGh0dHBzOiAhIWNvbmZpZy5kZXYuaHR0cHNcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgbmV3IHdlYnBhY2suSG90TW9kdWxlUmVwbGFjZW1lbnRQbHVnaW4oKSxcbiAgICAgICAgICAgIG5ldyBGcmllbmRseUVycm9yc1dlYnBhY2tQbHVnaW4oKVxuICAgICAgICBdXG4gICAgfSlcblxuICAgIHJldHVybiBkZXZXZWJwYWNrQ29uZmlnXG59XG4iXX0=