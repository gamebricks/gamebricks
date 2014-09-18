udefine(function() {
  
  var Tween = (function() {
    
    var Tween = function() {
      this.target = null;
    };
    
    Tween.prototype.animate = function(property, end, time) {
      if (this.target && typeof this.target[property] === 'number') {
      	var start = this.target[property];
      	
      	var animateId = 'animate-' + Date.now();
      	
      	
      }
    };
  })();
  
  return Tween;
  
});
