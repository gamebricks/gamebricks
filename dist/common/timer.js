'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _eventmap = require('eventmap');

var _eventmap2 = _interopRequireDefault(_eventmap);

var _animframe = require('animframe');

'use strict';

var Timer = (function (_EventMap) {
  function Timer(interval) {
    var _this2 = this;

    _classCallCheck(this, Timer);

    _get(Object.getPrototypeOf(Timer.prototype), 'constructor', this).call(this);

    this.interval = interval || 1000;
    this.startTime = -1;

    this.active = false;
    this.paused = false;

    var oldTicks = 0;

    this.tick = function (currentTime) {
      if (!_this2.active || _this2.paused) {
        return;
      }

      if (interval <= 0) {
        return;
      }

      _this2.trigger('tick', currentTime);

      if (currentTime - _this2.startTime - _this2.interval > oldTicks) {
        oldTicks = currentTime;
        _this2.trigger('interval');
      }
    };
  }

  _inherits(Timer, _EventMap);

  _createClass(Timer, [{
    key: 'start',
    value: function start() {
      this.active = true;
      this.paused = false;

      this.startTime = _animframe.performance.now();

      this.trigger('start');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.paused = true;

      this.trigger('pause');
    }
  }, {
    key: 'unpause',
    value: function unpause() {
      this.paused = false;

      this.trigger('unpause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.paused = false;
      this.active = false;

      this.trigger('stop');
    }
  }]);

  return Timer;
})(_eventmap2['default']);

exports['default'] = Timer;
module.exports = exports['default'];