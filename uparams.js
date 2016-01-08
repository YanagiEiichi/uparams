'use strict';

var UParams = function(target) {
  if(!(this instanceof UParams)) return new UParams(target);
  if (!target) target = location.search + location.hash;
  var that = this;
  switch (typeof target) {
    case 'object':
      for (var i in target) {
        if (!UParams.isSpecialKey(i)) that[i] = target[i] + '';
      }
      break;
    case 'string':
      target.replace(/([^=?#&]*)=([^?#&]*)/g, function(e, $1, $2) {
        if (!UParams.isSpecialKey($1)) that[decodeURIComponent($1)] = decodeURIComponent($2);
      });
  }
};

UParams.isSpecialKey = RegExp.prototype.test.bind(/^(?:toString|valueOf)$/);

Object.defineProperty(UParams.prototype, 'toString', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: function() {
    var that = this;
    return location.origin + location.pathname + '#' + Object.keys(that).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(that[key]);
    }).join('&');
  }
});
