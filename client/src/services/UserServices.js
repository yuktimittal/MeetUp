import axios from 'axios';
import { authHeader } from 'login/services';

export const fetchUsers = async (setUsersList, search = null) => {
  await axios
    .get('/user', { headers: authHeader(), params: { search: search } })
    .then((res) => {
      setUsersList(res.data);
    })
    .catch((err) => console.log(err));
};
