// src/pages/register/Register.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';


const theme = createTheme({
  direction: 'rtl',
});

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    fullName: '',
    phoneNumber: '',
    password: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://localhost:7227/api/Identity/Account/register';

    try {
      const response = await axios.post(apiUrl, formData);
      console.log('Registration successful:', response.data);

      const { token } = response.data;
      localStorage.setItem('authToken', token);

      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

       // 3. إعادة التوجيه إلى صفحة الدخول بعد فترة قصيرة
      setTimeout(() => {
        navigate('/login');
      }, 2000); // إعادة التوجيه بعد ثانيتين


    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Full Name field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="fullName"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
            />

            {/* Username field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              value={formData.userName}
              onChange={handleChange}
            />

            {/* Email field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone Number field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            {/* Password field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Register Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Register;