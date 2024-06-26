import config from '../config/auth.config.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    profilePicture: req.body.profilePic ? req.body.profilePic : null,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken: token,
      profilePicture: user.profilePicture,
    });
  });
};

export const signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken: token,
      profilePicture: user.profilePicture,
    });
  });
};
