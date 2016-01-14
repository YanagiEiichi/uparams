/**/ void function(scope) {
/**/ 
/**/   // CommonJS
/**/   if (typeof module === 'object' && !!module.exports) return scope(function(name, dependencies, factory) {
/**/     if(factory === void 0) factory = dependencies, dependencies = [];
/**/     var args = [];
/**/     for(var i = 0; i < dependencies.length; i++) args[i] = require(dependencies[i]);
/**/     module.exports = factory.apply(module.exports, args) || module.exports;
/**/   });
/**/ 
/**/   // AMD, wrap a 'String' to avoid warn of fucking webpack
/**/   if (String(typeof define) === 'function' && !!define.amd) return scope(define);
/**/ 
/**/   // Global
/**/   scope(function(name, dependencies, factory) {
/**/     if(factory === void 0) factory = dependencies, dependencies = [];
/**/     /**/ try { /* Fuck IE8- */
/**/     /**/   if(typeof execScript === 'object') execScript('var ' + name);
/**/     /**/ } catch(error) {}
/**/     window[name] = {}; 
/**/     var args = [];
/**/     for(var i = 0; i < dependencies.length; i++) args[i] = window[dependencies[i]];
/**/     window[name] = factory.apply(window[name], args) || window[name];
/**/   });
/**/ 
/**/ }(function(define) {

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
      // Join to a complete hash URL
      return location.origin + location.pathname + '#' + Object.keys(that).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(that[key]);
      }).join('&');
    }
  });

  return UParams;

});

/**/ });
