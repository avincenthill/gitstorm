const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
// const path = require('path');
// const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

// REST API
// **************************************
app.get('/status', (req, res) => {
  res.status(200).send('git status');
});

app.get('/command', (req, res) => {

});

app.put('/command', (req, res) => {

});

app.delete('/command', (req, res) => {

});

const serverPort = process.env.SERVER_PORT || 1337;
app.listen(serverPort, () => console.log(`
  gitstorm listening at port ${serverPort}...
`));
