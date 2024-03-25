import React, { useContext, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createEvent } from "services/EventServices";
import { AppContext } from "context/AppContext";
import { CITY_OPTIONS } from "constants";
import { uploadPic } from "utils";

const EventForm = ({ openEventForm, setOpenEventForm }) => {
  const [name, setName] = useState("");
  const [description, setDesription] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventMode, setEventMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const { setEventsList } = useContext(AppContext);

  const handleCloseEventForm = () => {
    setOpenEventForm(false);
    setName(null);
    setDesription(null);
    setEventDate(null);
    setEventMode(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid grey",
    borderRadius: "0.4rem",
    boxShadow: 24,
    p: 4,
  };
  const modes = [
    {
      value: "Online",
      label: "Online",
    },
    {
      value: "Offline",
      label: "Offline",
    },
  ];

  const handleCreateEvent = () => {
    createEvent(
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
    );

    setName(null);
    setDesription(null);
    setEventDate(null);
    setEventMode(null);
    setCity(null);
    setLocation(null);
  };

  const uploadEventPoster = (pic) => {
    uploadPic(pic, setLoading, setPicture);
  };
  const uploadEventCover = (pic) => {
    uploadPic(pic, setLoading, setCoverPicture);
  };
  return (
    <Modal open={openEventForm} onClose={handleCloseEventForm}>
      <Box sx={style}>
        <Typography
          flexGrow={1}
          variant="h5"
          color="#1F8A70"
          textAlign="center"
          marginBottom="1.5rem"
        >
          Create New Event
        </Typography>
        <TextField
          label={"Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2, width: "100%" }}
        />
        <TextField
          label={"Description"}
          value={description}
          onChange={(e) => setDesription(e.target.value)}
          multiline
          rows={2}
          sx={{ mt: 2, width: "100%" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={eventDate}
            onChange={(value) => setEventDate(value)}
            label="Event Date"
            sx={{ mt: 2, width: "100%" }}
          />
        </LocalizationProvider>

        <TextField
          label={"Mode"}
          select
          sx={{ mt: 2, width: "100%" }}
          value={eventMode}
          onChange={(e) => setEventMode(e.target.value)}
        >
          {modes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label={"City"}
          select
          sx={{ mt: 2, width: "100%" }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          {CITY_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label={"Address"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mt: 2, width: "100%" }}
        />
        <InputLabel sx={{ mt: 2 }}>{"Upload event poster"}</InputLabel>
        <FormControl>
          <Input
            sx={{ width: "45ch !important" }}
            placeholder="Upload event poster"
            name="picture"
            type="file"
            accept="image/*"
            p={1.5}
            onChange={(e) => uploadEventPoster(e.target.files[0])}
          />
        </FormControl>
        <InputLabel sx={{ mt: 2 }}>{"Upload event cover picture"}</InputLabel>
        <FormControl>
          <Input
            sx={{ width: "45ch !important" }}
            placeholder="Upload event cover picture"
            name="picture"
            type="file"
            accept="image/*"
            p={1.5}
            onChange={(e) => uploadEventCover(e.target.files[0])}
          />
        </FormControl>

        <Button
          onClick={handleCreateEvent}
          disabled={loading}
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
export default EventForm;
