"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createVueLoaderConfig;

var _path = _interopRequireDefault(require("path"));

var _shared = require("@cranejs/shared");

var utils = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

function createVueLoaderConfig() {
  const isProduction = process.env.NODE_ENV === 'production';
  const sourceMapEnabled = isProduction ? _shared.config.build.productionSourceMap : _shared.config.dev.cssSourceMap;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3Z1ZS1sb2FkZXIuY29uZi5qcyJdLCJuYW1lcyI6WyJjd2QiLCJwcm9jZXNzIiwiY3JlYXRlVnVlTG9hZGVyQ29uZmlnIiwiaXNQcm9kdWN0aW9uIiwiZW52IiwiTk9ERV9FTlYiLCJzb3VyY2VNYXBFbmFibGVkIiwiY29uZmlnIiwiYnVpbGQiLCJwcm9kdWN0aW9uU291cmNlTWFwIiwiZGV2IiwiY3NzU291cmNlTWFwIiwibG9hZGVycyIsInV0aWxzIiwiY3NzTG9hZGVycyIsInNvdXJjZU1hcCIsImV4dHJhY3QiLCJ0cmFuc2Zvcm1Ub1JlcXVpcmUiLCJ2aWRlbyIsInNvdXJjZSIsImltZyIsImltYWdlIiwiY29tcGlsZXIiLCJyZXF1aXJlIiwicGF0aCIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixFQUFaOztBQUVlLFNBQVNFLHFCQUFULEdBQWtDO0FBQzdDLFFBQU1DLFlBQVksR0FBR0YsT0FBTyxDQUFDRyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBOUM7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR0gsWUFBWSxHQUMvQkksZUFBT0MsS0FBUCxDQUFhQyxtQkFEa0IsR0FFL0JGLGVBQU9HLEdBQVAsQ0FBV0MsWUFGakI7QUFJQSxTQUFPO0FBQ0hDLElBQUFBLE9BQU8sRUFBRUMsS0FBSyxDQUFDQyxVQUFOLENBQWlCO0FBQ3RCQyxNQUFBQSxTQUFTLEVBQUVULGdCQURXO0FBRXRCVSxNQUFBQSxPQUFPLEVBQUViO0FBRmEsS0FBakIsQ0FETjtBQUtIUSxJQUFBQSxZQUFZLEVBQUVMLGdCQUxYO0FBTUhXLElBQUFBLGtCQUFrQixFQUFFO0FBQ2hCQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxLQUFELEVBQVEsUUFBUixDQURTO0FBRWhCQyxNQUFBQSxNQUFNLEVBQUUsS0FGUTtBQUdoQkMsTUFBQUEsR0FBRyxFQUFFLEtBSFc7QUFJaEJDLE1BQUFBLEtBQUssRUFBRTtBQUpTLEtBTmpCO0FBWUhDLElBQUFBLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxjQUFLQyxPQUFMLENBQWF6QixHQUFiLEVBQWtCLHNDQUFsQixDQUFEO0FBWmQsR0FBUDtBQWNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJ0BjcmFuZWpzL3NoYXJlZCdcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVnVlTG9hZGVyQ29uZmlnICgpIHtcbiAgICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXG4gICAgY29uc3Qgc291cmNlTWFwRW5hYmxlZCA9IGlzUHJvZHVjdGlvblxuICAgICAgICA/IGNvbmZpZy5idWlsZC5wcm9kdWN0aW9uU291cmNlTWFwXG4gICAgICAgIDogY29uZmlnLmRldi5jc3NTb3VyY2VNYXBcblxuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRlcnM6IHV0aWxzLmNzc0xvYWRlcnMoe1xuICAgICAgICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBFbmFibGVkLFxuICAgICAgICAgICAgZXh0cmFjdDogaXNQcm9kdWN0aW9uLFxuICAgICAgICB9KSxcbiAgICAgICAgY3NzU291cmNlTWFwOiBzb3VyY2VNYXBFbmFibGVkLFxuICAgICAgICB0cmFuc2Zvcm1Ub1JlcXVpcmU6IHtcbiAgICAgICAgICAgIHZpZGVvOiBbJ3NyYycsICdwb3N0ZXInXSxcbiAgICAgICAgICAgIHNvdXJjZTogJ3NyYycsXG4gICAgICAgICAgICBpbWc6ICdzcmMnLFxuICAgICAgICAgICAgaW1hZ2U6ICd4bGluazpocmVmJyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZXI6IHJlcXVpcmUocGF0aC5yZXNvbHZlKGN3ZCwgJy4vbm9kZV9tb2R1bGVzL3Z1ZS10ZW1wbGF0ZS1jb21waWxlcicpKVxuICAgIH1cbn1cbiJdfQ==