const db = require('../db/connection');

const fetchCommentsById = async (id) => {
  try {
    const { rows } = await db.query(
      `SELECT comments.comment_id, comments.article_id, comments.body, comments.votes, comments.author, comments.created_at, articles.title FROM comments JOIN articles ON comments.article_id = articles.article_id WHERE comments.article_id = $1`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error('No comments for this id');
    }

    const sortedRows =  [...rows].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return sortedRows;
  } catch (err) {
    throw err;
  }
};

module.exports = fetchCommentsById;
