"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var clamp = _interopRequire(require("./clamp"));

var lerp = function lerp(min, max, amt) {
  var tmpAmt = clamp(amt, 0, 1);
  var diff = Math.abs(max - min);

  if (diff === 0) {
    return min;
  } else {
    return min + diff * tmpAmt;
  }
};

module.exports = lerp;