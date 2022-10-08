import { Router } from 'express';
import bodyParser from 'body-parser';
import {
  getAllEvents,
  geteventById,
  updateEventById,
  deleteEventById,
  addNewEvent,
} from '../../controllers/event.controller.js';
import authJwt from '../../middlewares/authJwt.js';

const router = Router();
router.use(bodyParser.json());

router.post('/', [authJwt.verifyToken], addNewEvent);
router.get('/', [authJwt.verifyToken], getAllEvents);
router.get('/getById/:id', [authJwt.verifyToken], geteventById);
router.patch('/update/:id', [authJwt.verifyToken], updateEventById);
router.delete('/delete/:id', [authJwt.verifyToken], deleteEventById);

export default router;
