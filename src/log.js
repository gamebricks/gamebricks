'use strict';

/**
 * @class
 * @alias module:gameboard/log
 */
var Log = (function() {

  var Log = {};

  Log.connector = null;

  Log.plugins = {};

  Log.plugins.console = {
    e: function() {
      if (window.console && window.console.error) {
        return window.console.error.apply(window.console, arguments);
      }
    },
    w: function() {
      if (window.console && window.console.warn) {
        return window.console.warn.apply(window.console, arguments);
      }
    },
    i: function() {
      if (window.console && window.console.info) {
        return window.console.info.apply(window.console, arguments);
      }
    },
    d: function() {
      if (window.console && window.console.log) {
        return window.console.log.apply(window.console, arguments);
      }
    },
    v: function() {
      if (window.console && window.console.log) {
        return window.console.log.apply(window.console, arguments);
      }
    }
  };

  Log.connector = Log.plugins.console;

  Log.logLevelMap = {
    'error': ['e'],
    'warn': ['w', 'e'],
    'info': ['i', 'w', 'e'],
    'debug': ['d', 'i', 'w', 'e'],
    'verbose': ['v', 'd', 'i', 'w', 'e']
  };

  Log.logLevel = 'verbose';

  var logFunctions = ['v', 'd', 'i', 'w', 'e'];

  for (var i = 0, j = logFunctions.length; i < j; i++) {

    (function(iterator) {
      Log[iterator] = function() {
        if (Log.logLevelMap[Log.logLevel].indexOf(iterator) >= 0) {
          Log.connector[iterator].apply(this, arguments);
        }
      };
    })(logFunctions[i]);

  }

  return Log;

})();

export default Log;