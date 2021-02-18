"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _shared = require("@cranejs/shared");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _friendlyErrorsWebpackPlugin = _interopRequireDefault(require("friendly-errors-webpack-plugin"));

var _webpackBase = _interopRequireDefault(require("./webpack.base.conf"));

var utils = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pageConfig, moduleName, clientEnv, buildType) {
  const baseConfig = (0, _webpackBase.default)(pageConfig, moduleName, clientEnv, buildType);
  baseConfig.merge({
    mode: 'development',
    module: {
      rule: utils.styleLoaders({
        sourceMap: _shared.config.dev.cssSourceMap,
        extract: false,
        usePostCSS: true
      })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: _shared.config.dev.devtool,
    devServer: (0, _deepmerge.default)({
      clientLogLevel: 'warning',
      hot: true,
      contentBase: false,
      // since we use CopyWebpackPlugin.
      compress: true,
      quiet: true // necessary for FriendlyErrorsPlugin

    }, _shared.config.devServer),
    plugin: {
      HotModuleReplacementPlugin: {
        plugin: _webpack.default.HotModuleReplacementPlugin
      }
    }
  });
  return baseConfig;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suZGV2LmNvbmYuanMiXSwibmFtZXMiOlsicGFnZUNvbmZpZyIsIm1vZHVsZU5hbWUiLCJjbGllbnRFbnYiLCJidWlsZFR5cGUiLCJiYXNlQ29uZmlnIiwibWVyZ2UiLCJtb2RlIiwibW9kdWxlIiwicnVsZSIsInV0aWxzIiwic3R5bGVMb2FkZXJzIiwic291cmNlTWFwIiwiY29uZmlnIiwiZGV2IiwiY3NzU291cmNlTWFwIiwiZXh0cmFjdCIsInVzZVBvc3RDU1MiLCJkZXZ0b29sIiwiZGV2U2VydmVyIiwiY2xpZW50TG9nTGV2ZWwiLCJob3QiLCJjb250ZW50QmFzZSIsImNvbXByZXNzIiwicXVpZXQiLCJwbHVnaW4iLCJIb3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbiIsIndlYnBhY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFHZSxrQkFDWEEsVUFEVyxFQUVYQyxVQUZXLEVBR1hDLFNBSFcsRUFJWEMsU0FKVyxFQUtiO0FBQ0UsUUFBTUMsVUFBVSxHQUFHLDBCQUNmSixVQURlLEVBRWZDLFVBRmUsRUFHZkMsU0FIZSxFQUlmQyxTQUplLENBQW5CO0FBT0FDLEVBQUFBLFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQjtBQUNiQyxJQUFBQSxJQUFJLEVBQUUsYUFETztBQUViQyxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsSUFBSSxFQUFFQyxLQUFLLENBQUNDLFlBQU4sQ0FBbUI7QUFDckJDLFFBQUFBLFNBQVMsRUFBRUMsZUFBT0MsR0FBUCxDQUFXQyxZQUREO0FBRXJCQyxRQUFBQSxPQUFPLEVBQUUsS0FGWTtBQUdyQkMsUUFBQUEsVUFBVSxFQUFFO0FBSFMsT0FBbkI7QUFERixLQUZLO0FBU2I7QUFDQUMsSUFBQUEsT0FBTyxFQUFFTCxlQUFPQyxHQUFQLENBQVdJLE9BVlA7QUFZYkMsSUFBQUEsU0FBUyxFQUFFLHdCQUFVO0FBQ2pCQyxNQUFBQSxjQUFjLEVBQUUsU0FEQztBQUVqQkMsTUFBQUEsR0FBRyxFQUFFLElBRlk7QUFHakJDLE1BQUFBLFdBQVcsRUFBRSxLQUhJO0FBR0c7QUFDcEJDLE1BQUFBLFFBQVEsRUFBRSxJQUpPO0FBS2pCQyxNQUFBQSxLQUFLLEVBQUUsSUFMVSxDQUtKOztBQUxJLEtBQVYsRUFNUlgsZUFBT00sU0FOQyxDQVpFO0FBbUJiTSxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsMEJBQTBCLEVBQUU7QUFDeEJELFFBQUFBLE1BQU0sRUFBRUUsaUJBQVFEO0FBRFE7QUFEeEI7QUFuQkssR0FBakI7QUEwQkEsU0FBT3JCLFVBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZywgbG9nZ2VyIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuaW1wb3J0IG1lcmdlIGZyb20gJ3dlYnBhY2stbWVyZ2UnXG5pbXBvcnQgZGVlcE1lcmdlIGZyb20gJ2RlZXBtZXJnZSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IEZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpbiBmcm9tICdmcmllbmRseS1lcnJvcnMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgZ2VuQmFzZVdlYnBhY2tDb25maWcgZnJvbSAnLi93ZWJwYWNrLmJhc2UuY29uZidcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKFxuICAgIHBhZ2VDb25maWcsXG4gICAgbW9kdWxlTmFtZSxcbiAgICBjbGllbnRFbnYsXG4gICAgYnVpbGRUeXBlXG4pIHtcbiAgICBjb25zdCBiYXNlQ29uZmlnID0gZ2VuQmFzZVdlYnBhY2tDb25maWcoXG4gICAgICAgIHBhZ2VDb25maWcsXG4gICAgICAgIG1vZHVsZU5hbWUsXG4gICAgICAgIGNsaWVudEVudixcbiAgICAgICAgYnVpbGRUeXBlXG4gICAgKVxuXG4gICAgYmFzZUNvbmZpZy5tZXJnZSh7XG4gICAgICAgIG1vZGU6ICdkZXZlbG9wbWVudCcsXG4gICAgICAgIG1vZHVsZToge1xuICAgICAgICAgICAgcnVsZTogdXRpbHMuc3R5bGVMb2FkZXJzKHtcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IGNvbmZpZy5kZXYuY3NzU291cmNlTWFwLFxuICAgICAgICAgICAgICAgIGV4dHJhY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVzZVBvc3RDU1M6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gY2hlYXAtbW9kdWxlLWV2YWwtc291cmNlLW1hcCBpcyBmYXN0ZXIgZm9yIGRldmVsb3BtZW50XG4gICAgICAgIGRldnRvb2w6IGNvbmZpZy5kZXYuZGV2dG9vbCxcblxuICAgICAgICBkZXZTZXJ2ZXI6IGRlZXBNZXJnZSh7XG4gICAgICAgICAgICBjbGllbnRMb2dMZXZlbDogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgaG90OiB0cnVlLFxuICAgICAgICAgICAgY29udGVudEJhc2U6IGZhbHNlLCAvLyBzaW5jZSB3ZSB1c2UgQ29weVdlYnBhY2tQbHVnaW4uXG4gICAgICAgICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgICAgICAgIHF1aWV0OiB0cnVlLCAvLyBuZWNlc3NhcnkgZm9yIEZyaWVuZGx5RXJyb3JzUGx1Z2luXG4gICAgICAgIH0sIGNvbmZpZy5kZXZTZXJ2ZXIpLFxuICAgICAgICBwbHVnaW46IHtcbiAgICAgICAgICAgIEhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luOiB7XG4gICAgICAgICAgICAgICAgcGx1Z2luOiB3ZWJwYWNrLkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gYmFzZUNvbmZpZ1xufVxuIl19