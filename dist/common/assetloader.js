"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventMap = _interopRequire(require("eventmap"));

var Log = _interopRequire(require("./log"));

var audioTypes = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg"
};

var imageTypes = {
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif"
};

var AssetLoader = (function (_EventMap) {
  function AssetLoader(assets) {
    _classCallCheck(this, AssetLoader);

    this.assets = assets || {};
    this.files = {};

    this.maxAssets = 0;
    this.assetsLoaded = 0;
    this.percentLoaded = 0;
    this.cache = {};
  }

  _inherits(AssetLoader, _EventMap);

  _createClass(AssetLoader, {
    start: {
      value: function start() {}
    }
  });

  return AssetLoader;
})(EventMap);

module.exports = AssetLoader;

// TODO: Something was wrong here. So it's deleted right now