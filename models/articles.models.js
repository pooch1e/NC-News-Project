//articles.models.js
const db = require('../db/connection');

const fetchArticles = () => {
  // console.log('hello from articles models');
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`
    )
    .then(({ rows }) => {
      //join comments onto articles
      //count comments per id
      //map over rows
      //add comment_count to objects

      return rows;
    });
};

module.exports = fetchArticles;
