// comments controller.js
const { checkExists } = require('../db/seeds/utils');
const {
  fetchCommentsByArticleId,
  insertCommentByArticleId,
  updateCommentsByCommentId,
  removeCommentById,
} = require('../models/index.models');

const getCommentsByArticleId = async (req, res, next) => {
  if (req.params.article_id === '') {
    return res.status(400).send({ status: 400, msg: 'Invalid type' });
  }
  const article_id = Number(req.params.article_id);

  try {
    if (isNaN(article_id)) {
      return Promise.reject({ status: 400, msg: 'Invalid id' });
    }
    await checkExists('articles', 'article_id', article_id);

    const comments = await fetchCommentsByArticleId(article_id);

    res.status(200).send({ comments });
  } catch (err) {
    if (err.message === 'id not found') {
      res.status(404).send({ msg: err.message });
    }
    next(err);
  }
};

const postCommentByArticleId = async (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;

  if (!username || !body) {
    return res
      .status(400)
      .send({ msg: 'Missing required fields: username and body' });
  }

  try {
    await checkExists('articles', 'article_id', article_id);
    await checkExists('users', 'username', username)
    const postedComment = await insertCommentByArticleId(
      article_id,
      username,
      body
    );

    res.status(201).send({ postedComment });
  } catch (err) {
    if (err.code === '23503') {
      // Foreign key violation
      return Promise.reject({ status: 400, msg: 'Bad Request' });
    }
    next(err);
  }
};

const patchCommentById = async (req, res, next) => {
  const comment_id = Number(req.params.comment_id);

  if (Object.keys(req.body).length === 0) {
    return Promise.reject({
      status: 400,
      msg: 'Missing required field: inc_votes',
    });
  }
  const { inc_votes } = req.body; //typeof number
  try {
    const comment = await updateCommentsByCommentId(inc_votes, comment_id);

    res.status(200).send({ comment });
  } catch (err) {
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
  patchCommentById,
  deleteCommentByCommentId,
};
