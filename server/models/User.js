const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  gender: {
    type: String, //Option field
  },
  dob: {
    type: Date,
  },
  profilePicture: {
    type: String,
  },
  about: {
    type: String,
  },
  location: {
    type: String, //rethink this
  },
  preferences: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
