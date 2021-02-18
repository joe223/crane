"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackbar = _interopRequireDefault(require("webpackbar"));

var _formatErrors = _interopRequireDefault(require("friendly-errors-webpack-plugin/src/core/formatErrors"));

var _shared = require("@cranejs/shared");

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultFormatters = [require('friendly-errors-webpack-plugin/src/formatters/moduleNotFound'), require('friendly-errors-webpack-plugin/src/formatters/eslintError'), require('friendly-errors-webpack-plugin/src/formatters/defaultError')];

class Logs extends _webpackbar.default {
  apply(compiler) {
    super.apply(compiler); // if (process.stdout.isTTY) {
    //     const blank = '\n'.repeat(process.stdout.rows)
    //     console.log(blank)
    //     readline.cursorTo(process.stdout, 0, 0)
    //     readline.clearScreenDown(process.stdout)
    // }

    compiler.hooks.done.tap('WebpackNiceLog', stats => {
      const hasErrors = stats.hasErrors();
      const hasWarnings = stats.hasWarnings();
      const messages = stats.toJson('errors-warnings');

      if (hasErrors) {
        _shared.logger.debug((0, _formatErrors.default)(messages.errors, defaultFormatters, 'error'));

        (0, _formatErrors.default)(messages.errors, defaultFormatters, 'error').forEach(item => {
          console.log(item);
        });
      }

      if (hasWarnings) {
        (0, _formatErrors.default)(messages.errors, defaultFormatters, 'warning').forEach(item => {
          console.log(item);
        });
      }
    });
  }

}

exports.default = Logs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy93ZWJwYWNrQ29uZmlnL3BsdWdpbnMvTG9ncy5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Rm9ybWF0dGVycyIsInJlcXVpcmUiLCJMb2dzIiwiV2VicGFja0JhciIsImFwcGx5IiwiY29tcGlsZXIiLCJob29rcyIsImRvbmUiLCJ0YXAiLCJzdGF0cyIsImhhc0Vycm9ycyIsImhhc1dhcm5pbmdzIiwibWVzc2FnZXMiLCJ0b0pzb24iLCJsb2dnZXIiLCJkZWJ1ZyIsImVycm9ycyIsImZvckVhY2giLCJpdGVtIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsaUJBQWlCLEdBQUcsQ0FDdEJDLE9BQU8sQ0FBQyw4REFBRCxDQURlLEVBRXRCQSxPQUFPLENBQUMsMkRBQUQsQ0FGZSxFQUd0QkEsT0FBTyxDQUFDLDREQUFELENBSGUsQ0FBMUI7O0FBTWUsTUFBTUMsSUFBTixTQUFtQkMsbUJBQW5CLENBQThCO0FBQ3pDQyxFQUFBQSxLQUFLLENBQUNDLFFBQUQsRUFBVztBQUNaLFVBQU1ELEtBQU4sQ0FBWUMsUUFBWixFQURZLENBR1o7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxJQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZUMsSUFBZixDQUFvQkMsR0FBcEIsQ0FBd0IsZ0JBQXhCLEVBQTJDQyxLQUFELElBQVc7QUFDakQsWUFBTUMsU0FBUyxHQUFHRCxLQUFLLENBQUNDLFNBQU4sRUFBbEI7QUFDQSxZQUFNQyxXQUFXLEdBQUdGLEtBQUssQ0FBQ0UsV0FBTixFQUFwQjtBQUNBLFlBQU1DLFFBQVEsR0FBR0gsS0FBSyxDQUFDSSxNQUFOLENBQWEsaUJBQWIsQ0FBakI7O0FBRUEsVUFBSUgsU0FBSixFQUFlO0FBQ1hJLHVCQUFPQyxLQUFQLENBQWEsMkJBQWFILFFBQVEsQ0FBQ0ksTUFBdEIsRUFBOEJoQixpQkFBOUIsRUFBaUQsT0FBakQsQ0FBYjs7QUFDQSxtQ0FBYVksUUFBUSxDQUFDSSxNQUF0QixFQUE4QmhCLGlCQUE5QixFQUFpRCxPQUFqRCxFQUEwRGlCLE9BQTFELENBQWtFQyxJQUFJLElBQUk7QUFDdEVDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQ0gsU0FGRDtBQUdIOztBQUVELFVBQUlQLFdBQUosRUFBaUI7QUFDYixtQ0FBYUMsUUFBUSxDQUFDSSxNQUF0QixFQUE4QmhCLGlCQUE5QixFQUFpRCxTQUFqRCxFQUE0RGlCLE9BQTVELENBQW9FQyxJQUFJLElBQUk7QUFDeEVDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFaO0FBQ0gsU0FGRDtBQUdIO0FBQ0osS0FqQkQ7QUFrQkg7O0FBOUJ3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJwYWNrQmFyIGZyb20gJ3dlYnBhY2tiYXInXG5pbXBvcnQgZm9ybWF0RXJyb3JzIGZyb20gJ2ZyaWVuZGx5LWVycm9ycy13ZWJwYWNrLXBsdWdpbi9zcmMvY29yZS9mb3JtYXRFcnJvcnMnXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdAY3JhbmVqcy9zaGFyZWQnXG5pbXBvcnQgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5cbmNvbnN0IGRlZmF1bHRGb3JtYXR0ZXJzID0gW1xuICAgIHJlcXVpcmUoJ2ZyaWVuZGx5LWVycm9ycy13ZWJwYWNrLXBsdWdpbi9zcmMvZm9ybWF0dGVycy9tb2R1bGVOb3RGb3VuZCcpLFxuICAgIHJlcXVpcmUoJ2ZyaWVuZGx5LWVycm9ycy13ZWJwYWNrLXBsdWdpbi9zcmMvZm9ybWF0dGVycy9lc2xpbnRFcnJvcicpLFxuICAgIHJlcXVpcmUoJ2ZyaWVuZGx5LWVycm9ycy13ZWJwYWNrLXBsdWdpbi9zcmMvZm9ybWF0dGVycy9kZWZhdWx0RXJyb3InKSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9ncyBleHRlbmRzIFdlYnBhY2tCYXIge1xuICAgIGFwcGx5KGNvbXBpbGVyKSB7XG4gICAgICAgIHN1cGVyLmFwcGx5KGNvbXBpbGVyKTtcblxuICAgICAgICAvLyBpZiAocHJvY2Vzcy5zdGRvdXQuaXNUVFkpIHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGJsYW5rID0gJ1xcbicucmVwZWF0KHByb2Nlc3Muc3Rkb3V0LnJvd3MpXG5cbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGJsYW5rKVxuICAgICAgICAvLyAgICAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDAsIDApXG4gICAgICAgIC8vICAgICByZWFkbGluZS5jbGVhclNjcmVlbkRvd24ocHJvY2Vzcy5zdGRvdXQpXG4gICAgICAgIC8vIH1cblxuICAgICAgICBjb21waWxlci5ob29rcy5kb25lLnRhcCgnV2VicGFja05pY2VMb2cnLCAoc3RhdHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhhc0Vycm9ycyA9IHN0YXRzLmhhc0Vycm9ycygpO1xuICAgICAgICAgICAgY29uc3QgaGFzV2FybmluZ3MgPSBzdGF0cy5oYXNXYXJuaW5ncygpO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXMgPSBzdGF0cy50b0pzb24oJ2Vycm9ycy13YXJuaW5ncycpXG5cbiAgICAgICAgICAgIGlmIChoYXNFcnJvcnMpIHtcbiAgICAgICAgICAgICAgICBsb2dnZXIuZGVidWcoZm9ybWF0RXJyb3JzKG1lc3NhZ2VzLmVycm9ycywgZGVmYXVsdEZvcm1hdHRlcnMsICdlcnJvcicpKVxuICAgICAgICAgICAgICAgIGZvcm1hdEVycm9ycyhtZXNzYWdlcy5lcnJvcnMsIGRlZmF1bHRGb3JtYXR0ZXJzLCAnZXJyb3InKS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoYXNXYXJuaW5ncykge1xuICAgICAgICAgICAgICAgIGZvcm1hdEVycm9ycyhtZXNzYWdlcy5lcnJvcnMsIGRlZmF1bHRGb3JtYXR0ZXJzLCAnd2FybmluZycpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19