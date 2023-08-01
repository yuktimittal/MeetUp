import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'chat',
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model('message', MessageSchema);
export default Message;
