//articles.models.js
const db = require('../db/connection');

const fetchArticles = () => {
  // console.log('hello from articles models');
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author,articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`
    )
    .then(({ rows }) => {
      //sort rows by date in descending order
      return rows.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    });
};

const fetchArticleById = (id) => {
  console.log('inside fetcharticle by ID');
  return db
    .query(
      `SELECT article_id, title, topic, body, author,created_at, votes, article_img_url FROM articles WHERE article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = { fetchArticles, fetchArticleById };
