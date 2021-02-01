"use strict";

var _commander = require("commander");

require("source-map-support/register");

var _dev = require("./commands/dev");

var _build = require("./commands/build");

const program = new _commander.Command();
program.command('dev').description('Run development server').action(_dev.devCmd);
program.command('build').description('Build production version').action(_build.buildCmd);
program.parse(process.argv);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwcm9ncmFtIiwiQ29tbWFuZCIsImNvbW1hbmQiLCJkZXNjcmlwdGlvbiIsImFjdGlvbiIsImRldkNtZCIsImJ1aWxkQ21kIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFHQTs7QUFDQTs7QUFHQTs7QUFJQSxNQUFNQSxPQUFPLEdBQUcsSUFBSUMsa0JBQUosRUFBaEI7QUFFQUQsT0FBTyxDQUNGRSxPQURMLENBQ2EsS0FEYixFQUVLQyxXQUZMLENBRWlCLHdCQUZqQixFQUdLQyxNQUhMLENBR1lDLFdBSFo7QUFLQUwsT0FBTyxDQUNGRSxPQURMLENBQ2EsT0FEYixFQUVLQyxXQUZMLENBRWlCLDBCQUZqQixFQUdLQyxNQUhMLENBR1lFLGVBSFo7QUFLQU4sT0FBTyxDQUFDTyxLQUFSLENBQWNDLE9BQU8sQ0FBQ0MsSUFBdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbW1hbmRcbn0gZnJvbSAnY29tbWFuZGVyJ1xuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInXG5pbXBvcnQge1xuICAgIGRldkNtZFxufSBmcm9tICcuL2NvbW1hbmRzL2RldidcbmltcG9ydCB7XG4gICAgYnVpbGRDbWRcbn0gZnJvbSAnLi9jb21tYW5kcy9idWlsZCdcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKClcblxucHJvZ3JhbVxuICAgIC5jb21tYW5kKCdkZXYnKVxuICAgIC5kZXNjcmlwdGlvbignUnVuIGRldmVsb3BtZW50IHNlcnZlcicpXG4gICAgLmFjdGlvbihkZXZDbWQpXG5cbnByb2dyYW1cbiAgICAuY29tbWFuZCgnYnVpbGQnKVxuICAgIC5kZXNjcmlwdGlvbignQnVpbGQgcHJvZHVjdGlvbiB2ZXJzaW9uJylcbiAgICAuYWN0aW9uKGJ1aWxkQ21kKVxuXG5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndilcbiJdfQ==