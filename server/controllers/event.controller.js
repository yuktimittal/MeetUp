import Event from "../models/Event.js";
import asyncHandler from "express-async-handler";
import moment from "moment";

export const getAllEvents = async (req, res) => {
  try {
    const today = moment(); // Keep today is a moment object
    var upcoming_event_filter = { eventDate: { $gte: today } };

    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate("registrations")
      .populate("interests");
    return res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: err });
  }
};

export const geteventById = (req, res) => {
  Event.findById(req.params.id)
    .populate({
      path: "registrations",
      model: "registration",
      populate: { path: "user", model: "user", select: "email" },
      select: "user",
    })
    .populate({
      path: "interests",
      model: "interest",
      populate: { path: "user", model: "user", select: "email" },
      select: "user",
    })
    .then((event) => {
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(200).json({ "message:": "Event not found!" });
      }
    })
    .catch((err) =>
      res.status(400).send("Something went wrong or Event not found")
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
      res.send("Event details updated successfully");
    }
  );
};

export const deleteEventById = (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json("Error: ", err);
    }
    res.send("Event deleted successfully");
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
    picture: req.body.picture,
  };

  const event = await Event.create(new_event);
  const createdEvent = await Event.findOne({
    _id: event._id,
  }).populate("createdBy", "-password");

  res.status(200).send(createdEvent);
});
