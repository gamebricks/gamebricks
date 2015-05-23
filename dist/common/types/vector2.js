'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

'use strict';

var sqrMagnitude = function sqrMagnitude(v) {
  return Vector2.dot(v, v);
};

var Vector2 = (function () {
  function Vector2() {
    var x = arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Vector2);

    this.set(x, y);
  }

  _createClass(Vector2, [{
    key: 'set',
    value: function set() {
      var x = arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments[1] === undefined ? 0 : arguments[1];

      this.x = x;
      this.y = y;
    }
  }, {
    key: 'magnitude',
    get: function () {
      return Math.sqrt(sqrMagnitude(this));
    }
  }, {
    key: 'sqrMagnitude',
    get: function () {
      return sqrMagnitude(this);
    }
  }, {
    key: 'angle',
    get: function () {
      return Math.atan2(this.x, this.y);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.clone();
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Vector2(this.x, this.y);
    }
  }, {
    key: 'add',
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;

      return this;
    }
  }, {
    key: 'subtract',
    value: function subtract(vector) {
      this.x -= vector.x;
      this.y -= vector.y;

      return this;
    }
  }, {
    key: 'multiply',
    value: function multiply(vector) {
      this.x *= vector.x;
      this.y *= vector.y;

      return this;
    }
  }, {
    key: 'divide',
    value: function divide(vector) {
      this.x /= vector.x;
      this.y /= vector.y;

      return this;
    }
  }, {
    key: 'normalize',
    value: function normalize() {
      this.x = this.x / this.magnitude;
      this.y = this.y / this.magnitude;

      return this;
    }
  }, {
    key: 'equals',
    value: function equals(v) {
      return this.x === v.x && this.y === v.y;
    }
  }], [{
    key: 'dot',
    value: function dot(vec1, vec2) {
      return vec1.x * vec2.x + vec1.y * vec2.y;
    }
  }, {
    key: 'fromAngle',
    value: function fromAngle(angle, magnitude) {
      return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(obj) {
      return new Vector2(obj.x, obj.y);
    }
  }, {
    key: 'fromString',
    value: function fromString(str) {
      return Vector2.fromJSON(JSON.parse(str));
    }
  }]);

  return Vector2;
})();

exports['default'] = Vector2;
module.exports = exports['default'];