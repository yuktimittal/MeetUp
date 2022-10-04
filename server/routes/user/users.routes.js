import { Router } from 'express';
import authJwt from '../../middlewares/authJwt.js';
import bodyParser from 'body-parser';
import {
  getAllUsers,
  getUserById,
  updateUserById,
} from '../../controllers/user.controller.js';

const router = Router();

router.use(bodyParser.json());

// API to get all the users
router.get('/', [authJwt.verifyToken], getAllUsers);

// API to get a user based on the Id
router.get('/getById/:id', [authJwt.verifyToken], getUserById);

//API to update the user
router.patch('/update/:id', [authJwt.verifyToken], updateUserById);

export default router;
