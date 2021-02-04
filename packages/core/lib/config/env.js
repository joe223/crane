"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCliEnv = createCliEnv;

/**
 * Initialize node environment variables
 */
const path = require('path');

const dotenv = require('dotenv');

const dotenvExpand = require('dotenv-expand');

const cwd = process.cwd();
const prefixRE = /^WEB_APP_/;
const envPath = path.join(cwd, 'env');

function createCliEnv() {
  const envConfig = { ...dotenv.config({
      debug: process.env.DEBUG,
      path: path.join(envPath, `.env.${process.env.CRANE_BUILD_MODE}`)
    }),
    ...dotenv.config({
      debug: process.env.DEBUG,
      path: path.join(envPath, '.env._base')
    })
  };
  const clientEnv = {};
  dotenvExpand(envConfig);
  Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key) || key === 'NODE_ENV' || key === 'CRANE_BUILD_MODE') {
      clientEnv[key] = process.env[key];
    }
  });
  return clientEnv;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvZW52LmpzIl0sIm5hbWVzIjpbInBhdGgiLCJyZXF1aXJlIiwiZG90ZW52IiwiZG90ZW52RXhwYW5kIiwiY3dkIiwicHJvY2VzcyIsInByZWZpeFJFIiwiZW52UGF0aCIsImpvaW4iLCJjcmVhdGVDbGlFbnYiLCJlbnZDb25maWciLCJjb25maWciLCJkZWJ1ZyIsImVudiIsIkRFQlVHIiwiQ1JBTkVfQlVJTERfTU9ERSIsImNsaWVudEVudiIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwidGVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVBLE1BQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLE1BQUQsQ0FBcEI7O0FBQ0EsTUFBTUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUF0Qjs7QUFDQSxNQUFNRSxZQUFZLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTVCOztBQUNBLE1BQU1HLEdBQUcsR0FBR0MsT0FBTyxDQUFDRCxHQUFSLEVBQVo7QUFDQSxNQUFNRSxRQUFRLEdBQUcsV0FBakI7QUFDQSxNQUFNQyxPQUFPLEdBQUdQLElBQUksQ0FBQ1EsSUFBTCxDQUFVSixHQUFWLEVBQWUsS0FBZixDQUFoQjs7QUFFTyxTQUFTSyxZQUFULEdBQXdCO0FBQzNCLFFBQU1DLFNBQVMsR0FBRyxFQUNkLEdBQUdSLE1BQU0sQ0FBQ1MsTUFBUCxDQUFjO0FBQ2JDLE1BQUFBLEtBQUssRUFBRVAsT0FBTyxDQUFDUSxHQUFSLENBQVlDLEtBRE47QUFFYmQsTUFBQUEsSUFBSSxFQUFFQSxJQUFJLENBQUNRLElBQUwsQ0FBVUQsT0FBVixFQUFvQixRQUFPRixPQUFPLENBQUNRLEdBQVIsQ0FBWUUsZ0JBQWlCLEVBQXhEO0FBRk8sS0FBZCxDQURXO0FBS2QsT0FBR2IsTUFBTSxDQUFDUyxNQUFQLENBQWM7QUFDYkMsTUFBQUEsS0FBSyxFQUFFUCxPQUFPLENBQUNRLEdBQVIsQ0FBWUMsS0FETjtBQUViZCxNQUFBQSxJQUFJLEVBQUVBLElBQUksQ0FBQ1EsSUFBTCxDQUFVRCxPQUFWLEVBQW1CLFlBQW5CO0FBRk8sS0FBZDtBQUxXLEdBQWxCO0FBVUEsUUFBTVMsU0FBUyxHQUFHLEVBQWxCO0FBRUFiLEVBQUFBLFlBQVksQ0FBQ08sU0FBRCxDQUFaO0FBRUFPLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZYixPQUFPLENBQUNRLEdBQXBCLEVBQXlCTSxPQUF6QixDQUFrQ0MsR0FBRCxJQUFTO0FBQ3RDLFFBQ0lkLFFBQVEsQ0FBQ2UsSUFBVCxDQUFjRCxHQUFkLEtBQ0FBLEdBQUcsS0FBSyxVQURSLElBRUFBLEdBQUcsS0FBSyxrQkFIWixFQUlFO0FBQ0VKLE1BQUFBLFNBQVMsQ0FBQ0ksR0FBRCxDQUFULEdBQWlCZixPQUFPLENBQUNRLEdBQVIsQ0FBWU8sR0FBWixDQUFqQjtBQUNIO0FBQ0osR0FSRDtBQVVBLFNBQU9KLFNBQVA7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSW5pdGlhbGl6ZSBub2RlIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICovXG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJylcbmNvbnN0IGRvdGVudiA9IHJlcXVpcmUoJ2RvdGVudicpXG5jb25zdCBkb3RlbnZFeHBhbmQgPSByZXF1aXJlKCdkb3RlbnYtZXhwYW5kJylcbmNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKClcbmNvbnN0IHByZWZpeFJFID0gL15XRUJfQVBQXy9cbmNvbnN0IGVudlBhdGggPSBwYXRoLmpvaW4oY3dkLCAnZW52JylcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNsaUVudigpIHtcbiAgICBjb25zdCBlbnZDb25maWcgPSB7XG4gICAgICAgIC4uLmRvdGVudi5jb25maWcoe1xuICAgICAgICAgICAgZGVidWc6IHByb2Nlc3MuZW52LkRFQlVHLFxuICAgICAgICAgICAgcGF0aDogcGF0aC5qb2luKGVudlBhdGgsIGAuZW52LiR7cHJvY2Vzcy5lbnYuQ1JBTkVfQlVJTERfTU9ERX1gKSxcbiAgICAgICAgfSksXG4gICAgICAgIC4uLmRvdGVudi5jb25maWcoe1xuICAgICAgICAgICAgZGVidWc6IHByb2Nlc3MuZW52LkRFQlVHLFxuICAgICAgICAgICAgcGF0aDogcGF0aC5qb2luKGVudlBhdGgsICcuZW52Ll9iYXNlJyksXG4gICAgICAgIH0pLFxuICAgIH1cbiAgICBjb25zdCBjbGllbnRFbnYgPSB7fVxuXG4gICAgZG90ZW52RXhwYW5kKGVudkNvbmZpZylcblxuICAgIE9iamVjdC5rZXlzKHByb2Nlc3MuZW52KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJlZml4UkUudGVzdChrZXkpIHx8XG4gICAgICAgICAgICBrZXkgPT09ICdOT0RFX0VOVicgfHxcbiAgICAgICAgICAgIGtleSA9PT0gJ0NSQU5FX0JVSUxEX01PREUnXG4gICAgICAgICkge1xuICAgICAgICAgICAgY2xpZW50RW52W2tleV0gPSBwcm9jZXNzLmVudltrZXldXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGNsaWVudEVudlxufVxuIl19