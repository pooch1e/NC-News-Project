// server Errors.js

// status 500
exports.handleServerError = (err, req, res, next) => {
  console.log(err);

  res.status(500).send({ msg: 'internal server error' });
};
