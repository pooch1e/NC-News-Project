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
  const { username } = req.params;
  try {
    const user = await fetchUserByUsername(username);

    if (!user) {
      return Promise.reject({ status: 404, msg: 'Invalid username' });
    }
    //is this same thing?
    if (null) {
      return Promise.reject({ status: 404, msg: 'Username not found' });
    }
    res.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};
module.exports = { getUsers, getUsersByUsername };
