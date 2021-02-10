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

function _default(pageConfig) {
  const baseConfig = (0, _webpackBase.default)(pageConfig);
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
      },
      FriendlyErrorsWebpackPlugin: {
        plugin: _friendlyErrorsWebpackPlugin.default
      }
    }
  });
  return baseConfig;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suZGV2LmNvbmYuanMiXSwibmFtZXMiOlsicGFnZUNvbmZpZyIsImJhc2VDb25maWciLCJtZXJnZSIsIm1vZGUiLCJtb2R1bGUiLCJydWxlIiwidXRpbHMiLCJzdHlsZUxvYWRlcnMiLCJzb3VyY2VNYXAiLCJjb25maWciLCJkZXYiLCJjc3NTb3VyY2VNYXAiLCJleHRyYWN0IiwidXNlUG9zdENTUyIsImRldnRvb2wiLCJkZXZTZXJ2ZXIiLCJjbGllbnRMb2dMZXZlbCIsImhvdCIsImNvbnRlbnRCYXNlIiwiY29tcHJlc3MiLCJxdWlldCIsInBsdWdpbiIsIkhvdE1vZHVsZVJlcGxhY2VtZW50UGx1Z2luIiwid2VicGFjayIsIkZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVlLGtCQUFVQSxVQUFWLEVBQXNCO0FBQ2pDLFFBQU1DLFVBQVUsR0FBRywwQkFBcUJELFVBQXJCLENBQW5CO0FBRUFDLEVBQUFBLFVBQVUsQ0FBQ0MsS0FBWCxDQUFpQjtBQUNiQyxJQUFBQSxJQUFJLEVBQUUsYUFETztBQUViQyxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsSUFBSSxFQUFFQyxLQUFLLENBQUNDLFlBQU4sQ0FBbUI7QUFDckJDLFFBQUFBLFNBQVMsRUFBRUMsZUFBT0MsR0FBUCxDQUFXQyxZQUREO0FBRXJCQyxRQUFBQSxPQUFPLEVBQUUsS0FGWTtBQUdyQkMsUUFBQUEsVUFBVSxFQUFFO0FBSFMsT0FBbkI7QUFERixLQUZLO0FBU2I7QUFDQUMsSUFBQUEsT0FBTyxFQUFFTCxlQUFPQyxHQUFQLENBQVdJLE9BVlA7QUFZYkMsSUFBQUEsU0FBUyxFQUFFLHdCQUFVO0FBQ2pCQyxNQUFBQSxjQUFjLEVBQUUsU0FEQztBQUVqQkMsTUFBQUEsR0FBRyxFQUFFLElBRlk7QUFHakJDLE1BQUFBLFdBQVcsRUFBRSxLQUhJO0FBR0c7QUFDcEJDLE1BQUFBLFFBQVEsRUFBRSxJQUpPO0FBS2pCQyxNQUFBQSxLQUFLLEVBQUUsSUFMVSxDQUtKOztBQUxJLEtBQVYsRUFNUlgsZUFBT00sU0FOQyxDQVpFO0FBbUJiTSxJQUFBQSxNQUFNLEVBQUU7QUFDSkMsTUFBQUEsMEJBQTBCLEVBQUU7QUFDeEJELFFBQUFBLE1BQU0sRUFBRUUsaUJBQVFEO0FBRFEsT0FEeEI7QUFJSkUsTUFBQUEsMkJBQTJCLEVBQUU7QUFDekJILFFBQUFBLE1BQU0sRUFBRUc7QUFEaUI7QUFKekI7QUFuQkssR0FBakI7QUE2QkEsU0FBT3ZCLFVBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZywgbG9nZ2VyIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuaW1wb3J0IG1lcmdlIGZyb20gJ3dlYnBhY2stbWVyZ2UnXG5pbXBvcnQgZGVlcE1lcmdlIGZyb20gJ2RlZXBtZXJnZSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IEZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpbiBmcm9tICdmcmllbmRseS1lcnJvcnMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgZ2VuQmFzZVdlYnBhY2tDb25maWcgZnJvbSAnLi93ZWJwYWNrLmJhc2UuY29uZidcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwYWdlQ29uZmlnKSB7XG4gICAgY29uc3QgYmFzZUNvbmZpZyA9IGdlbkJhc2VXZWJwYWNrQ29uZmlnKHBhZ2VDb25maWcpXG5cbiAgICBiYXNlQ29uZmlnLm1lcmdlKHtcbiAgICAgICAgbW9kZTogJ2RldmVsb3BtZW50JyxcbiAgICAgICAgbW9kdWxlOiB7XG4gICAgICAgICAgICBydWxlOiB1dGlscy5zdHlsZUxvYWRlcnMoe1xuICAgICAgICAgICAgICAgIHNvdXJjZU1hcDogY29uZmlnLmRldi5jc3NTb3VyY2VNYXAsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdXNlUG9zdENTUzogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICAvLyBjaGVhcC1tb2R1bGUtZXZhbC1zb3VyY2UtbWFwIGlzIGZhc3RlciBmb3IgZGV2ZWxvcG1lbnRcbiAgICAgICAgZGV2dG9vbDogY29uZmlnLmRldi5kZXZ0b29sLFxuXG4gICAgICAgIGRldlNlcnZlcjogZGVlcE1lcmdlKHtcbiAgICAgICAgICAgIGNsaWVudExvZ0xldmVsOiAnd2FybmluZycsXG4gICAgICAgICAgICBob3Q6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50QmFzZTogZmFsc2UsIC8vIHNpbmNlIHdlIHVzZSBDb3B5V2VicGFja1BsdWdpbi5cbiAgICAgICAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgICAgICAgcXVpZXQ6IHRydWUsIC8vIG5lY2Vzc2FyeSBmb3IgRnJpZW5kbHlFcnJvcnNQbHVnaW5cbiAgICAgICAgfSwgY29uZmlnLmRldlNlcnZlciksXG4gICAgICAgIHBsdWdpbjoge1xuICAgICAgICAgICAgSG90TW9kdWxlUmVwbGFjZW1lbnRQbHVnaW46IHtcbiAgICAgICAgICAgICAgICBwbHVnaW46IHdlYnBhY2suSG90TW9kdWxlUmVwbGFjZW1lbnRQbHVnaW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBGcmllbmRseUVycm9yc1dlYnBhY2tQbHVnaW46IHtcbiAgICAgICAgICAgICAgICBwbHVnaW46IEZyaWVuZGx5RXJyb3JzV2VicGFja1BsdWdpblxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIGJhc2VDb25maWdcbn1cbiJdfQ==