var shell = require('shelljs');

console.log('gitstorm started');

console.log(shell.exec('git add .').stdout);

console.log('gitstorm ended');
