'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _eventmap = require('eventmap');

var _eventmap2 = _interopRequireDefault(_eventmap);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

'use strict';

var audioTypes = {
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'ogg': 'audio/ogg'
};

var imageTypes = {
  'png': 'image/png',
  'jpg': 'image/jpg',
  'gif': 'image/gif'
};

var AssetLoader = (function (_EventMap) {
  function AssetLoader(assets) {
    _classCallCheck(this, AssetLoader);

    _get(Object.getPrototypeOf(AssetLoader.prototype), 'constructor', this).call(this);

    this.assets = assets || {};
    this.files = {};

    this.maxAssets = 0;
    this.assetsLoaded = 0;
    this.percentLoaded = 0;
    this.cache = {};
  }

  _inherits(AssetLoader, _EventMap);

  _createClass(AssetLoader, [{
    key: 'start',
    value: function start() {}
  }]);

  return AssetLoader;
})(_eventmap2['default']);

exports['default'] = AssetLoader;
module.exports = exports['default'];

// TODO: Something was wrong here. So it's deleted right now