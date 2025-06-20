//articles.models.js
const db = require('../db/connection');
const { checkExists } = require('../db/seeds/utils');

const fetchArticles = async ({
  sort_by = 'created_at',
  order = 'desc',
  topic,
  limit = 10,
  p = 1,
}) => {
  try {
    if (isNaN(limit) || isNaN(p) || limit < 1 || p < 1) {
      return Promise.reject({ status: 400, msg: 'Invalid page query' });
    }
    // validate topics exist
    if (topic) {
      await checkExists('topics', 'slug', topic);
    }
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
    const offset = (p - 1) * limit; // begin at page 0
    const queryParams = [];

    let baseQuery = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`;

    if (topic) {
      queryParams.push(topic);
      baseQuery += ` WHERE articles.topic = $1`;
    }

    // group and sort
    baseQuery += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order.toUpperCase()}`;

    // ! limit?
    if (topic) {
      queryParams.push(limit, offset);
      baseQuery += ' LIMIT $2 OFFSET $3'; // if topic exists its $1 !!!!
    } else {
      queryParams.push(limit, offset);
      baseQuery += ' LIMIT $1 OFFSET $2';
    }
    // TODO add count of articles somehow
    const { rows } = await db.query(baseQuery, queryParams);

    return rows;
  } catch (err) {
    throw err;
  }
};

const fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id`,
    [id]
  );
  return rows[0];
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

const postNewArticle = async ({
  title,
  topic,
  author,
  body,
  article_img_url,
}) => {
  try {
    // Insert article
    const { rows } = await db.query(
      `WITH inserted AS (INSERT INTO articles (title, topic, author, body, article_img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *) SELECT inserted.*, COUNT (comments.comment_id) AS comment_count FROM inserted LEFT JOIN comments ON comments.comment_id = inserted.article_id GROUP BY inserted.title, inserted.topic, inserted.author, inserted.author, inserted.body, inserted.created_at, inserted.votes, inserted.article_img_url, inserted.article_id`,
      [title, topic, author, body, article_img_url]
    );

    return rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
  postNewArticle,
};
