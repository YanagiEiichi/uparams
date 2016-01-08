var UParams = function(target) {
  if(!(this instanceof UParams)) return new UParams(target);
  if (!target) target = location.search + location.hash;
  switch (typeof target) {
    case 'object':
      for (let i in target) {
        if (!UParams.isSpecialKey(i)) this[i] = target[i] + '';
      }
      break;
    case 'string':
      target.replace(/([^=?#&]*)=([^?#&]*)/g, (e, $1, $2) => {
        if (!UParams.isSpecialKey($1)) this[decodeURIComponent($1)] = decodeURIComponent($2);
      });
  }
};

UParams.isSpecialKey = RegExp.prototype.test.bind(/^(?:toString|valueOf)$/);

Object.defineProperty(UParams.prototype, 'toString', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: function() {
    return location.origin + location.pathname + '#' + Object.keys(this).map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(this[key]);
    }).join('&');
  }
});
