const { fetchUser, fetchUserByUsername } = require('../models/index.models');
const getUsers = async (req, res, next) => {
  try {
    const users = await fetchUser();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

const getUsersByUsername = async (req, res, next) => {
  console.log('hello from users controller');
  const { username } = req.params;
  try {
    const user = await fetchUserByUsername(username);
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};
module.exports = { getUsers, getUsersByUsername };
