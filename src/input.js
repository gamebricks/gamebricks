'use strict';

import EventMap from 'eventmap';
import Key from './key';

var Input = {};

Input.define = Key.define;
Input.key = new EventMap();

window.addEventListener('keydown', function(evt) {
  Input.key.trigger({
    name: 'down',
    context: Key
  }, evt.keyCode);
}, true);

window.addEventListener('keyup', function(evt) {
  Input.key.trigger({
    name: 'up',
    context: Key
  }, evt.keyCode);
}, true);

export default Input;