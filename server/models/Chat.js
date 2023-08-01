import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: 'message',
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('chat', ChatSchema);
export default Chat;
