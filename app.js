// app.js
const express = require('express');
const app = express();
const {getApi, getTopics, getArticles} = require('./controllers/index.controllers')

// GET /api directory
app.get('/api', getApi);

// GET /topics
app.get('/api/topics', getTopics);

// GET /articles
app.get('/api/articles', getArticles);
module.exports = app;
