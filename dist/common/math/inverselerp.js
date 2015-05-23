'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lerp = require('./lerp');

var _lerp2 = _interopRequireDefault(_lerp);

'use strict';

var inverseLerp = function inverseLerp(min, max, amt) {
  return max - _lerp2['default'](min, max, amt);
};

exports['default'] = inverseLerp;
module.exports = exports['default'];