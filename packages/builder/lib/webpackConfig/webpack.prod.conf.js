"use strict";

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

module.exports = function (pageConfig) {
  const baseWebpackConfig = (0, _webpackBase.default)(pageConfig);
  const webpackConfig = (0, _webpackMerge.default)(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: _shared.config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: _shared.config.build.productionSourceMap ? _shared.config.build.devtool : false,
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

  if (_shared.config.build.productionGzip) {
    webpackConfig.plugins.push(new _compressionWebpackPlugin.default({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + _shared.config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    }));
  }

  return webpackConfig;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2sucHJvZC5jb25mLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJwYWdlQ29uZmlnIiwiYmFzZVdlYnBhY2tDb25maWciLCJ3ZWJwYWNrQ29uZmlnIiwicnVsZXMiLCJ1dGlscyIsInN0eWxlTG9hZGVycyIsInNvdXJjZU1hcCIsImNvbmZpZyIsImJ1aWxkIiwicHJvZHVjdGlvblNvdXJjZU1hcCIsImV4dHJhY3QiLCJ1c2VQb3N0Q1NTIiwiZGV2dG9vbCIsIm1vZGUiLCJvcHRpbWl6YXRpb24iLCJtb2R1bGVJZHMiLCJzcGxpdENodW5rcyIsImNhY2hlR3JvdXBzIiwiY29tbW9ucyIsInRlc3QiLCJuYW1lIiwiY2h1bmtzIiwibWluQ2h1bmtzIiwibWluaW1pemUiLCJwbHVnaW5zIiwiT3B0aW1pemVDU1NQbHVnaW4iLCJjc3NQcm9jZXNzb3JPcHRpb25zIiwic2FmZSIsIm1hcCIsImlubGluZSIsIndlYnBhY2siLCJvcHRpbWl6ZSIsIk1vZHVsZUNvbmNhdGVuYXRpb25QbHVnaW4iLCJwcm9kdWN0aW9uR3ppcCIsInB1c2giLCJDb21wcmVzc2lvbldlYnBhY2tQbHVnaW4iLCJhc3NldCIsImFsZ29yaXRobSIsIlJlZ0V4cCIsInByb2R1Y3Rpb25HemlwRXh0ZW5zaW9ucyIsImpvaW4iLCJ0aHJlc2hvbGQiLCJtaW5SYXRpbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQVVDLFVBQVYsRUFBc0I7QUFDbkMsUUFBTUMsaUJBQWlCLEdBQUcsMEJBQXFCRCxVQUFyQixDQUExQjtBQUNBLFFBQU1FLGFBQWEsR0FBRywyQkFBTUQsaUJBQU4sRUFBeUI7QUFDM0NILElBQUFBLE1BQU0sRUFBRTtBQUNKSyxNQUFBQSxLQUFLLEVBQUVDLEtBQUssQ0FBQ0MsWUFBTixDQUFtQjtBQUN0QkMsUUFBQUEsU0FBUyxFQUFFQyxlQUFPQyxLQUFQLENBQWFDLG1CQURGO0FBRXRCQyxRQUFBQSxPQUFPLEVBQUUsSUFGYTtBQUd0QkMsUUFBQUEsVUFBVSxFQUFFO0FBSFUsT0FBbkI7QUFESCxLQURtQztBQVEzQ0MsSUFBQUEsT0FBTyxFQUFFTCxlQUFPQyxLQUFQLENBQWFDLG1CQUFiLEdBQ0hGLGVBQU9DLEtBQVAsQ0FBYUksT0FEVixHQUVILEtBVnFDO0FBVzNDQyxJQUFBQSxJQUFJLEVBQUUsWUFYcUM7QUFZM0NDLElBQUFBLFlBQVksRUFBRTtBQUNWQyxNQUFBQSxTQUFTLEVBQUUsZUFERDtBQUVWQyxNQUFBQSxXQUFXLEVBQUU7QUFDVEMsUUFBQUEsV0FBVyxFQUFFO0FBQ1RDLFVBQUFBLE9BQU8sRUFBRTtBQUNMQyxZQUFBQSxJQUFJLEVBQUUsd0JBREQ7QUFFTEMsWUFBQUEsSUFBSSxFQUFFLFNBRkQ7QUFHTEMsWUFBQUEsTUFBTSxFQUFFO0FBSEg7QUFEQSxTQURKO0FBUVRDLFFBQUFBLFNBQVMsRUFBRTtBQVJGLE9BRkg7QUFZVkMsTUFBQUEsUUFBUSxFQUFFO0FBWkEsS0FaNkI7QUEwQjNDQyxJQUFBQSxPQUFPLEVBQUUsQ0FDTDtBQUNBO0FBQ0E7QUFDQSxRQUFJQyx1Q0FBSixDQUFzQjtBQUNsQkMsTUFBQUEsbUJBQW1CLEVBQUVuQixlQUFPQyxLQUFQLENBQWFDLG1CQUFiLEdBQ2Y7QUFBRWtCLFFBQUFBLElBQUksRUFBRSxJQUFSO0FBQWNDLFFBQUFBLEdBQUcsRUFBRTtBQUFFQyxVQUFBQSxNQUFNLEVBQUU7QUFBVjtBQUFuQixPQURlLEdBRWY7QUFBRUYsUUFBQUEsSUFBSSxFQUFFO0FBQVI7QUFIWSxLQUF0QixDQUpLLEVBU0w7QUFDQSxRQUFJRyxpQkFBUUMsUUFBUixDQUFpQkMseUJBQXJCLEVBVks7QUExQmtDLEdBQXpCLENBQXRCOztBQXdDQSxNQUFJekIsZUFBT0MsS0FBUCxDQUFheUIsY0FBakIsRUFBaUM7QUFDN0IvQixJQUFBQSxhQUFhLENBQUNzQixPQUFkLENBQXNCVSxJQUF0QixDQUNJLElBQUlDLGlDQUFKLENBQTZCO0FBQ3pCQyxNQUFBQSxLQUFLLEVBQUUsa0JBRGtCO0FBRXpCQyxNQUFBQSxTQUFTLEVBQUUsTUFGYztBQUd6QmxCLE1BQUFBLElBQUksRUFBRSxJQUFJbUIsTUFBSixDQUNGLFNBQ0kvQixlQUFPQyxLQUFQLENBQWErQix3QkFBYixDQUFzQ0MsSUFBdEMsQ0FBMkMsR0FBM0MsQ0FESixHQUVJLElBSEYsQ0FIbUI7QUFRekJDLE1BQUFBLFNBQVMsRUFBRSxLQVJjO0FBU3pCQyxNQUFBQSxRQUFRLEVBQUU7QUFUZSxLQUE3QixDQURKO0FBYUg7O0FBRUQsU0FBT3hDLGFBQVA7QUFDSCxDQTNERCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ0BjcmFuZWpzL3NoYXJlZCdcbmltcG9ydCBtZXJnZSBmcm9tICd3ZWJwYWNrLW1lcmdlJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IENvcHlXZWJwYWNrUGx1Z2luIGZyb20gJ2NvcHktd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgTWluaUNzc0V4dHJhY3RQbHVnaW4gZnJvbSAnbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4nXG5pbXBvcnQgT3B0aW1pemVDU1NQbHVnaW4gZnJvbSAnb3B0aW1pemUtY3NzLWFzc2V0cy13ZWJwYWNrLXBsdWdpbidcbmltcG9ydCBDb21wcmVzc2lvbldlYnBhY2tQbHVnaW4gZnJvbSAnY29tcHJlc3Npb24td2VicGFjay1wbHVnaW4nXG5pbXBvcnQgZ2VuQmFzZVdlYnBhY2tDb25maWcgZnJvbSAnLi93ZWJwYWNrLmJhc2UuY29uZidcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFnZUNvbmZpZykge1xuICAgIGNvbnN0IGJhc2VXZWJwYWNrQ29uZmlnID0gZ2VuQmFzZVdlYnBhY2tDb25maWcocGFnZUNvbmZpZylcbiAgICBjb25zdCB3ZWJwYWNrQ29uZmlnID0gbWVyZ2UoYmFzZVdlYnBhY2tDb25maWcsIHtcbiAgICAgICAgbW9kdWxlOiB7XG4gICAgICAgICAgICBydWxlczogdXRpbHMuc3R5bGVMb2FkZXJzKHtcbiAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IGNvbmZpZy5idWlsZC5wcm9kdWN0aW9uU291cmNlTWFwLFxuICAgICAgICAgICAgICAgIGV4dHJhY3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlUG9zdENTUzogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBkZXZ0b29sOiBjb25maWcuYnVpbGQucHJvZHVjdGlvblNvdXJjZU1hcFxuICAgICAgICAgICAgPyBjb25maWcuYnVpbGQuZGV2dG9vbFxuICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgbW9kZTogJ3Byb2R1Y3Rpb24nLFxuICAgICAgICBvcHRpbWl6YXRpb246IHtcbiAgICAgICAgICAgIG1vZHVsZUlkczogJ2RldGVybWluaXN0aWMnLFxuICAgICAgICAgICAgc3BsaXRDaHVua3M6IHtcbiAgICAgICAgICAgICAgICBjYWNoZUdyb3Vwczoge1xuICAgICAgICAgICAgICAgICAgICBjb21tb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvW1xcXFwvXW5vZGVfbW9kdWxlc1tcXFxcL10vLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3ZlbmRvcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtzOiAnYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1pbkNodW5rczogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaW5pbWl6ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgLy8gZXh0cmFjdCBjc3MgaW50byBpdHMgb3duIGZpbGVcbiAgICAgICAgICAgIC8vIENvbXByZXNzIGV4dHJhY3RlZCBDU1MuIFdlIGFyZSB1c2luZyB0aGlzIHBsdWdpbiBzbyB0aGF0IHBvc3NpYmxlXG4gICAgICAgICAgICAvLyBkdXBsaWNhdGVkIENTUyBmcm9tIGRpZmZlcmVudCBjb21wb25lbnRzIGNhbiBiZSBkZWR1cGVkLlxuICAgICAgICAgICAgbmV3IE9wdGltaXplQ1NTUGx1Z2luKHtcbiAgICAgICAgICAgICAgICBjc3NQcm9jZXNzb3JPcHRpb25zOiBjb25maWcuYnVpbGQucHJvZHVjdGlvblNvdXJjZU1hcFxuICAgICAgICAgICAgICAgICAgICA/IHsgc2FmZTogdHJ1ZSwgbWFwOiB7IGlubGluZTogZmFsc2UgfSB9XG4gICAgICAgICAgICAgICAgICAgIDogeyBzYWZlOiB0cnVlIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIC8vIGVuYWJsZSBzY29wZSBob2lzdGluZ1xuICAgICAgICAgICAgbmV3IHdlYnBhY2sub3B0aW1pemUuTW9kdWxlQ29uY2F0ZW5hdGlvblBsdWdpbigpLFxuICAgICAgICBdLFxuICAgIH0pXG5cbiAgICBpZiAoY29uZmlnLmJ1aWxkLnByb2R1Y3Rpb25HemlwKSB7XG4gICAgICAgIHdlYnBhY2tDb25maWcucGx1Z2lucy5wdXNoKFxuICAgICAgICAgICAgbmV3IENvbXByZXNzaW9uV2VicGFja1BsdWdpbih7XG4gICAgICAgICAgICAgICAgYXNzZXQ6ICdbcGF0aF0uZ3pbcXVlcnldJyxcbiAgICAgICAgICAgICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgICAgICAgICAgICB0ZXN0OiBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICAgICAgICAnXFxcXC4oJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuYnVpbGQucHJvZHVjdGlvbkd6aXBFeHRlbnNpb25zLmpvaW4oJ3wnKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKSQnXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxuICAgICAgICAgICAgICAgIG1pblJhdGlvOiAwLjgsXG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIHdlYnBhY2tDb25maWdcbn1cbiJdfQ==