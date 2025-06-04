//api.controller.js
const endpoints = require('../endpoints.json');
const getApi = (req, res) => {
  // console.log('hello from api controller'); //for debug
  res.status(200).send({ endpoints });
};

module.exports = getApi;
