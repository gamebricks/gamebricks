"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Vector2 = _interopRequire(require("./vector2"));

var Rect = (function () {
  function Rect() {
    var x = arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments[1] === undefined ? 0 : arguments[1];
    var w = arguments[2] === undefined ? 0 : arguments[2];
    var h = arguments[3] === undefined ? 0 : arguments[3];

    _classCallCheck(this, Rect);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  _createClass(Rect, {
    clone: {
      value: function clone() {
        return new Rect({ x: this.x, y: this.y, w: this.w, h: this.h });
      }
    },
    toJSON: {
      value: function toJSON() {
        return { x: this.x, y: this.y, w: this.w, h: this.h };
      }
    },
    toString: {
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    },
    center: {
      value: function center() {
        return new Vector2(this.x + this.w / 2, this.y + this.h / 2);
      }
    },
    contains: {
      value: function contains(vector) {
        return vector.x >= this.x && vector.y >= this.y && vector.x < this.x + this.w && vector.y < this.y + this.h;
      }
    }
  }, {
    fromString: {
      value: function fromString(str) {
        var obj = JSON.parse(str);

        return new Rect(obj.x, obj.y, obj.w, obj.h);
      }
    }
  });

  return Rect;
})();

module.exports = Rect;