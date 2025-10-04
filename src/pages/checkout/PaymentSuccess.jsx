import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import pattern from './pattern.svg'; // تأكد من أن هذا المسار صحيح لصورة الخلفية

// الألوان الجديدة من لوحة الألوان (مكررة هنا لضمان عمل المكون بشكل مستقل)
const colors = {
  forest: '#002623',
  goldenWheat: '#988561',
  goldenWheatFaint: '#edebe0',
  charcoal: '#161616',
  deepUmber: '#260f14',
  deepUmberHover: '#4a151e',
  white: '#ffffff',
  grey: '#d0d0d0',
};

// تعريف الثيم المخصص (مقتبس من كودك)
const theme = createTheme({
  typography: {
    fontFamily: [
      'Qomra typeface',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Qomra typeface',
      color: colors.goldenWheatFaint,
    },
    h4: {
      fontFamily: 'Qomra typeface',
      color: colors.deepUmber,
    },
  },
  palette: {
    primary: {
      main: colors.deepUmber,
    },
    secondary: {
      main: colors.goldenWheat,
    },
    success: { // تعريف لون للنجاح يمكن استخدامه للأيقونة
        main: colors.goldenWheat,
    },
    background: {
      default: colors.white,
    },
  },
});

export default function PaymentSuccess() {
  // دالة لمعالجة الانتقال إلى الصفحة الرئيسية (افترض استخدام 'react-router-dom')
  const handleGoHome = () => {
    // يجب استبدال هذا برمز التوجيه الفعلي الخاص بك (مثل navigate('/') )
    console.log("الذهاب إلى الصفحة الرئيسية"); 
    window.location.href = '/'; // مثال للانتقال البسيط
  };

  // دالة لمعالجة عرض تفاصيل الطلب
  const handleViewOrder = () => {
    // يجب استبدال هذا برمز التوجيه الفعلي لتفاصيل الطلب
    console.log("عرض تفاصيل الطلب"); 
    // window.location.href = '/order-details/148'; // مثال
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          direction: 'rtl',
          // خلفية مستوحاة من قسم Hero لتناسب الهوية البصرية
          backgroundImage: `linear-gradient(to top, ${colors.goldenWheatFaint} 5%, ${colors.white} 100%)`, 
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 3,
              boxShadow: 8,
              bgcolor: colors.white,
              border: `2px solid ${colors.goldenWheat}`, // إطار ذهبي أنيق
            }}
          >
            {/* أيقونة النجاح */}
            <CheckCircleOutlineIcon 
              sx={{ 
                fontSize: { xs: 80, md: 100 }, 
                color: colors.goldenWheat, 
                mb: 3 
              }} 
            />

            {/* عنوان النجاح */}
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{
                color: colors.deepUmber,
                fontWeight: 700,
                mb: 2,
                fontFamily: 'Qomra typeface',
              }}
            >
              تم الدفع بنجاح!
            </Typography>

            {/* رسالة تأكيد */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.charcoal, 
                mb: 5 
              }}
            >
              شكراً لك. تم تأكيد طلبك بنجاح. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني قريباً.
            </Typography>

            {/* أزرار الإجراءات */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              
              {/* زر متابعة التسوق (الرئيسية) */}
              <Button
                variant="contained"
                size="large"
                onClick={handleGoHome}
                sx={{
                  bgcolor: colors.deepUmber,
                  color: colors.goldenWheatFaint,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: colors.deepUmberHover,
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s',
                  },
                }}
              >
                العودة إلى الصفحة الرئيسية
              </Button>
              
              {/* زر عرض تفاصيل الطلب */}
              <Button
                variant="outlined"
                size="large"
                onClick={handleViewOrder}
                sx={{
                  color: colors.deepUmber,
                  borderColor: colors.deepUmber,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: colors.goldenWheatFaint,
                    borderColor: colors.deepUmber,
                  },
                }}
              >
                عرض تفاصيل الطلب
              </Button>

            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}