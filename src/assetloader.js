'use strict';

import EventMap from 'eventmap';
import Log from './log';

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

class AssetLoader extends EventMap {
  constructor(assets) {
    super();

    this.assets = assets || {};
    this.files = {};

    this.maxAssets = 0;
    this.assetsLoaded = 0;
    this.percentLoaded = 0;
    this.cache = {};
  }
  
  start() {
    // TODO: Something was wrong here. So it's deleted right now
  }
}

export default AssetLoader;
