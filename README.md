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

// Convert to a QueryString
params.toString() === 'a=1&b=2&c=3&d=4';
```

You can load UParams with UMD

```
require(['UParams'], UParams => {
  // DO SOMETHING
});
```

#### Run Testing Case

```bash
cd tests
bower install
cd ..
python -m SimpleHTTPServer &
open http://127.0.0.1:8000/tests
```
