'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

'use strict';

var lerp = function lerp(min, max, amt) {
  var tmpAmt = _clamp2['default'](amt, 0, 1);
  var diff = Math.abs(max - min);

  if (diff === 0) {
    return min;
  } else {
    return min + diff * tmpAmt;
  }
};

exports['default'] = lerp;
module.exports = exports['default'];