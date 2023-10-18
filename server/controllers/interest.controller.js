import Interest from '../models/Interest.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import asyncHandler from 'express-async-handler';

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

export const toggleInterest = asyncHandler(async (req, res) => {
  const { eventId } = req.body;
  const userId = req.userId;

  let existing_interest = await Interest.findOne({
    user: userId,
    event: eventId,
  });
  let user = await User.findById(userId);
  let event = await Event.findById(eventId);
  if (existing_interest) {
    user.interests.pull(existing_interest._id);
    await user.save();

    event.interests.pull(existing_interest._id);
    await event.save();

    await Interest.deleteOne({ _id: existing_interest._id });
    return res.status(200).send('Removed interest');
  }

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
    return res.status(200).send(event);
  }
  return res.status(400).send('User or Event not found!');
});

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
