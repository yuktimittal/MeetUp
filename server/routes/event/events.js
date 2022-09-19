const router = require('express').Router();
const mongoose = require('mongoose');

require('../../models/Event');
const Event = mongoose.model('Event');

// API to get all the events
router.route('/').get((req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json('Error: ', err));
});

// API to get a event based on the Id
router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
    .then((event) => res.json(event))
    .catch((err) => res.status(400).json('Error: ', err));
});

// API to create a new event
router.route('/add').post((req, res) => {
  const new_event = {
    name: req.body.name,
    eventMode: req.body.eventMode,
    eventType: req.body.eventType,
    createdOn: req.body.createdOn,
    description: req.body.description,
    // profilePicture: req.body.profilePicture,
    eventDate: req.body.eventDate,
    location: req.body.location,
    // preferences
  };

  const event = new Event(new_event);
  event
    .save()
    .then(() => res.json('Event added sucessfully'))
    .catch((err) => res.status(400).json('Error: ', err));
});

router.route('/update/:id').put(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      const event1 = {
        name: req.body.name ? req.body.name : event.name,
        eventMode: req.body.eventMode ? req.body.eventMode : event.eventMode,
        eventType: req.body.eventType ? req.body.eventType : event.eventType,
        createdOn: req.body.createdOn ? req.body.createdOn : event.createdOn,
        description: req.body.description
          ? req.body.description
          : event.description,
        // profilePicture: req.body.profilePicture,
        eventDate: req.body.eventDate ? req.body.eventDate : event.eventDate,
        location: req.body.location ? req.body.location : event.location,
      };

      const updateEvent = await Event.updateOne({ _id: req.params.id }, event1);
      res.send('Event updated successfully');
    }
  } catch (err) {
    res.send({ error: err });
  }
});

router.route('/delete/:id').delete(async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      event
        .deleteOne({ _id: req.params.id })
        .then(() => res.json('Event deleted sucessfully'))
        .catch((err) => res.status(400).json('Error: ', err));
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
