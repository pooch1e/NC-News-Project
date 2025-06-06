const { fetchUser } = require('../models/index.models');
const getUsers = async (req, res, next) => {
  try {
    const users = await fetchUser();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};
module.exports = getUsers;
