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

var _bezierEasing = require('bezier-easing');

var _bezierEasing2 = _interopRequireDefault(_bezierEasing);

var _loop = require('./loop');

var _loop2 = _interopRequireDefault(_loop);

'use strict';

var Tween = (function (_EventMap) {
  function Tween() {
    _classCallCheck(this, Tween);

    _get(Object.getPrototypeOf(Tween.prototype), 'constructor', this).call(this);

    this.target = null;
  }

  _inherits(Tween, _EventMap);

  _createClass(Tween, [{
    key: 'animate',
    value: function animate(property, end, time, easing) {
      var self = this;

      if (this.target && typeof this.target[property] === 'number') {
        var start = this.target[property];

        if (start === end) {
          this.trigger('start');
          this.trigger('end');
          return;
        }

        easing = easing || 'linear';

        var timer = _loop2['default'].createTimer();

        timer.interval = time;

        timer.on('start', function () {
          self.trigger('start');
        });

        timer.start();

        timer.on('tick', function (ticks) {
          var multiplicator = _bezierEasing2['default'].css[easing](ticks / (timer.startTime + timer.interval));
          var points = (end - start) * multiplicator;

          if (points > end) {
            points = end;
          }

          self.target[property] = points;
          self.trigger('animate', points);
        });

        timer.on('interval', function () {
          timer.stop();
          self.target[property] = end;
          self.trigger('end');
        });
      }
    }
  }]);

  return Tween;
})(_eventmap2['default']);

exports['default'] = Tween;
module.exports = exports['default'];