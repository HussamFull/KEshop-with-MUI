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
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import syrianVisualIdentity from "../register/pattern.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../../validations/LoginSchema";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


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
      main: colors.deepUmber, // لون الزر الرئيسي
    },
    secondary: {
      main: colors.goldenWheat,
    },
    background: {
      default: colors.white,
    },
  },
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://mytest1.runasp.net/api/Identity/Account/Login",
        data
      );
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
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
          {/* القسم الأيسر: صورة الهوية البصرية */}
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

          {/* القسم الأيمن: نموذج تسجيل الدخول */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              // التعديل الرئيسي هنا:
              py: { xs: 4, md: 8 }, // بادينغ عمودي
              px: { xs: 4, sm: 6, md: 8 }, // بادينغ أفقي للشاشات الصغيرة أكبر (مهم للموبايل)
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
              Account Login
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", mb: 3, color: colors.charcoal }}
            >
              Join our community and enjoy a world-class shopping experience.
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
                label="Email Address"
                {...register("email")}
                error={errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                {...register('password', { required: 'Password is required' })}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                error={errors.password}
                helperText={errors.password?.message}
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
                {" "}
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: colors.goldenWheat }}
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}