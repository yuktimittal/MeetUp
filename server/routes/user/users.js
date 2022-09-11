const router = require('express').Router();
const mongoose = require('mongoose');
const { authJwt } = require('../../middlewares');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

require('../../models/User');
const User = mongoose.model('User');

// API to get all the users
router.get('/', [authJwt.verifyToken], (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ', err));
});

// API to get a user based on the Id
router.get('/getById/:id', [authJwt.verifyToken], (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ', err));
});

// API to create a new user
// router.route('/add').post((req, res) => {
//   const new_user = {
//     name: req.body.name,
//     email: req.body.email,
//     contact: req.body.contact,
//     gender: req.body.gender,
//     dob: req.body.dob,
//     // profilePicture: req.body.profilePicture,
//     about: req.body.about,
//     location: req.body.location,
//     // preferences
//   };

//   const user = new User(new_user);
//   user
//     .save()
//     .then(() => res.json('User added sucessfully'))
//     .catch((err) => res.status(400).json('Error: ', err));
// });

//API to update the user
router.patch('/update/:id', [authJwt.verifyToken], (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },

    (err, _result) => {
      if (err) {
        res.status(400).send(err.toString());
      }
      res.send('user details updated successfully');
    }
  );
});

//API to delete the User
router.delete('/delete/:id', [authJwt.verifyToken], (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json('Error: ', err);
    }
    res.send('user deleted successfully');
  });
});

module.exports = router;
