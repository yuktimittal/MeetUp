import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";
import defaultPicture from "assets/images/bg.jpg";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import EventBasicDetailComponent from "./../components/EventBasicDetailComponent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  geteventById,
  registerForEvent,
  toggleEventInterest,
} from "services/EventServices";
import RegistrationConfirmationModal from "../components/RegistrationConfirmationModal";
import "./index.css";

const EventDetails = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [selectedEvent, setSelectedEvent] = useState();
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState();
  const [userRegistered, setUserRegistered] = useState(false);
  const [UserInterested, setUserInterested] = useState(false);

  useEffect(() => {
    console.log("start", id);
    geteventById(id, setSelectedEvent);
  }, [id]);

  useEffect(() => {
    setUserRegistered(checkRegistration());
    setUserInterested(checkInterest());
  }, [selectedEvent]);

  console.log("event", selectedEvent);
  const handleEventRegistration = () => {
    setOpenRegistrationModal(true);
  };

  const handleRegister = async () => {
    var res = await registerForEvent(selectedEvent?._id);
    if (res?.success) {
      setAlertSeverity({ success: true, message: "Registered successfully" });
    } else setAlertSeverity({ success: false, message: res.message });
    setShowAlert(true);
    setOpenRegistrationModal(false);
  };
  const checkInterest = () => {
    const insterestedUser = selectedEvent?.interests?.find(
      (interest) => interest.user?._id === userInfo?.id
    );
    console.log("checking int");
    if (insterestedUser) {
      console.log("its true");
      return true;
    }
    console.log("false");
    return false;
  };
  const checkRegistration = () => {
    const registeredUser = selectedEvent?.registrations?.find(
      (registration) => registration.user?._id === userInfo?.id
    );
    if (registeredUser) {
      return true;
    }
    return false;
  };
  const toggleInterest = () => {
    toggleEventInterest(id);
    geteventById(id, setSelectedEvent);
  };

  const FavoriteIconButton = () => {
    return (
      <IconButton
        aria-label="add to favorites"
        size="large"
        sx={{ padding: 0 }}
        onClick={toggleInterest}
      >
        {UserInterested ? (
          <FavoriteIcon style={{ color: "#E60000" }} />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
    );
  };

  return (
    <>
      <RegistrationConfirmationModal
        openRegistrationModal={openRegistrationModal}
        setOpenRegistrationModal={setOpenRegistrationModal}
        selectedEvent={selectedEvent}
        handleRegister={handleRegister}
      />
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "middle" }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertSeverity?.success ? "success" : "error"}
        >
          {alertSeverity?.message}
        </Alert>
      </Snackbar>
      <Box className="event-details">
        <div>
          <img
            className="event-details-cover"
            src={
              selectedEvent?.picture ? selectedEvent?.picture : defaultPicture
            }
            alt=""
          />
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",

            padding: "1rem",
          }}
        >
          <div>
            <Typography variant="h5">{selectedEvent?.name}</Typography>
            <Typography>
              {dayjs(selectedEvent?.eventDate).format("MMMM DD,YYYY")}
            </Typography>
          </div>

          <Box>
            <Button
              color="primary"
              variant="contained"
              onClick={handleEventRegistration}
              disabled={userRegistered}
              style={{ width: "8rem", height: "3rem" }}
            >
              {!userRegistered ? "Register" : "Registered"}
            </Button>
          </Box>
        </Box>
        <Divider style={{ marginTop: "0.5rem" }} />
        <Box
          style={{
            marginTop: "1.5rem",
            display: "flex",

            justifyContent: "space-evenly",
          }}
        >
          <EventBasicDetailComponent
            ImageComponent={HowToRegOutlinedIcon}
            content={"Registrations"}
            value={selectedEvent?.registrations?.length}
          />
          <EventBasicDetailComponent
            ImageComponent={AddLocationAltOutlinedIcon}
            content={selectedEvent?.eventMode === "Online" ? "Online" : "away"}
            value={"0 KM"}
          />

          <EventBasicDetailComponent
            ImageComponent={FavoriteIconButton}
            content={"Interests"}
            value={selectedEvent?.interests?.length}
          />
        </Box>

        <Divider style={{ marginTop: "1rem" }} />
        <Typography
          variant="h6"
          sx={{ paddingLeft: "1rem", marginTop: "0.5rem", fontWeight: "bold" }}
        >
          About
        </Typography>
        <Typography sx={{ paddingLeft: "1rem" }}>
          {selectedEvent?.description}
        </Typography>
        <Typography
          variant="h6"
          sx={{ paddingLeft: "1rem", marginTop: "0.5rem", fontWeight: "bold" }}
        >
          Venue
        </Typography>
        <Typography sx={{ paddingLeft: "1rem" }}>{"lorem ipsum "}</Typography>
      </Box>
    </>
  );
};

export default EventDetails;
