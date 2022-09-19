const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
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
    type: [Schema.Types.ObjectId], //there can be multiple
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
