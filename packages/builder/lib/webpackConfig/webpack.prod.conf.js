"use strict";

var _core = require("@cranejs/core");

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

module.exports = function (pageConfig) {
  const baseWebpackConfig = (0, _webpackBase.default)(pageConfig);
  const webpackConfig = (0, _webpackMerge.default)(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: _core.config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: _core.config.build.productionSourceMap ? _core.config.build.devtool : false,
    mode: 'production',
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
      cssProcessorOptions: _core.config.build.productionSourceMap ? {
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

  if (_core.config.build.productionGzip) {
    webpackConfig.plugins.push(new _compressionWebpackPlugin.default({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + _core.config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }));
  }

  return webpackConfig;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2sucHJvZC5jb25mLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJwYWdlQ29uZmlnIiwiYmFzZVdlYnBhY2tDb25maWciLCJ3ZWJwYWNrQ29uZmlnIiwicnVsZXMiLCJ1dGlscyIsInN0eWxlTG9hZGVycyIsInNvdXJjZU1hcCIsImNvbmZpZyIsImJ1aWxkIiwicHJvZHVjdGlvblNvdXJjZU1hcCIsImV4dHJhY3QiLCJ1c2VQb3N0Q1NTIiwiZGV2dG9vbCIsIm1vZGUiLCJvcHRpbWl6YXRpb24iLCJtb2R1bGVJZHMiLCJzcGxpdENodW5rcyIsImNhY2hlR3JvdXBzIiwiY29tbW9ucyIsInRlc3QiLCJuYW1lIiwiY2h1bmtzIiwibWluQ2h1bmtzIiwibWluaW1pemUiLCJwbHVnaW5zIiwiT3B0aW1pemVDU1NQbHVnaW4iLCJjc3NQcm9jZXNzb3JPcHRpb25zIiwic2FmZSIsIm1hcCIsImlubGluZSIsIndlYnBhY2siLCJvcHRpbWl6ZSIsIk1vZHVsZUNvbmNhdGVuYXRpb25QbHVnaW4iLCJwcm9kdWN0aW9uR3ppcCIsInB1c2giLCJDb21wcmVzc2lvbldlYnBhY2tQbHVnaW4iLCJhc3NldCIsImFsZ29yaXRobSIsIlJlZ0V4cCIsInByb2R1Y3Rpb25HemlwRXh0ZW5zaW9ucyIsImpvaW4iLCJ0aHJlc2hvbGQiLCJtaW5SYXRpbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVVDLFVBQVYsRUFBc0I7QUFDbkMsUUFBTUMsaUJBQWlCLEdBQUcsMEJBQXFCRCxVQUFyQixDQUExQjtBQUNBLFFBQU1FLGFBQWEsR0FBRywyQkFBTUQsaUJBQU4sRUFBeUI7QUFDM0NILElBQUFBLE1BQU0sRUFBRTtBQUNKSyxNQUFBQSxLQUFLLEVBQUVDLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjtBQUN0QkMsUUFBQUEsU0FBUyxFQUFFQyxhQUFPQyxLQUFQLENBQWFDLG1CQURGO0FBRXRCQyxRQUFBQSxPQUFPLEVBQUUsSUFGYTtBQUd0QkMsUUFBQUEsVUFBVSxFQUFFO0FBSFUsT0FBbkI7QUFESCxLQURtQztBQVEzQ0MsSUFBQUEsT0FBTyxFQUFFTCxhQUFPQyxLQUFQLENBQWFDLG1CQUFiLEdBQ0hGLGFBQU9DLEtBQVAsQ0FBYUksT0FEVixHQUVILEtBVnFDO0FBVzNDQyxJQUFBQSxJQUFJLEVBQUUsWUFYcUM7QUFZM0NDLElBQUFBLFlBQVksRUFBRTtBQUNWQyxNQUFBQSxTQUFTLEVBQUUsZUFERDtBQUVWQyxNQUFBQSxXQUFXLEVBQUU7QUFDVEMsUUFBQUEsV0FBVyxFQUFFO0FBQ1RDLFVBQUFBLE9BQU8sRUFBRTtBQUNMQyxZQUFBQSxJQUFJLEVBQUUsd0JBREQ7QUFFTEMsWUFBQUEsSUFBSSxFQUFFLFNBRkQ7QUFHTEMsWUFBQUEsTUFBTSxFQUFFO0FBSEg7QUFEQSxTQURKO0FBUVRDLFFBQUFBLFNBQVMsRUFBRTtBQVJGLE9BRkg7QUFZVkMsTUFBQUEsUUFBUSxFQUFFO0FBWkEsS0FaNkI7QUEwQjNDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDTDtBQUNBO0FBQ0E7QUFDQSxRQUFJQyx1Q0FBSixDQUFzQjtBQUNsQkMsTUFBQUEsbUJBQW1CLEVBQUVuQixhQUFPQyxLQUFQLENBQWFDLG1CQUFiLEdBQ2Y7QUFBRWtCLFFBQUFBLElBQUksRUFBRSxJQUFSO0FBQWNDLFFBQUFBLEdBQUcsRUFBRTtBQUFFQyxVQUFBQSxNQUFNLEVBQUU7QUFBVjtBQUFuQixPQURlLEdBRWY7QUFBRUYsUUFBQUEsSUFBSSxFQUFFO0FBQVI7QUFIWSxLQUF0QixDQUpLLEVBU0w7QUFDQSxRQUFJRyxpQkFBUUMsUUFBUixDQUFpQkMseUJBQXJCLEVBVks7QUExQmtDLEdBQXpCLENBQXRCOztBQXdDQSxNQUFJekIsYUFBT0MsS0FBUCxDQUFheUIsY0FBakIsRUFBaUM7QUFDN0IvQixJQUFBQSxhQUFhLENBQUNzQixPQUFkLENBQXNCVSxJQUF0QixDQUNJLElBQUlDLGlDQUFKLENBQTZCO0FBQ3pCQyxNQUFBQSxLQUFLLEVBQUUsa0JBRGtCO0FBRXpCQyxNQUFBQSxTQUFTLEVBQUUsTUFGYztBQUd6QmxCLE1BQUFBLElBQUksRUFBRSxJQUFJbUIsTUFBSixDQUNGLFNBQ0kvQixhQUFPQyxLQUFQLENBQWErQix3QkFBYixDQUFzQ0MsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FESixHQUVJLElBSEYsQ0FIbUI7QUFRekJDLE1BQUFBLFNBQVMsRUFBRSxLQVJjO0FBU3pCQyxNQUFBQSxRQUFRLEVBQUU7QUFUZSxLQUE3QixDQURKO0FBYUg7O0FBRUQsU0FBT3hDLGFBQVA7QUFDSCxDQTNERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ0BjcmFuZWpzL2NvcmUnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnd2VicGFjay1tZXJnZSdcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBDb3B5V2VicGFja1BsdWdpbiBmcm9tICdjb3B5LXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IE1pbmlDc3NFeHRyYWN0UGx1Z2luIGZyb20gJ21pbmktY3NzLWV4dHJhY3QtcGx1Z2luJ1xuaW1wb3J0IE9wdGltaXplQ1NTUGx1Z2luIGZyb20gJ29wdGltaXplLWNzcy1hc3NldHMtd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgQ29tcHJlc3Npb25XZWJwYWNrUGx1Z2luIGZyb20gJ2NvbXByZXNzaW9uLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IGdlbkJhc2VXZWJwYWNrQ29uZmlnIGZyb20gJy4vd2VicGFjay5iYXNlLmNvbmYnXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhZ2VDb25maWcpIHtcbiAgICBjb25zdCBiYXNlV2VicGFja0NvbmZpZyA9IGdlbkJhc2VXZWJwYWNrQ29uZmlnKHBhZ2VDb25maWcpXG4gICAgY29uc3Qgd2VicGFja0NvbmZpZyA9IG1lcmdlKGJhc2VXZWJwYWNrQ29uZmlnLCB7XG4gICAgICAgIG1vZHVsZToge1xuICAgICAgICAgICAgcnVsZXM6IHV0aWxzLnN0eWxlTG9hZGVycyh7XG4gICAgICAgICAgICAgICAgc291cmNlTWFwOiBjb25maWcuYnVpbGQucHJvZHVjdGlvblNvdXJjZU1hcCxcbiAgICAgICAgICAgICAgICBleHRyYWN0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVBvc3RDU1M6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgZGV2dG9vbDogY29uZmlnLmJ1aWxkLnByb2R1Y3Rpb25Tb3VyY2VNYXBcbiAgICAgICAgICAgID8gY29uZmlnLmJ1aWxkLmRldnRvb2xcbiAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1vZGU6ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgb3B0aW1pemF0aW9uOiB7XG4gICAgICAgICAgICBtb2R1bGVJZHM6ICdkZXRlcm1pbmlzdGljJyxcbiAgICAgICAgICAgIHNwbGl0Q2h1bmtzOiB7XG4gICAgICAgICAgICAgICAgY2FjaGVHcm91cHM6IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdDogL1tcXFxcL11ub2RlX21vZHVsZXNbXFxcXC9dLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICd2ZW5kb3JzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNodW5rczogJ2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtaW5DaHVua3M6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWluaW1pemU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIC8vIGV4dHJhY3QgY3NzIGludG8gaXRzIG93biBmaWxlXG4gICAgICAgICAgICAvLyBDb21wcmVzcyBleHRyYWN0ZWQgQ1NTLiBXZSBhcmUgdXNpbmcgdGhpcyBwbHVnaW4gc28gdGhhdCBwb3NzaWJsZVxuICAgICAgICAgICAgLy8gZHVwbGljYXRlZCBDU1MgZnJvbSBkaWZmZXJlbnQgY29tcG9uZW50cyBjYW4gYmUgZGVkdXBlZC5cbiAgICAgICAgICAgIG5ldyBPcHRpbWl6ZUNTU1BsdWdpbih7XG4gICAgICAgICAgICAgICAgY3NzUHJvY2Vzc29yT3B0aW9uczogY29uZmlnLmJ1aWxkLnByb2R1Y3Rpb25Tb3VyY2VNYXBcbiAgICAgICAgICAgICAgICAgICAgPyB7IHNhZmU6IHRydWUsIG1hcDogeyBpbmxpbmU6IGZhbHNlIH0gfVxuICAgICAgICAgICAgICAgICAgICA6IHsgc2FmZTogdHJ1ZSB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyBlbmFibGUgc2NvcGUgaG9pc3RpbmdcbiAgICAgICAgICAgIG5ldyB3ZWJwYWNrLm9wdGltaXplLk1vZHVsZUNvbmNhdGVuYXRpb25QbHVnaW4oKSxcbiAgICAgICAgXSxcbiAgICB9KVxuXG4gICAgaWYgKGNvbmZpZy5idWlsZC5wcm9kdWN0aW9uR3ppcCkge1xuICAgICAgICB3ZWJwYWNrQ29uZmlnLnBsdWdpbnMucHVzaChcbiAgICAgICAgICAgIG5ldyBDb21wcmVzc2lvbldlYnBhY2tQbHVnaW4oe1xuICAgICAgICAgICAgICAgIGFzc2V0OiAnW3BhdGhdLmd6W3F1ZXJ5XScsXG4gICAgICAgICAgICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgICAgICAgICAgICAgdGVzdDogbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAgICAgJ1xcXFwuKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmJ1aWxkLnByb2R1Y3Rpb25HemlwRXh0ZW5zaW9ucy5qb2luKCd8JykgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJykkJ1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxMDI0MCxcbiAgICAgICAgICAgICAgICBtaW5SYXRpbzogMC44LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiB3ZWJwYWNrQ29uZmlnXG59XG4iXX0=