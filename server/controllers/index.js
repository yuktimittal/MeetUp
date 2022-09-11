const { signin, signup } = require('./auth.controller');
const {
  getAllUsers,
  getUserById,
  updateUserById,
} = require('./user.controller');

module.exports = {
  signin,
  signup,
  getAllUsers,
  getUserById,
  updateUserById,
};
