"use strict";

// TODO: Make this pretties and more ES6-like
var clamp = function clamp(value, min, max) {
  var _ref, _ref1, _ref2;
  if (typeof value === "object") {
    _ref = value, min = _ref.min, max = _ref.max, value = _ref.value;
  }
  if (Array.isArray(min)) {
    _ref1 = min, min = _ref1[0], max = _ref1[1];
  }
  if (min == null) {
    min = 0;
  }
  if (max == null) {
    max = 1;
  }
  if (min > max) {
    _ref2 = [max, min], min = _ref2[0], max = _ref2[1];
  }
  if (min <= value && value <= max) {
    return value;
  } else {
    if (value > max) {
      return max;
    } else {
      return min;
    }
  }
};

module.exports = clamp;