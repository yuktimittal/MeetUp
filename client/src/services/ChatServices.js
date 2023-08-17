import axios from 'axios';
import { authHeader } from 'login/services';

export const fetchChats = async (setChatList) => {
  await axios
    .get('/chat', { headers: authHeader() })
    .then((res) => {
      setChatList(res.data);
    })
    .catch((err) => console.log(err));
};

export const CreateOrAccessChat = async (
  userId,
  setSelectedChat,
  setSelectedWholeChat,
  chatList,
  setChatList
) => {
  await axios
    .post('/chat', { userId: userId }, { headers: authHeader() })
    .then((res) => {
      console.log('setting selected chat inside access chat', res.data?._id);
      setSelectedChat(res.data?._id);
      setSelectedWholeChat(res.data);
      if (!chatList.find((c) => c._id === res.data._id)) {
        setChatList([res.data, ...chatList]);

        console.log('set list');
      }
    })
    .catch((err) => console.log('Error while creating chat', err));
};

export const CreateGroup = async (
  groupName,
  setGroupName,
  userIds,
  setUserIds,
  setChatList,
  setOpenCreateGroupChat
) => {
  await axios
    .post(
      '/chat/group',
      { name: groupName, userIds: userIds },
      { headers: authHeader() }
    )
    .then((res) => {
      setChatList((prev) => [res.data, ...prev]);
      setOpenCreateGroupChat(false);
      setGroupName('');
      setUserIds([]);
    })
    .catch((err) => {
      console.log('Error while creating group chat', err);
      setOpenCreateGroupChat(false);
      setGroupName('');
      setUserIds([]);
    });
};

export const fetchMessagesOfAChat = async (
  selectedChat,
  setMessages,
  socket
) => {
  await axios
    .get(`/message/${selectedChat}`, {
      headers: authHeader(),
    })
    .then((res) => {
      setMessages(res.data);
      socket.emit('join chat', selectedChat);
    })
    .catch((err) => console.log(err));
};

export const sendMessage = async (
  selectedChat,
  content,
  setMessages,
  setNewMessage,
  setChatList,
  socket
) => {
  await axios
    .post(
      '/message',
      { chatId: selectedChat, content: content },
      { headers: authHeader() }
    )
    .then((res) => {
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
      fetchChats(setChatList);
      socket.emit('new message', res.data);
    })
    .catch((err) => console.log('Error while sending the message', err));
};

export const renameGroup = async (
  chatId,
  newGroupName,
  setGroupNameEditable,
  setChatList
) => {
  await axios
    .put(
      '/chat/renamegroup',
      {
        chatId: chatId,
        newName: newGroupName,
      },
      { headers: authHeader() }
    )
    .then(() => {
      setGroupNameEditable(false);
      fetchChats(setChatList);
    })
    .catch((err) => {
      console.log('Error while renaming group chat', err);
      setGroupNameEditable(false);
    });
};
