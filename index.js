
var convert = require('convert-units');

module.exports = function (str,sig,strict) {
  var sig = sig || 4;

  if (!str || typeof str != 'string') return ''; //throw 'metric requires a string argument'

  // find all labeled measurements in string
  var measurements = str.match(/\b\d+(\.|\/)?\d*\s?(ft|foot|feet|in|inch(es)?|lbs?|pounds?)\b/g);

  if (measurements) {

    for (var i = 0; i < measurements.length; i++) {
      var org = measurements[i], orgScalar, orgUnit = org.match(/[a-z]+$/)[0], res, resScalar, resUnit, fraction;

      if ( fraction = org.match(/(\d+)\/(\d+)/) ){
        orgScalar = fraction[1] / fraction[2];
      } else {
        orgScalar = parseFloat(org);
      }

      switch (orgUnit){

        case 'ft': case 'foot': case 'feet':
          orgUnit = 'ft';
          if ( orgScalar >= 3.281 ){
            resUnit = 'm';
          } else {
            resUnit = 'cm';
          }
          break;

        case 'in': case 'inch': case 'inches':
          orgUnit = 'in';
          if (orgScalar >= 0.3937){
            resUnit = 'cm';
          } else {
            resUnit = 'mm';
          }
          break;

        case 'lb': case 'lbs': case 'pound': case 'pounds':
          orgUnit = 'lb';
          resUnit = 'kg';
          break;

        default:
          throw new Error('no conversion defined for unit: '+orgUnit);
      }

      resScalar = convert(orgScalar).from(orgUnit).to(resUnit);

      // to string with significant digit precision
      res = resScalar.toPrecision(sig);

      if (!strict){ // trim trailing zeros if sig digits is not strict
        res = res.match(/(\d+\.\d*[1-9]+|\d+)\.?0*$/)[1];
      }

      res += ' '+resUnit;

      str = str.replace(org, res);

    }
  }

  return str;
}