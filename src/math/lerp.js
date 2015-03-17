'use strict';

import clamp from './clamp';

var lerp = function(min, max, amt) {
  var tmpAmt = clamp(amt, 0.0, 1.0);
  var diff = Math.abs(max - min);

  if (diff === 0) {
    return min;
  } else {
    return min + (diff * tmpAmt);
  }
};

export default lerp;