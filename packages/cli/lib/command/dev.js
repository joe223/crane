"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.devCmd = devCmd;

var _core = require("@cranejs/core");

const {
  AutoComplete
} = require('enquirer');

async function devCmd() {
  const prompt = new AutoComplete({
    name: 'Run Dev Server',
    message: 'Pick your develop module with Spacebar',
    multiple: true,
    limit: 50,
    initial: 0,
    choices: Object.keys(_core.config.pages)
  });
  const modules = await prompt.run();
  (0, _core.createBuildTask)(modules)();
}