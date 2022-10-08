import Interest from '../models/Interest.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

export const interestInEvent = async (req, res) => {
  const { event_id, user_id } = req.body;

  let existing_interest = await Interest.findOne({
    user: user_id,
    event: event_id,
  });
  if (existing_interest) {
    return res.status(400).send('Already Interested!');
  }

  let user = await User.findById(user_id);
  let event = await Event.findById(event_id);
  if (user && event) {
    const interest = new Interest({
      event: event._id,
      user: user._id,
    });
    interest.save();
    user.interests.push(interest);
    await user.save();
    event.interests.push(interest);
    await event.save();
    return res.send('Interest shown');
  }
  return res.status(400).send('User or Event not found!');
};

export const getAllInterests = async (req, res) => {
  try {
    const interests = await Interest.find()
      .populate('user', 'email')
      .populate('event', 'name');
    return res.status(200).send(interests);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getInterestsForAnEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const interests = await Interest.find({ event: eventId }).populate(
      'user',
      'email'
    );

    return res.status(200).send(interests);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getInterestsForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const interests = await Interest.find({ user: userId }).populate(
      'event',
      'name'
    );
    return res.status(200).send(interests);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
