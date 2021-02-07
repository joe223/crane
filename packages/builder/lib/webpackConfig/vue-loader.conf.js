"use strict";

var _path = _interopRequireDefault(require("path"));

var _core = require("@cranejs/core");

var utils = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction ? _core.config.build.productionSourceMap : _core.config.dev.cssSourceMap;
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: _core.config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  compiler: require(_path.default.resolve(cwd, './node_modules/vue-template-compiler'))
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3Z1ZS1sb2FkZXIuY29uZi5qcyJdLCJuYW1lcyI6WyJjd2QiLCJwcm9jZXNzIiwiaXNQcm9kdWN0aW9uIiwiZW52IiwiTk9ERV9FTlYiLCJzb3VyY2VNYXBFbmFibGVkIiwiY29uZmlnIiwiYnVpbGQiLCJwcm9kdWN0aW9uU291cmNlTWFwIiwiZGV2IiwiY3NzU291cmNlTWFwIiwibW9kdWxlIiwiZXhwb3J0cyIsImxvYWRlcnMiLCJ1dGlscyIsImNzc0xvYWRlcnMiLCJzb3VyY2VNYXAiLCJleHRyYWN0IiwiY2FjaGVCdXN0aW5nIiwidHJhbnNmb3JtVG9SZXF1aXJlIiwidmlkZW8iLCJzb3VyY2UiLCJpbWciLCJpbWFnZSIsImNvbXBpbGVyIiwicmVxdWlyZSIsInBhdGgiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDRCxHQUFSLEVBQVo7QUFDQSxNQUFNRSxZQUFZLEdBQUdELE9BQU8sQ0FBQ0UsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTlDO0FBQ0EsTUFBTUMsZ0JBQWdCLEdBQUdILFlBQVksR0FDL0JJLGFBQU9DLEtBQVAsQ0FBYUMsbUJBRGtCLEdBRS9CRixhQUFPRyxHQUFQLENBQVdDLFlBRmpCO0FBSUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiQyxFQUFBQSxPQUFPLEVBQUVDLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUN0QkMsSUFBQUEsU0FBUyxFQUFFWCxnQkFEVztBQUV0QlksSUFBQUEsT0FBTyxFQUFFZjtBQUZhLEdBQWpCLENBREk7QUFLYlEsRUFBQUEsWUFBWSxFQUFFTCxnQkFMRDtBQU1iYSxFQUFBQSxZQUFZLEVBQUVaLGFBQU9HLEdBQVAsQ0FBV1MsWUFOWjtBQU9iQyxFQUFBQSxrQkFBa0IsRUFBRTtBQUNoQkMsSUFBQUEsS0FBSyxFQUFFLENBQUMsS0FBRCxFQUFRLFFBQVIsQ0FEUztBQUVoQkMsSUFBQUEsTUFBTSxFQUFFLEtBRlE7QUFHaEJDLElBQUFBLEdBQUcsRUFBRSxLQUhXO0FBSWhCQyxJQUFBQSxLQUFLLEVBQUU7QUFKUyxHQVBQO0FBYWJDLEVBQUFBLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxjQUFLQyxPQUFMLENBQWEzQixHQUFiLEVBQWtCLHNDQUFsQixDQUFEO0FBYkosQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnQGNyYW5lanMvY29yZSdcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKClcbmNvbnN0IGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcbmNvbnN0IHNvdXJjZU1hcEVuYWJsZWQgPSBpc1Byb2R1Y3Rpb25cbiAgICA/IGNvbmZpZy5idWlsZC5wcm9kdWN0aW9uU291cmNlTWFwXG4gICAgOiBjb25maWcuZGV2LmNzc1NvdXJjZU1hcFxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsb2FkZXJzOiB1dGlscy5jc3NMb2FkZXJzKHtcbiAgICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBFbmFibGVkLFxuICAgICAgICBleHRyYWN0OiBpc1Byb2R1Y3Rpb24sXG4gICAgfSksXG4gICAgY3NzU291cmNlTWFwOiBzb3VyY2VNYXBFbmFibGVkLFxuICAgIGNhY2hlQnVzdGluZzogY29uZmlnLmRldi5jYWNoZUJ1c3RpbmcsXG4gICAgdHJhbnNmb3JtVG9SZXF1aXJlOiB7XG4gICAgICAgIHZpZGVvOiBbJ3NyYycsICdwb3N0ZXInXSxcbiAgICAgICAgc291cmNlOiAnc3JjJyxcbiAgICAgICAgaW1nOiAnc3JjJyxcbiAgICAgICAgaW1hZ2U6ICd4bGluazpocmVmJyxcbiAgICB9LFxuICAgIGNvbXBpbGVyOiByZXF1aXJlKHBhdGgucmVzb2x2ZShjd2QsICcuL25vZGVfbW9kdWxlcy92dWUtdGVtcGxhdGUtY29tcGlsZXInKSlcbn1cbiJdfQ==