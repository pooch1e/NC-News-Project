const { fetchUser } = require('../models/index.models');
const getUsers = (req, res) => {
  fetchUser().then((users) => {
    res.status(200).send({ users });
  });
};
module.exports = getUsers;
