require("dotenv").config();
const axios = require("axios");

exports.handler = function(event, context, callback) {
  const word = event.queryStringParameters.word;
  axios
    .get("https://wordsapiv1.p.mashape.com/words/" + word, {
      headers: { "X-Mashape-Key": process.env.WORDAPIKEY }
    })
    .then(({ data }) => {
      console.log(data);
      callback(null, { statusCode: 200, body: JSON.stringify(data) });
      //   callback(null, { statusCode: 200, body: event.queryStringParameters.word });
      // callback(null, { statusCode: 200, body: process.env.WORDAPIKEY });
      //   callback(null, { statusCode: 200, body: JSON.stringify(data) });
    })
    .catch(e => callback(e));
};
