import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import syrianVisualIdentity from "../register/pattern.svg"; // ⬅️ المسار الصحيح
import forgotPasswordSchema from "../../../validations/ForgotPasswordSchema";





// الألوان الجديدة من لوحة الألوان
const colors = {
  forest: "#002623",
  goldenWheat: "#988561",
  charcoal: "#161616",
  deepUmber: "#260f14",
  white: "#ffffff",
  grey: "#d0d0d0",
};

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: colors.deepUmber,
    },
    secondary: {
      main: colors.goldenWheat,
    },
    background: {
      default: colors.white,
    },
  },
});


export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://kashop1.runasp.net/api/Identity/Account/forgot-password",
        data
      );
      console.log("Forgot password request successful:", response.data);
      setSnackbar({
        open: true,
        message:
          "A password reset link has been successfully sent to your email.",
        severity: "success",
      });
      // يمكنك إعادة توجيه المستخدم بعد نجاح العملية
       navigate('/ResetPassword');
    } catch (error) {
      console.error(
        "Forgot password request failed:",
        error.response ? error.response.data : error.message
      );
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "An error occurred while submitting your request. Please try again.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              p: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: colors.forest,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: { xs: 200, md: 500 },
                objectFit: "cover",
                borderRadius: 2,
              }}
              alt="Syrian Visual Identity"
              src={syrianVisualIdentity}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              py: { xs: 4, md: 8 },
              px: { xs: 4, sm: 6, md: 8 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: colors.white,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                color: colors.deepUmber,
                fontWeight: "bold",
              }}
            >
Forgot your password?
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mb: 3, color: colors.charcoal }}
            >
Enter your email to reset your password.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Your Email "
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: colors.deepUmber,
                  "&:hover": { bgcolor: "#4a151e" },
                }}
              >
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: colors.goldenWheat }}
                  />
                ) : (
                  "Send"
                )}
              </Button>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                href="/login"
                variant="body2"
                sx={{ color: colors.deepUmber, fontWeight: "bold" }}
              >
Back to login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}