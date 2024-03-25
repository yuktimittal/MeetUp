import React from "react";
import { Box, Typography, Modal, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.4rem",
  boxShadow: 24,
  p: 4,
};

const RegistrationConfirmationModal = ({
  openRegistrationModal,
  setOpenRegistrationModal,
  selectedEvent,
  handleRegister,
}) => {
  const handleClose = () => {
    setOpenRegistrationModal(false);
  };
  const handleConfirmation = () => {
    handleRegister(selectedEvent?._id);
  };
  return (
    <Modal open={openRegistrationModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography sx={{ textAlign: "center" }}>
          Would you like to proceed with the registration for{" "}
          {selectedEvent?.name}?
        </Typography>
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirmation}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default RegistrationConfirmationModal;
