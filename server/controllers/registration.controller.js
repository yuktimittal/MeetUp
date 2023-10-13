import Registration from '../models/Registration.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

export const registerForEvent = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.userId;

  let existing_registration = await Registration.findOne({
    user: userId,
    event: eventId,
  });
  if (existing_registration) {
    return res.status(400).send('Already Registered!');
  }

  let user = await User.findById(userId);
  let event = await Event.findById(eventId);
  if (user && event) {
    const registration = new Registration({
      event: event._id,
      user: user._id,
    });
    registration.save();
    user.registrations.push(registration);
    await user.save();
    event.registrations.push(registration);
    await event.save();
    return res.send('Registered successfully');
  }
  return res.status(400).send('User or Event not found!');
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'email')
      .populate('event', 'name');
    return res.status(200).send(registrations);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getRegistrationsForAnEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const registrations = await Registration.find({ event: eventId }).populate(
      'user',
      'email'
    );

    return res.status(200).send(registrations);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const getRegistrationsForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const registrations = await Registration.find({ user: userId }).populate(
      'event',
      'name'
    );
    return res.status(200).send(registrations);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
