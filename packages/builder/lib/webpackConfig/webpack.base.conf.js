"use strict";

var _core = require("@cranejs/core");

const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const vueLoaderConfig = require('./vue-loader.conf');

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

const assetsPath = p => path.join('static', p);

module.exports = {
  context: resolve('.'),
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jsx'],
    alias: {
      '@': resolve('modules')
    }
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  module: {
    rules: [...(_core.config.useEslint ? [createLintingRule()] : []), {
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [resolve('modules'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
    }, {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3dlYnBhY2suYmFzZS5jb25mLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJyZXF1aXJlIiwiVnVlTG9hZGVyUGx1Z2luIiwidnVlTG9hZGVyQ29uZmlnIiwiY3dkIiwicHJvY2VzcyIsInJlc29sdmUiLCJkaXIiLCJqb2luIiwiY3JlYXRlTGludGluZ1J1bGUiLCJ0ZXN0IiwibG9hZGVyIiwiZW5mb3JjZSIsImluY2x1ZGUiLCJvcHRpb25zIiwiZm9ybWF0dGVyIiwiYXNzZXRzUGF0aCIsInAiLCJtb2R1bGUiLCJleHBvcnRzIiwiY29udGV4dCIsImV4dGVuc2lvbnMiLCJhbGlhcyIsInJlc29sdmVMb2FkZXIiLCJtb2R1bGVzIiwiX19kaXJuYW1lIiwicnVsZXMiLCJjb25maWciLCJ1c2VFc2xpbnQiLCJsaW1pdCIsIm5hbWUiLCJwbHVnaW5zIiwibm9kZSIsImdsb2JhbCIsIl9fZmlsZW5hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBR0EsTUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxNQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyx1QkFBRCxDQUEvQjs7QUFDQSxNQUFNRSxlQUFlLEdBQUdGLE9BQU8sQ0FBQyxtQkFBRCxDQUEvQjs7QUFDQSxNQUFNRyxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixFQUFaOztBQUVBLFNBQVNFLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQ2xCLFNBQU9QLElBQUksQ0FBQ1EsSUFBTCxDQUFVSixHQUFWLEVBQWVHLEdBQWYsQ0FBUDtBQUNIOztBQUVELE1BQU1FLGlCQUFpQixHQUFHLE9BQU87QUFDN0JDLEVBQUFBLElBQUksRUFBRSxpQkFEdUI7QUFFN0JDLEVBQUFBLE1BQU0sRUFBRSxlQUZxQjtBQUc3QkMsRUFBQUEsT0FBTyxFQUFFLEtBSG9CO0FBSTdCQyxFQUFBQSxPQUFPLEVBQUUsQ0FBQ1AsT0FBTyxDQUFDLFNBQUQsQ0FBUixF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akIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIGNvbmZpZ1xufSBmcm9tICdAY3JhbmVqcy9jb3JlJ1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuY29uc3QgVnVlTG9hZGVyUGx1Z2luID0gcmVxdWlyZSgndnVlLWxvYWRlci9saWIvcGx1Z2luJylcbmNvbnN0IHZ1ZUxvYWRlckNvbmZpZyA9IHJlcXVpcmUoJy4vdnVlLWxvYWRlci5jb25mJylcbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKClcblxuZnVuY3Rpb24gcmVzb2x2ZShkaXIpIHtcbiAgICByZXR1cm4gcGF0aC5qb2luKGN3ZCwgZGlyKVxufVxuXG5jb25zdCBjcmVhdGVMaW50aW5nUnVsZSA9ICgpID0+ICh7XG4gICAgdGVzdDogL1xcLihqc3x2dWV8anN4KSQvLFxuICAgIGxvYWRlcjogJ2VzbGludC1sb2FkZXInLFxuICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgIGluY2x1ZGU6IFtyZXNvbHZlKCdtb2R1bGVzJyksIHJlc29sdmUoJ3Rlc3QnKV0sXG4gICAgb3B0aW9uczoge1xuICAgICAgICBmb3JtYXR0ZXI6IHJlcXVpcmUoJ2VzbGludC1mcmllbmRseS1mb3JtYXR0ZXInKVxuICAgIH1cbn0pXG5jb25zdCBhc3NldHNQYXRoID0gcCA9PiBwYXRoLmpvaW4oJ3N0YXRpYycsIHApXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnRleHQ6IHJlc29sdmUoJy4nKSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy52dWUnLCAnLmpzb24nLCAnLmpzeCddLFxuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiByZXNvbHZlKCdtb2R1bGVzJylcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZUxvYWRlcjoge1xuICAgICAgICBtb2R1bGVzOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL25vZGVfbW9kdWxlcycpLCAnbm9kZV9tb2R1bGVzJ11cbiAgICB9LFxuICAgIG1vZHVsZToge1xuICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgLi4uKGNvbmZpZy51c2VFc2xpbnQgPyBbY3JlYXRlTGludGluZ1J1bGUoKV0gOiBbXSksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0ZXN0OiAvXFwucHVnJC8sXG4gICAgICAgICAgICAgICBsb2FkZXI6ICdwdWctbG9hZGVyJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwudnVlJC8sXG4gICAgICAgICAgICAgICAgbG9hZGVyOiAndnVlLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogdnVlTG9hZGVyQ29uZmlnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4oanN8anN4KSQvLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogJ2JhYmVsLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgaW5jbHVkZTogW3Jlc29sdmUoJ21vZHVsZXMnKSwgcmVzb2x2ZSgndGVzdCcpLCByZXNvbHZlKCdub2RlX21vZHVsZXMvd2VicGFjay1kZXYtc2VydmVyL2NsaWVudCcpXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuKHBuZ3xqcGU/Z3xnaWYpKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYXNzZXRzUGF0aCgnaW1nL1tuYW1lXS5baGFzaDo3XS5bZXh0XScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuKHN2ZykoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogJ2ZpbGUtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGFzc2V0c1BhdGgoJ2ltZy9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGVzdDogL1xcLihtcDR8d2VibXxvZ2d8bXAzfHdhdnxmbGFjfGFhYykoXFw/LiopPyQvLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogJ3VybC1sb2FkZXInLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IDEwMDAwLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBhc3NldHNQYXRoKCdtZWRpYS9bbmFtZV0uW2hhc2g6N10uW2V4dF0nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGVzdDogL1xcLih3b2ZmMj98ZW90fHR0ZnxvdGYpKFxcPy4qKT8kLyxcbiAgICAgICAgICAgICAgICBsb2FkZXI6ICd1cmwtbG9hZGVyJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpbWl0OiAxMDAwMCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYXNzZXRzUGF0aCgnZm9udHMvW25hbWVdLltoYXNoOjddLltleHRdJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgbmV3IFZ1ZUxvYWRlclBsdWdpbigpXG4gICAgXSxcbiAgICBub2RlOiB7XG4gICAgICAgIGdsb2JhbDogZmFsc2UsXG4gICAgICAgIF9fZmlsZW5hbWU6IGZhbHNlLFxuICAgICAgICBfX2Rpcm5hbWU6IGZhbHNlXG4gICAgfVxufVxuIl19