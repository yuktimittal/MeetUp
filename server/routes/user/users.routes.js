const router = require('express').Router();
const { authJwt } = require('../../middlewares');
const bodyParser = require('body-parser');
const {
  getAllUsers,
  getUserById,
  updateUserById,
} = require('../../controllers');

router.use(bodyParser.json());

// API to get all the users
router.get('/', [authJwt.verifyToken], getAllUsers);

// API to get a user based on the Id
router.get('/getById/:id', [authJwt.verifyToken], getUserById);

//API to update the user
router.patch('/update/:id', [authJwt.verifyToken], updateUserById);

module.exports = router;
