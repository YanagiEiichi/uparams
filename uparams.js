'use strict';

/**/ void function() {

// UMD
var umd = function(name, component) {
  switch(true) {
    // CommonJS
    case typeof module === 'object' && !!module.exports:
      module.exports = component;
      break;
    // AMD (Add a 'String' wrapper here to fuck webpack)
    case String(typeof define) === 'function' && !!define.amd:
      define(name, function() { return component; });
      break;
    // Global
    default:
      /**/ try { /* Fuck IE8- */
      /**/   if(typeof execScript === 'object') execScript('var ' + name);
      /**/ } catch(error) {}
      window[name] = component;
  }
};

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
    // Join to a complete hash URL
    return location.origin + location.pathname + '#' + Object.keys(that).map(function(key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(that[key]);
    }).join('&');
  }
});

// UMD Export
umd('UParams', UParams);

/**/ }();
