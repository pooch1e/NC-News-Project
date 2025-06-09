const db = require('../db/connection');

const fetchCommentsByArticleId = async (id) => {
  try {
    const { rows } = await db.query(
      `SELECT comments.comment_id, comments.article_id, comments.body, comments.votes, comments.author, comments.created_at, articles.title FROM comments JOIN articles ON comments.article_id = articles.article_id WHERE comments.article_id = $1`,
      [id]
    );

    const sortedRows = [...rows].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return sortedRows;
  } catch (err) {
    throw err;
  }
};

const insertCommentByArticleId = async (id, username, body) => {
  //validate id
  const article_id = Number(id);
  try {
    const { rows } = await db.query(
      `INSERT INTO comments (article_id, body, author) VALUES ($1, $2, $3) RETURNING *`,
      [article_id, body, username]
    );

    return rows[0];
  } catch (err) {
    if (err.code === '23503') {
      throw err;
    }
  }
};

const updateCommentsByCommentId = async (votes, comment_id) => {
  try {
    const { rows } = await db.query(
      `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`,
      [votes, comment_id]
    );
    if (rows.length === 0) {
      throw { status: 404, msg: 'Comment not found' };
    }
    const updatedComment = rows[0];

    return updatedComment;
  } catch (err) {
    throw err;
  }
};

const removeCommentById = async (id) => {
  try {
    const deletedCommentConfirmation = await db.query(
      `DELETE FROM comments WHERE comment_id = $1`,
      [id]
    );

    return deletedCommentConfirmation.rowCount;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateCommentsByCommentId,
  removeCommentById,
};
