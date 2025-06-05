// pg errors.js

exports.handlePgErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'invalid type' });
  } else if (err.code === '23503') {
    res.status(401).send({ msg: 'foreign key violation' });
  } else {
    next(err);
  }
};
