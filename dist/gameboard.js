udefine('gameboard/assetloader', ['root', 'eventmap', './log'], function(root, EventMap, Log) {

  var audioTypes = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg'
  };

  var imageTypes = {
    'png': 'image/png',
    'jpg': 'image/jpg',
    'gif': 'image/gif'
  };

  var AssetLoader = function(assets) {
    EventMap.mixin(this, AssetLoader.prototype);

    this.assets = assets || {};
    this.files = {};

    this.maxAssets = 0;
    this.assetsLoaded = 0;
    this.percentLoaded = 0;
  };

  AssetLoader.prototype.start = function() {
    if (assets == null) {
      return;
    }

    this.trigger('start');

    var loadingProgress = function() {

      var percentLoaded = 100;

      if (currentProgress !== totalSize) {
        percentLoaded = currentProgress / totalSize;
      }

      self.trigger('progress', percentLoaded);

      if (currentProgress >= totalSize) {
        self.trigger('complete');
      }
    };

    var loadSuccess = function(iterator) {
      return function() {
        currentProgress += iterator.size;
        self.assetsLoaded++;

        loadingProgress();
      };
    };

    var loadError = function(iterator) {
      return function(err) {
        Log.e('Error while loading ' + iterator.name + ': ' + err);
      };
    };

    if (Object.keys(this.assets) > 0) {
      Object.keys(this.assets).forEach(function(key) {
        var value = this.assets[key];

        if (value.files == null || !Array.isArray(value.files) || value.files.length === 0) {
          return true;
        }

        self.maxAssets += value.files.length;

        for (var i = 0, j = value.files.length; i < j; i++) {
          (function(iterator) {
            // Handle images here
            if (iterator.type.indexOf('image') === 0) {
              // TODO: Reflect: Does it make sense to put the cached images into an object?
              var img = new root.Image();
              img.onload = loadSuccess(iterator);
              img.onerror = loadError(iterator);

              img.src = iterator.name;
            } else {
              // Handle audio here
              if (iterator.type.indexOf('audio') === 0) {
                // TODO: Save preloaded files in the AudioManager
                var audioType = iterator.name.split('.').pop();
                var audio = new root.Audio();
                if (supportedTypes[audioType] && audio.canPlayType(supportedTypes[audioType])) {
                  audio.addEventListener('canplaythrough', loadSuccess(iterator));
                  audio.onerror = loadError(iterator);

                  audio.src = iterator.name;
                  audio.load();
                } else {
                  Log.w('Skipped unsupported audio file (' + supportedTypes[audioType] + ') ' + iterator.name);
                  loadSuccess(iterator)();
                }
              } else {
                Log.w('Skipped file ' + iterator.name + ': Not an audio or image file');
              }
            }

          })(value.files[i]);
        }

      }, this);
    }
  };

  return AssetLoader;

});

/**
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 – MIT License
 *
 * Credits: is based on Firefox's nsSMILKeySpline.cpp
 * Usage:
 * var spline = BezierEasing(0.25, 0.1, 0.25, 1.0)
 * spline(x) => returns the easing value | x must be in [0, 1] range
 *
 */
(function (definition) {
  if (typeof exports === "object") {
    module.exports = definition();
  }
  else if (typeof window.define === 'function' && window.define.amd) {
    window.define('gameboard/bezier-easing', [], definition);
  } else {
    window.BezierEasing = definition();
  }
}(function () {
  var global = this;

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = 'Float32Array' in global;

  function BezierEasing (mX1, mY1, mX2, mY2) {
    // Validate arguments
    if (arguments.length !== 4) {
      throw new Error("BezierEasing requires 4 arguments.");
    }
    for (var i=0; i<4; ++i) {
      if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
        throw new Error("BezierEasing arguments should be integers.");
      } 
    }
    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
      throw new Error("BezierEasing x values must be in [0, 1] range.");
    }

    var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
   
    function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
    function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
    function C (aA1)      { return 3.0 * aA1; }
   
    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    function calcBezier (aT, aA1, aA2) {
      return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
    }
   
    // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
    function getSlope (aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    }

    function newtonRaphsonIterate (aX, aGuessT) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) return aGuessT;
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
      }
      return aGuessT;
    }

    function calcSampleValues () {
      for (var i = 0; i < kSplineTableSize; ++i) {
        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function binarySubdivide (aX, aA, aB) {
      var currentX, currentT, i = 0;
      do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
      } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return currentT;
    }

    function getTForX (aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample+1] - mSampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT);
      } else if (initialSlope == 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
      }
    }

    var _precomputed = false;
    function precompute() {
      _precomputed = true;
      if (mX1 != mY1 || mX2 != mY2)
        calcSampleValues();
    }

    var f = function (aX) {
      if (!_precomputed) precompute();
      if (mX1 === mY1 && mX2 === mY2) return aX; // linear
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (aX === 0) return 0;
      if (aX === 1) return 1;
      return calcBezier(getTForX(aX), mY1, mY2);
    };

    f.getControlPoints = function() { return [{ x: mX1, y: mY1 }, { x: mX2, y: mY2 }]; };
    var str = "BezierEasing("+[mX1, mY1, mX2, mY2]+")";
    f.toString = function () { return str; };

    return f;
  }

  // CSS mapping
  BezierEasing.css = {
    "ease":        BezierEasing(0.25, 0.1, 0.25, 1.0),
    "linear":      BezierEasing(0.00, 0.0, 1.00, 1.0),
    "ease-in":     BezierEasing(0.42, 0.0, 1.00, 1.0),
    "ease-out":    BezierEasing(0.00, 0.0, 0.58, 1.0),
    "ease-in-out": BezierEasing(0.42, 0.0, 0.58, 1.0)
  };

  return BezierEasing;

}));

udefine('gameboard', ['gameboard/assetloader', 'gameboard/input', 'gameboard/loop', 'gameboard/log', 'gameboard/timer'], function(AssetLoader, Input, Loop, Log, Timer) {
  
  return {
    AssetLoader: AssetLoader,
    Input: Input,
    Loop: Loop,
    Log: Log,
    Timer: Timer
  };
  
});

udefine('gameboard/input', ['root', 'eventmap', 'gameboard/key'], function(root, EventMap, Key) {

  var Input = {};

  Input.define = Key.define;
  Input.key = new EventMap();

  root.addEventListener('keydown', function(evt) {
    Input.key.trigger({
      name: 'down',
      context: Key
    }, evt.keyCode);
  }, true);
  
  root.addEventListener('keyup', function(evt) {
    Input.key.trigger({
      name: 'up',
      context: Key
    }, evt.keyCode);
  }, true);

  return Input;
});

udefine('gameboard/key', function() {
  'use strict';
  
  var Key = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'escape': 27,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'insert': 45,
    'delete': 46,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 72,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90,
    'numpad0': 96,
    'numpad1': 97,
    'numpad2': 98,
    'numpad3': 99,
    'numpad4': 100,
    'numpad5': 101,
    'numpad6': 102,
    'numpad7': 103,
    'numpad8': 104,
    'numpad9': 105,
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'semiColon': 186,
    'equalSign': 187,
    'comma': 188,
    'dash': 189,
    'period': 190,
    'forwardSlash': 191,
    'openBracket': 219,
    'backSlash': 220,
    'closeBraket': 221,
    'singleQuote': 222
  };
  
  Key.define = function(name, key) {
    if (name == null || key == null) {
      return;
    }
    
    if (!Object.hasOwnProperty.call(Key, name)) {
      if (typeof key === 'function') {
        Object.defineProperty(Key, name, {
          get: key
        });
      } else {
        Key[name] = key;        
      }
    }
  };

  return Key;

});
define('gameboard/log', ['root'], function(root) {
  'use strict';
  /**
   * @module gameboard/log
   * @requires root
   */
  
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
        if (root.console && root.console.error) {
          return root.console.error.apply(console, arguments);
        }
      },
      w: function() {
        if (root.console && root.console.warn) {
          return root.console.warn.apply(console, arguments);
        }
      },
      i: function() {
        if (root.console && root.console.info) {
          return root.console.info.apply(console, arguments);
        }
      },
      d: function() {
        if (root.console && root.console.log) {
          return root.console.log.apply(console, arguments);
        }
      },
      v: function() {
        if (root.console && root.console.log) {
          return root.console.log.apply(console, arguments);
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

  return Log;
});
udefine('gameboard/loop', ['requestanimationframe', 'eventmap', 'gameboard/timer'], function(requestAnimationFrame, EventMap, Timer) {
  
  /**
   * @module gameboard/loop
   */
  
  'use strict';
  
  var loopEvents = new EventMap();
  var pausedEvents = {};
  var timers = [];
  
  /**
   * @class Loop
   * @static 
   */
  return (function() {

    var isRunning = true;

    /**
     * @method run 
     */
    var run = function() {
      var time;

      (function loop() {
        requestAnimationFrame(loop);

        var now = performance.now() || Date.now();
        var dt = now - (time || now);

        time = now;

        if (!isRunning) {
          return;
        }
        
        timers.forEach(function(timer) {
          timer.tick(now);
        });

        var eventKeys = Object.keys(loopEvents.events.listeners);
        
        for (var i = 0, j = eventKeys.length; i < j; i++) {
          (function(key) {
            if (!pausedEvents[key]) {
              loopEvents.trigger(key, dt);
            }
          })(eventKeys[i]);
        }
      })();
    };

    /**
     * @method stop 
     */
    var stop = function() {
      isRunning = false;
    };

    var clear = function() {
      loopEvents.clear();
      pausedEvents = {};
    };
    
    var on = function(taskName, taskFunction) {
      loopEvents.on(taskName, taskFunction);
      pausedEvents[taskName] = false;
    };
    
    var off = function(taskName) {
      loopEvents.off(taskName);
      if (pausedEvents[taskName] != null) {
        delete pausedEvents[taskName];        
      }
    };

    var pause = function(taskName) {
      pausedEvents[taskName] = true;
    };

    var resume = function(taskName) {
      if (taskName == null) {
        isRunning = true;
        return;
      }
      
      pausedEvents[taskName] = false;
    };
    
    var createTimer = function(interval) {
      var timer = new Timer(interval);
      timers.push(timer);
      
      return timer;
    };


    return {
      run: run,
      
      stop: stop,
      clear: clear,
      
      on: on,
      off: off,
      
      pause: pause,
      resume: resume,
      
      createTimer: createTimer
    };
  })();
  
});

udefine('clamp', function() {
  'use strict';
  
  var clamp = function(value, min, max) {
    var _ref, _ref1, _ref2;
    if ( typeof value === 'object') {
      _ref = value, min = _ref.min, max = _ref.max, value = _ref.value;
    }
    if (Array.isArray(min)) {
      _ref1 = min, min = _ref1[0], max = _ref1[1];
    }
    if (min == null) {
      min = 0.0;
    }
    if (max == null) {
      max = 1.0;
    }
    if (min > max) {
      _ref2 = [max, min], min = _ref2[0], max = _ref2[1];
    }
    if ((min <= value && value <= max)) {
      return value;
    } else {
      if (value > max) {
        return max;
      } else {
        return min;
      }
    }
  };

  return clamp;
});

udefine('inverselerp', ['lerp'], function(lerp) {
	return function(min, max, amt) {
		return max - lerp(min, max, amt);
	};
});

udefine('lerp', ['clamp'], function(clamp) {
	return function(min, max, amt) {
    var tmpAmt = clamp(amt, 0.0, 1.0);
    var diff = Math.abs(max - min);
    
    if (diff === 0) {
    	return min;
    } else {
    	return min + (diff * tmpAmt);
    }
	};
});

(function(root) {
  'use strict';
  
  define('root', function() {
    return root;
  });
})(this);
udefine('gameboard/timer', ['eventmap', 'performance'], function(EventMap, performance) {

  var Timer = function(interval) {
    EventMap.mixin(this, Timer.prototype);
    
    var self = this;

    this.interval = interval || 1000;
    this.startTime = -1;

    this.active = false;
    this.paused = false;

    var oldTicks = 0;

    this.tick = function(currentTime) {
      if (!self.active || self.paused) {
        return;
      }
      
      if (interval <= 0) {
        return;
      }

      self.trigger('tick', currentTime);

      if ((currentTime - self.startTime - self.interval) > oldTicks) {
        oldTicks = currentTime;
        self.trigger('interval');
      }
    };
  };

  Timer.prototype.start = function() {
    this.active = true;
    this.paused = false;

    this.startTime = performance.now();

    this.trigger('start');
  };

  Timer.prototype.pause = function() {
    this.paused = true;

    this.trigger('pause');
  };

  Timer.prototype.unpause = function() {
    this.paused = false;

    this.trigger('unpause');
  };

  Timer.prototype.stop = function() {
    this.paused = false;
    this.active = false;

    this.trigger('stop');
  };
  
  return Timer;

});

udefine('gameboard/tween', ['eventmap', 'gameboard/bezier-easing', 'gameboard/loop'], function(EventMap, BezierEasing, Loop) {

  var Tween = function() {
    EventMap.mixin(this, Tween.prototype);
    
    this.target = null;
  };

  Tween.prototype.animate = function(property, end, time, easing) {
    var self = this;
    
    if (this.target && typeof this.target[property] === 'number') {
      var start = this.target[property];
      
      if (start === end) {
        this.trigger('start');
        this.trigger('end');
        return;
      }
      
      easing = easing || 'linear';

      var timer = Loop.createTimer();
      
      timer.interval = time;
      
      timer.on('start', function() {
        self.trigger('start');
      });
      
      timer.start();
      
      timer.on('tick', function(ticks) {
        var multiplicator = BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
        var points = (end - start) * multiplicator;
        
        if (points > end) {
          points = end;
        }
        
        self.target[property] = points;
        self.trigger('animate', points);
      });
      
      timer.on('interval', function() {
        timer.stop();
        self.target[property] = end;
        self.trigger('end');
      });

    }
  };

  return Tween;

});
