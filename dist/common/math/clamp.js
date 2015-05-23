'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

'use strict';

var clamp = function clamp(value) {
  var min = arguments[1] === undefined ? 0 : arguments[1];
  var max = arguments[2] === undefined ? 1 : arguments[2];

  if (min > max) {
    var _temp = [max, min];
    min = _temp[0];
    max = _temp[1];
    _temp;
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

clamp.obj = function (_ref3) {
  var value = _ref3.value;
  var min = _ref3.min;
  var max = _ref3.max;

  return clamp(value, min, max);
};

exports['default'] = clamp;
module.exports = exports['default'];