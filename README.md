Convert Metric
==============

Converts a string with imperial units to metric units.

```js
convert( string, sig, strict )
```

By default, the conversion is casually rounded to four figures with trailing zeros trimmed. The desired number of significant figures can be specified with the optional `sig` argument. Trailing zeros can be preserved with an optional `strict` flag.

Usage
-----

```js
var convert = require('convert-metric');

convert('2 ft') // returns '60.96 cm'
```

Spaces are optional.

```js
convert('3ft') // returns '91.44 cm'
```

The appropriate metric unit is chosen automatically.

```js
convert('3.281 ft') // returns '1m' (measurements >= 1 m return with m)
convert('3.280 ft') // returns '99.97 cm' (measurements < 1 m return with cm)
```

Full and plural unit names are recognized.

```js
convert('5 feet', 3) // returns '1.52 m'
```

Fractional measurements are recognized. (Mixed fractions are not yet supported.)

```js
convert('3/8 in', 3) // returns '9.52 mm'
```

All recognized measurements in a string are converted.

```js
convert('Remote Switch, 12 ft Lead') // returns 'Remote Switch, 3.66 m Lead'
convert('2 gauge, 72 in', 3) // returns '2 gauge, 183 cm'
convert('3/8 in x 80 ft', 3) // returns '9.52 mm x 24.4 m'
convert('21.83 in L x 6.3 in D x 6.97 in H', 3, true) //returns '55.4 cm L x 16.0 cm D x 17.7 cm H'
```

Supported Conversions
---------------------
- in to mm or cm
- ft to cm or m
- lb to kg




