"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genBaseConfig;

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
      rules: [...(_shared.config.useEslint ? [createLintingRule()] : []), {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suYmFzZS5jb25mLmpzIl0sIm5hbWVzIjpbIlZ1ZUxvYWRlclBsdWdpbiIsInJlcXVpcmUiLCJjd2QiLCJwcm9jZXNzIiwicmVzb2x2ZSIsImRpciIsInBhdGgiLCJqb2luIiwiY3JlYXRlTGludGluZ1J1bGUiLCJ0ZXN0IiwibG9hZGVyIiwiZW5mb3JjZSIsImluY2x1ZGUiLCJvcHRpb25zIiwiZm9ybWF0dGVyIiwiYXNzZXRzUGF0aCIsInAiLCJnZW5CYXNlQ29uZmlnIiwicGFnZUNvbmZpZyIsImlzVnVlQXBwIiwianN4VHlwZSIsImJhYmVsUGx1Z2lucyIsImJhYmVsUHJlc2V0IiwibG9nZ2VyIiwiZGVidWciLCJwdXNoIiwiaW5qZWN0SCIsImNvbnRleHQiLCJleHRlbnNpb25zIiwiYWxpYXMiLCJyZXNvbHZlTG9hZGVyIiwibW9kdWxlcyIsIl9fZGlybmFtZSIsIm1vZHVsZSIsInJ1bGVzIiwiY29uZmlnIiwidXNlRXNsaW50IiwicHJlc2V0cyIsInVzZUJ1aWx0SW5zIiwiY29yZWpzIiwidGFyZ2V0cyIsImJyb3dzZXJzIiwicGx1Z2lucyIsImxpbWl0IiwiZXNNb2R1bGUiLCJuYW1lIiwibm9kZSIsImdsb2JhbCIsIl9fZmlsZW5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyx1QkFBRCxDQUEvQjs7QUFDQSxNQUFNQyxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixFQUFaOztBQUVBLFNBQVNFLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQ2xCLFNBQU9DLElBQUksQ0FBQ0MsSUFBTCxDQUFVTCxHQUFWLEVBQWVHLEdBQWYsQ0FBUDtBQUNIOztBQUVELE1BQU1HLGlCQUFpQixHQUFHLE9BQU87QUFDN0JDLEVBQUFBLElBQUksRUFBRSxpQkFEdUI7QUFFN0JDLEVBQUFBLE1BQU0sRUFBRSxl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QSxTQUFTLEVBQUU7QUFIVDtBQTVGSCxHQUFQO0FBa0dIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnLCBsb2dnZXIgfSBmcm9tICdAY3JhbmVqcy9zaGFyZWQnXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgY3JlYXRlVnVlTG9hZGVyQ29uZmlnIGZyb20gJy4vdnVlLWxvYWRlci5jb25mJ1xuXG5jb25zdCBWdWVMb2FkZXJQbHVnaW4gPSByZXF1aXJlKCd2dWUtbG9hZGVyL2xpYi9wbHVnaW4nKVxuY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKVxuXG5mdW5jdGlvbiByZXNvbHZlKGRpcikge1xuICAgIHJldHVybiBwYXRoLmpvaW4oY3dkLCBkaXIpXG59XG5cbmNvbnN0IGNyZWF0ZUxpbnRpbmdSdWxlID0gKCkgPT4gKHtcbiAgICB0ZXN0OiAvXFwuKGpzfHZ1ZXxqc3gpJC8sXG4gICAgbG9hZGVyOiAnZXNsaW50LWxvYWRlcicsXG4gICAgZW5mb3JjZTogJ3ByZScsXG4gICAgaW5jbHVkZTogW3Jlc29sdmUoJ21vZHVsZXMnKSwgcmVzb2x2ZSgndGVzdCcpXSxcbiAgICBvcHRpb25zOiB7XG4gICAgICAgIGZvcm1hdHRlcjogcmVxdWlyZSgnZXNsaW50LWZyaWVuZGx5LWZvcm1hdHRlcicpLFxuICAgIH0sXG59KVxuY29uc3QgYXNzZXRzUGF0aCA9IChwKSA9PiBwYXRoLmpvaW4oJ2Fzc2V0cycsIHApXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbkJhc2VDb25maWcocGFnZUNvbmZpZykge1xuICAgIGNvbnN0IGlzVnVlQXBwID0gcGFnZUNvbmZpZy5qc3hUeXBlID09PSAncmVhY3QnID8gZmFsc2UgOiB0cnVlXG4gICAgY29uc3QgYmFiZWxQbHVnaW5zID0gW11cbiAgICBjb25zdCBiYWJlbFByZXNldCA9IFtdXG5cbiAgICBsb2dnZXIuZGVidWcoJ2lzVnVlQXBwJyArIGlzVnVlQXBwKVxuXG4gICAgaWYgKGlzVnVlQXBwKSB7XG4gICAgICAgIGJhYmVsUHJlc2V0LnB1c2goW1xuICAgICAgICAgICAgcmVxdWlyZS5yZXNvbHZlKCdAdnVlL2JhYmVsLXByZXNldC1qc3gnKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmplY3RIOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBdKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGJhYmVsUHJlc2V0LnB1c2goW1xuICAgICAgICAgICAgcmVxdWlyZS5yZXNvbHZlKCdAYmFiZWwvcHJlc2V0LXJlYWN0JylcbiAgICAgICAgXSlcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGV4dDogcmVzb2x2ZSgnLicpLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBleHRlbnNpb25zOiBbJy5qcycsICcudnVlJywgJy5qc29uJywgJy5qc3gnXSxcbiAgICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICAgJ0AnOiByZXNvbHZlKCdtb2R1bGVzJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlTG9hZGVyOiB7XG4gICAgICAgICAgICBtb2R1bGVzOiBbXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL25vZGVfbW9kdWxlcycpLFxuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZShjd2QsICcuL25vZGVfbW9kdWxlcycpXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBtb2R1bGU6IHtcbiAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgLi4uKGNvbmZpZy51c2VFc2xpbnQgPyBbY3JlYXRlTGludGluZ1J1bGUoKV0gOiBbXSksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvXFwucHVnJC8sXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ3B1Zy1sb2FkZXInLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvXFwudnVlJC8sXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ3Z1ZS1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBjcmVhdGVWdWVMb2FkZXJDb25maWcocGFnZUNvbmZpZyksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4oanN8anN4KSQvLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICdiYWJlbC1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdtb2R1bGVzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCd0ZXN0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudCcpLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVzZXRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGJhYmVsL3ByZXNldC1lbnYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VCdWlsdEluczogJ3VzYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcmVqczogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicm93c2VyczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPiAxJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdsYXN0IDIgdmVyc2lvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm90IGllIDw9IDgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uYmFiZWxQcmVzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGx1Z2luczogYmFiZWxQbHVnaW5zLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuKHBuZ3xqcGU/Z3xnaWYpKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzTW9kdWxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFzc2V0c1BhdGgoJ2ltZy9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLihzdmcpKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAnZmlsZS1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlc01vZHVsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBhc3NldHNQYXRoKCdpbWcvW25hbWVdLltoYXNoOjddLltleHRdJyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4obXA0fHdlYm18b2dnfG1wM3x3YXZ8ZmxhY3xhYWMpKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFzc2V0c1BhdGgoJ21lZGlhL1tuYW1lXS5baGFzaDo3XS5bZXh0XScpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuKHdvZmYyP3xlb3R8dHRmfG90ZikoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYXNzZXRzUGF0aCgnZm9udHMvW25hbWVdLltoYXNoOjddLltleHRdJyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbnM6IFtuZXcgVnVlTG9hZGVyUGx1Z2luKCldLFxuICAgICAgICBub2RlOiB7XG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlLFxuICAgICAgICAgICAgX19maWxlbmFtZTogZmFsc2UsXG4gICAgICAgICAgICBfX2Rpcm5hbWU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgIH1cbn1cbiJdfQ==