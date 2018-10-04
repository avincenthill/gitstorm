const shell = require('shelljs');
const axios = require('axios');

console.log('gitstorm started');

axios.get('http://localhost:1337/command')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });

// console.log(shell.exec('git status').stdout);

console.log('gitstorm ended');
