import axios from 'axios';
import { authHeader } from 'login/services';

export const getAllEvents = async (setEventsList) => {
  await axios
    .get('/event', { headers: authHeader() })
    .then((res) => {
      setEventsList(res.data);
    })
    .catch((err) => console.log(err));
};

export const createEvent = async (
  name,
  description,
  eventDate,
  eventMode,
  setOpenEventForm,
  setEventsList
) => {
  await axios
    .post(
      '/event',
      {
        name: name,
        description: description,
        eventDate: eventDate,
        eventMode: eventMode,
      },
      { headers: authHeader() }
    )
    .then((res) => {
      console.log(res);
      setOpenEventForm(false);
      setEventsList((prev) => [res.data, ...prev]);
    })
    .catch((err) => console.log(err));
};

export const registerForEvent = async (eventId, setEventList) => {
  await axios
    .post('/register', { eventId: eventId }, { headers: authHeader() })
    .then((res) => {
      console.log(res);
      getAllEvents(setEventList);
    })
    .catch((err) => console.log(err));
};
