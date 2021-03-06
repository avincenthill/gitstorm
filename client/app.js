require('dotenv').config();
const shell = require('shelljs');
const fetch = require('node-fetch');
const querystring = require('querystring');
const prompt = require('prompt');
// const serverAddress = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

const getData = (url = '', query) => {
  const config = {
    v: process.env.DIALOGUEFLOW_VERSION,
    query,
    sessionId: Math.random() * 100,
    // TBD make this sessionId better, guarantee unique
    lang: 'en',
  };

  // Default options are marked with *
  return fetch(url + querystring.stringify(config), {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      authorization: `Bearer ${process.env.DIALOGUEFLOW_CLIENT_ACCESS_TOKEN}`,
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  })
    .then(response => response.json()); // parses response to JSON
};

const askDialogueFlow = (msg, command) => {
  shell.exec('clear');
  if (msg) {
    console.log(`bot: ${msg}`);
  }
  if (command) {
    console.log(`bot: ${command}`);
    shell.exec(command);
  }
  const pwd = shell.exec('pwd', { silent: true }).stdout;
  console.log('');
  console.log(`You\'re in ${pwd}What do you want the bot to do? (type exit to quit)`);
  console.log('');
  prompt.get(['query'], (err, result) => {
    if (err) {
      console.error(err);
    }
    if (result.query !== 'exit') {
      getData('https://api.dialogflow.com/v1/query?', result.query)
        .then(data => {
          const speech = data.result.fulfillment.speech;
          if (speech[0] === '%') {
            const command = speech.substring(1);
            askDialogueFlow(null, command);
          } else {
            askDialogueFlow(`${speech}`, null);
          }
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    } else {
      return;
    }
  });
};

shell.exec('clear');
askDialogueFlow();
