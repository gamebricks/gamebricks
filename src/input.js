'use strict';

import EventMap from 'eventmap';
import Key from './key';

var Input = {};

Input.Key = Key;
Input.define = Key.define;

// TODO: Find a different name
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