"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventMap = _interopRequire(require("eventmap"));

var performance = require("animframe").performance;

var Timer = (function (_EventMap) {
  function Timer(interval) {
    var _this = this;

    _classCallCheck(this, Timer);

    this.interval = interval || 1000;
    this.startTime = -1;

    this.active = false;
    this.paused = false;

    var oldTicks = 0;

    this.tick = function (currentTime) {
      if (!_this.active || _this.paused) {
        return;
      }

      if (interval <= 0) {
        return;
      }

      _this.trigger("tick", currentTime);

      if (currentTime - _this.startTime - _this.interval > oldTicks) {
        oldTicks = currentTime;
        _this.trigger("interval");
      }
    };
  }

  _inherits(Timer, _EventMap);

  _createClass(Timer, {
    start: {
      value: function start() {
        this.active = true;
        this.paused = false;

        this.startTime = performance.now();

        this.trigger("start");
      }
    },
    pause: {
      value: function pause() {
        this.paused = true;

        this.trigger("pause");
      }
    },
    unpause: {
      value: function unpause() {
        this.paused = false;

        this.trigger("unpause");
      }
    },
    stop: {
      value: function stop() {
        this.paused = false;
        this.active = false;

        this.trigger("stop");
      }
    }
  });

  return Timer;
})(EventMap);

module.exports = Timer;