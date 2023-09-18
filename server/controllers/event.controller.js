import Event from '../models/Event.js';
import asyncHandler from 'express-async-handler';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate('registrations');
    return res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: err });
  }
};

export const geteventById = (req, res) => {
  Event.findById(req.params.id)
    .populate({
      path: 'registrations',
      model: 'registration',
      populate: { path: 'user', model: 'user', select: 'email-_id' },
      select: 'user',
    })
    .populate({
      path: 'interests',
      model: 'interest',
      populate: { path: 'user', model: 'user', select: 'email-_id' },
      select: 'user',
    })
    .then((event) => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(200).json({ 'message:': 'Event not found!' });
      }
    })
    .catch((err) =>
      res.status(400).send('Something went wrong or Event not found')
    );
};

export const updateEventById = (req, res) => {
  Event.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { ...req.body } },

    (err, _result) => {
      if (err) {
        res.status(400).send(err.toString());
      }
      res.send('Event details updated successfully');
    }
  );
};

export const deleteEventById = (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json('Error: ', err);
    }
    res.send('Event deleted successfully');
  });
};

export const addNewEvent = asyncHandler(async (req, res) => {
  const new_event = {
    name: req.body.name,
    eventMode: req.body.eventMode,
    eventType: req.body.eventType,
    description: req.body.description,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    location: req.body.location,
    createdBy: req.userId,
  };

  const event = await Event.create(new_event);
  const createdEvent = await Event.findOne({
    _id: event._id,
  }).populate('createdBy', '-password');

  res.status(200).send(createdEvent);
});
