"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

  _createClass(Vector3, {
    set: {
      value: function set() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];
        var z = arguments[2] === undefined ? 0 : arguments[2];

        this.x = x;
        this.y = y;
        this.z = z;
      }
    },
    magnitude: {
      get: function () {
        return Math.sqrt(sqrMagnitude(this));
      }
    },
    sqrMagnitude: {
      get: function () {
        return sqrMagnitude(this);
      }
    },
    clone: {
      value: function clone() {
        return new Vector3(this.x, this.y, this.z);
      }
    },
    toJSON: {
      value: function toJSON() {
        return this.clone();
      }
    },
    toString: {
      value: function toString() {
        return JSON.stringify(this.toJSON());
      }
    },
    add: {
      value: function add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;

        return this;
      }
    },
    subtract: {
      value: function subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;

        return this;
      }
    },
    multiply: {
      value: function multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;

        return this;
      }
    },
    divide: {
      value: function divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        this.z /= vector.z;

        return this;
      }
    },
    normalize: {
      value: function normalize() {
        this.x = this.x / this.magnitude;
        this.y = this.y / this.magnitude;
        this.z = this.z / this.magnitude;

        return this;
      }
    },
    equals: {
      value: function equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
      }
    }
  }, {
    dot: {
      value: function dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
      }
    },
    cross: {
      value: function cross(vec1, vec2) {
        return new Vector3(vec1.y * vec2.z - vec2.y * vec1.z, vec1.z * vec2.x - vec2.z * vec1.x, vec1.x * vec2.y - vec2.x * vec1.y);
      }
    },
    fromJSON: {
      value: function fromJSON(obj) {
        return new Vector3(obj.x, obj.y, obj.z);
      }
    },
    fromString: {
      value: function fromString(str) {
        return Vector3.fromJSON(JSON.parse(str));
      }
    },
    forward: {
      value: function forward() {
        return new Vector3(0, 0, 1);
      }
    },
    right: {
      value: function right() {
        return new Vector3(1, 0, 0);
      }
    },
    one: {
      value: function one() {
        return new Vector3(1, 1, 1);
      }
    },
    up: {
      value: function up() {
        return new Vector3(0, 1, 0);
      }
    },
    zero: {
      value: function zero() {
        return new Vector3(0, 0, 0);
      }
    }
  });

  return Vector3;
})();

module.exports = Vector3;