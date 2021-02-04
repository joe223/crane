"use strict";

const path = require('path');

class Debugger {
  constructor(options = {}) {
    this.enable = !!options.enable;
  }

  apply(compiler) {
    const {
      enable
    } = this;
    const debuggerPath = path.resolve(__dirname, 'debugger.js');

    function injectDebuggerEntry(local, entry) {
      if (!enable) return;

      if (Array.isArray(entry) && entry.indexOf(debuggerPath) === -1) {
        entry.unshift(debuggerPath);
      } else if (typeof entry === 'object') {
        Object.keys(entry).forEach(key => {
          if (Array.isArray(entry[key]) && entry[key].indexOf(debuggerPath) === -1) {
            entry[key].unshift(debuggerPath);
          } else if (typeof entry[key] === 'string' && entry[key] !== debuggerPath) {
            entry[key] = [debuggerPath, entry[key]];
          }
        });
      }
    }

    if (compiler.hooks) {
      compiler.hooks.entryOption.tap('Debugger', injectDebuggerEntry);
    } else {
      compiler.plugin('entry-option', injectDebuggerEntry);
    }
  }

}

module.exports = Debugger;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWJ1Z2dlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsIkRlYnVnZ2VyIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiZW5hYmxlIiwiYXBwbHkiLCJjb21waWxlciIsImRlYnVnZ2VyUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJpbmplY3REZWJ1Z2dlckVudHJ5IiwibG9jYWwiLCJlbnRyeSIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4T2YiLCJ1bnNoaWZ0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJob29rcyIsImVudHJ5T3B0aW9uIiwidGFwIiwicGx1Z2luIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUVBLE1BQU1DLFFBQU4sQ0FBZTtBQUNYQyxFQUFBQSxXQUFXLENBQUNDLE9BQU8sR0FBRyxFQUFYLEVBQWU7QUFDdEIsU0FBS0MsTUFBTCxHQUFjLENBQUMsQ0FBQ0QsT0FBTyxDQUFDQyxNQUF4QjtBQUNIOztBQUVEQyxFQUFBQSxLQUFLLENBQUNDLFFBQUQsRUFBVztBQUNaLFVBQU07QUFBRUYsTUFBQUE7QUFBRixRQUFhLElBQW5CO0FBQ0EsVUFBTUcsWUFBWSxHQUFHUixJQUFJLENBQUNTLE9BQUwsQ0FBYUMsU0FBYixFQUF3QixhQUF4QixDQUFyQjs7QUFFQSxhQUFTQyxtQkFBVCxDQUE2QkMsS0FBN0IsRUFBb0NDLEtBQXBDLEVBQTJDO0FBQ3ZDLFVBQUksQ0FBQ1IsTUFBTCxFQUFhOztBQUViLFVBQUlTLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixLQUFkLEtBQXdCQSxLQUFLLENBQUNHLE9BQU4sQ0FBY1IsWUFBZCxNQUFnQyxDQUFDLENBQTdELEVBQWdFO0FBQzVESyxRQUFBQSxLQUFLLENBQUNJLE9BQU4sQ0FBY1QsWUFBZDtBQUNILE9BRkQsTUFFTyxJQUFJLE9BQU9LLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDbENLLFFBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTixLQUFaLEVBQW1CTyxPQUFuQixDQUE0QkMsR0FBRCxJQUFTO0FBQ2hDLGNBQ0lQLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixLQUFLLENBQUNRLEdBQUQsQ0FBbkIsS0FDQVIsS0FBSyxDQUFDUSxHQUFELENBQUwsQ0FBV0wsT0FBWCxDQUFtQlIsWUFBbkIsTUFBcUMsQ0FBQyxDQUYxQyxFQUdFO0FBQ0VLLFlBQUFBLEtBQUssQ0FBQ1EsR0FBRCxDQUFMLENBQVdKLE9BQVgsQ0FBbUJULFlBQW5CO0FBQ0gsV0FMRCxNQUtPLElBQ0gsT0FBT0ssS0FBSyxDQUFDUSxHQUFELENBQVosS0FBc0IsUUFBdEIsSUFDQVIsS0FBSyxDQUFDUSxHQUFELENBQUwsS0FBZWIsWUFGWixFQUdMO0FBQ0VLLFlBQUFBLEtBQUssQ0FBQ1EsR0FBRCxDQUFMLEdBQWEsQ0FBQ2IsWUFBRCxFQUFlSyxLQUFLLENBQUNRLEdBQUQsQ0FBcEIsQ0FBYjtBQUNIO0FBQ0osU0FaRDtBQWFIO0FBQ0o7O0FBRUQsUUFBSWQsUUFBUSxDQUFDZSxLQUFiLEVBQW9CO0FBQ2hCZixNQUFBQSxRQUFRLENBQUNlLEtBQVQsQ0FBZUMsV0FBZixDQUEyQkMsR0FBM0IsQ0FBK0IsVUFBL0IsRUFBMkNiLG1CQUEzQztBQUNILEtBRkQsTUFFTztBQUNISixNQUFBQSxRQUFRLENBQUNrQixNQUFULENBQWdCLGNBQWhCLEVBQWdDZCxtQkFBaEM7QUFDSDtBQUNKOztBQXBDVTs7QUF1Q2ZlLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLFFBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG5jbGFzcyBEZWJ1Z2dlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuZW5hYmxlID0gISFvcHRpb25zLmVuYWJsZVxuICAgIH1cblxuICAgIGFwcGx5KGNvbXBpbGVyKSB7XG4gICAgICAgIGNvbnN0IHsgZW5hYmxlIH0gPSB0aGlzXG4gICAgICAgIGNvbnN0IGRlYnVnZ2VyUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkZWJ1Z2dlci5qcycpXG5cbiAgICAgICAgZnVuY3Rpb24gaW5qZWN0RGVidWdnZXJFbnRyeShsb2NhbCwgZW50cnkpIHtcbiAgICAgICAgICAgIGlmICghZW5hYmxlKSByZXR1cm5cblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZW50cnkpICYmIGVudHJ5LmluZGV4T2YoZGVidWdnZXJQYXRoKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS51bnNoaWZ0KGRlYnVnZ2VyUGF0aClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVudHJ5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGVudHJ5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShlbnRyeVtrZXldKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlba2V5XS5pbmRleE9mKGRlYnVnZ2VyUGF0aCkgPT09IC0xXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlba2V5XS51bnNoaWZ0KGRlYnVnZ2VyUGF0aClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBlbnRyeVtrZXldID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlba2V5XSAhPT0gZGVidWdnZXJQYXRoXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlba2V5XSA9IFtkZWJ1Z2dlclBhdGgsIGVudHJ5W2tleV1dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbXBpbGVyLmhvb2tzKSB7XG4gICAgICAgICAgICBjb21waWxlci5ob29rcy5lbnRyeU9wdGlvbi50YXAoJ0RlYnVnZ2VyJywgaW5qZWN0RGVidWdnZXJFbnRyeSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBpbGVyLnBsdWdpbignZW50cnktb3B0aW9uJywgaW5qZWN0RGVidWdnZXJFbnRyeSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZWJ1Z2dlclxuIl19