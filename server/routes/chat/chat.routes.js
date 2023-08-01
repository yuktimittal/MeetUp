import { Router } from 'express';
import authJwt from '../../middlewares/authJwt.js';
import bodyParser from 'body-parser';
import { accessChat } from '../../controllers/chat.controller.js';

const router = Router();

router.use(bodyParser.json());

// router.get('/', [authJwt.verifyToken], fetchChats);
router.post('/', [authJwt.verifyToken], accessChat);
// router.post('/group', [authJwt.verifyToken], createGroupChat);
// router.post('/renamegroup', [authJwt.verifyToken], renameGroup);
// router.put('/groupremove', [authJwt.verifyToken], removeFromGroup);
// router.put('/groupadd', [authJwt.verifyToken], addToGroup);

export default router;
