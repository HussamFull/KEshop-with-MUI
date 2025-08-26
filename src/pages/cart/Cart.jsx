import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  direction: 'ltr',
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

// Dummy cart items
const cartItems = [
  {
    id: 1,
    name: 'Traditional Syrian Product',
    image: 'https://via.placeholder.com/150x150.png?text=Product+1',
    price: 150,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Syrian Handicrafts',
    image: 'https://via.placeholder.com/150x150.png?text=Product+2',
    price: 220,
    quantity: 2,
  },
  {
    id: 3,
    name: 'Damascene Textiles',
    image: 'https://via.placeholder.com/150x150.png?text=Product+3',
    price: 300,
    quantity: 1,
  },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const shipping = 25;
const total = subtotal + shipping;

// Cart Page Component
export default function Cart() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ direction: 'ltr', bgcolor: colors.goldenWheatFaint, minHeight: '100vh', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Page Title Section */}
          <Box sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 8 },
            pb: 2,
            borderBottom: `2px solid ${colors.goldenWheat}`,
          }}>
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: colors.deepUmber, textTransform: 'uppercase' }}>
              Your Collection
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: colors.charcoal }}>
              Review the exquisite items you've chosen.
            </Typography>
          </Box>

          <Grid   container
  spacing={4}
  justifyContent="space-between"
  alignItems="flex-start"
  direction={{ xs: "column", md: "row" }}
    wrap="nowrap"   // 🔹 يمنع العناصر من النزول سطر جديد

  >
            {/* Cart Items List - Takes 12 columns on mobile, 7 on medium screens and up */}
            <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
              <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: 'background.paper', borderRadius: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                {cartItems.length === 0 ? (
                  <Typography variant="body1" align="center" sx={{ py: 4, color: colors.charcoal }}>
                    Your cart is currently a blank canvas.
                  </Typography>
                ) : (
                  cartItems.map((item, index) => (
                    <Box key={item.id} sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 3,
                      borderBottom: `1px dashed ${colors.goldenWheat}`,
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={item.image}
                          alt={item.name}
                          sx={{ width: 80, height: 80, borderRadius: 2, objectFit: 'cover', border: `2px solid ${colors.goldenWheat}` }}
                        />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.grey }}>
                            {item.price} SAR
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: `1px solid ${colors.goldenWheat}`, borderRadius: '50px', p: 0.5 }}>
                          <IconButton aria-label="remove" size="small" sx={{ color: colors.deepUmber }}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1" sx={{ mx: 1, fontWeight: 'bold', color: colors.charcoal }}>
                            {item.quantity}
                          </Typography>
                          <IconButton aria-label="add" size="small" sx={{ color: colors.deepUmber }}>
                            <AddIcon />
                          </IconButton>
                        </Box>

                        <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'center', mx: { xs: 1, md: 3 } }}>
                          {item.price * item.quantity} SAR
                        </Typography>

                        <IconButton aria-label="delete" sx={{ color: colors.goldenWheat, transition: 'color 0.3s ease', '&:hover': { color: colors.deepUmber } }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Grid>

            {/* Order Summary Section - Takes 12 columns on mobile, 5 on medium screens and up */}
            <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
              <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: colors.deepUmber, borderRadius: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.1)', color: colors.goldenWheatFaint }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', borderBottom: `2px solid ${colors.goldenWheat}`, pb: 1 }}>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: colors.grey }}>Subtotal:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{subtotal} SAR</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: colors.grey }}>Shipping:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{shipping} SAR</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, alignItems: 'baseline' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.goldenWheat }}>Total:</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.goldenWheat }}>{total} SAR</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    bgcolor: colors.goldenWheat,
                    color: colors.deepUmber,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      bgcolor: colors.goldenWheatFaint,
                      boxShadow: '0px 8px 20px rgba(152, 133, 97, 0.3)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 2,
                    borderColor: colors.goldenWheatFaint,
                    color: colors.goldenWheatFaint,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    transition: 'color 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                      bgcolor: colors.goldenWheatFaint,
                      color: colors.deepUmber,
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}