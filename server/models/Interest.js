import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InterestSchema = new Schema(
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

const Interest = mongoose.model('interest', InterestSchema);
export default Interest;
