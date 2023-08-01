import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};
    console.log('req', req);
    const users = await User.find(keyword)
      .find({ _id: { $ne: req.userId } })
      .populate('registrations');
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: err });
  }
};

export const getUserById = (req, res) => {
  User.findById(req.params.id)
    .populate({
      path: 'registrations',
      model: 'registration',
      populate: { path: 'event', model: 'event', select: 'name-_id' },
      select: 'event',
    })
    .populate({
      path: 'interests',
      model: 'interest',
      populate: { path: 'event', model: 'event', select: 'name-_id' },
      select: 'event',
    })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(200).json({ 'message:': 'User not found!' });
      }
    })
    .catch((err) =>
      res.status(400).send('Something went wrong or user not found')
    );
};

export const updateUserById = (req, res) => {
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
};

export const deleteUserById = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json('Error: ', err);
    }
    res.send('user deleted successfully');
  });
};

export const addNewUser = (req, res) => {
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
};
