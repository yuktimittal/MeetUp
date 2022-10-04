const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = mongoose.Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Interest', InterestSchema);
