'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _vector2 = require('./vector2');

var _vector22 = _interopRequireDefault(_vector2);

'use strict';

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

  _createClass(Rect, [{
    key: 'clone',
    value: function clone() {
      return new Rect({ x: this.x, y: this.y, w: this.w, h: this.h });
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return { x: this.x, y: this.y, w: this.w, h: this.h };
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }, {
    key: 'center',
    value: function center() {
      return new _vector22['default'](this.x + this.w / 2, this.y + this.h / 2);
    }
  }, {
    key: 'contains',
    value: function contains(vector) {
      return vector.x >= this.x && vector.y >= this.y && vector.x < this.x + this.w && vector.y < this.y + this.h;
    }
  }], [{
    key: 'fromString',
    value: function fromString(str) {
      var obj = JSON.parse(str);

      return new Rect(obj.x, obj.y, obj.w, obj.h);
    }
  }]);

  return Rect;
})();

exports['default'] = Rect;
module.exports = exports['default'];