'use strict';

define('UParams', function() {

  var UParams = function(target) {
    // Auto new
    if(!(this instanceof UParams)) return new UParams(target);
    // Default parameter
    if (!target) target = location.search + location.hash;
    var that = this;
    switch (typeof target) {
      case 'object':
        // Copy properties from target
        for (var i in target) {
          if (!UParams.isSpecialKey(i)) that[i] = target[i] + '';
        }
        break;
      case 'string':
        // Match parameters
        target.replace(/([^=?#&]*)=([^?#&]*)/g, function(e, $1, $2) {
          if (!UParams.isSpecialKey($1)) that[decodeURIComponent($1)] = decodeURIComponent($2);
        });
    }
  };

  // To check special keys
  UParams.isSpecialKey = RegExp.prototype.test.bind(/^(?:toString|valueOf)$/);

  // Define the hidden toString method
  Object.defineProperty(UParams.prototype, 'toString', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function() {
      var that = this;
      // Join to a http query string
      return Object.keys(that).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(that[key]);
      }).join('&');
    }
  });

  return UParams;

});
