import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '0.4rem',
  boxShadow: 24,
  p: 4,
};

const RegistrationConfirmationModal = ({
  openRegistrationModal,
  setOpenRegistrationModal,
}) => {
  const handleClose = () => {
    setOpenRegistrationModal(false);
  };
  return (
    <Modal open={openRegistrationModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography>
          Are you sure you want to register for this event?
        </Typography>
        <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            style={{ marginRight: '1rem' }}
          >
            Cancel
          </Button>
          <Button variant="contained">Confirm</Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default RegistrationConfirmationModal;
