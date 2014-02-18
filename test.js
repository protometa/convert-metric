
var assert = require('assert'),
    convert = require('./index.js');

function tc (input, expected, sig, strict) { // conversion test case
	if (input == undefined || expected == undefined) throw new Error('invalid test args');
	var actual = convert(input,sig,strict);
	assert( actual == expected, '"'+input+'" -> "'+actual+'" expected: "'+expected+'"' );  
}
  
console.log('testing api...');

assert( typeof convert == 'function', 'convert is not a function' );
assert( typeof convert() == 'string', 'convert did not return a string' );
assert.throws( function(){ convert(12) }, 'convert-metric requires a string argument');
assert.throws( function(){ convert('',-1) }, 'sig digits cannot be negative');

console.log('testing conversions...');

tc('2 ft','60.96 cm');
tc('3ft','91.44 cm'); // test without space
tc('3.281 ft','1 m'); // testing around transition
tc('3.283 ft','1.001 m');
tc('3.280 ft','99.97 cm');
tc('5 feet','1.52 m',3); // full and plural names
tc('1 inch','2.54 cm');
tc('2 inches long','5.08 cm long');
tc('Remote Switch, 12 ft Lead','Remote Switch, 3.66 m Lead',3); // real world examples
tc('2 gauge, 72 in','2 gauge, 183 cm',3);
tc('3/8 in x 80 ft','9.52 mm x 24.4 m',3);
tc('2.5 in x 9.0 in','6.3 cm x 23 cm',2);
tc('10.0 in x 4.5 in','25.4 cm x 11.4 cm',3,true);
tc('21.83 in L x 6.3 in D x 6.97 in H','55.4 cm L x 16.0 cm D x 17.7 cm H',3,true);
tc('89 lb','40.4 kg',3); // weight
tc('12000 lb','5443 kg');

console.log('testing bug #1...');
tc('12000 lb','5440 kg',3);
tc('12000 lb','5.44e+3 kg',3,true); // strict will use exponential notation if necessary
tc('0.012 lb','0.00544 kg',3);
tc('2 ft','61 cm',2);
tc('12000 lb','5000 kg',1);


console.log('testing passed!');