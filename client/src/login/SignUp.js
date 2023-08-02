import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Input,
  IconButton,
  Button,
  Alert,
  Typography,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import drinks from 'assets/images/drinks_green.svg';
import {
  CREATE_ACCOUNT_TEXT,
  REGISTRATION_SUCCESS_MSG,
  USER,
  SIGN_UP,
  SIGNUP_INPUT_LABELS,
  SIGNUP_KEYS,
} from './constants';
import { APP_NAME_MULAKAAT } from 'constants';
import './index.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: null,
    email: null,
    password: null,
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState({
    successful: false,
    message: null,
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (value, field) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async () => {
    await axios
      .post('/auth/signup', userDetails)
      .then((res) => {
        setIsSignedUp({
          successful: true,
          message: REGISTRATION_SUCCESS_MSG,
        });
        if (res.data.accessToken) {
          localStorage.setItem(USER, JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSignedUp({
          successful: false,
          message: err?.response?.data?.message,
        });
      });
    setShowAlert(true);

    setUserDetails({ email: null, password: null });
  };

  const uploadPic = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      console.log('Please select an image');
      return;
    }
    if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'meet-up');
      data.append('cloud_name', 'dn02dvrtg');

      console.log('data', data);
      fetch('https://api.cloudinary.com/v1_1/dn02dvrtg/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('ddd', data);
          setUserDetails({ ...userDetails, profilePic: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      console.log('select an image');
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={isSignedUp?.successful ? 'success' : 'error'}
        >
          {isSignedUp?.message}
        </Alert>
      </Snackbar>
      <Box component="form" className="signup-form-input-box">
        <Box className="signup-app-logo-text" noValidate autoComplete="off">
          <img className="login-app-logo-image" src={drinks} alt="app-logo" />

          <Typography
            variant="h4"
            component="div"
            color="primary"
            className="login-logo-name"
          >
            {APP_NAME_MULAKAAT}
          </Typography>
        </Box>
        <Box className="signup-welcome-text">{CREATE_ACCOUNT_TEXT}</Box>
      </Box>

      <Box
        component="form"
        className="signup-form-input-box"
        noValidate
        autoComplete="off"
      >
        <TextField
          label={SIGNUP_INPUT_LABELS.NAME}
          className="signp-text-fields"
          value={userDetails?.name}
          onChange={(e) => handleChange(e.target.value, SIGNUP_KEYS.NAME)}
        />
        <TextField
          label={SIGNUP_INPUT_LABELS.EMAIL}
          className="signp-text-fields"
          value={userDetails?.email}
          onChange={(e) => handleChange(e.target.value, SIGNUP_KEYS.EMAIL)}
        />

        <FormControl className="signp-text-fields" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            {SIGNUP_INPUT_LABELS.PASSWORD}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={userDetails?.password}
            onChange={(e) => handleChange(e.target.value, SIGNUP_KEYS.PASSWORD)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={SIGNUP_INPUT_LABELS.PASSWORD}
          />
        </FormControl>
        <InputLabel className="signp-text-fields">
          {'Upload your picture'}
        </InputLabel>
        <FormControl className="signp-text-fields">
          <Input
            placeholder="Upload your picture"
            name="picture"
            type="file"
            accept="image/*"
            p={1.5}
            onChange={(e) => uploadPic(e.target.files[0])}
          />
        </FormControl>
        <Button
          className="signup-btn"
          onClick={handleSignUp}
          variant="contained"
          disabled={loading}
        >
          {SIGN_UP}
        </Button>
      </Box>
    </>
  );
};

export default SignUp;
