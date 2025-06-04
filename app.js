// app.js
const express = require('express');
const app = express();

// parse JSON
app.use(express.json());

// import controllers
const {
  getApi,
  getTopics,
  getArticles,
  getArticleById,
  getUsers,
} = require('./controllers/index.controllers');

// GET /api directory
app.get('/api', getApi);

// GET /topics
app.get('/api/topics', getTopics);

// GET /articles
app.get('/api/articles', getArticles);

// GET /api/articles/:article_id
app.get('/api/articles/:article_id', getArticleById);

// GET /users
app.get('/api/users', getUsers);

module.exports = app;
