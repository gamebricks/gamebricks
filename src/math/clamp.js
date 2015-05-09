'use strict';

var clamp = function(value, min = 0.0, max = 1.0) {
  if (min > max) {
    [min, max] = [max, min];
  }

  if ((min <= value && value <= max)) {
    return value;
  } else {
    if (value > max) {
      return max;
    } else {
      return min;
    }
  }
};

clamp.array = function([value, min, max]) {
  return clamp(value, min, max);
};

clamp.obj = function({value, min, max}) {
  return clamp(value, min, max);
};

export default clamp;
