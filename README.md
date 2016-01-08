## UParams

Parse URL parameters whatever hash or queryString.

#### Usage

```javascript
var params = new UParams('http://xxx/xxx?a=1&b=2#c=3&d=4');
// The same to
// var params = new UParams({ a: 1, b: 2, c: 3, d: 4 });

// NOTE: Always string
params.a === '1';
params.b === '2';
params.c === '3';
params.d === '4';

// Convert to current URL with params (NOTE: use hash style)
params.toString() === document.origin + location.path + '#a=1&b=2&c=3&d=4';
```
