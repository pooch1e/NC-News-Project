//articles.models.js
const db = require('../db/connection');

const fetchArticles = async ({ sort_by = 'created_at', order = 'desc' }) => {
  const validSortParams = [
    'author',
    'title',
    'votes',
    'created_at',
    'comment_count',
  ];
  const validOrderParams = ['asc', 'desc'];

  if (!validSortParams.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort_by query' });
  }

  if (!validOrderParams.includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid order query' });
  }

  const queryParams = [];
  let queryString = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY ${sort_by} ${order.toUpperCase()}`;

  const { rows } = await db.query(queryString);

  return rows;
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
    if (rows.length === 0) {
      throw { status: 404, msg: 'Article not found' };
    }
    const article = rows[0];
    return article;
  } catch (err) {
    throw err;
  }
};

module.exports = { fetchArticles, fetchArticleById, updateArticleById };
