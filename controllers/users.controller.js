const { fetchUser } = require('../models/index.models');
const getUsers = async (req, res) => {
  try {
    const users = await fetchUser();
    res.status(200).send({ users });
  } catch (err) {
    console.log(err);
  }
};
module.exports = getUsers;
