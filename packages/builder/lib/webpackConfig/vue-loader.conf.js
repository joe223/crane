"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createVueLoaderConfig;

var _path = _interopRequireDefault(require("path"));

var _core = require("@cranejs/core");

var utils = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

function createVueLoaderConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  const sourceMapEnabled = isProduction ? _core.config.build.productionSourceMap : _core.config.dev.cssSourceMap;
  return {
    loaders: utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
    cssSourceMap: sourceMapEnabled,
    transformToRequire: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    },
    compiler: require(_path.default.resolve(cwd, './node_modules/vue-template-compiler'))
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3Z1ZS1sb2FkZXIuY29uZi5qcyJdLCJuYW1lcyI6WyJjd2QiLCJwcm9jZXNzIiwiY3JlYXRlVnVlTG9hZGVyQ29uZmlnIiwiaXNQcm9kdWN0aW9uIiwiZW52IiwiTk9ERV9FTlYiLCJzb3VyY2VNYXBFbmFibGVkIiwiY29uZmlnIiwiYnVpbGQiLCJwcm9kdWN0aW9uU291cmNlTWFwIiwiZGV2IiwiY3NzU291cmNlTWFwIiwibG9hZGVycyIsInV0aWxzIiwiY3NzTG9hZGVycyIsInNvdXJjZU1hcCIsImV4dHJhY3QiLCJ0cmFuc2Zvcm1Ub1JlcXVpcmUiLCJ2aWRlbyIsInNvdXJjZSIsImltZyIsImltYWdlIiwiY29tcGlsZXIiLCJyZXF1aXJlIiwicGF0aCIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixFQUFaOztBQUVlLFNBQVNFLHFCQUFULEdBQWtDO0FBQzdDLFFBQU1DLFlBQVksR0FBR0YsT0FBTyxDQUFDRyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBOUM7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR0gsWUFBWSxHQUMvQkksYUFBT0MsS0FBUCxDQUFhQyxtQkFEa0IsR0FFL0JGLGFBQU9HLEdBQVAsQ0FBV0MsWUFGakI7QUFJQSxTQUFPO0FBQ0hDLElBQUFBLE9BQU8sRUFBRUMsS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQ3RCQyxNQUFBQSxTQUFTLEVBQUVULGdCQURXO0FBRXRCVSxNQUFBQSxPQUFPLEVBQUViO0FBRmEsS0FBakIsQ0FETjtBQUtIUSxJQUFBQSxZQUFZLEVBQUVMLGdCQUxYO0FBTUhXLElBQUFBLGtCQUFrQixFQUFFO0FBQ2hCQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxLQUFELEVBQVEsUUFBUixDQURTO0FBRWhCQyxNQUFBQSxNQUFNLEVBQUUsS0FGUTtBQUdoQkMsTUFBQUEsR0FBRyxFQUFFLEtBSFc7QUFJaEJDLE1BQUFBLEtBQUssRUFBRTtBQUpTLEtBTmpCO0FBWUhDLElBQUFBLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxjQUFLQyxPQUFMLENBQWF6QixHQUFiLEVBQWtCLHNDQUFsQixDQUFEO0FBWmQsR0FBUDtBQWNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ0BjcmFuZWpzL2NvcmUnXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xuXG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVZ1ZUxvYWRlckNvbmZpZyAoKSB7XG4gICAgY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuICAgIGNvbnN0IHNvdXJjZU1hcEVuYWJsZWQgPSBpc1Byb2R1Y3Rpb25cbiAgICAgICAgPyBjb25maWcuYnVpbGQucHJvZHVjdGlvblNvdXJjZU1hcFxuICAgICAgICA6IGNvbmZpZy5kZXYuY3NzU291cmNlTWFwXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkZXJzOiB1dGlscy5jc3NMb2FkZXJzKHtcbiAgICAgICAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwRW5hYmxlZCxcbiAgICAgICAgICAgIGV4dHJhY3Q6IGlzUHJvZHVjdGlvbixcbiAgICAgICAgfSksXG4gICAgICAgIGNzc1NvdXJjZU1hcDogc291cmNlTWFwRW5hYmxlZCxcbiAgICAgICAgdHJhbnNmb3JtVG9SZXF1aXJlOiB7XG4gICAgICAgICAgICB2aWRlbzogWydzcmMnLCAncG9zdGVyJ10sXG4gICAgICAgICAgICBzb3VyY2U6ICdzcmMnLFxuICAgICAgICAgICAgaW1nOiAnc3JjJyxcbiAgICAgICAgICAgIGltYWdlOiAneGxpbms6aHJlZicsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGVyOiByZXF1aXJlKHBhdGgucmVzb2x2ZShjd2QsICcuL25vZGVfbW9kdWxlcy92dWUtdGVtcGxhdGUtY29tcGlsZXInKSlcbiAgICB9XG59XG4iXX0=