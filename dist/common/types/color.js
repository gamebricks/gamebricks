"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var clamp = _interopRequire(require("../math/clamp"));

//import colorConstants from 'flockn/constants/color';

var Color = (function () {
  function Color() {
    var r = arguments[0] === undefined ? 0 : arguments[0];
    var g = arguments[1] === undefined ? 0 : arguments[1];
    var b = arguments[2] === undefined ? 0 : arguments[2];
    var a = arguments[3] === undefined ? 1 : arguments[3];

    _classCallCheck(this, Color);

    this.set(r, g, b, a);
  }

  _createClass(Color, {
    set: {
      value: function set() {
        var r = arguments[0] === undefined ? 0 : arguments[0];
        var g = arguments[1] === undefined ? 0 : arguments[1];
        var b = arguments[2] === undefined ? 0 : arguments[2];
        var a = arguments[3] === undefined ? 1 : arguments[3];

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    },
    lighten: {
      value: function lighten(factor) {
        factor = clamp(factor, 0, 1);

        this.r = clamp(this.r + factor * 255 | 0, 0, 255);
        this.g = clamp(this.g + factor * 255 | 0, 0, 255);
        this.b = clamp(this.b + factor * 255 | 0, 0, 255);
      }
    },
    darken: {
      value: function darken(factor) {
        factor = clamp(factor, 0, 1);

        this.r = clamp(this.r - factor * 255 | 0, 0, 255);
        this.g = clamp(this.g - factor * 255 | 0, 0, 255);
        this.b = clamp(this.b - factor * 255 | 0, 0, 255);
      }
    },
    fadeIn: {
      value: function fadeIn(factor) {
        factor = clamp(factor, 0, 1);

        this.a = this.a + this.a * factor;
        if (this.a > 1) {
          this.a = 1;
        }
      }
    },
    fadeOut: {
      value: function fadeOut(factor) {
        factor = clamp(factor, 0, 1);

        this.a = this.a - this.a * factor;
        if (this.a < 0) {
          this.a = 0;
        }
      }
    },
    toJSON: {
      value: function toJSON() {
        if (this.a < 1) {
          if (this.a === 0) {
            return "transparent";
          } else {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
          }
        } else {
          return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        }
      }
    },
    toString: {
      value: function toString() {
        return this.toJSON();
      }
    },
    toHex: {
      value: function toHex() {
        return "#" + this.r.toString(16) + "" + this.g.toString(16) + "" + this.b.toString(16);
      }
    }
  }, {
    random: {

      // Getting a random color for debugging is quite useful sometimes

      value: function random() {
        var col = [0, 0, 0];

        col = col.map(function () {
          return ~ ~(Math.random() * 255);
        });

        return new Color(col[0], col[1], col[2]);
      }
    }
  });

  return Color;
})();

/*for (var colorName in colorConstants) {
  var colorValue = colorConstants[colorName];

  (function(colorName, colorValue) {
    Color[colorName] = function() {
      var col = new Color(colorValue.r, colorValue.g, colorValue.b, colorValue.a);
      col.name = colorName;
      return col;
    };
  })(colorName, colorValue);
}*/

module.exports = Color;