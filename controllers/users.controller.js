const {fetchUser} = require('../models/index.models')
const getUsers = (req, res) => {
  console.log('hello from users controller')
  fetchUser().then((users) => {
    
    res.status(200).send({users});
  })

}
module.exports = getUsers;