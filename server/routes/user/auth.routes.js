import verifySignUp from '../../middlewares/verifySignUp.js';
import { signin, signup } from '../../controllers/auth.controller.js';
import { Router } from 'express';
const router = Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});
router.post('/signup', [verifySignUp.checkDuplicateEmail], signup);
router.post('/signin', signin);

export default router;
