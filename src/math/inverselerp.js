udefine('inverselerp', ['lerp'], function(lerp) {
	return function(min, max, amt) {
		return max - lerp(min, max, amt);
	};
});
