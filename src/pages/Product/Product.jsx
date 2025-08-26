import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  CardActions,
  Pagination,
  Stack,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import VisibilityIcon from '@mui/icons-material/Visibility';



// Updated Color Palette
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

// Custom Material-UI Theme
const theme = createTheme({
  typography: {
    fontFamily: [
      'Qomra typeface',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
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
    h6: {
      color: colors.deepUmber,
    },
    body1: {
      color: colors.charcoal,
    },
    body2: {
      color: colors.grey,
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
      default: colors.goldenWheatFaint,
      paper: colors.white,
    },
  },
});

// Dummy data for products updated to match the new images
const dummyProducts = [
  {
    id: 1,
    name: 'TWO WHEELS BIG FOOT KICK SCOOTER',
    image: 'https://images.unsplash.com/photo-1628156102604-36e6f9b88d22?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 334',
    description: 'Two wheels scooter for all ages.',
  },
  {
    id: 2,
    name: 'CHILDREN\'S TRIKE CAR',
    image: 'https://images.unsplash.com/photo-1616682736199-0a2a4b872013?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 266.8',
    description: 'Children\'s tricycle with adjustable handle.',
  },
  {
    id: 3,
    name: '3-IN-1 CAR WITH PUSH ON TOY CAR',
    image: 'https://images.unsplash.com/photo-1594968434685-1d48b1116c4f?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 145.5',
    description: 'A beautiful toy car for kids with a handle.',
  },
  {
    id: 4,
    name: 'HOVERBOARD BALANCE ELECTRIC SCOOTER',
    image: 'https://images.unsplash.com/photo-1549487922-a9b31d8c119e?q=80&w=1974&auto=format&fit=crop',
    price: 'SAR 872',
    description: 'Self-balancing electric scooter.',
  },
  {
    id: 5,
    name: 'MINI ELECTRIC DRIFT SCOOTER',
    image: 'https://images.unsplash.com/photo-1582046429219-c07a012a64c4?q=80&w=2835&auto=format&fit=crop',
    price: 'SAR 249',
    description: 'Mini electric drift scooter for fun and entertainment.',
  },
  {
    id: 6,
    name: 'IPHONE 14 PRO MAX',
    image: 'https://images.unsplash.com/photo-1621609761923-d8c9735d4653?q=80&w=1974&auto=format&fit=crop',
    price: 'SAR 5199',
    description: 'The latest iPhone 14 Pro Max.',
  },
  {
    id: 7,
    name: 'IPHONE 14 PLUS',
    image: 'https://images.unsplash.com/photo-1549992983-502a24683c3e?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 3949',
    description: 'A unique piece of art, a replica of an ancient Syrian stone inscription.',
  },
  {
    id: 8,
    name: 'IPHONE 14',
    image: 'https://images.unsplash.com/photo-1563177699-e6859345c225?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 3149.92',
    description: 'Hand-poured candles with the famous scent of Damascus jasmine.',
  },
  {
    id: 9,
    name: 'IPHONE 14 PLUS (NEW)',
    image: 'https://images.unsplash.com/photo-1595185987625-2c83c271e8c9?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 3659',
    description: 'Traditional sweets with premium Syrian pistachios, a delight for the senses.',
  },
  {
      id: 10,
      name: 'IPHONE 13 PRO MAX',
      image: 'https://images.unsplash.com/photo-1632311726041-4 c8f3f3c6e4c?q=80&w=2940&auto=format&fit=crop',
      price: 'SAR 4399',
      description: 'The latest iPhone 13 Pro Max with advanced features.',
    },
   {
    id: 1,
    name: 'TWO WHEELS BIG FOOT KICK SCOOTER',
    image: 'https://images.unsplash.com/photo-1628156102604-36e6f9b88d22?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 334',
    description: 'Two wheels scooter for all ages.',
  },
  {
    id: 2,
    name: 'CHILDREN\'S TRIKE CAR',
    image: 'https://images.unsplash.com/photo-1616682736199-0a2a4b872013?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 266.8',
    description: 'Children\'s tricycle with adjustable handle.',
  },
  {
    id: 3,
    name: '3-IN-1 CAR WITH PUSH ON TOY CAR',
    image: 'https://images.unsplash.com/photo-1594968434685-1d48b1116c4f?q=80&w=2940&auto=format&fit=crop',
    price: 'SAR 145.5',
    description: 'A beautiful toy car for kids with a handle.',
  },
  {
    id: 4,
    name: 'HOVERBOARD BALANCE ELECTRIC SCOOTER',
    image: 'https://images.unsplash.com/photo-1549487922-a9b31d8c119e?q=80&w=1974&auto=format&fit=crop',
    price: 'SAR 872',
    description: 'Self-balancing electric scooter.',
  },
  {
    id: 5,
    name: 'MINI ELECTRIC DRIFT SCOOTER',
    image: 'https://images.unsplash.com/photo-1582046429219-c07a012a64c4?q=80&w=2835&auto=format&fit=crop',
    price: 'SAR 249',
    description: 'Mini electric drift scooter for fun and entertainment.',
  },
  {
    id: 6,
    name: 'IPHONE 14 PRO MAX',
    image: 'https://images.unsplash.com/photo-1621609761923-d8c9735d4653?q=80&w=1974&auto=format&fit=crop',
    price: 'SAR 5199',
    description: 'The latest iPhone 14 Pro Max.',
  },
  
  
];

const truncateName = (name, limit) => {
  return name.length > limit ? `${name.substring(0, limit)}...` : name;
};

export default function Product() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [page, setPage] = useState(1);
  const productsPerPage = 6; // Display 6 products per page (2 rows with 3 products)

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % dummyProducts.slice(0, 5).length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + dummyProducts.slice(0, 5).length) % dummyProducts.slice(0, 5).length);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate the products to display on the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = dummyProducts.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: colors.goldenWheatFaint }}>
        
        {/* === Section 1: Exquisite Hero Slider === */}
        <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: '70vh', md: '90vh' } }}>
          {/* Slider Items */}
          {dummyProducts.slice(0, 5).map((slide, index) => (
            <Box
              key={slide.id}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.6s ease-in-out',
                opacity: activeSlide === index ? 1 : 0,
                zIndex: activeSlide === index ? 1 : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                },
              }}
            >
              <Container sx={{ position: 'relative', zIndex: 2, color: colors.white }}>
                <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2, color: colors.goldenWheatFaint }}>
                  {slide.name}
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, maxWidth: '600px', mx: 'auto', color: colors.grey }}>
                  {slide.description}
                </Typography>
         <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
         <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
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
                  Add to Cart
                </Button>
{/* زر Details بنفس حجم زر Add to Cart */}
<Button
  variant="outlined"
  startIcon={<VisibilityIcon />}
  sx={{
    color: colors.deepUmber,
    borderColor: colors.deepUmber,
    borderRadius: '50px',
    px: 5,              // نفس قيمة زر Add to Cart
    py: 1.5,            // نفس قيمة زر Add to Cart
    fontSize: '1.1rem', // نفس قيمة زر Add to Cart
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: colors.deepUmber,
      color: colors.white,
    },
  }}
>
  Details
</Button>
</Box>

              </Container>
            </Box>
          ))}
          {/* Slider Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              color: colors.goldenWheatFaint,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              color: colors.goldenWheatFaint,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* === Section 2: Main Product Gallery - Updated Design === */}
        <Box sx={{ py: 8, bgcolor: colors.goldenWheatFaint }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
              sx={{ mb: 6, fontWeight: 700, color: colors.deepUmber }}
            >
              All Products
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {productsToDisplay.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                      {/* Price Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: colors.deepUmber,
                          color: colors.goldenWheatFaint,
                          px: 2,
                          py: 0.5,
                          borderRadius: '50px',
                          fontWeight: 'bold',
                        }}
                      >
                        {product.price}
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        {/* Fixed height for product name */}
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h3"
                          sx={{
                            color: colors.deepUmber,
                            fontWeight: 'bold',
                            fontFamily: 'Qomra typeface',
                            mb: 1,
                            minHeight: '2.5rem', // Adjust this value to fit your names
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {truncateName(product.name, 20)}
                        </Typography>
                        {/* Fixed height for description */}
                        <Typography variant="body2" sx={{ color: colors.charcoal, mb: 2, minHeight: '3rem', overflow: 'hidden' }}>
                          {product.description}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 3, pt: 0, gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          bgcolor: colors.goldenWheat,
                          color: colors.deepUmber,
                          borderRadius: '50px',
                          fontWeight: 'bold',
                          flexGrow: 1,
                          '&:hover': {
                            bgcolor: colors.goldenWheatFaint,
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{
                          color: colors.deepUmber,
                          borderColor: colors.deepUmber,
                          borderRadius: '50px',
                          fontWeight: 'bold',
                          flexGrow: 1,
                          '&:hover': {
                            bgcolor: colors.deepUmber,
                            color: colors.white,
                          },
                        }}
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {/* Pagination Component */}
            <Stack spacing={2} sx={{ mt: 6, alignItems: 'center' }}>
              <Pagination
                count={Math.ceil(dummyProducts.length / productsPerPage)}
                page={page}
                onChange={handlePageChange}
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: colors.deepUmber,
                    '&.Mui-selected': {
                      bgcolor: colors.deepUmber,
                      color: colors.goldenWheatFaint,
                      '&:hover': {
                        bgcolor: colors.deepUmberHover,
                      },
                    },
                  },
                }}
              />
            </Stack>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}