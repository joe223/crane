"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanWorkspace = cleanWorkspace;

var _path = _interopRequireDefault(require("path"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _logger = require("./logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

function cleanWorkspace() {
  try {
    _rimraf.default.sync(_path.default.join(cwd, 'dist'));

    _logger.logger.info('Clean dist directory');
  } catch (e) {
    console.error(e);
  }

  try {
    _rimraf.default.sync(_path.default.join(cwd, 'bundle_analyze'));

    _logger.logger.info('Clean bundle_analyze directory');
  } catch (e) {
    console.error(e);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mcy5qcyJdLCJuYW1lcyI6WyJjd2QiLCJwcm9jZXNzIiwiY2xlYW5Xb3Jrc3BhY2UiLCJyaW1yYWYiLCJzeW5jIiwicGF0aCIsImpvaW4iLCJsb2dnZXIiLCJpbmZvIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsR0FBRyxHQUFHQyxPQUFPLENBQUNELEdBQVIsRUFBWjs7QUFFTyxTQUFTRSxjQUFULEdBQTBCO0FBQzdCLE1BQUk7QUFDQUMsb0JBQU9DLElBQVAsQ0FBWUMsY0FBS0MsSUFBTCxDQUFVTixHQUFWLEVBQWUsTUFBZixDQUFaOztBQUNBTyxtQkFBT0MsSUFBUCxDQUFZLHNCQUFaO0FBQ0gsR0FIRCxDQUdFLE9BQU9DLENBQVAsRUFBVTtBQUNSQyxJQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBY0YsQ0FBZDtBQUNIOztBQUNELE1BQUk7QUFDQU4sb0JBQU9DLElBQVAsQ0FBWUMsY0FBS0MsSUFBTCxDQUFVTixHQUFWLEVBQWUsZ0JBQWYsQ0FBWjs7QUFDQU8sbUJBQU9DLElBQVAsQ0FBWSxnQ0FBWjtBQUNILEdBSEQsQ0FHRSxPQUFPQyxDQUFQLEVBQVU7QUFDUkMsSUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWNGLENBQWQ7QUFDSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCByaW1yYWYgZnJvbSAncmltcmFmJ1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInXG5cbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKClcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuV29ya3NwYWNlKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJpbXJhZi5zeW5jKHBhdGguam9pbihjd2QsICdkaXN0JykpXG4gICAgICAgIGxvZ2dlci5pbmZvKCdDbGVhbiBkaXN0IGRpcmVjdG9yeScpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHJpbXJhZi5zeW5jKHBhdGguam9pbihjd2QsICdidW5kbGVfYW5hbHl6ZScpKVxuICAgICAgICBsb2dnZXIuaW5mbygnQ2xlYW4gYnVuZGxlX2FuYWx5emUgZGlyZWN0b3J5JylcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICB9XG59XG4iXX0=