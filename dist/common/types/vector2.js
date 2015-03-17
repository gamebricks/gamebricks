"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

  _createClass(Vector2, {
    set: {
      value: function set() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];

        this.x = x;
        this.y = y;
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
    angle: {
      get: function () {
        return Math.atan2(this.x, this.y);
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
    clone: {
      value: function clone() {
        return new Vector2(this.x, this.y);
      }
    },
    add: {
      value: function add(vector) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
      }
    },
    subtract: {
      value: function subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
      }
    },
    multiply: {
      value: function multiply(vector) {
        this.x *= vector.x;
        this.y *= vector.y;

        return this;
      }
    },
    divide: {
      value: function divide(vector) {
        this.x /= vector.x;
        this.y /= vector.y;

        return this;
      }
    },
    normalize: {
      value: function normalize() {
        this.x = this.x / this.magnitude;
        this.y = this.y / this.magnitude;

        return this;
      }
    },
    equals: {
      value: function equals(v) {
        return this.x === v.x && this.y === v.y;
      }
    }
  }, {
    dot: {
      value: function dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
      }
    },
    fromAngle: {
      value: function fromAngle(angle, magnitude) {
        return new Vector2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
      }
    },
    fromJSON: {
      value: function fromJSON(obj) {
        return new Vector2(obj.x, obj.y);
      }
    },
    fromString: {
      value: function fromString(str) {
        return Vector2.fromJSON(JSON.parse(str));
      }
    }
  });

  return Vector2;
})();

module.exports = Vector2;