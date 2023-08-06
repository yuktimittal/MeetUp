import { Router } from 'express';
import authJwt from '../../middlewares/authJwt.js';
import bodyParser from 'body-parser';
import {
  sendMessage,
  allMessages,
} from '../../controllers/message.controller.js';

const router = Router();

router.use(bodyParser.json());

router.get('/:chatId', [authJwt.verifyToken], allMessages);
router.post('/', [authJwt.verifyToken], sendMessage);

export default router;
