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

export const getUserById = async (id, setProfileUser) => {
  await axios
    .get(`/user/getByID/${id}`, { headers: authHeader() })
    .then((res) => setProfileUser(res.data));
};

export const updateUser = async (id, userDetails, setProfileUser) => {
  await axios
    .patch(`/user/update/${id}`, userDetails, { headers: authHeader() })
    .then((res) => setProfileUser(res.data));
};
