const router = require('express').Router();
const mongoose = require('mongoose');

require('../../models/User');
const User = mongoose.model('User');

// API to get all the users
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ', err));
});

// API to get a user based on the Id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ', err));
});

// API to create a new user
router.route('/add').post((req, res) => {
  const new_user = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    gender: req.body.gender,
    dob: req.body.dob,
    // profilePicture: req.body.profilePicture,
    about: req.body.about,
    location: req.body.location,
    // preferences
  };

  const user = new User(new_user);
  user
    .save()
    .then(() => res.json('User added sucessfully'))
    .catch((err) => res.status(400).json('Error: ', err));
});

module.exports = router;
