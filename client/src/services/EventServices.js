import axios from 'axios';
import { authHeader } from 'login/services';

const EventServices = async (setEventsList) => {
  await axios
    .get('/event', { headers: authHeader() })
    .then((res) => {
      setEventsList(res.data);
    })
    .catch((err) => console.log(err));
};

export default EventServices;
