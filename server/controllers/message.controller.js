import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import User from '../models/User.js';
import Chat from '../models/Chat.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log('Invalid data');
    return res.sendStatus(400);
  }
  var newMessage = { sender: req.userId, content: content, chat: chatId };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate('sender', 'name profilePicture');
    message = await message.populate('chat');
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name profilePicture email',
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

export const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name email profilePicture')
      .populate('chat');

    res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
