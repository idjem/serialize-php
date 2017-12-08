'use strict';

const spawn     = require('child_process').spawn;
const serialize   = require("../").serialize;

//can add exmple here ;
var data = [
  {exemple1 : "test"},
  {exemple2 : []},
  {exemple3 : [1,2,3,4]},
  {exemple4 : [1,null, undefined]},
  {exemple5 : {
    depth1 : function() {return 1;}
  }},
  {exemple6 : {
    depth1p1 : function() {return null;},
    depth1p2 : {
      depth2p1 : [1, 'test 四 𠜎', null]
    }
  }}
];
data.push(Object.assign({}, data));


describe('serialize', async () => {
  it('should pass  all exemples ', async () => {
    await Promise.all(data.map((exp) => {
      return new Promise((resolve, reject) => {
        const cmdPhp = `echo serialize(json_decode('${JSON.stringify(exp)}', true));`;
        const php = spawn('php', ['-r', cmdPhp]);
        var result = '';
        php.on('error', reject);
        php.stderr.on('data', reject);
        php.stdout.on('data', (d) => {
          result = result + d;
        });
        php.on('close', (code) => {
          if(code !== 0 || result != serialize(exp))
            return reject(`example ${JSON.stringify(exp)} does not pass ! ${result} =! ${serialize(exp)}`);
          resolve();
        });
      });
    }));
  });
});
