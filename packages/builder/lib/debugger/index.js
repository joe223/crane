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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWJ1Z2dlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsIkRlYnVnZ2VyIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiZW5hYmxlIiwiYXBwbHkiLCJjb21waWxlciIsImRlYnVnZ2VyUGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJpbmplY3REZWJ1Z2dlckVudHJ5IiwibG9jYWwiLCJlbnRyeSIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4T2YiLCJ1bnNoaWZ0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJob29rcyIsImVudHJ5T3B0aW9uIiwidGFwIiwicGx1Z2luIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUVBLE1BQU1DLFFBQU4sQ0FBZTtBQUNYQyxFQUFBQSxXQUFXLENBQUVDLE9BQU8sR0FBRyxFQUFaLEVBQWdCO0FBQ3ZCLFNBQUtDLE1BQUwsR0FBYyxDQUFDLENBQUNELE9BQU8sQ0FBQ0MsTUFBeEI7QUFDSDs7QUFFREMsRUFBQUEsS0FBSyxDQUFFQyxRQUFGLEVBQVk7QUFDYixVQUFNO0FBQUVGLE1BQUFBO0FBQUYsUUFBYSxJQUFuQjtBQUNBLFVBQU1HLFlBQVksR0FBR1IsSUFBSSxDQUFDUyxPQUFMLENBQWFDLFNBQWIsRUFBd0IsYUFBeEIsQ0FBckI7O0FBRUEsYUFBU0MsbUJBQVQsQ0FBOEJDLEtBQTlCLEVBQXFDQyxLQUFyQyxFQUE0QztBQUN4QyxVQUFJLENBQUNSLE1BQUwsRUFBYTs7QUFFYixVQUFJUyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBZCxLQUF5QkEsS0FBSyxDQUFDRyxPQUFOLENBQWNSLFlBQWQsTUFBZ0MsQ0FBQyxDQUE5RCxFQUFrRTtBQUM5REssUUFBQUEsS0FBSyxDQUFDSSxPQUFOLENBQWNULFlBQWQ7QUFDSCxPQUZELE1BRU8sSUFBSSxPQUFPSyxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQ2xDSyxRQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWU4sS0FBWixFQUFtQk8sT0FBbkIsQ0FBMkJDLEdBQUcsSUFBSTtBQUM5QixjQUFJUCxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBSyxDQUFDUSxHQUFELENBQW5CLEtBQThCUixLQUFLLENBQUNRLEdBQUQsQ0FBTCxDQUFXTCxPQUFYLENBQW1CUixZQUFuQixNQUFxQyxDQUFDLENBQXhFLEVBQTRFO0FBQ3hFSyxZQUFBQSxLQUFLLENBQUNRLEdBQUQsQ0FBTCxDQUFXSixPQUFYLENBQW1CVCxZQUFuQjtBQUNILFdBRkQsTUFFTyxJQUFJLE9BQU9LLEtBQUssQ0FBQ1EsR0FBRCxDQUFaLEtBQXNCLFFBQXRCLElBQWtDUixLQUFLLENBQUNRLEdBQUQsQ0FBTCxLQUFlYixZQUFyRCxFQUFtRTtBQUN0RUssWUFBQUEsS0FBSyxDQUFDUSxHQUFELENBQUwsR0FBYSxDQUNUYixZQURTLEVBRVRLLEtBQUssQ0FBQ1EsR0FBRCxDQUZJLENBQWI7QUFJSDtBQUNKLFNBVEQ7QUFVSDtBQUNKOztBQUVELFFBQUlkLFFBQVEsQ0FBQ2UsS0FBYixFQUFvQjtBQUNoQmYsTUFBQUEsUUFBUSxDQUFDZSxLQUFULENBQWVDLFdBQWYsQ0FBMkJDLEdBQTNCLENBQStCLFVBQS9CLEVBQTJDYixtQkFBM0M7QUFDSCxLQUZELE1BRU87QUFDSEosTUFBQUEsUUFBUSxDQUFDa0IsTUFBVCxDQUFnQixjQUFoQixFQUFnQ2QsbUJBQWhDO0FBQ0g7QUFDSjs7QUFqQ1U7O0FBb0NmZSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6QixRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcblxuY2xhc3MgRGVidWdnZXIge1xuICAgIGNvbnN0cnVjdG9yIChvcHRpb25zID0ge30pIHtcbiAgICAgICAgdGhpcy5lbmFibGUgPSAhIW9wdGlvbnMuZW5hYmxlXG4gICAgfVxuXG4gICAgYXBwbHkgKGNvbXBpbGVyKSB7XG4gICAgICAgIGNvbnN0IHsgZW5hYmxlIH0gPSB0aGlzXG4gICAgICAgIGNvbnN0IGRlYnVnZ2VyUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdkZWJ1Z2dlci5qcycpXG5cbiAgICAgICAgZnVuY3Rpb24gaW5qZWN0RGVidWdnZXJFbnRyeSAobG9jYWwsIGVudHJ5KSB7XG4gICAgICAgICAgICBpZiAoIWVuYWJsZSkgcmV0dXJuXG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVudHJ5KSAmJiAoZW50cnkuaW5kZXhPZihkZWJ1Z2dlclBhdGgpID09PSAtMSkpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS51bnNoaWZ0KGRlYnVnZ2VyUGF0aClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVudHJ5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGVudHJ5KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVudHJ5W2tleV0pICYmIChlbnRyeVtrZXldLmluZGV4T2YoZGVidWdnZXJQYXRoKSA9PT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeVtrZXldLnVuc2hpZnQoZGVidWdnZXJQYXRoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbnRyeVtrZXldID09PSAnc3RyaW5nJyAmJiBlbnRyeVtrZXldICE9PSBkZWJ1Z2dlclBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5W2tleV0gPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5W2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tcGlsZXIuaG9va3MpIHtcbiAgICAgICAgICAgIGNvbXBpbGVyLmhvb2tzLmVudHJ5T3B0aW9uLnRhcCgnRGVidWdnZXInLCBpbmplY3REZWJ1Z2dlckVudHJ5KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGlsZXIucGx1Z2luKCdlbnRyeS1vcHRpb24nLCBpbmplY3REZWJ1Z2dlckVudHJ5KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERlYnVnZ2VyXG4iXX0=