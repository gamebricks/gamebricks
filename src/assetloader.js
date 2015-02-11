udefine(['root', 'eventmap', './log'], function(root, EventMap, Log) {

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
    EventMap.mixin(this, AssetLoader);

    this.assets = assets || {};
    this.files = {};

    this.maxAssets = 0;
    this.assetsLoaded = 0;
    this.percentLoaded = 0;
    this.cache = {};
  };

  AssetLoader.prototype.start = function() {
    if (assets == null) {
      return;
    }

    this.trigger('start');

    var loadingProgress = function() {

      var percentLoaded = 1;

      if (currentProgress !== totalSize) {
        percentLoaded = currentProgress / totalSize;
      }

      self.trigger('progress', percentLoaded);

      if (currentProgress >= totalSize) {
        self.trigger('complete');
      }
    };

    var loadSuccess = function(iterator) {
      return function() {
        currentProgress += iterator.size;
        self.assetsLoaded++;

        loadingProgress();
      };
    };

    var loadError = function(iterator) {
      return function(err) {
        Log.e('Error while loading ' + iterator.name + ': ' + err);
      };
    };

    if (Object.keys(this.assets) > 0) {
      Object.keys(this.assets).forEach(function(key) {
        var value = this.assets[key];

        if (value.files == null || !Array.isArray(value.files) || value.files.length === 0) {
          return true;
        }

        self.maxAssets += value.files.length;

        for (var i = 0, j = value.files.length; i < j; i++) {
          (function(iterator) {
            // Handle images here
            if (iterator.type.indexOf('image') === 0) {
              // TODO: Reflect: Does it make sense to put the cached images into an object?
              var img = new root.Image();
              img.onload = loadSuccess(iterator);
              img.onerror = loadError(iterator);

              img.src = iterator.name;
            } else {
              // Handle audio here
              if (iterator.type.indexOf('audio') === 0) {
                // TODO: Save preloaded files in the AudioManager
                var audioType = iterator.name.split('.').pop();
                var audio = new root.Audio();
                if (supportedTypes[audioType] && audio.canPlayType(supportedTypes[audioType])) {
                  audio.addEventListener('canplaythrough', loadSuccess(iterator));
                  audio.onerror = loadError(iterator);

                  audio.src = iterator.name;
                  audio.load();
                } else {
                  Log.w('Skipped unsupported audio file (' + supportedTypes[audioType] + ') ' + iterator.name);
                  loadSuccess(iterator)();
                }
              } else {
                Log.w('Skipped file ' + iterator.name + ': Not an audio or image file');
              }
            }

          })(value.files[i]);
        }

      }, this);
    }
  };

  return AssetLoader;

});
