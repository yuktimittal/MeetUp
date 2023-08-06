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
  chatList,
  setChatList
) => {
  await axios
    .post('/chat', { userId: userId }, { headers: authHeader() })
    .then((res) => {
      setSelectedChat(res.data?._id);
      if (!chatList.find((c) => c._id === res.data._id)) {
        setChatList(res.data, ...chatList);
        console.log('set list');
      }
    })
    .catch((err) => console.log('Error while creating chat', err));
};

export const CreateGroup = async (
  groupName,
  userIds,
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
    })
    .catch((err) => {
      console.log('Error while creating group chat', err);
      setOpenCreateGroupChat(false);
    });
};
