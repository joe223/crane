"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBuildConfig = validateBuildConfig;
exports.resolvePath = resolvePath;
exports.createBuilderConfig = createBuilderConfig;
exports.builder = builder;

var _path = _interopRequireDefault(require("path"));

var _core = require("@cranejs/core");

var _shared = require("@cranejs/shared");

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cwd = process.cwd();

function validateBuildConfig(buildConfig, moduleName) {
  if (!buildConfig.entry && (!buildConfig.entries || buildConfig.entries.length === 0)) {
    _shared.logger.error(`module [${moduleName}] required a entry`);

    process.exit(1);
  }
}

function resolvePath(filePath) {
  return _path.default.isAbsolute(filePath) ? filePath : _path.default.join(cwd, './modules', filePath);
}

function createBuilderConfig(buildConfig, moduleName, clientEnv, buildType) {
  validateBuildConfig(buildConfig, moduleName);
  const conf = {
    entry: {},
    plugins: []
  };

  const configBuilder = require(`./webpackConfig/webpack.${buildType}.conf`);

  buildConfig.output = buildConfig.output || moduleName; // Single entry file

  if (buildConfig.entry) {
    const defaultEntryName = 'index';
    const entry = buildConfig;
    entry.templateParameters = {
      WEB_ENV: clientEnv,
      ...entry.templateParameters
    };
    conf.entry[defaultEntryName] = resolvePath(entry.entry);
    conf.plugins.push(genHtmlWebpackPluginConfig(buildType, entry, defaultEntryName, 'index.html')); // Multiple entry file
  } else {
    Object.keys(buildConfig.entries).forEach(entryName => {
      const entry = buildConfig.entries[entryName];
      entry.templateParameters = {
        WEB_ENV: clientEnv,
        ...entry.templateParameters
      };
      conf.entry[entryName] = resolvePath(entry.entry);
      conf.plugins.push(genHtmlWebpackPluginConfig(buildType, entry, entryName, entry.output || `${entryName}/index.html`));
    });
  }

  if (buildType === _shared.BuildType.prod) {
    conf.plugins.push(new _miniCssExtractPlugin.default({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: buildType === _shared.BuildType.prod ? '[name].[chunkhash].css' : '[name].css',
      chunkFilename: buildType === _shared.BuildType.prod ? '[id].[chunkhash].css' : '[id].css'
    }));
  } // conf.plugins.push(...customPlugins.pluginsList)
  // Set public static assets
  // copy custom static assets


  if (buildConfig.static) {
    const staticAssets = [{
      from: resolvePath(buildConfig.static),
      to: _core.config.assetsSubDirectory,
      globOptions: {
        dot: false
      }
    }];
    conf.plugins.push(new _copyWebpackPlugin.default({
      patterns: staticAssets,
      options: {
        concurrency: 100
      }
    }));
  }

  const webpackConfig = (0, _webpackMerge.default)(configBuilder(buildConfig), {
    output: {
      path: _path.default.join(_core.config.assetsRoot, buildConfig.output),
      filename: '[name].[chunkhash].js',
      publicPath: _path.default.join(_path.default.sep, buildConfig.output, _path.default.sep)
    },
    plugins: [new _webpack.default.EnvironmentPlugin(clientEnv)]
  }, conf, buildConfig.webpack || {});
  return webpackConfig;
}

function builder(builderConfig, dev = false) {
  _shared.logger.debug(builderConfig[0].module.rules[14]);

  if (dev) {
    const options = _core.config.devServer;
    const server = new _webpackDevServer.default((0, _webpack.default)(builderConfig), options);
    server.listen(options.port, 'localhost', function (err) {
      if (err) {
        console.log(err);
      }

      console.log('WebpackDevServer listening at localhost:', options.port);
    });
  } else {
    (0, _webpack.default)(builderConfig);
  }
}
/**
 * The default for options.templateParameter
 * Generate the template parameters
 */


function genTemplateParametersGenerator(entry) {
  return function templateParametersGenerator(compilation, assets, options) {
    // Try to use absolute path while loading stylesheet
    if (assets.extracted && assets.extracted.css) {
      assets.extracted.css.forEach(css => {
        if (!_path.default.isAbsolute(css.file) && css.file.indexOf(assets.publicPath) < 0) {
          css.file = _path.default.join(assets.publicPath, css.file);
        }
      });
    }

    return {
      title: entry.title || entry.templateParameters.title,
      ...entry.templateParameters,
      compilation,
      webpackConfig: entry.options,
      htmlWebpackPlugin: {
        files: assets,
        options: options
      }
    };
  };
}
/**
 * Factory function for generating HTMLWebpackPlugin instance
 * @param {string} buildType 'dev' | 'prod'
 * @param {{
 *  title,
 *  entry,
 *  output,
 *  template?,
 *  templateParameters?}} entry
 * @param entryName
 * @param {string} htmlFilename
 * @returns {HtmlWebpackPlugin}
 */


function genHtmlWebpackPluginConfig(buildType, entry, entryName, filename = 'index.html') {
  const template = entry.template ? resolvePath(entry.template) : _path.default.join(__dirname, '../template/index.pug');

  if (buildType === _shared.BuildType.dev) {
    return new _htmlWebpackPlugin.default({
      filename,
      template,
      inject: true,
      chunks: ['vendors', entryName],
      title: entry.title || entry.templateParameters.title,
      templateParameters: genTemplateParametersGenerator(entry)
    });
  } else {
    return new _htmlWebpackPlugin.default({
      filename,
      template,
      inject: true,
      chunks: ['vendors', entryName],
      title: entry.title || entry.templateParameters.title,
      templateParameters: genTemplateParametersGenerator(entry),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference

      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'auto'
    });
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjd2QiLCJwcm9jZXNzIiwidmFsaWRhdGVCdWlsZENvbmZpZyIsImJ1aWxkQ29uZmlnIiwibW9kdWxlTmFtZSIsImVudHJ5IiwiZW50cmllcyIsImxlbmd0aCIsImxvZ2dlciIsImVycm9yIiwiZXhpdCIsInJlc29sdmVQYXRoIiwiZmlsZVBhdGgiLCJwYXRoIiwiaXNBYnNvbHV0ZSIsImpvaW4iLCJjcmVhdGVCdWlsZGVyQ29uZmlnIiwiY2xpZW50RW52IiwiYnVpbGRUeXBlIiwiY29uZiIsInBsdWdpbnMiLCJjb25maWdCdWlsZGVyIiwicmVxdWlyZSIsIm91dHB1dCIsImRlZmF1bHRFbnRyeU5hbWUiLCJ0ZW1wbGF0ZVBhcmFtZXRlcnMiLCJXRUJfRU5WIiwicHVzaCIsImdlbkh0bWxXZWJwYWNrUGx1Z2luQ29uZmlnIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJlbnRyeU5hbWUiLCJCdWlsZFR5cGUiLCJwcm9kIiwiTWluaUNzc0V4dHJhY3RQbHVnaW4iLCJmaWxlbmFtZSIsImNodW5rRmlsZW5hbWUiLCJzdGF0aWMiLCJzdGF0aWNBc3NldHMiLCJmcm9tIiwidG8iLCJjb25maWciLCJhc3NldHNTdWJEaXJlY3RvcnkiLCJnbG9iT3B0aW9ucyIsImRvdCIsIkNvcHlXZWJwYWNrUGx1Z2luIiwicGF0dGVybnMiLCJvcHRpb25zIiwiY29uY3VycmVuY3kiLCJ3ZWJwYWNrQ29uZmlnIiwiYXNzZXRzUm9vdCIsInB1YmxpY1BhdGgiLCJzZXAiLCJ3ZWJwYWNrIiwiRW52aXJvbm1lbnRQbHVnaW4iLCJidWlsZGVyIiwiYnVpbGRlckNvbmZpZyIsImRldiIsImRlYnVnIiwibW9kdWxlIiwicnVsZXMiLCJkZXZTZXJ2ZXIiLCJzZXJ2ZXIiLCJXZWJwYWNrRGV2U2VydmVyIiwibGlzdGVuIiwicG9ydCIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJnZW5UZW1wbGF0ZVBhcmFtZXRlcnNHZW5lcmF0b3IiLCJ0ZW1wbGF0ZVBhcmFtZXRlcnNHZW5lcmF0b3IiLCJjb21waWxhdGlvbiIsImFzc2V0cyIsImV4dHJhY3RlZCIsImNzcyIsImZpbGUiLCJpbmRleE9mIiwidGl0bGUiLCJodG1sV2VicGFja1BsdWdpbiIsImZpbGVzIiwidGVtcGxhdGUiLCJfX2Rpcm5hbWUiLCJIdG1sV2VicGFja1BsdWdpbiIsImluamVjdCIsImNodW5rcyIsIm1pbmlmeSIsInJlbW92ZUNvbW1lbnRzIiwiY29sbGFwc2VXaGl0ZXNwYWNlIiwicmVtb3ZlQXR0cmlidXRlUXVvdGVzIiwiY2h1bmtzU29ydE1vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLEdBQUcsR0FBR0MsT0FBTyxDQUFDRCxHQUFSLEVBQVo7O0FBRU8sU0FBU0UsbUJBQVQsQ0FDSEMsV0FERyxFQUVIQyxVQUZHLEVBR0w7QUFDRSxNQUFJLENBQUNELFdBQVcsQ0FBQ0UsS0FBYixLQUNJLENBQUNGLFdBQVcsQ0FBQ0csT0FBYixJQUF3QkgsV0FBVyxDQUFDRyxPQUFaLENBQW9CQyxNQUFwQixLQUErQixDQUQzRCxDQUFKLEVBRUU7QUFDRUMsbUJBQU9DLEtBQVAsQ0FBYyxXQUFVTCxVQUFXLG9CQUFuQzs7QUFDQUgsSUFBQUEsT0FBTyxDQUFDUyxJQUFSLENBQWEsQ0FBYjtBQUNIO0FBQ0o7O0FBRU0sU0FBU0MsV0FBVCxDQUFzQkMsUUFBdEIsRUFBZ0M7QUFDbkMsU0FBT0MsY0FBS0MsVUFBTCxDQUFnQkYsUUFBaEIsSUFDREEsUUFEQyxHQUVEQyxjQUFLRSxJQUFMLENBQVVmLEdBQVYsRUFBZSxXQUFmLEVBQTRCWSxRQUE1QixDQUZOO0FBR0g7O0FBRU0sU0FBU0ksbUJBQVQsQ0FDSGIsV0FERyxFQUVIQyxVQUZHLEVBR0hhLFNBSEcsRUFJSEMsU0FKRyxFQUtMO0FBQ0VoQixFQUFBQSxtQkFBbUIsQ0FDZkMsV0FEZSxFQUVmQyxVQUZlLENB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Q0FBeUJxRCxLQUx0QjtBQU16QnJELE1BQUFBLGtCQUFrQixFQUFFNkMsOEJBQThCLENBQUNqRSxLQUFELENBTnpCO0FBT3pCaUYsTUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFFBQUFBLGNBQWMsRUFBRSxJQURaO0FBRUpDLFFBQUFBLGtCQUFrQixFQUFFLElBRmhCO0FBR0pDLFFBQUFBLHFCQUFxQixFQUFFLElBSG5CLENBSUo7QUFDQTs7QUFMSSxPQVBpQjtBQWN6QjtBQUNBQyxNQUFBQSxjQUFjLEVBQUU7QUFmUyxLQUF0QixDQUFQO0FBaUJIO0FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHtcbiAgICBjb25maWdcbn0gZnJvbSAnQGNyYW5lanMvY29yZSdcbmltcG9ydCB7IGxvZ2dlciwgQnVpbGRUeXBlIH0gZnJvbSAnQGNyYW5lanMvc2hhcmVkJ1xuaW1wb3J0IE1pbmlDc3NFeHRyYWN0UGx1Z2luIGZyb20gJ21pbmktY3NzLWV4dHJhY3QtcGx1Z2luJ1xuaW1wb3J0IHdlYnBhY2sgZnJvbSAnd2VicGFjaydcbmltcG9ydCBXZWJwYWNrRGV2U2VydmVyIGZyb20gJ3dlYnBhY2stZGV2LXNlcnZlcidcbmltcG9ydCBtZXJnZSBmcm9tICd3ZWJwYWNrLW1lcmdlJ1xuaW1wb3J0IENvcHlXZWJwYWNrUGx1Z2luIGZyb20gJ2NvcHktd2VicGFjay1wbHVnaW4nXG5pbXBvcnQgSHRtbFdlYnBhY2tQbHVnaW4gZnJvbSAnaHRtbC13ZWJwYWNrLXBsdWdpbidcblxuY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVCdWlsZENvbmZpZyAoXG4gICAgYnVpbGRDb25maWcsXG4gICAgbW9kdWxlTmFtZVxuKSB7XG4gICAgaWYgKCFidWlsZENvbmZpZy5lbnRyeVxuICAgICAgICAmJiAoIWJ1aWxkQ29uZmlnLmVudHJpZXMgfHwgYnVpbGRDb25maWcuZW50cmllcy5sZW5ndGggPT09IDApXG4gICAgKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihgbW9kdWxlIFske21vZHVsZU5hbWV9XSByZXF1aXJlZCBhIGVudHJ5YClcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVBhdGggKGZpbGVQYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguaXNBYnNvbHV0ZShmaWxlUGF0aClcbiAgICAgICAgPyBmaWxlUGF0aFxuICAgICAgICA6IHBhdGguam9pbihjd2QsICcuL21vZHVsZXMnLCBmaWxlUGF0aClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1aWxkZXJDb25maWcgKFxuICAgIGJ1aWxkQ29uZmlnLFxuICAgIG1vZHVsZU5hbWUsXG4gICAgY2xpZW50RW52LFxuICAgIGJ1aWxkVHlwZVxuKSB7XG4gICAgdmFsaWRhdGVCdWlsZENvbmZpZyhcbiAgICAgICAgYnVpbGRDb25maWcsXG4gICAgICAgIG1vZHVsZU5hbWVcbiAgICApXG5cbiAgICBjb25zdCBjb25mID0ge1xuICAgICAgICBlbnRyeToge30sXG4gICAgICAgIHBsdWdpbnM6IFtdXG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZ0J1aWxkZXIgPSByZXF1aXJlKGAuL3dlYnBhY2tDb25maWcvd2VicGFjay4ke2J1aWxkVHlwZX0uY29uZmApXG5cbiAgICBidWlsZENvbmZpZy5vdXRwdXQgPSBidWlsZENvbmZpZy5vdXRwdXQgfHwgbW9kdWxlTmFtZVxuXG4gICAgLy8gU2luZ2xlIGVudHJ5IGZpbGVcbiAgICBpZiAoYnVpbGRDb25maWcuZW50cnkpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdEVudHJ5TmFtZSA9ICdpbmRleCdcbiAgICAgICAgY29uc3QgZW50cnkgPSBidWlsZENvbmZpZ1xuXG4gICAgICAgIGVudHJ5LnRlbXBsYXRlUGFyYW1ldGVycyA9IHtcbiAgICAgICAgICAgIFdFQl9FTlY6IGNsaWVudEVudixcbiAgICAgICAgICAgIC4uLmVudHJ5LnRlbXBsYXRlUGFyYW1ldGVyc1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZi5lbnRyeVtkZWZhdWx0RW50cnlOYW1lXSA9IHJlc29sdmVQYXRoKGVudHJ5LmVudHJ5KVxuICAgICAgICBjb25mLnBsdWdpbnMucHVzaChnZW5IdG1sV2VicGFja1BsdWdpbkNvbmZpZyhcbiAgICAgICAgICAgIGJ1aWxkVHlwZSxcbiAgICAgICAgICAgIGVudHJ5LFxuICAgICAgICAgICAgZGVmYXVsdEVudHJ5TmFtZSxcbiAgICAgICAgICAgICdpbmRleC5odG1sJykpXG4gICAgICAgIC8vIE11bHRpcGxlIGVudHJ5IGZpbGVcbiAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3Qua2V5cyhidWlsZENvbmZpZy5lbnRyaWVzKS5mb3JFYWNoKGVudHJ5TmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbnRyeSA9IGJ1aWxkQ29uZmlnLmVudHJpZXNbZW50cnlOYW1lXVxuXG4gICAgICAgICAgICBlbnRyeS50ZW1wbGF0ZVBhcmFtZXRlcnMgPSB7XG4gICAgICAgICAgICAgICAgV0VCX0VOVjogY2xpZW50RW52LFxuICAgICAgICAgICAgICAgIC4uLmVudHJ5LnRlbXBsYXRlUGFyYW1ldGVyc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25mLmVudHJ5W2VudHJ5TmFtZV0gPSByZXNvbHZlUGF0aChlbnRyeS5lbnRyeSlcbiAgICAgICAgICAgIGNvbmYucGx1Z2lucy5wdXNoKGdlbkh0bWxXZWJwYWNrUGx1Z2luQ29uZmlnKFxuICAgICAgICAgICAgICAgIGJ1aWxkVHlwZSxcbiAgICAgICAgICAgICAgICBlbnRyeSxcbiAgICAgICAgICAgICAgICBlbnRyeU5hbWUsXG4gICAgICAgICAgICAgICAgZW50cnkub3V0cHV0IHx8IGAke2VudHJ5TmFtZX0vaW5kZXguaHRtbGApKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBpZiAoYnVpbGRUeXBlID09PSBCdWlsZFR5cGUucHJvZCkge1xuICAgICAgICBjb25mLnBsdWdpbnMucHVzaChuZXcgTWluaUNzc0V4dHJhY3RQbHVnaW4oe1xuICAgICAgICAgICAgLy8gT3B0aW9ucyBzaW1pbGFyIHRvIHRoZSBzYW1lIG9wdGlvbnMgaW4gd2VicGFja09wdGlvbnMub3V0cHV0XG4gICAgICAgICAgICAvLyBib3RoIG9wdGlvbnMgYXJlIG9wdGlvbmFsXG4gICAgICAgICAgICBmaWxlbmFtZTogYnVpbGRUeXBlID09PSBCdWlsZFR5cGUucHJvZCA/ICdbbmFtZV0uW2NodW5raGFzaF0uY3NzJyA6ICdbbmFtZV0uY3NzJyxcbiAgICAgICAgICAgIGNodW5rRmlsZW5hbWU6IGJ1aWxkVHlwZSA9PT0gQnVpbGRUeXBlLnByb2QgPyAnW2lkXS5bY2h1bmtoYXNoXS5jc3MnIDogJ1tpZF0uY3NzJyxcbiAgICAgICAgfSkpXG4gICAgfVxuXG4gICAgLy8gY29uZi5wbHVnaW5zLnB1c2goLi4uY3VzdG9tUGx1Z2lucy5wbHVnaW5zTGlzdClcblxuXG4gICAgLy8gU2V0IHB1YmxpYyBzdGF0aWMgYXNzZXRzXG4gICAgLy8gY29weSBjdXN0b20gc3RhdGljIGFzc2V0c1xuICAgIGlmIChidWlsZENvbmZpZy5zdGF0aWMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGljQXNzZXRzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZyb206IHJlc29sdmVQYXRoKGJ1aWxkQ29uZmlnLnN0YXRpYyksXG4gICAgICAgICAgICAgICAgdG86IGNvbmZpZy5hc3NldHNTdWJEaXJlY3RvcnksXG4gICAgICAgICAgICAgICAgZ2xvYk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZG90OiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuXG4gICAgICAgIGNvbmYucGx1Z2lucy5wdXNoKG5ldyBDb3B5V2VicGFja1BsdWdpbih7XG4gICAgICAgICAgICBwYXR0ZXJuczogc3RhdGljQXNzZXRzLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGNvbmN1cnJlbmN5OiAxMDAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgIH1cblxuXG4gICAgY29uc3Qgd2VicGFja0NvbmZpZyA9IG1lcmdlKGNvbmZpZ0J1aWxkZXIoYnVpbGRDb25maWcpLCB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgcGF0aDogcGF0aC5qb2luKGNvbmZpZy5hc3NldHNSb290LCBidWlsZENvbmZpZy5vdXRwdXQpLFxuICAgICAgICAgICAgZmlsZW5hbWU6ICdbbmFtZV0uW2NodW5raGFzaF0uanMnLFxuICAgICAgICAgICAgcHVibGljUGF0aDogcGF0aC5qb2luKHBhdGguc2VwLCBidWlsZENvbmZpZy5vdXRwdXQsIHBhdGguc2VwKVxuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICBuZXcgd2VicGFjay5FbnZpcm9ubWVudFBsdWdpbihjbGllbnRFbnYpXG4gICAgICAgIF1cbiAgICB9LCBjb25mLCBidWlsZENvbmZpZy53ZWJwYWNrIHx8IHt9KVxuXG4gICAgcmV0dXJuIHdlYnBhY2tDb25maWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkZXIgKGJ1aWxkZXJDb25maWcsIGRldiA9IGZhbHNlKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGJ1aWxkZXJDb25maWdbMF0ubW9kdWxlLnJ1bGVzWzE0XSlcblxuICAgIGlmIChkZXYpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGNvbmZpZy5kZXZTZXJ2ZXJcbiAgICAgICAgY29uc3Qgc2VydmVyID0gbmV3IFdlYnBhY2tEZXZTZXJ2ZXIod2VicGFjayhidWlsZGVyQ29uZmlnKSwgb3B0aW9ucylcblxuICAgICAgICBzZXJ2ZXIubGlzdGVuKG9wdGlvbnMucG9ydCwgJ2xvY2FsaG9zdCcsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1dlYnBhY2tEZXZTZXJ2ZXIgbGlzdGVuaW5nIGF0IGxvY2FsaG9zdDonLCBvcHRpb25zLnBvcnQpO1xuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHdlYnBhY2soYnVpbGRlckNvbmZpZylcbiAgICB9XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgZm9yIG9wdGlvbnMudGVtcGxhdGVQYXJhbWV0ZXJcbiAqIEdlbmVyYXRlIHRoZSB0ZW1wbGF0ZSBwYXJhbWV0ZXJzXG4gKi9cbmZ1bmN0aW9uIGdlblRlbXBsYXRlUGFyYW1ldGVyc0dlbmVyYXRvciAoZW50cnkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gdGVtcGxhdGVQYXJhbWV0ZXJzR2VuZXJhdG9yIChcbiAgICAgICAgY29tcGlsYXRpb24sXG4gICAgICAgIGFzc2V0cyxcbiAgICAgICAgb3B0aW9uc1xuICAgICkge1xuXG4gICAgICAgIC8vIFRyeSB0byB1c2UgYWJzb2x1dGUgcGF0aCB3aGlsZSBsb2FkaW5nIHN0eWxlc2hlZXRcbiAgICAgICAgaWYgKGFzc2V0cy5leHRyYWN0ZWQgJiYgYXNzZXRzLmV4dHJhY3RlZC5jc3MpIHtcbiAgICAgICAgICAgIGFzc2V0cy5leHRyYWN0ZWQuY3NzLmZvckVhY2goKGNzcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcGF0aC5pc0Fic29sdXRlKGNzcy5maWxlKSAmJiBjc3MuZmlsZS5pbmRleE9mKGFzc2V0cy5wdWJsaWNQYXRoKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY3NzLmZpbGUgPSBwYXRoLmpvaW4oYXNzZXRzLnB1YmxpY1BhdGgsIGNzcy5maWxlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiBlbnRyeS50aXRsZSB8fCBlbnRyeS50ZW1wbGF0ZVBhcmFtZXRlcnMudGl0bGUsXG4gICAgICAgICAgICAuLi5lbnRyeS50ZW1wbGF0ZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICBjb21waWxhdGlvbixcbiAgICAgICAgICAgIHdlYnBhY2tDb25maWc6IGVudHJ5Lm9wdGlvbnMsXG4gICAgICAgICAgICBodG1sV2VicGFja1BsdWdpbjoge1xuICAgICAgICAgICAgICAgIGZpbGVzOiBhc3NldHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiBmb3IgZ2VuZXJhdGluZyBIVE1MV2VicGFja1BsdWdpbiBpbnN0YW5jZVxuICogQHBhcmFtIHtzdHJpbmd9IGJ1aWxkVHlwZSAnZGV2JyB8ICdwcm9kJ1xuICogQHBhcmFtIHt7XG4gKiAgdGl0bGUsXG4gKiAgZW50cnksXG4gKiAgb3V0cHV0LFxuICogIHRlbXBsYXRlPyxcbiAqICB0ZW1wbGF0ZVBhcmFtZXRlcnM/fX0gZW50cnlcbiAqIEBwYXJhbSBlbnRyeU5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sRmlsZW5hbWVcbiAqIEByZXR1cm5zIHtIdG1sV2VicGFja1BsdWdpbn1cbiAqL1xuZnVuY3Rpb24gZ2VuSHRtbFdlYnBhY2tQbHVnaW5Db25maWcgKFxuICAgIGJ1aWxkVHlwZSxcbiAgICBlbnRyeSxcbiAgICBlbnRyeU5hbWUsXG4gICAgZmlsZW5hbWUgPSAnaW5kZXguaHRtbCdcbikge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gZW50cnkudGVtcGxhdGVcbiAgICAgICAgPyByZXNvbHZlUGF0aChlbnRyeS50ZW1wbGF0ZSlcbiAgICAgICAgOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vdGVtcGxhdGUvaW5kZXgucHVnJylcblxuICAgIGlmIChidWlsZFR5cGUgPT09IEJ1aWxkVHlwZS5kZXYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdG1sV2VicGFja1BsdWdpbih7XG4gICAgICAgICAgICBmaWxlbmFtZSxcbiAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgaW5qZWN0OiB0cnVlLFxuICAgICAgICAgICAgY2h1bmtzOiBbJ3ZlbmRvcnMnLCBlbnRyeU5hbWVdLFxuICAgICAgICAgICAgdGl0bGU6IGVudHJ5LnRpdGxlIHx8IGVudHJ5LnRlbXBsYXRlUGFyYW1ldGVycy50aXRsZSxcbiAgICAgICAgICAgIHRlbXBsYXRlUGFyYW1ldGVyczogZ2VuVGVtcGxhdGVQYXJhbWV0ZXJzR2VuZXJhdG9yKGVudHJ5KVxuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgSHRtbFdlYnBhY2tQbHVnaW4oe1xuICAgICAgICAgICAgZmlsZW5hbWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgIGluamVjdDogdHJ1ZSxcbiAgICAgICAgICAgIGNodW5rczogWyd2ZW5kb3JzJywgZW50cnlOYW1lXSxcbiAgICAgICAgICAgIHRpdGxlOiBlbnRyeS50aXRsZSB8fCBlbnRyeS50ZW1wbGF0ZVBhcmFtZXRlcnMudGl0bGUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhcmFtZXRlcnM6IGdlblRlbXBsYXRlUGFyYW1ldGVyc0dlbmVyYXRvcihlbnRyeSksXG4gICAgICAgICAgICBtaW5pZnk6IHtcbiAgICAgICAgICAgICAgICByZW1vdmVDb21tZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZVdoaXRlc3BhY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVtb3ZlQXR0cmlidXRlUXVvdGVzOiB0cnVlXG4gICAgICAgICAgICAgICAgLy8gbW9yZSBvcHRpb25zOlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rYW5nYXgvaHRtbC1taW5pZmllciNvcHRpb25zLXF1aWNrLXJlZmVyZW5jZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIG5lY2Vzc2FyeSB0byBjb25zaXN0ZW50bHkgd29yayB3aXRoIG11bHRpcGxlIGNodW5rcyB2aWEgQ29tbW9uc0NodW5rUGx1Z2luXG4gICAgICAgICAgICBjaHVua3NTb3J0TW9kZTogJ2F1dG8nXG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19