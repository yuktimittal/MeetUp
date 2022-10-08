import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
    registrations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'registration',
      },
    ],
    interests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'interest',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('user', UserSchema);

export default User;
