import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  useTheme,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import pattern from './pattern.svg'; // تأكد من المسار الصحيح لصورة الخلفية
import Category from '../Category/Category';
import Product from '../Product/Product';
import { useTranslation } from 'react-i18next';


// الألوان الجديدة من لوحة الألوان
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

// تعريف الثيم المخصص لـ Material-UI
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
    h2: {
      fontFamily: 'Qomra typeface',
      color: colors.deepUmber,
    },
    h4: {
      fontFamily: 'Qomra typeface',
      color: colors.deepUmber,
    },
    h5: {
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
    background: {
      default: colors.white,
    },
  },
});

// بيانات المنتجات التجريبية
const featuredProducts = [
  {
    id: 1,
    name: 'منتج سوري تقليدي',
    image: '/images/product1.jpg', // استبدل بمسار صورتك
    price: 'SAR 150',
  },
  {
    id: 2,
    name: 'حرف يدوية سورية',
    image: '/images/product2.jpg', // استبدل بمسار صورتك
    price: 'SAR 220',
  },
  {
    id: 3,
    name: 'أقمشة دمشقية',
    image: '/images/product3.jpg', // استبدل بمسار صورتك
    price: 'SAR 300',
  },
];

export default function Home() {
  const { t } = useTranslation(); 

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ direction: 'rtl' }}>
       


         {/* Hero Section */}
                <Box
                  sx={{
                    minHeight: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: colors.goldenWheatFaint,
                    position: 'relative',
                    overflow: 'hidden',
                    p: 4,
                    backgroundImage: `linear-gradient(to bottom, ${colors.forest}, ${colors.deepUmber})`,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${pattern})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.1, // تأثير شفاف خفيف
                      zIndex: 1,
                    },
                  }}
                >
                  <Container sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography variant="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2.5rem', md: '5rem' } }}>
{t("Heritage in a modern painting")}                    </Typography>
                    <Typography variant="h5" sx={{ mb: 4, color: colors.grey, maxWidth: '600px', mx: 'auto' }}>
{t("We offer you a unique blend of Syrian authenticity and modern design, where the past meets the present")}                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: colors.goldenWheat,
                        color: colors.deepUmber,
                        borderRadius: '50px',
                        px: 5,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: colors.goldenWheatFaint,
                          transform: 'scale(1.05)',
                          transition: 'transform 0.3s ease-in-out',
                        },
                      }}
                    >

{t("Discover our collection now")}                   </Button>

                    


                  </Container>
                </Box>

                <Category />
                <Product />

        {/* Hero Section */}
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: colors.goldenWheatFaint,
            position: 'relative',
            overflow: 'hidden',
            p: 4,
            backgroundImage: `url(${pattern})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 38, 35, 0.7)', // Overlay Forest color
              zIndex: 1,
            },
          }}
        >
          <Container sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h1" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '2.5rem', md: '4rem' } }}>
Discover authentic Syrian beauty            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: colors.grey, maxWidth: '600px', mx: 'auto' }}>
Shop a selection of traditional Syrian products and handicrafts crafted with love and craftsmanship.            </Typography>
            {/*
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: colors.deepUmber,
                color: colors.goldenWheatFaint,
                fontSize: '1rem',
                py: 1.5,
                px: 4,
                '&:hover': {
                  bgcolor: colors.deepUmberHover,
                },
              }}
            >
              تسوق الآن
            </Button>
*/}

              <Box sx={{ py: 8, direction: 'rtl' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 5, fontWeight: 600 }}>
            Categories
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {featuredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: 250, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ color: colors.deepUmber, fontFamily: 'Qomra typeface' }}>
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {product.price}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          color: colors.deepUmber,
                          borderColor: colors.deepUmber,
                          '&:hover': {
                            bgcolor: colors.deepUmber,
                            color: colors.white,
                          },
                        }}
                      >
View details                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: colors.deepUmber,
                          color: colors.white,
                          '&:hover': {
                            bgcolor: colors.deepUmberHover,
                          },
                        }}
                      >
add to cart                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>




          </Container>
        </Box>

        {/* Featured Products Section
        <Box sx={{ py: 8, bgcolor: colors.goldenWheatFaint, direction: 'rtl' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 5, fontWeight: 600 }}>
              منتجاتنا المميزة
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {featuredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{ height: 250, objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ color: colors.deepUmber, fontFamily: 'Qomra typeface' }}>
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {product.price}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          color: colors.deepUmber,
                          borderColor: colors.deepUmber,
                          '&:hover': {
                            bgcolor: colors.deepUmber,
                            color: colors.white,
                          },
                        }}
                      >
                        عرض التفاصيل
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: colors.deepUmber,
                          color: colors.white,
                          '&:hover': {
                            bgcolor: colors.deepUmberHover,
                          },
                        }}
                      >
                        أضف إلى السلة
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
 */}
        {/* About Us Section */}
        <Box sx={{ py: 8, bgcolor: colors.forest, color: colors.goldenWheatFaint }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 600, fontFamily: 'Qomra typeface' }}>
Our Story

            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey, lineHeight: 1.8 }}>
Our Story

In Syria, we believe that handicrafts are a mirror reflecting our rich history and ancient civilization. Through our store, we strive to offer the finest traditional and contemporary products that carry the mark of authentic Syrian quality. Our goal is to connect the past with the present, providing a unique and distinctive shopping experience for everyone who seeks authenticity and beauty.            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{
                mt: 4,
                color: colors.goldenWheatFaint,
                borderColor: colors.goldenWheatFaint,
                '&:hover': {
                  bgcolor: colors.goldenWheat,
                  color: colors.deepUmber,
                },
              }}
            >
Learn More About Us            </Button>
          </Container>
        </Box>
       
   
      </Box>
    </ThemeProvider>
  );
}