'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _lerp = require('./lerp');

var _lerp2 = _interopRequireDefault(_lerp);

var _inverselerp = require('./inverselerp');

var _inverselerp2 = _interopRequireDefault(_inverselerp);

'use strict';

exports['default'] = { clamp: _clamp2['default'], lerp: _lerp2['default'], inverseLerp: _inverselerp2['default'] };
module.exports = exports['default'];