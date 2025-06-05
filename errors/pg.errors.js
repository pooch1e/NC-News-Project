// pg errors.js

exports.handlePgErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'invalid type' });
  } else {
    next(err);
  }
};
