import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  getAllInterests,
  getInterestsForAnEvent,
  getInterestsForUser,
  toggleInterest,
} from '../../controllers/interest.controller.js';
import authJwt from '../../middlewares/authJwt.js';

const router = Router();
router.use(bodyParser.json());

router.post('/', [authJwt.verifyToken], toggleInterest);
router.get('/', [authJwt.verifyToken], getAllInterests);
router.get('/event/:id', [authJwt.verifyToken], getInterestsForAnEvent);
router.get('/user/:id', [authJwt.verifyToken], getInterestsForUser);

export default router;
