'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventmap = require('eventmap');

var _eventmap2 = _interopRequireDefault(_eventmap);

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

'use strict';

var Input = {};

Input.Key = _key2['default'];
Input.define = _key2['default'].define;

// TODO: Find a different name
Input.key = new _eventmap2['default']();

window.addEventListener('keydown', function (evt) {
  Input.key.trigger({
    name: 'down',
    context: _key2['default']
  }, evt.keyCode);
}, true);

window.addEventListener('keyup', function (evt) {
  Input.key.trigger({
    name: 'up',
    context: _key2['default']
  }, evt.keyCode);
}, true);

exports['default'] = Input;
module.exports = exports['default'];