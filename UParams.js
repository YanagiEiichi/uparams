/**/ void function(scope) {
/**/
/**/   // CommonJS
/**/   if (typeof module === 'object' && !!module.exports) return scope(function(name, dependencies, factory) {
/**/     if (typeof name !== 'string') factory = dependencies, dependencies = name, name = null;
/**/     if (!(dependencies instanceof Array)) factory = dependencies, dependencies = [];
/**/     var args;
/**/     args = [  ];
/**/     module.exports = factory.apply(module.exports, args) || module.exports;
/**/   });
/**/
/**/   // AMD, wrap a 'String' to avoid warn of fucking webpack
/**/   if (String(typeof define) === 'function' && !!define.amd) return scope(define);
/**/
/**/   // Global
/**/   scope(function(name, dependencies, factory) {
/**/     if (typeof name !== 'string') factory = dependencies, dependencies = name, name = null;
/**/     if (!(dependencies instanceof Array)) factory = dependencies, dependencies = [];
/**/     var exports = {};
/**/     var args = [];
/**/     for (var i = 0; i < dependencies.length; i++) args[i] = window[dependencies[i]];
/**/     exports = factory.apply(exports, args) || exports;
/**/     if (name) {
/**/       /**/ try { /* Fuck IE8- */
/**/       /**/   if (typeof execScript === 'object') execScript('var ' + name);
/**/       /**/ } catch(error) {}
/**/       window[name] = exports;
/**/     }
/**/   });
/**/
/**/ }(function(define) {

'use strict';

define('UParams', function() {

  // To check special keys
  var isSpecialKey = RegExp.prototype.test.bind(/^(?:toString|valueOf)$/);

  // Main Constructor
  var UParams = function(target) {
    // Auto new
    if (!(this instanceof UParams)) return new UParams(target);
    // Default parameter
    if (!target) target = location.search + location.hash.replace(/^#!/, '#');
    var that = this;
    switch (typeof target) {
      case 'object':
        // Copy properties from target
        for (var i in target) {
          if (!isSpecialKey(i)) that[i] = target[i] + '';
        }
        break;
      case 'string':
        // Match parameters
        target.replace(/([^=?#&]*)=([^?#&]*)/g, function(e, $1, $2) {
          if (!isSpecialKey($1)) that[decodeURIComponent($1)] = decodeURIComponent($2);
        });
    }
  };

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

/**/ });
