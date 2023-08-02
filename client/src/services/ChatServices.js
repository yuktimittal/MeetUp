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
