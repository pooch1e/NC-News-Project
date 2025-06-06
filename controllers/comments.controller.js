// comments controller.js
const {
  fetchCommentsById,
  insertCommentByArticleId,
  removeCommentById,
} = require('../models/index.models');

const getCommentsByArticleId = async (req, res, next) => {
  if (req.params.article_id === '') {
    return res.status(400).send({ status: 400, msg: 'invalid type' });
  }
  const article_id = Number(req.params.article_id);

  try {
    if (isNaN(article_id)) {
      return Promise.reject({ status: 400, msg: 'invalid id' });
    }

    const comments = await fetchCommentsById(article_id);
    //db error or non-existent article id
    if (!isNaN(article_id) && comments.length === 0) {
      return Promise.reject({ status: 404, msg: 'id not found' });
    }
    res.status(200).send({ comments });
  } catch (err) {
    if (err.message === 'id not found') {
      res.status(404).send({ msg: err.message });
    }
    next(err);
  }
};

const postCommentByArticleId = async (req, res, next) => {
  // console.log('hello from post comment')
  const { username, body } = req.body;
  const { article_id } = req.params;

  try {
    const postedComment = await insertCommentByArticleId(
      article_id,
      username,
      body
    );

    res.status(201).send({ postedComment });
  } catch (err) {
    if (err.code === '23503') {
      // Foreign key violation
      return Promise.reject({ status: 400, msg: 'Username does not exist' });
    }
    next(err);
  }
};

const deleteCommentByCommentId = async (req, res, next) => {
  const { comment_id } = req.params;

  if (isNaN(Number(comment_id))) {
    return next({ status: 400, msg: 'Invalid ID' });
  }
  const comment_id_number = Number(comment_id);

  try {
    const deletedComment = await removeCommentById(comment_id_number);

    if (deletedComment === 0) {
      return next({ status: 404, msg: 'comment not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
};
