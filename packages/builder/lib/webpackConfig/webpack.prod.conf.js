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

function _default(pageConfig, moduleName, clientEnv, buildType) {
  const baseConfig = (0, _webpackBase.default)(pageConfig, moduleName, clientEnv, buildType);
  baseConfig.merge({
    mode: 'production',
    module: {
      rule: utils.styleLoaders({
        sourceMap: _shared.config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: _shared.config.build.productionSourceMap ? _shared.config.build.devtool : false,
    optimization: {
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        },
        minChunks: 2
      },
      minimize: true
    },
    plugins: [// extract css into its own file
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new _optimizeCssAssetsWebpackPlugin.default({
      cssProcessorOptions: _shared.config.build.productionSourceMap ? {
        safe: true,
        map: {
          inline: false
        }
      } : {
        safe: true
      }
    }), // enable scope hoisting
    new _webpack.default.optimize.ModuleConcatenationPlugin()]
  });
  return baseConfig;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2sucHJvZC5jb25mLmpzIl0sIm5hbWVzIjpbInBhZ2VDb25maWciLCJtb2R1bGVOYW1lIiwiY2xpZW50RW52IiwiYnVpbGRUeXBlIiwiYmFzZUNvbmZpZyIsIm1lcmdlIiwibW9kZSIsIm1vZHVsZSIsInJ1bGUiLCJ1dGlscyIsInN0eWxlTG9hZGVycyIsInNvdXJjZU1hcCIsImNvbmZpZyIsImJ1aWxkIiwicHJvZHVjdGlvblNvdXJjZU1hcCIsImV4dHJhY3QiLCJ1c2VQb3N0Q1NTIiwiZGV2dG9vbCIsIm9wdGltaXphdGlvbiIsIm1vZHVsZUlkcyIsInNwbGl0Q2h1bmtzIiwiY2FjaGVHcm91cHMiLCJjb21tb25zIiwidGVzdCIsIm5hbWUiLCJjaHVua3MiLCJtaW5DaHVua3MiLCJtaW5pbWl6ZSIsInBsdWdpbnMiLCJPcHRpbWl6ZUNTU1BsdWdpbiIsImNzc1Byb2Nlc3Nvck9wdGlvbnMiLCJzYWZlIiwibWFwIiwiaW5saW5lIiwid2VicGFjayIsIm9wdGltaXplIiwiTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVlLGtCQUNYQSxVQURXLEVBRVhDLFVBRlcsRUFHWEMsU0FIVyxFQUlYQyxTQUpXLEVBS2I7QUFDRSxRQUFNQyxVQUFVLEdBQUcsMEJBQ2ZKLFVBRGUsRUFFZkMsVUFGZSxFQUdmQyxTQUhlLEVBSWZDLFNBSmUsQ0FBbkI7QUFNQUMsRUFBQUEsVUFBVSxDQUFDQyxLQUFYLENBQWlCO0FBQ2JDLElBQUFBLElBQUksRUFBRSxZQURPO0FBRWJDLElBQUFBLE1BQU0sRUFBRTtBQUNKQyxNQUFBQSxJQUFJLEVBQUVDLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjtBQUNyQkMsUUFBQUEsU0FBUyxFQUFFQyxlQUFPQyxLQUFQLENBQWFDLG1CQURIO0FBRXJCQyxRQUFBQSxPQUFPLEVBQUUsSUFGWTtBQUdyQkMsUUFBQUEsVUFBVSxFQUFFO0FBSFMsT0FBbkI7QUFERixLQUZLO0FBU2JDLElBQUFBLE9BQU8sRUFBRUwsZUFBT0MsS0FBUCxDQUFhQyxtQkFBYixHQUNIRixlQUFPQyxLQUFQLENBQWFJLE9BRFYsR0FFSCxLQVhPO0FBWWJDLElBQUFBLFlBQVksRUFBRTtBQUNWQyxNQUFBQSxTQUFTLEVBQUUsZUFERDtBQUVWQyxNQUFBQSxXQUFXLEVBQUU7QUFDVEMsUUFBQUEsV0FBVyxFQUFFO0FBQ1RDLFVBQUFBLE9BQU8sRUFBRTtBQUNMQyxZQUFBQSxJQUFJLEVBQUUsd0JBREQ7QUFFTEMsWUFBQUEsSUFBSSxFQUFFLFNBRkQ7QUFHTEMsWUFBQUEsTUFBTSxFQUFFO0FBSEg7QUFEQSxTQURKO0FBUVRDLFFBQUFBLFNBQVMsRUFBRTtBQVJGLE9BRkg7QUFZVkMsTUFBQUEsUUFBUSxFQUFFO0FBWkEsS0FaRDtBQTBCYkMsSUFBQUEsT0FBTyxFQUFFLENBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBSUMsdUNBQUosQ0FBc0I7QUFDbEJDLE1BQUFBLG1CQUFtQixFQUFFbEIsZUFBT0MsS0FBUCxDQUFhQyxtQkFBYixHQUNmO0FBQUVpQixRQUFBQSxJQUFJLEVBQUUsSUFBUjtBQUFjQyxRQUFBQSxHQUFHLEVBQUU7QUFBRUMsVUFBQUEsTUFBTSxFQUFFO0FBQVY7QUFBbkIsT0FEZSxHQUVmO0FBQUVGLFFBQUFBLElBQUksRUFBRTtBQUFSO0FBSFksS0FBdEIsQ0FKSyxFQVNMO0FBQ0EsUUFBSUcsaUJBQVFDLFFBQVIsQ0FBaUJDLHlCQUFyQixFQVZLO0FBMUJJLEdBQWpCO0FBd0NBLFNBQU9oQyxVQUFQO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25maWcgfSBmcm9tICdAY3JhbmVqcy9zaGFyZWQnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnd2VicGFjay1tZXJnZSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBDb3B5V2VicGFja1BsdWdpbiBmcm9tICdjb3B5LXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IE1pbmlDc3NFeHRyYWN0UGx1Z2luIGZyb20gJ21pbmktY3NzLWV4dHJhY3QtcGx1Z2luJ1xuaW1wb3J0IE9wdGltaXplQ1NTUGx1Z2luIGZyb20gJ29wdGltaXplLWNzcy1hc3NldHMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgQ29tcHJlc3Npb25XZWJwYWNrUGx1Z2luIGZyb20gJ2NvbXByZXNzaW9uLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IGdlbkJhc2VXZWJwYWNrQ29uZmlnIGZyb20gJy4vd2VicGFjay5iYXNlLmNvbmYnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChcbiAgICBwYWdlQ29uZmlnLFxuICAgIG1vZHVsZU5hbWUsXG4gICAgY2xpZW50RW52LFxuICAgIGJ1aWxkVHlwZVxuKSB7XG4gICAgY29uc3QgYmFzZUNvbmZpZyA9IGdlbkJhc2VXZWJwYWNrQ29uZmlnKFxuICAgICAgICBwYWdlQ29uZmlnLFxuICAgICAgICBtb2R1bGVOYW1lLFxuICAgICAgICBjbGllbnRFbnYsXG4gICAgICAgIGJ1aWxkVHlwZVxuICAgIClcbiAgICBiYXNlQ29uZmlnLm1lcmdlKHtcbiAgICAgICAgbW9kZTogJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBtb2R1bGU6IHtcbiAgICAgICAgICAgIHJ1bGU6IHV0aWxzLnN0eWxlTG9hZGVycyh7XG4gICAgICAgICAgICAgICAgc291cmNlTWFwOiBjb25maWcuYnVpbGQucHJvZHVjdGlvblNvdXJjZU1hcCxcbiAgICAgICAgICAgICAgICBleHRyYWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVBvc3RDU1M6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgZGV2dG9vbDogY29uZmlnLmJ1aWxkLnByb2R1Y3Rpb25Tb3VyY2VNYXBcbiAgICAgICAgICAgID8gY29uZmlnLmJ1aWxkLmRldnRvb2xcbiAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG9wdGltaXphdGlvbjoge1xuICAgICAgICAgICAgbW9kdWxlSWRzOiAnZGV0ZXJtaW5pc3RpYycsXG4gICAgICAgICAgICBzcGxpdENodW5rczoge1xuICAgICAgICAgICAgICAgIGNhY2hlR3JvdXBzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAndmVuZG9ycycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHVua3M6ICdhbGwnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWluQ2h1bmtzOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pbmltaXplOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAvLyBleHRyYWN0IGNzcyBpbnRvIGl0cyBvd24gZmlsZVxuICAgICAgICAgICAgLy8gQ29tcHJlc3MgZXh0cmFjdGVkIENTUy4gV2UgYXJlIHVzaW5nIHRoaXMgcGx1Z2luIHNvIHRoYXQgcG9zc2libGVcbiAgICAgICAgICAgIC8vIGR1cGxpY2F0ZWQgQ1NTIGZyb20gZGlmZmVyZW50IGNvbXBvbmVudHMgY2FuIGJlIGRlZHVwZWQuXG4gICAgICAgICAgICBuZXcgT3B0aW1pemVDU1NQbHVnaW4oe1xuICAgICAgICAgICAgICAgIGNzc1Byb2Nlc3Nvck9wdGlvbnM6IGNvbmZpZy5idWlsZC5wcm9kdWN0aW9uU291cmNlTWFwXG4gICAgICAgICAgICAgICAgICAgID8geyBzYWZlOiB0cnVlLCBtYXA6IHsgaW5saW5lOiBmYWxzZSB9IH1cbiAgICAgICAgICAgICAgICAgICAgOiB7IHNhZmU6IHRydWUgfSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgLy8gZW5hYmxlIHNjb3BlIGhvaXN0aW5nXG4gICAgICAgICAgICBuZXcgd2VicGFjay5vcHRpbWl6ZS5Nb2R1bGVDb25jYXRlbmF0aW9uUGx1Z2luKCksXG4gICAgICAgIF0sXG4gICAgfSlcblxuICAgIHJldHVybiBiYXNlQ29uZmlnXG59XG4iXX0=