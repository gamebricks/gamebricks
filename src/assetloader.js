udefine(['eventmap', 'mixedice'], function(EventMap, mixedice) {

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

  var AssetLoader = function(assets) {
    mixedice([this, Preloader.prototype], new EventMap());

    this.assets = assets || {};
    this.files = {};

    this.maxAssets = 0;
    this.assetsLoaded = 0;
    this.percentLoaded = 0;
  };

  AssetLoader.prototype.start = function() {
    if (assets == null) {
      return;
    }

    this.trigger('start');

    if (Object.keys(this.assets) > 0) {
      Object.keys(this.assets).forEach(function(key) {
        var value = this.assets[key];

      });
    }
  };

  return AssetLoaderoader;

});
