const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  eventDate: {
    type: Date,
  },
  eventTime: {
    type: String,
  },
  eventDuration: {
    type: String,
  },
  eventMode: {
    type: String, // options - (online, offline, hybrid)
  },
  eventType: {
    type: String, //options - (public, private)
  },
  location: {
    type: String,
  },
  picture: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
