const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  picture: {
    type: String,
  },
  events: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Group', GroupSchema);
