"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var lerp = _interopRequire(require("./lerp"));

var inverseLerp = function inverseLerp(min, max, amt) {
  return max - lerp(min, max, amt);
};

module.exports = inverseLerp;