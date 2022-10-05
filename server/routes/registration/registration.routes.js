import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  registerForEvent,
  getAllRegistrations,
  getRegistrationsForAnEvent,
  getRegistrationsForUser,
} from '../../controllers/registration.controller.js';
import authJwt from '../../middlewares/authJwt.js';

const router = Router();
router.use(bodyParser.json());

router.post('/', [authJwt.verifyToken], registerForEvent);
router.get('/', [authJwt.verifyToken], getAllRegistrations);
router.get('/event/:id', [authJwt.verifyToken], getRegistrationsForAnEvent);
router.get('/user/:id', [authJwt.verifyToken], getRegistrationsForUser);

export default router;
