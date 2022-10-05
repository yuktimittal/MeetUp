import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model('registration', RegistrationSchema);
export default Registration;
