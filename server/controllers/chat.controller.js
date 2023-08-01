import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import Chat from '../models/Chat.js';

export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log('User Id param is not sent');
    return res.status(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.userId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name email',
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      name: 'sender',
      isGroupChat: false,
      users: [req.userId, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate('users', '-password');

      res.status(200).send(FullChat);
    } catch (error) {
      console.log('Error while fetching the chat', error.message);
      res.status(400);
      throw new Error(error.message);
    }
  }
});
