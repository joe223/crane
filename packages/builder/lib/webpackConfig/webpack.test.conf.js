"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _shared = require("@cranejs/shared");

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var utils = _interopRequireWildcard(require("./utils"));

var _webpack = _interopRequireDefault(require("webpack"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _optimizeCssAssetsWebpackPlugin = _interopRequireDefault(require("optimize-css-assets-webpack-plugin"));

var _compressionWebpackPlugin = _interopRequireDefault(require("compression-webpack-plugin"));

var _webpackBase = _interopRequireDefault(require("./webpack.base.conf"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(pageConfig) {
  const baseConfig = (0, _webpackBase.default)(pageConfig);
  baseConfig.merge({
    mode: 'development',
    module: {
      rule: utils.styleLoaders({
        sourceMap: _shared.config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: 'inline-cheap-module-source-map'
  });
  return baseConfig;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2sudGVzdC5jb25mLmpzIl0sIm5hbWVzIjpbInBhZ2VDb25maWciLCJiYXNlQ29uZmlnIiwibWVyZ2UiLCJtb2RlIiwibW9kdWxlIiwicnVsZSIsInV0aWxzIiwic3R5bGVMb2FkZXJzIiwic291cmNlTWFwIiwiY29uZmlnIiwiYnVpbGQiLCJwcm9kdWN0aW9uU291cmNlTWFwIiwiZXh0cmFjdCIsInVzZVBvc3RDU1MiLCJkZXZ0b29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRWUsa0JBQVVBLFVBQVYsRUFBc0I7QUFDakMsUUFBTUMsVUFBVSxHQUFHLDBCQUFxQkQsVUFBckIsQ0FBbkI7QUFFQUMsRUFBQUEsVUFBVSxDQUFDQyxLQUFYLENBQWlCO0FBQ2JDLElBQUFBLElBQUksRUFBRSxhQURPO0FBRWJDLElBQUFBLE1BQU0sRUFBRTtBQUNKQyxNQUFBQSxJQUFJLEVBQUVDLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjtBQUNyQkMsUUFBQUEsU0FBUyxFQUFFQyxlQUFPQyxLQUFQLENBQWFDLG1CQURIO0FBRXJCQyxRQUFBQSxPQUFPLEVBQUUsSUFGWTtBQUdyQkMsUUFBQUEsVUFBVSxFQUFFO0FBSFMsT0FBbkI7QUFERixLQUZLO0FBU2JDLElBQUFBLE9BQU8sRUFBRTtBQVRJLEdBQWpCO0FBWUEsU0FBT2IsVUFBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuaW1wb3J0IG1lcmdlIGZyb20gJ3dlYnBhY2stbWVyZ2UnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscydcbmltcG9ydCB3ZWJwYWNrIGZyb20gJ3dlYnBhY2snXG5pbXBvcnQgQ29weVdlYnBhY2tQbHVnaW4gZnJvbSAnY29weS13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBNaW5pQ3NzRXh0cmFjdFBsdWdpbiBmcm9tICdtaW5pLWNzcy1leHRyYWN0LXBsdWdpbidcbmltcG9ydCBPcHRpbWl6ZUNTU1BsdWdpbiBmcm9tICdvcHRpbWl6ZS1jc3MtYXNzZXRzLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IENvbXByZXNzaW9uV2VicGFja1BsdWdpbiBmcm9tICdjb21wcmVzc2lvbi13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBnZW5CYXNlV2VicGFja0NvbmZpZyBmcm9tICcuL3dlYnBhY2suYmFzZS5jb25mJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocGFnZUNvbmZpZykge1xuICAgIGNvbnN0IGJhc2VDb25maWcgPSBnZW5CYXNlV2VicGFja0NvbmZpZyhwYWdlQ29uZmlnKVxuXG4gICAgYmFzZUNvbmZpZy5tZXJnZSh7XG4gICAgICAgIG1vZGU6ICdkZXZlbG9wbWVudCcsXG4gICAgICAgIG1vZHVsZToge1xuICAgICAgICAgICAgcnVsZTogdXRpbHMuc3R5bGVMb2FkZXJzKHtcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IGNvbmZpZy5idWlsZC5wcm9kdWN0aW9uU291cmNlTWFwLFxuICAgICAgICAgICAgICAgIGV4dHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlUG9zdENTUzogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBkZXZ0b29sOiAnaW5saW5lLWNoZWFwLW1vZHVsZS1zb3VyY2UtbWFwJyxcbiAgICB9KVxuXG4gICAgcmV0dXJuIGJhc2VDb25maWdcbn1cbiJdfQ==