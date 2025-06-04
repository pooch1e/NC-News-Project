// app.js
const express = require('express');
const app = express();
const getApi = require('../northcoders-news-BE/controllers/api.controller');
const getTopics = require('./controllers/topics.controller');

// GET api directory
app.get('/api', getApi);

// GET topics
app.get('/api/topics', getTopics);

module.exports = app;
