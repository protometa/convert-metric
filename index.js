
var convert = require('convert-units');

module.exports = function (str,sig,strict) {
  var sig = Math.floor(sig) || 4;
  var str = str || '';

  if (typeof str != 'string') throw new TypeError('convert-metric requires a string argument');
  if (sig < 0) throw new RangeError('sig digits cannot be negative');

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

      if (!strict){
        // if sig digits is not strict round to casual significant digit precision (trailing zeros not counted)
        var exponent = Math.ceil( Math.log(resScalar) / Math.LN10 )

        if (exponent > sig){
          res = (Math.round( resScalar / Math.pow(10,exponent-sig) ) * Math.pow(10,exponent-sig)).toString()
        } else {
          res = resScalar.toPrecision(sig);
        }

        // and trim trailing decimal zeros
        res = res.match(/(\d+\.\d*[1-9]+|\d+)\.?0*$/)[1];

      } else {
        // to string with strict significant digit precision
        res = resScalar.toPrecision(sig);
      }

      res += ' '+resUnit;

      str = str.replace(org, res);

    }
  }

  return str;
}