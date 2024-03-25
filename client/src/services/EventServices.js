import axios from "axios";
import { authHeader } from "login/services";

export const getAllEvents = async (setEventsList) => {
  await axios
    .get("/event", { headers: authHeader() })
    .then((res) => {
      setEventsList(res.data);
    })
    .catch((err) => console.log(err));
};

export const geteventById = async (id, setSelectedEvent) => {
  await axios
    .get(`/event/getById/${id}`, { headers: authHeader() })
    .then((res) => {
      setSelectedEvent(res.data);
    })
    .catch((err) => console.log(err));
};

export const createEvent = async (
  name,
  description,
  eventDate,
  eventMode,
  city,
  location,
  picture,
  coverPicture,
  setOpenEventForm,
  setEventsList
) => {
  await axios
    .post(
      "/event",
      {
        name: name,
        description: description,
        eventDate: eventDate,
        eventMode: eventMode,
        picture: picture,
        city: city,
        location: location,
        coverPicture: coverPicture,
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

export const registerForEvent = async (eventId) => {
  return await axios
    .post("/register", { eventId: eventId }, { headers: authHeader() })
    .then((res) => {
      // getAllEvents(setEventList);
      return { success: true, message: null };
    })
    .catch((err) => {
      return { success: false, message: err.response.data };
    });
};

export const toggleEventInterest = async (eventId) => {
  await axios
    .post("/interest", { eventId: eventId }, { headers: authHeader() })
    .then((res) => {
      console.log("interest given");
    })
    .catch((err) => {
      console.log("Something went wrong");
    });
};
