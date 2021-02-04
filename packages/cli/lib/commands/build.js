"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildCmd = buildCmd;

var _core = require("@cranejs/core");

var _shared = require("@cranejs/shared");

async function buildCmd() {
  const modules = Object.keys(_core.config.pages);
  const task = await (0, _core.createBuildTask)(modules, _shared.BuildType.prod);
  await task();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9idWlsZC5qcyJdLCJuYW1lcyI6WyJidWlsZENtZCIsIm1vZHVsZXMiLCJPYmplY3QiLCJrZXlzIiwiY29uZmlnIiwicGFnZXMiLCJ0YXNrIiwiQnVpbGRUeXBlIiwicHJvZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVPLGVBQWVBLFFBQWYsR0FBMEI7QUFDN0IsUUFBTUMsT0FBTyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUMsYUFBT0MsS0FBbkIsQ0FBaEI7QUFDQSxRQUFNQyxJQUFJLEdBQUcsTUFBTSwyQkFBZ0JMLE9BQWhCLEVBQXlCTSxrQkFBVUMsSUFBbkMsQ0FBbkI7QUFFQSxRQUFNRixJQUFJLEVBQVY7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZywgY3JlYXRlQnVpbGRUYXNrIH0gZnJvbSAnQGNyYW5lanMvY29yZSdcbmltcG9ydCB7IEJ1aWxkVHlwZSB9IGZyb20gJ0BjcmFuZWpzL3NoYXJlZCdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQ21kKCkge1xuICAgIGNvbnN0IG1vZHVsZXMgPSBPYmplY3Qua2V5cyhjb25maWcucGFnZXMpXG4gICAgY29uc3QgdGFzayA9IGF3YWl0IGNyZWF0ZUJ1aWxkVGFzayhtb2R1bGVzLCBCdWlsZFR5cGUucHJvZClcblxuICAgIGF3YWl0IHRhc2soKVxufVxuIl19