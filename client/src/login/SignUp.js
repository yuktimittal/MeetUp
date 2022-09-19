import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Alert,
  //   Snackbar,
} from '@mui/material';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });
  const [isSignedUp, setIsSignedUp] = useState({
    successful: false,
    message: null,
  });
  console.log(isSignedUp);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (value, field) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async () => {
    console.log(userDetails);
    await axios
      .post('/auth/signup', userDetails)
      .then((res) => {
        setIsSignedUp({
          successful: true,
          message: 'User registered successully',
        });
        if (res.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(res.data));
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

  const AlertMessage = () => {
    return (
      <Alert
        severity={isSignedUp.successful ? 'success' : 'error '}
        // severity="error"
      >
        {isSignedUp.message}
      </Alert>
    );
  };

  return (
    <>
      <Box
        style={{ marginTop: '10rem' }}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="email"
          value={userDetails?.email}
          onChange={(e) => handleChange(e.target.value, 'email')}
        />

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={userDetails?.password}
            //   value={userDetails.password}
            onChange={(e) => handleChange(e.target.value, 'password')}
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
            label="Password"
          />
        </FormControl>
      </Box>
      <Button onClick={handleSignUp} variant="text">
        Sign Up
      </Button>
      {showAlert && <AlertMessage />}
    </>
  );
};

export default SignUp;
