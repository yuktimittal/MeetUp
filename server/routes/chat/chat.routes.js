import { Router } from 'express';
import authJwt from '../../middlewares/authJwt.js';
import bodyParser from 'body-parser';
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from '../../controllers/chat.controller.js';

const router = Router();

router.use(bodyParser.json());

router.get('/', [authJwt.verifyToken], fetchChats);
router.post('/', [authJwt.verifyToken], accessChat);
router.post('/group', [authJwt.verifyToken], createGroupChat);
router.put('/renamegroup', [authJwt.verifyToken], renameGroup);
router.put('/removeFromGroup', [authJwt.verifyToken], removeFromGroup);
router.put('/addtogroup', [authJwt.verifyToken], addToGroup);

export default router;
