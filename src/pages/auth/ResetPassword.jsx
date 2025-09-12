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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RestPasswordSchema from "../../../validations/RestPasswordSchema";




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

// تعريف مخطط التحقق باستخدام Yup

export default function ResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RestPasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        newPassword: data.newPassword,
        code: data.code,
        email: data.email,
      };

      const response = await axios.patch(
        "https://kashop1.runasp.net/api/Identity/Account/reset-password",
        payload
      );
      console.log("Password reset successful:", response.data);
      setSnackbar({
        open: true,
        message: "Your password has been reset successfully!",
        severity: "success",
      });
      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول بعد النجاح
      navigate("/login");
    } catch (error) {
      console.error(
        "Password reset failed:",
        error.response ? error.response.data : error.message
      );
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "An error occurred. Please check your information and try again.",
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
              Reset your password
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mb: 3, color: colors.charcoal }}
            >
              Enter the verification code and your new password.
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
                label="Your Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Verification Code"
                {...register("code")}
                error={!!errors.code}
                helperText={errors.code?.message}
                autoComplete="off"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("newPassword")}
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="newPassword"
                autoComplete="new-password"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/*
              <TextField
                margin="normal"
                required
                fullWidth
                {...register("confirmPassword")}
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              */}
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
                  <CircularProgress size={24} sx={{ color: colors.goldenWheat }} />
                ) : (
                  "Reset Password"
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