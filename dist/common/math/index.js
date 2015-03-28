"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var clamp = _interopRequire(require("./clamp"));

var lerp = _interopRequire(require("./lerp"));

var inverseLerp = _interopRequire(require("./inverselerp"));

module.exports = { clamp: clamp, lerp: lerp, inverseLerp: inverseLerp };