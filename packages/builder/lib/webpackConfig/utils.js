"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssLoaders = cssLoaders;
exports.styleLoaders = styleLoaders;

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUrlRequestable(url) {
  // Protocol-relative URLs
  if (/^\/\//.test(url)) {
    return false;
  } // `file:` protocol


  if (/^file:/i.test(url)) {
    return true;
  } // Absolute URLs


  if (/^\/\w+/i.test(url)) {
    return false;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !matchNativeWin32Path.test(url)) {
    return false;
  } // `#` URLs


  if (/^#/.test(url)) {
    return false;
  }

  return true;
}

function cssLoaders(options) {
  options = options || {}; // https://github.com/webpack-contrib/css-loader/issues/1157
  // https://github.com/webpack-contrib/css-loader/commit/bc19ddd8779dafbc2a420870a3cb841041ce9c7c

  const cssLoader = {
    loader: 'css-loader',
    options: {
      esModule: false,

      url(url) {
        return isUrlRequestable(url);
      },

      sourceMap: options.sourceMap
    }
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }; // generate loader string to be used with extract text plugin

  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];

    if (options.usePostCSS) {
      loaders.push(postcssLoader);
    }

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    return [options.extract ? _miniCssExtractPlugin.default.loader : 'vue-style-loader'].concat(loaders);
  } // https://vue-loader.vuejs.org/en/configurations/extract-css.html


  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
}

function styleLoaders(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3V0aWxzLmpzIl0sIm5hbWVzIjpbImlzVXJsUmVxdWVzdGFibGUiLCJ1cmwiLCJ0ZXN0IiwibWF0Y2hOYXRpdmVXaW4zMlBhdGgiLCJjc3NMb2FkZXJzIiwib3B0aW9ucyIsImNzc0xvYWRlciIsImxvYWRlciIsImVzTW9kdWxlIiwic291cmNlTWFwIiwicG9zdGNzc0xvYWRlciIsImdlbmVyYXRlTG9hZGVycyIsImxvYWRlck9wdGlvbnMiLCJsb2FkZXJzIiwidXNlUG9zdENTUyIsInB1c2giLCJPYmplY3QiLCJhc3NpZ24iLCJleHRyYWN0IiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJjb25jYXQiLCJjc3MiLCJwb3N0Y3NzIiwibGVzcyIsInNhc3MiLCJpbmRlbnRlZFN5bnRheCIsInNjc3MiLCJzdHlsdXMiLCJzdHlsIiwic3R5bGVMb2FkZXJzIiwib3V0cHV0IiwiZXhwb3J0cyIsImV4dGVuc2lvbiIsIlJlZ0V4cCIsInVzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUVBLFNBQVNBLGdCQUFULENBQTBCQyxHQUExQixFQUErQjtBQUMzQjtBQUNBLE1BQUksUUFBUUMsSUFBUixDQUFhRCxHQUFiLENBQUosRUFBdUI7QUFDbkIsV0FBTyxLQUFQO0FBQ0gsR0FKMEIsQ0FNM0I7OztBQUNBLE1BQUksVUFBVUMsSUFBVixDQUFlRCxHQUFmLENBQUosRUFBeUI7QUFDckIsV0FBTyxJQUFQO0FBQ0gsR0FUMEIsQ0FXM0I7OztBQUNBLE1BQUksVUFBVUMsSUFBVixDQUFlRCxHQUFmLENBQUosRUFBeUI7QUFDckIsV0FBTyxLQUFQO0FBQ0g7O0FBRUQsTUFBSSx1QkFBdUJDLElBQXZCLENBQTRCRCxHQUE1QixLQUFvQyxDQUFDRSxvQkFBb0IsQ0FBQ0QsSUFBckIsQ0FBMEJELEdBQTFCLENBQXpDLEVBQXlFO0FBQ3JFLFdBQU8sS0FBUDtBQUNILEdBbEIwQixDQW9CM0I7OztBQUNBLE1BQUksS0FBS0Ms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UGx1Z2luIGZyb20gJ21pbmktY3NzLWV4dHJhY3QtcGx1Z2luJ1xuXG5mdW5jdGlvbiBpc1VybFJlcXVlc3RhYmxlKHVybCkge1xuICAgIC8vIFByb3RvY29sLXJlbGF0aXZlIFVSTHNcbiAgICBpZiAoL15cXC9cXC8vLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gYGZpbGU6YCBwcm90b2NvbFxuICAgIGlmICgvXmZpbGU6L2kudGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFic29sdXRlIFVSTHNcbiAgICBpZiAoL15cXC9cXHcrL2kudGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICgvXlthLXpdW2EtejAtOSsuLV0qOi9pLnRlc3QodXJsKSAmJiAhbWF0Y2hOYXRpdmVXaW4zMlBhdGgudGVzdCh1cmwpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBgI2AgVVJMc1xuICAgIGlmICgvXiMvLnRlc3QodXJsKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjc3NMb2FkZXJzKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9jc3MtbG9hZGVyL2lzc3Vlcy8xMTU3XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9jc3MtbG9hZGVyL2NvbW1pdC9iYzE5ZGRkODc3OWRhZmJjMmE0MjA4NzBhM2NiODQxMDQxY2U5YzdjXG4gICAgY29uc3QgY3NzTG9hZGVyID0ge1xuICAgICAgICBsb2FkZXI6ICdjc3MtbG9hZGVyJyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgZXNNb2R1bGU6IGZhbHNlLFxuICAgICAgICAgICAgdXJsKHVybCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1VybFJlcXVlc3RhYmxlKHVybCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc291cmNlTWFwOiBvcHRpb25zLnNvdXJjZU1hcFxuICAgICAgICB9LFxuICAgIH1cblxuICAgIGNvbnN0IHBvc3Rjc3NMb2FkZXIgPSB7XG4gICAgICAgIGxvYWRlcjogJ3Bvc3Rjc3MtbG9hZGVyJyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgc291cmNlTWFwOiBvcHRpb25zLnNvdXJjZU1hcCxcbiAgICAgICAgfSxcbiAgICB9XG5cbiAgICAvLyBnZW5lcmF0ZSBsb2FkZXIgc3RyaW5nIHRvIGJlIHVzZWQgd2l0aCBleHRyYWN0IHRleHQgcGx1Z2luXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVMb2FkZXJzKGxvYWRlciwgbG9hZGVyT3B0aW9ucykge1xuICAgICAgICBjb25zdCBsb2FkZXJzID0gW2Nzc0xvYWRlcl1cblxuICAgICAgICBpZiAob3B0aW9ucy51c2VQb3N0Q1NTKSB7XG4gICAgICAgICAgICBsb2FkZXJzLnB1c2gocG9zdGNzc0xvYWRlcilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb2FkZXIpIHtcbiAgICAgICAgICAgIGxvYWRlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgbG9hZGVyOiBsb2FkZXIgKyAnLWxvYWRlcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgbG9hZGVyT3B0aW9ucywge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VNYXA6IG9wdGlvbnMuc291cmNlTWFwLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBvcHRpb25zLmV4dHJhY3QgPyBNaW5pQ3NzRXh0cmFjdFBsdWdpbi5sb2FkZXIgOiAndnVlLXN0eWxlLWxvYWRlcicsXG4gICAgICAgIF0uY29uY2F0KGxvYWRlcnMpXG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly92dWUtbG9hZGVyLnZ1ZWpzLm9yZy9lbi9jb25maWd1cmF0aW9ucy9leHRyYWN0LWNzcy5odG1sXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3NzOiBnZW5lcmF0ZUxvYWRlcnMoKSxcbiAgICAgICAgcG9zdGNzczogZ2VuZXJhdGVMb2FkZXJzKCksXG4gICAgICAgIGxlc3M6IGdlbmVyYXRlTG9hZGVycygnbGVzcycpLFxuICAgICAgICBzYXNzOiBnZW5lcmF0ZUxvYWRlcnMoJ3Nhc3MnLCB7IGluZGVudGVkU3ludGF4OiB0cnVlIH0pLFxuICAgICAgICBzY3NzOiBnZW5lcmF0ZUxvYWRlcnMoJ3Nhc3MnKSxcbiAgICAgICAgc3R5bHVzOiBnZW5lcmF0ZUxvYWRlcnMoJ3N0eWx1cycpLFxuICAgICAgICBzdHlsOiBnZW5lcmF0ZUxvYWRlcnMoJ3N0eWx1cycpLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlTG9hZGVycyhvcHRpb25zKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0gW11cbiAgICBjb25zdCBsb2FkZXJzID0gZXhwb3J0cy5jc3NMb2FkZXJzKG9wdGlvbnMpXG5cbiAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBpbiBsb2FkZXJzKSB7XG4gICAgICAgIGNvbnN0IGxvYWRlciA9IGxvYWRlcnNbZXh0ZW5zaW9uXVxuICAgICAgICBvdXRwdXQucHVzaCh7XG4gICAgICAgICAgICB0ZXN0OiBuZXcgUmVnRXhwKCdcXFxcLicgKyBleHRlbnNpb24gKyAnJCcpLFxuICAgICAgICAgICAgdXNlOiBsb2FkZXIsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxufVxuIl19