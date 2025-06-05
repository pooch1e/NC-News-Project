// custom errors.js

exports.handleCustomError = (err, req, res, next) => {
  if (err.status) {
    // console.log(err.status, err.msg); // debug
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
