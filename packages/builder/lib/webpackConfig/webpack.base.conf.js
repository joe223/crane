"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genBaseWebpackConfig;

var _shared = require("@cranejs/shared");

var path = _interopRequireWildcard(require("path"));

var _webpackChain = _interopRequireDefault(require("webpack-chain"));

var _vueLoader = _interopRequireDefault(require("./vue-loader.conf"));

var _Logs = _interopRequireDefault(require("./plugins/Logs"));

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

function genBaseWebpackConfig(pageConfig, moduleName, clientEnv, buildType) {
  const webpackConfig = new _webpackChain.default();
  webpackConfig.merge({
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
      rule: {
        pug: {
          test: /\.pug$/,
          use: {
            pug: {
              loader: 'pug-loader'
            }
          }
        },
        vue: {
          test: /\.vue$/,
          use: {
            vue: {
              loader: 'vue-loader',
              options: (0, _vueLoader.default)(pageConfig)
            }
          }
        },
        js: {
          test: /\.(m?js|jsx)$/,
          include: [resolve('modules'), resolve('test'), resolve('__test__'), require.resolve('webpack-dev-server/client')],
          use: {
            babel: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
                  }
                }]]
              }
            }
          }
        },
        image: {
          test: /\.(png|jpe?g|gif|svg|apng)(\?.*)?$/,
          use: {
            url: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                esModule: false,
                name: assetsPath('img/[name].[hash:7].[ext]')
              }
            }
          }
        },
        media: {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: {
            url: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: assetsPath('media/[name].[hash:7].[ext]')
              }
            }
          }
        },
        font: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: {
            url: {
              loader: 'url-loader',
              options: {
                limit: 10000,
                esModule: false,
                name: assetsPath('fonts/[name].[hash:7].[ext]')
              }
            }
          }
        }
      }
    },
    plugin: {
      VueLoaderPlugin: {
        plugin: VueLoaderPlugin
      },
      WebpackLogs: {
        plugin: _Logs.default,
        args: [{
          name: moduleName,
          clear: true
        }]
      }
    },
    node: {
      global: false,
      __filename: false,
      __dirname: false
    }
  });
  return webpackConfig;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suYmFzZS5jb25mLmpzIl0sIm5hbWVzIjpbIlZ1ZUxvYWRlclBsdWdpbiIsInJlcXVpcmUiLCJjd2QiLCJwcm9jZXNzIiwicmVzb2x2ZSIsImRpciIsInBhdGgiLCJqb2luIiwiY3JlYXRlTGludGluZ1J1bGUiLCJ0ZXN0IiwibG9hZGVyIiwiZW5mb3JjZSIsImluY2x1ZGUiLCJvcHRpb25zIiwiZm9ybWF0dGVyIiwiYXNzZXRzUGF0aCIsInAiLCJnZW5CYXNlV2VicGFja0NvbmZpZyIsInBhZ2VDb25maWciLCJtb2R1bGVOYW1lIiwiY2xpZW50RW52IiwiYnVpbGRUeXBlIiwid2VicGFja0NvbmZpZyIsIldlYnBhY2tDb25maWciLCJtZXJnZSIsImNvbnRleHQiLCJleHRlbnNpb25zIiwiYWxpYXMiLCJyZXNvbHZlTG9hZGVyIiwibW9kdWxlcyIsIl9fZGlybmFtZSIsIm1vZHVsZSIsInJ1bGUiLCJwdWciLCJ1c2UiLCJ2dWUiLCJqcyIsImJhYmVsIiwicHJlc2V0cyIsInVzZUJ1aWx0SW5zIiwiY29yZWpzIiwidGFyZ2V0cyIsImJyb3dzZXJzIiwiaW1hZ2UiLCJ1cmwiLCJsaW1pdCIsImVzTW9kdWxlIiwibmFtZSIsIm1lZGlhIiwiZm9udCIsInBsdWdpbiIsIldlYnBhY2tMb2dzIiwiYXJncyIsImNsZWFyIiwibm9kZSIsImdsb2JhbCIsIl9fZmlsZW5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxlQUFlLEdBQUdDLE9BQU8sQ0FBQyx1QkFBRCxDQUEvQjs7QUFDQSxNQUFNQyxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixFQUFaOztBQUVBLFNBQVNFLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQ2xCLFNBQU9DLElBQUksQ0FBQ0MsSUFBTCxDQUFVTCxHQUFWLEVBQWVHLEdBQWYsQ0FBUDtBQUNIOztBQUVE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Q0Y7QUFDSUwsVUFBQUEsSUFBSSxFQUFFNUIsVUFEVjtBQUVJa0MsVUFBQUEsS0FBSyxFQUFFO0FBRlgsU0FERTtBQUZHO0FBSlQsS0F6R1E7QUF1SGhCQyxJQUFBQSxJQUFJLEVBQUU7QUFDRkMsTUFBQUEsTUFBTSxFQUFFLEtBRE47QUFFRkMsTUFBQUEsVUFBVSxFQUFFLEtBRlY7QUFHRjFCLE1BQUFBLFNBQVMsRUFBRTtBQUhUO0FBdkhVLEdBQXBCO0FBOEhBLFNBQU9SLGFBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZywgbG9nZ2VyIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFdlYnBhY2tDb25maWcgZnJvbSAnd2VicGFjay1jaGFpbidcbmltcG9ydCBjcmVhdGVWdWVMb2FkZXJDb25maWcgZnJvbSAnLi92dWUtbG9hZGVyLmNvbmYnXG5pbXBvcnQgV2VicGFja0xvZ3MgZnJvbSAnLi9wbHVnaW5zL0xvZ3MnXG5cbmNvbnN0IFZ1ZUxvYWRlclBsdWdpbiA9IHJlcXVpcmUoJ3Z1ZS1sb2FkZXIvbGliL3BsdWdpbicpXG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpXG5cbmZ1bmN0aW9uIHJlc29sdmUoZGlyKSB7XG4gICAgcmV0dXJuIHBhdGguam9pbihjd2QsIGRpcilcbn1cblxuY29uc3QgY3JlYXRlTGludGluZ1J1bGUgPSAoKSA9PiAoe1xuICAgIHRlc3Q6IC9cXC4oanN8dnVlfGpzeCkkLyxcbiAgICBsb2FkZXI6ICdlc2xpbnQtbG9hZGVyJyxcbiAgICBlbmZvcmNlOiAncHJlJyxcbiAgICBpbmNsdWRlOiBbcmVzb2x2ZSgnbW9kdWxlcycpLCByZXNvbHZlKCd0ZXN0JyldLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZm9ybWF0dGVyOiByZXF1aXJlKCdlc2xpbnQtZnJpZW5kbHktZm9ybWF0dGVyJyksXG4gICAgfSxcbn0pXG5jb25zdCBhc3NldHNQYXRoID0gKHApID0+IHBhdGguam9pbignYXNzZXRzJywgcClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuQmFzZVdlYnBhY2tDb25maWcoXG4gICAgcGFnZUNvbmZpZyxcbiAgICBtb2R1bGVOYW1lLFxuICAgIGNsaWVudEVudixcbiAgICBidWlsZFR5cGVcbikge1xuICAgIGNvbnN0IHdlYnBhY2tDb25maWcgPSBuZXcgV2VicGFja0NvbmZpZygpXG5cbiAgICB3ZWJwYWNrQ29uZmlnLm1lcmdlKHtcbiAgICAgICAgY29udGV4dDogcmVzb2x2ZSgnLicpLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBleHRlbnNpb25zOiBbJy5qcycsICcudnVlJywgJy5qc29uJywgJy5qc3gnXSxcbiAgICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICAgJ0AnOiByZXNvbHZlKCdtb2R1bGVzJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlTG9hZGVyOiB7XG4gICAgICAgICAgICBtb2R1bGVzOiBbXG4gICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL25vZGVfbW9kdWxlcycpLFxuICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZShjd2QsICcuL25vZGVfbW9kdWxlcycpXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBtb2R1bGU6IHtcbiAgICAgICAgICAgIHJ1bGU6IHtcbiAgICAgICAgICAgICAgICBwdWc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLnB1ZyQvLFxuICAgICAgICAgICAgICAgICAgICB1c2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1Zzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ3B1Zy1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2dWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLnZ1ZSQvLFxuICAgICAgICAgICAgICAgICAgICB1c2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ3Z1ZS1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGNyZWF0ZVZ1ZUxvYWRlckNvbmZpZyhwYWdlQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAganM6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLihtP2pzfGpzeCkkLyxcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnbW9kdWxlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgndGVzdCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnX190ZXN0X18nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmUucmVzb2x2ZSgnd2VicGFjay1kZXYtc2VydmVyL2NsaWVudCcpLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB1c2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAnYmFiZWwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQGJhYmVsL3ByZXNldC1lbnYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQnVpbHRJbnM6ICd1c2FnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcmVqczogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3NlcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPiAxJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xhc3QgMiB2ZXJzaW9ucycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ25vdCBpZSA8PSA4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4ocG5nfGpwZT9nfGdpZnxzdmd8YXBuZykoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgICAgICB1c2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlc01vZHVsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFzc2V0c1BhdGgoJ2ltZy9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZWRpYToge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuKG1wNHx3ZWJtfG9nZ3xtcDN8d2F2fGZsYWN8YWFjKShcXD8uKik/JC8sXG4gICAgICAgICAgICAgICAgICAgIHVzZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAndXJsLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogMTAwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGFzc2V0c1BhdGgoJ21lZGlhL1tuYW1lXS5baGFzaDo3XS5bZXh0XScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVzdDogL1xcLih3b2ZmMj98ZW90fHR0ZnxvdGYpKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICAgICAgdXNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBhc3NldHNQYXRoKCdmb250cy9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHBsdWdpbjoge1xuICAgICAgICAgICAgVnVlTG9hZGVyUGx1Z2luOiB7XG4gICAgICAgICAgICAgICAgcGx1Z2luOiBWdWVMb2FkZXJQbHVnaW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBXZWJwYWNrTG9nczoge1xuICAgICAgICAgICAgICAgIHBsdWdpbjogV2VicGFja0xvZ3MsXG4gICAgICAgICAgICAgICAgYXJnczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtb2R1bGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbm9kZToge1xuICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZSxcbiAgICAgICAgICAgIF9fZmlsZW5hbWU6IGZhbHNlLFxuICAgICAgICAgICAgX19kaXJuYW1lOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gd2VicGFja0NvbmZpZ1xufVxuIl19