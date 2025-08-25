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
import syrianVisualIdentity from "./pattern.svg"; // ⬅️ هذا المسار صحيح
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../../../validations/RegisterSchema";
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

export default function Register() {

  // yup 







  // استخدام React Hook Form لإدارة النموذج
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:yupResolver(registerSchema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // حالة جديدة

  // show Password 
   const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      // إرسال بيانات التسجيل إلى الخادم
      // const response = await axios.post('https://localhost:7227/api/Identity/Account/register', data);
      const response = await axios.post(
        "http://mytest1.runasp.net/api/Identity/Account/Register",
        data
      );
      console.log("Registration successful:", response.data);
      // حفظ التوكن في التخزين المحلي (Local Storage)
      // localStorage.setItem('authToken', response.data.token);

      // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول أو الصفحة الرئيسية
      if(response.status == 200){
         navigate('/login');
      }
      //
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
      // عرض رسالة خطأ للمستخدم
    } finally {
      setIsLoading(false);
    }
  };

  {
    /*
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    fullName: '',
    phoneNumber: '',
    password: '',
  });
*/
  }
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  //const navigate = useNavigate();

    const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  {
    /*  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



{/* 
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

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
*/
  }
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
              p: { xs: 2, md: 4 }, // تعديل: تقليل المسافة البادئة على الشاشات الصغيرة
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: colors.forest, // استخدام لون Forest للخلفية
                  // إضافة: إخفاء الصورة على الشاشات الصغيرة جدًا لتحسين المساحة
              display: { xs: "none", sm: "flex" }, 
            }}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: { xs: "auto", md: 500 },
                objectFit: "cover",
                borderRadius: 2,
              }}
              alt="Syrian Revolution Visual Identity"
              src={syrianVisualIdentity}
            />
          </Box>

          {/* القسم الأيمن: نموذج التسجيل */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
             // التعديل الرئيسي هنا:
              py: { xs: 4, md: 8 }, // بادينغ عمودي
              px: { xs: 2, sm: 4, md: 8 }, // بادينغ أفقي مختلف للشاشات المختلفة
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
              Create an Account
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
                id="fullName"
               
                {...register("fullName")}
                 label="Full Name"
                 error={errors.fullName}
                 helperText={errors.fullName?.message}
                //name="fullName"
                autoComplete="fullName"
                autoFocus
                // value={formData.fullName}
                // onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Username"
                {...register("userName")}
                 error={errors.userName}
                 helperText={errors.userName?.message}
                //name="userName"
                autoComplete="userName"
                // value={formData.userName}
                //  onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                error={errors.email}
                 helperText={errors.email?.message}
                //name="email"
                autoComplete="email"
                // value={formData.email}
                // onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                {...register("phoneNumber")}
                 error={errors.phoneNumber}
                 helperText={errors.phoneNumber?.message}
                //name="phoneNumber"
                autoComplete="tel"
                //value={formData.phoneNumber}
                // onChange={handleChange}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                {...register('password', { required: 'Password is required' })}
                label="Password"
                type={showPassword ? 'text' : 'password'} // 👈 تغيير نوع الحقل ديناميكياً
                id="password"
                autoComplete="new-password"
                error={errors.password}
                helperText={errors.password?.message}
                InputProps={{ // 👈 إضافة أيقونة الرؤية
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
                  bgcolor: colors.deepUmber, // استخدام لون Deep Umber للزر
                  "&:hover": { bgcolor: "#4a151e" },
                }}
              >
                {" "}
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: colors.goldenWheat }}
                  /> // 👈 شاشة التحميل
                ) : (
                  "Register"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
       
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar> 
    </ThemeProvider>
  );
}
