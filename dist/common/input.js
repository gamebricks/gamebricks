"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var EventMap = _interopRequire(require("eventmap"));

var Key = _interopRequire(require("./key"));

var Input = {};

Input.define = Key.define;
Input.key = new EventMap();

window.addEventListener("keydown", function (evt) {
  Input.key.trigger({
    name: "down",
    context: Key
  }, evt.keyCode);
}, true);

window.addEventListener("keyup", function (evt) {
  Input.key.trigger({
    name: "up",
    context: Key
  }, evt.keyCode);
}, true);

module.exports = Input;