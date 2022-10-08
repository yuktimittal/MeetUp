import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  interestInEvent,
  getAllInterests,
  getInterestsForAnEvent,
  getInterestsForUser,
} from '../../controllers/interest.controller.js';
import authJwt from '../../middlewares/authJwt.js';

const router = Router();
router.use(bodyParser.json());

router.post('/', [authJwt.verifyToken], interestInEvent);
router.get('/', [authJwt.verifyToken], getAllInterests);
router.get('/event/:id', [authJwt.verifyToken], getInterestsForAnEvent);
router.get('/user/:id', [authJwt.verifyToken], getInterestsForUser);

export default router;
