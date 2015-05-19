"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventMap = _interopRequire(require("eventmap"));

var BezierEasing = _interopRequire(require("bezier-easing"));

var Loop = _interopRequire(require("./loop"));

var Tween = (function (_EventMap) {
  function Tween() {
    _classCallCheck(this, Tween);

    this.target = null;
  }

  _inherits(Tween, _EventMap);

  _createClass(Tween, {
    animate: {
      value: function animate(property, end, time, easing) {
        var self = this;

        if (this.target && typeof this.target[property] === "number") {
          var start = this.target[property];

          if (start === end) {
            this.trigger("start");
            this.trigger("end");
            return;
          }

          easing = easing || "linear";

          var timer = Loop.createTimer();

          timer.interval = time;

          timer.on("start", function () {
            self.trigger("start");
          });

          timer.start();

          timer.on("tick", function (ticks) {
            var multiplicator = BezierEasing.css[easing](ticks / (timer.startTime + timer.interval));
            var points = (end - start) * multiplicator;

            if (points > end) {
              points = end;
            }

            self.target[property] = points;
            self.trigger("animate", points);
          });

          timer.on("interval", function () {
            timer.stop();
            self.target[property] = end;
            self.trigger("end");
          });
        }
      }
    }
  });

  return Tween;
})(EventMap);

module.exports = Tween;