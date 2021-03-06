"use strict";

var _commander = require("commander");

require("source-map-support/register");

var _dev = require("./commands/dev");

var _build = require("./commands/build");

var _utils = require("./utils");

var _shared = require("@cranejs/shared");

const program = new _commander.Command();
program.option('--mode <mode>', 'Crane environment mode');
program.command('dev').description('Run development server').action(async function () {
  process.env.NODE_ENV = 'development';
  (0, _utils.parseOpt)(program.opts());
  await (0, _dev.devCmd)(program);
});
program.command('build').description('Build production version').action(async function () {
  process.env.NODE_ENV = 'production';
  (0, _utils.parseOpt)(program.opts());
  (0, _shared.cleanWorkspace)();
  await (0, _build.buildCmd)(program);
});
program.parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwiQ29tbWFuZCIsIm9wdGlvbiIsImNvbW1hbmQiLCJkZXNjcmlwdGlvbiIsImFjdGlvbiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm9wdHMiLCJwYXJzZSIsImFyZ3YiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUEsTUFBTUEsT0FBTyxHQUFHLElBQUlDLGtCQUFKLEVBQWhCO0FBRUFELE9BQU8sQ0FBQ0UsTUFBUixDQUFlLGVBQWYsRUFBZ0Msd0JBQWhDO0FBRUFGLE9BQU8sQ0FDRkcsT0FETCxDQUNhLEtBRGIsRUFFS0MsV0FGTCxDQUVpQix3QkFGakIsRUFHS0MsTUFITCxDQUdZLGtCQUFrQjtBQUN0QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosR0FBdUIsYUFBdkI7QUFDQSx1QkFBU1IsT0FBTyxDQUFDUyxJQUFSLEVBQVQ7QUFDQSxRQUFNLGlCQUFPVCxPQUFQLENBQU47QUFDSCxDQVBMO0FBU0FBLE9BQU8sQ0FDRkcsT0FETCxDQUNhLE9BRGIsRUFFS0MsV0FGTCxDQUVpQiwwQkFGakIsRUFHS0MsTUFITCxDQUdZLGtCQUFrQjtBQUN0QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosR0FBdUIsWUFBdkI7QUFDQSx1QkFBU1IsT0FBTyxDQUFDUyxJQUFSLEVBQVQ7QUFDQTtBQUNBLFFBQU0scUJBQVNULE9BQVQsQ0FBTjtBQUNILENBUkw7QUFVQUEsT0FBTyxDQUFDVSxLQUFSLENBQWNKLE9BQU8sQ0FBQ0ssSUFBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnY29tbWFuZGVyJ1xuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQgeyBkZXZDbWQgfSBmcm9tICcuL2NvbW1hbmRzL2RldidcbmltcG9ydCB7IGJ1aWxkQ21kIH0gZnJvbSAnLi9jb21tYW5kcy9idWlsZCdcbmltcG9ydCB7IHBhcnNlT3B0IH0gZnJvbSAnLi91dGlscydcbmltcG9ydCB7IGNsZWFuV29ya3NwYWNlIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuXG5jb25zdCBwcm9ncmFtID0gbmV3IENvbW1hbmQoKVxuXG5wcm9ncmFtLm9wdGlvbignLS1tb2RlIDxtb2RlPicsICdDcmFuZSBlbnZpcm9ubWVudCBtb2RlJylcblxucHJvZ3JhbVxuICAgIC5jb21tYW5kKCdkZXYnKVxuICAgIC5kZXNjcmlwdGlvbignUnVuIGRldmVsb3BtZW50IHNlcnZlcicpXG4gICAgLmFjdGlvbihhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gJ2RldmVsb3BtZW50J1xuICAgICAgICBwYXJzZU9wdChwcm9ncmFtLm9wdHMoKSlcbiAgICAgICAgYXdhaXQgZGV2Q21kKHByb2dyYW0pXG4gICAgfSlcblxucHJvZ3JhbVxuICAgIC5jb21tYW5kKCdidWlsZCcpXG4gICAgLmRlc2NyaXB0aW9uKCdCdWlsZCBwcm9kdWN0aW9uIHZlcnNpb24nKVxuICAgIC5hY3Rpb24oYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9ICdwcm9kdWN0aW9uJ1xuICAgICAgICBwYXJzZU9wdChwcm9ncmFtLm9wdHMoKSlcbiAgICAgICAgY2xlYW5Xb3Jrc3BhY2UoKVxuICAgICAgICBhd2FpdCBidWlsZENtZChwcm9ncmFtKVxuICAgIH0pXG5cbnByb2dyYW0ucGFyc2UocHJvY2Vzcy5hcmd2KVxuIl19