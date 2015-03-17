'use strict';

import lerp from './lerp';

var inverseLerp = function(min, max, amt) {
  return max - lerp(min, max, amt);
};

export default inverseLerp;
