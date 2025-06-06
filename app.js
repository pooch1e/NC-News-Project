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
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleById,
  getUsers,
} = require('./controllers/index.controllers');

// import error handling
const {
  handleServerError,
  handleCustomError,
  handlePgErrors,
} = require('./errors/index.errors');

// --- HANDLE API ---
// GET /api directory
app.get('/api', getApi);

// GET /topics
app.get('/api/topics', getTopics);

// GET /articles
app.get('/api/articles', getArticles);

// GET /api/articles/:article_id
app.get('/api/articles/:article_id', getArticleById);

//TODO write error tests
// PATCH /api/articles/:article_id
app.patch('/api/articles/:article_id', patchArticleById);

// GET /api/articles/:article_id/comments
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

// POST /api/articles/:article_id/comments
app.post('/api/articles/:article_id/comments', postCommentByArticleId);

// DELETE /api/comments/:comment_id


// GET /users
app.get('/api/users', getUsers);

// Catch 404 - invalid route
app.use((req, res, next) => {
  next({ status: 404, msg: 'route not found' });
});

// ERROR HANDLING - must be in order
app.use(handlePgErrors);
app.use(handleCustomError);
app.use(handleServerError);

module.exports = app;
