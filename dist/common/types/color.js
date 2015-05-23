'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mathClamp = require('../math/clamp');

var _mathClamp2 = _interopRequireDefault(_mathClamp);

'use strict';

// TODO: Provide color constants
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

  _createClass(Color, [{
    key: 'set',
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
  }, {
    key: 'lighten',
    value: function lighten(factor) {
      factor = _mathClamp2['default'](factor, 0, 1);

      this.r = _mathClamp2['default'](this.r + factor * 255 | 0, 0, 255);
      this.g = _mathClamp2['default'](this.g + factor * 255 | 0, 0, 255);
      this.b = _mathClamp2['default'](this.b + factor * 255 | 0, 0, 255);
    }
  }, {
    key: 'darken',
    value: function darken(factor) {
      factor = _mathClamp2['default'](factor, 0, 1);

      this.r = _mathClamp2['default'](this.r - factor * 255 | 0, 0, 255);
      this.g = _mathClamp2['default'](this.g - factor * 255 | 0, 0, 255);
      this.b = _mathClamp2['default'](this.b - factor * 255 | 0, 0, 255);
    }
  }, {
    key: 'fadeIn',
    value: function fadeIn(factor) {
      factor = _mathClamp2['default'](factor, 0, 1);

      this.a = this.a + this.a * factor;
      if (this.a > 1) {
        this.a = 1;
      }
    }
  }, {
    key: 'fadeOut',
    value: function fadeOut(factor) {
      factor = _mathClamp2['default'](factor, 0, 1);

      this.a = this.a - this.a * factor;
      if (this.a < 0) {
        this.a = 0;
      }
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      if (this.a < 1) {
        if (this.a === 0) {
          return 'transparent';
        } else {
          return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
        }
      } else {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
      }
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.toJSON();
    }
  }, {
    key: 'toHex',
    value: function toHex() {
      return '#' + this.r.toString(16) + '' + this.g.toString(16) + '' + this.b.toString(16);
    }
  }], [{
    key: 'random',

    // Getting a random color for debugging is quite useful sometimes
    value: function random() {
      var col = [0, 0, 0];

      col = col.map(function () {
        return ~ ~(Math.random() * 255);
      });

      return new Color(col[0], col[1], col[2]);
    }
  }]);

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

exports['default'] = Color;
module.exports = exports['default'];