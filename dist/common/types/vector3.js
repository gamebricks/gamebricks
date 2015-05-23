'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

'use strict';

var sqrMagnitude = function sqrMagnitude(v) {
  return Vector3.dot(v, v);
};

var Vector3 = (function () {
  function Vector3() {
    var x = arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments[1] === undefined ? 0 : arguments[1];
    var z = arguments[2] === undefined ? 0 : arguments[2];

    _classCallCheck(this, Vector3);

    this.set(x, y, z);
  }

  _createClass(Vector3, [{
    key: 'set',
    value: function set() {
      var x = arguments[0] === undefined ? 0 : arguments[0];
      var y = arguments[1] === undefined ? 0 : arguments[1];
      var z = arguments[2] === undefined ? 0 : arguments[2];

      this.x = x;
      this.y = y;
      this.z = z;
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
    key: 'clone',
    value: function clone() {
      return new Vector3(this.x, this.y, this.z);
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
    key: 'add',
    value: function add(vector) {
      this.x += vector.x;
      this.y += vector.y;
      this.z += vector.z;

      return this;
    }
  }, {
    key: 'subtract',
    value: function subtract(vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      this.z -= vector.z;

      return this;
    }
  }, {
    key: 'multiply',
    value: function multiply(vector) {
      this.x *= vector.x;
      this.y *= vector.y;
      this.z *= vector.z;

      return this;
    }
  }, {
    key: 'divide',
    value: function divide(vector) {
      this.x /= vector.x;
      this.y /= vector.y;
      this.z /= vector.z;

      return this;
    }
  }, {
    key: 'normalize',
    value: function normalize() {
      this.x = this.x / this.magnitude;
      this.y = this.y / this.magnitude;
      this.z = this.z / this.magnitude;

      return this;
    }
  }, {
    key: 'equals',
    value: function equals(v) {
      return this.x === v.x && this.y === v.y && this.z === v.z;
    }
  }], [{
    key: 'dot',
    value: function dot(vec1, vec2) {
      return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }
  }, {
    key: 'cross',
    value: function cross(vec1, vec2) {
      return new Vector3(vec1.y * vec2.z - vec2.y * vec1.z, vec1.z * vec2.x - vec2.z * vec1.x, vec1.x * vec2.y - vec2.x * vec1.y);
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(obj) {
      return new Vector3(obj.x, obj.y, obj.z);
    }
  }, {
    key: 'fromString',
    value: function fromString(str) {
      return Vector3.fromJSON(JSON.parse(str));
    }
  }, {
    key: 'forward',
    value: function forward() {
      return new Vector3(0, 0, 1);
    }
  }, {
    key: 'right',
    value: function right() {
      return new Vector3(1, 0, 0);
    }
  }, {
    key: 'one',
    value: function one() {
      return new Vector3(1, 1, 1);
    }
  }, {
    key: 'up',
    value: function up() {
      return new Vector3(0, 1, 0);
    }
  }, {
    key: 'zero',
    value: function zero() {
      return new Vector3(0, 0, 0);
    }
  }]);

  return Vector3;
})();

exports['default'] = Vector3;
module.exports = exports['default'];