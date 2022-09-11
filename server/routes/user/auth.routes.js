const { verifySignUp } = require('../../middlewares');
const { signin, signup } = require('../../controllers');

const router = require('express').Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});
router.post('/signup', [verifySignUp.checkDuplicateEmail], signup);
router.post('/signin', signin);

module.exports = router;
