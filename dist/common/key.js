"use strict";

var Key = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  escape: 27,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  "delete": 46,
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  semiColon: 186,
  equalSign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardSlash: 191,
  openBracket: 219,
  backSlash: 220,
  closeBraket: 221,
  singleQuote: 222
};

Key.define = function (name, key) {
  if (name == null || key == null) {
    return;
  }

  if (!Object.hasOwnProperty.call(Key, name)) {
    if (typeof key === "function") {
      Object.defineProperty(Key, name, {
        get: key
      });
    } else {
      Key[name] = key;
    }
  }
};

module.exports = Key;