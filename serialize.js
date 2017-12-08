'use strict';

var _utf8Size = function (str) {
  return ~-encodeURI(str).split(/%..|./).length;
};

var kindOf = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};


module.exports = function serialize(mixedValue) {
  var val;
  var vals = '';
  var count = 0;

  var type = kindOf(mixedValue);

  switch (type) {
    case 'Function':
      val = '';
      break;
    case 'Boolean':
      val = 'b:' + (mixedValue ? '1' : '0');
      break;
    case 'Number':
      val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue;
      break;
    case 'String':
      val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"';
      break;
    case 'Array':
    case 'Object':
      val = 'a';
      for (var key in mixedValue) {
        if (mixedValue.hasOwnProperty(key)) {
          var ktype = kindOf(mixedValue[key]);
          if (ktype === 'Function') {
            continue;
          }

          var okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
          vals += serialize(okey) + serialize(mixedValue[key]);
          count++;
        }
      }
      val += ':' + count + ':{' + vals + '}';
      break;
    case 'Undefined':
    default:
      val = 'N';
      break;
  }
  if (type !== 'Object' && type !== 'Array') {
    val += ';';
  }

  return val;
}