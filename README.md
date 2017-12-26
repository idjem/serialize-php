

serialize-php
==================
[![Build Status](https://travis-ci.org/idjem/serialize-php.svg?branch=master)](https://travis-ci.org/idjem/serialize-php)
[![Version](https://img.shields.io/npm/v/serialize-php.svg)](https://www.npmjs.com/package/serialize-php)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)

Javascript tool to:
  * unserialize php serialized data.
  * serialize data the way php does.

Installation
------------

### Node.js

Install from npm:
```sh
npm install serialize-php
```

Usage
-----
### Serialize
```js
var serialize = require("serialize-php").serialize;
var result = serialize({key : "test serialize"})
console.log(result);
//a:1:{s:3:"key";s:14:"test serialize";}
```

### Unserialize
```js
var unserialize = require("serialize-php").unserialize;
var result      = unserialize("a:1:{s:3:\"key\";s:16:\"test unserialize\"}");
console.log(result.key);
//test unserialize
```

