"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var clamp = function clamp(value) {
  var min = arguments[1] === undefined ? 0 : arguments[1];
  var max = arguments[2] === undefined ? 1 : arguments[2];

  if (min > max) {
    var _ref = [max, min];

    var _ref2 = _slicedToArray(_ref, 2);

    min = _ref2[0];
    max = _ref2[1];
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

clamp.array = function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3);

  var value = _ref2[0];
  var min = _ref2[1];
  var max = _ref2[2];

  return clamp(value, min, max);
};

clamp.obj = function (_ref) {
  var value = _ref.value;
  var min = _ref.min;
  var max = _ref.max;

  return clamp(value, min, max);
};

module.exports = clamp;