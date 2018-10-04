const express = require('express');
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
app.get('/command', (req, res) => {
  console.log('command get req received');
  res.status(200).send('command get req received');
});

app.get('/command', (req, res) => {

});

app.put('/command', (req, res) => {

});

app.delete('/command', (req, res) => {

});

const serverPort = process.env.SERVERPORT || 1337;
app.listen(serverPort, () => console.log(`
  gitstorm listening at port ${serverPort}...
`));
