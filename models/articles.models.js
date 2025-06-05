//articles.models.js
const db = require('../db/connection');

const fetchArticles = async () => {
  const { rows } = await db.query(
    `SELECT articles.article_id, articles.title, articles.topic, articles.author,articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`
  );
  const sortedRows = [...rows].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return sortedRows;
};

const fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `SELECT article_id, title, topic, body, author,created_at, votes, article_img_url FROM articles WHERE article_id = $1`,
    [id]
  );
  return rows;
};

const updateArticleById = async (votes, id) => {
  const article_id = Number(id);
  try {
    const { rows } = await db.query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [votes, article_id]
    );
    const article = rows[0];
    return article;
  } catch (err) {
    throw err;
  }
};

module.exports = { fetchArticles, fetchArticleById, updateArticleById };
