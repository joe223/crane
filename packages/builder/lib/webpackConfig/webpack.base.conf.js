"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genBaseConfig;

var _core = require("@cranejs/core");

var _shared = require("@cranejs/shared");

var path = _interopRequireWildcard(require("path"));

var _vueLoader = _interopRequireDefault(require("./vue-loader.conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const cwd = process.cwd();

function resolve(dir) {
  return path.join(cwd, dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue|jsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('modules'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
});

const assetsPath = p => path.join('assets', p);

function genBaseConfig(pageConfig) {
  const isVueApp = pageConfig.jsxType === 'react' ? false : true;
  const babelPlugins = [];
  const babelPreset = [];

  _shared.logger.debug('isVueApp' + isVueApp);

  if (isVueApp) {
    babelPreset.push([require.resolve('@vue/babel-preset-jsx'), {
      injectH: false
    }]);
  } else {
    babelPreset.push([require.resolve('@babel/preset-react')]);
  }

  return {
    context: resolve('.'),
    resolve: {
      extensions: ['.js', '.vue', '.json', '.jsx'],
      alias: {
        '@': resolve('modules')
      }
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '../../node_modules'), path.resolve(cwd, './node_modules')]
    },
    module: {
      rules: [...(_core.config.useEslint ? [createLintingRule()] : []), {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: (0, _vueLoader.default)(pageConfig)
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('modules'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        options: {
          presets: [['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
            }
          }], ...babelPreset],
          plugins: babelPlugins
        }
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          esModule: false,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }]
    },
    plugins: [new VueLoaderPlugin()],
    node: {
      global: false,
      __filename: false,
      __dirname: false
    }
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suYmFzZS5jb25mLmpzIl0sIm5hbWVzIjpbIlZ1ZUxvYWRlclBsdWdpbiIsInJlcXVpcmUiLCJjd2QiLCJwcm9jZXNzIiwicmVzb2x2ZSIsImRpciIsInBhdGgiLCJqb2luIiwiY3JlYXRlTGludGluZ1J1bGUiLCJ0ZXN0IiwibG9hZGVyIiwiZW5mb3JjZSIsImluY2x1ZGUiLCJvcHRpb25zIiwiZm9ybWF0dGVyIiwiYXNzZXRzUGF0aCIsInAiLCJnZW5CYXNlQ29uZmlnIiwicGFnZUNvbmZpZyIsImlzVnVlQXBwIiwianN4VHlwZSIsImJhYmVsUGx1Z2lucyIsImJhYmVsUHJlc2V0IiwibG9nZ2VyIiwiZGVidWciLCJwdXNoIiwiaW5qZWN0SCIsImNvbnRleHQiLCJleHRlbnNpb25zIiwiYWxpYXMiLCJyZXNvbHZlTG9hZGVyIiwibW9kdWxlcyIsIl9fZGlybmFtZSIsIm1vZHVsZSIsInJ1bGVzIiwiY29uZmlnIiwidXNlRXNsaW50IiwicHJlc2V0cyIsInVzZUJ1aWx0SW5zIiwiY29yZWpzIiwidGFyZ2V0cyIsImJyb3dzZXJzIiwicGx1Z2lucyIsImxpbWl0IiwiZXNNb2R1bGUiLCJuYW1lIiwibm9kZSIsImdsb2JhbCIsIl9fZmlsZW5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyx1QkFBRCxDQUEvQjs7QUFDQSxNQUFNQyxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixFQUFaOztBQUVBLFNBQVNFLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQ2xCLFNBQU9DLElBQUksQ0FBQ0MsSUFBTCxDQUFVTCxHQUFWLEVBQWVHLEdBQWYsQ0FBUDtBQUNIOztBQUVELE1BQU1HLGlCQUFpQixHQUFHLE9BQU87QUFDN0JDLEVBQUFBLElBQUksRUFBRSxpQkFEdUI7QUFFN0JDLEVBQUFBLE1BQU0s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QixNQUFBQSxTQUFTLEVBQUU7QUFIVDtBQTVGSCxHQUFQO0FBa0dIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnQGNyYW5lanMvY29yZSdcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ0BjcmFuZWpzL3NoYXJlZCdcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBjcmVhdGVWdWVMb2FkZXJDb25maWcgZnJvbSAnLi92dWUtbG9hZGVyLmNvbmYnXG5cbmNvbnN0IFZ1ZUxvYWRlclBsdWdpbiA9IHJlcXVpcmUoJ3Z1ZS1sb2FkZXIvbGliL3BsdWdpbicpXG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpXG5cbmZ1bmN0aW9uIHJlc29sdmUoZGlyKSB7XG4gICAgcmV0dXJuIHBhdGguam9pbihjd2QsIGRpcilcbn1cblxuY29uc3QgY3JlYXRlTGludGluZ1J1bGUgPSAoKSA9PiAoe1xuICAgIHRlc3Q6IC9cXC4oanN8dnVlfGpzeCkkLyxcbiAgICBsb2FkZXI6ICdlc2xpbnQtbG9hZGVyJyxcbiAgICBlbmZvcmNlOiAncHJlJyxcbiAgICBpbmNsdWRlOiBbcmVzb2x2ZSgnbW9kdWxlcycpLCByZXNvbHZlKCd0ZXN0JyldLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZm9ybWF0dGVyOiByZXF1aXJlKCdlc2xpbnQtZnJpZW5kbHktZm9ybWF0dGVyJyksXG4gICAgfSxcbn0pXG5jb25zdCBhc3NldHNQYXRoID0gKHApID0+IHBhdGguam9pbignYXNzZXRzJywgcClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuQmFzZUNvbmZpZyhwYWdlQ29uZmlnKSB7XG4gICAgY29uc3QgaXNWdWVBcHAgPSBwYWdlQ29uZmlnLmpzeFR5cGUgPT09ICdyZWFjdCcgPyBmYWxzZSA6IHRydWVcbiAgICBjb25zdCBiYWJlbFBsdWdpbnMgPSBbXVxuICAgIGNvbnN0IGJhYmVsUHJlc2V0ID0gW11cblxuICAgIGxvZ2dlci5kZWJ1ZygnaXNWdWVBcHAnICsgaXNWdWVBcHApXG5cbiAgICBpZiAoaXNWdWVBcHApIHtcbiAgICAgICAgYmFiZWxQcmVzZXQucHVzaChbXG4gICAgICAgICAgICByZXF1aXJlLnJlc29sdmUoJ0B2dWUvYmFiZWwtcHJlc2V0LWpzeCcpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluamVjdEg6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYmFiZWxQcmVzZXQucHVzaChbXG4gICAgICAgICAgICByZXF1aXJlLnJlc29sdmUoJ0BiYWJlbC9wcmVzZXQtcmVhY3QnKVxuICAgICAgICBdKVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250ZXh0OiByZXNvbHZlKCcuJyksXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy52dWUnLCAnLmpzb24nLCAnLmpzeCddLFxuICAgICAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICAgICAnQCc6IHJlc29sdmUoJ21vZHVsZXMnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmVMb2FkZXI6IHtcbiAgICAgICAgICAgIG1vZHVsZXM6IFtcbiAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vbm9kZV9tb2R1bGVzJyksXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKGN3ZCwgJy4vbm9kZV9tb2R1bGVzJylcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIG1vZHVsZToge1xuICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAuLi4oY29uZmlnLnVzZUVzbGludCA/IFtjcmVhdGVMaW50aW5nUnVsZSgpXSA6IFtdKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC5wdWckLyxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAncHVnLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC52dWUkLyxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAndnVlLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZVZ1ZUxvYWRlckNvbmZpZyhwYWdlQ29uZmlnKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLihqc3xqc3gpJC8sXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ2JhYmVsLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ21vZHVsZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ3Rlc3QnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ25vZGVfbW9kdWxlcy93ZWJwYWNrLWRldi1zZXJ2ZXIvY2xpZW50JyksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdAYmFiZWwvcHJlc2V0LWVudicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUJ1aWx0SW5zOiAndXNhZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZWpzOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc+IDElJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhc3QgMiB2ZXJzaW9ucycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub3QgaWUgPD0gOCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5iYWJlbFByZXNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5zOiBiYWJlbFBsdWdpbnMsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4ocG5nfGpwZT9nfGdpZikoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYXNzZXRzUGF0aCgnaW1nL1tuYW1lXS5baGFzaDo3XS5bZXh0XScpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuKHN2ZykoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICdmaWxlLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzTW9kdWxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFzc2V0c1BhdGgoJ2ltZy9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLihtcDR8d2VibXxvZ2d8bXAzfHdhdnxmbGFjfGFhYykoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYXNzZXRzUGF0aCgnbWVkaWEvW25hbWVdLltoYXNoOjddLltleHRdJyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4od29mZjI/fGVvdHx0dGZ8b3RmKShcXD8uKik/JC8sXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBlc01vZHVsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBhc3NldHNQYXRoKCdmb250cy9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogW25ldyBWdWVMb2FkZXJQbHVnaW4oKV0sXG4gICAgICAgIG5vZGU6IHtcbiAgICAgICAgICAgIGdsb2JhbDogZmFsc2UsXG4gICAgICAgICAgICBfX2ZpbGVuYW1lOiBmYWxzZSxcbiAgICAgICAgICAgIF9fZGlybmFtZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgfVxufVxuIl19