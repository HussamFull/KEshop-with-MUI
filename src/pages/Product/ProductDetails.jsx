import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useParams } from "react-router-dom";

// Updated Color Palette (using the same colors from your code)
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

// Custom Material-UI Theme (using the same theme from your code)
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

export default function ProductDetails({ productId }) {
    const {id} = useParams();
    console.log("Product ID from URL:", id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      if (!productId) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`https://kashop1.runasp.net/api/Customer/Products/${productId}`);
        console.log("API Response:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    getProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">
          Product not found.
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: colors.goldenWheatFaint, py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Product Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 3,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  objectFit: 'contain',
                  maxHeight: '600px',
                }}
                src={product.mainImageUrl}
                alt={product.name}
              />
            </Grid>

            {/* Product Details Section */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, color: colors.deepUmber }}
              >
                {product.name}
              </Typography>
              
              <Typography
                variant="h5"
                component="p"
                sx={{ color: colors.goldenWheat, mb: 2 }}
              >
                ${product.price}
              </Typography>

              <Divider sx={{ my: 3, borderColor: colors.charcoal }} />
              
              <Typography variant="body1" sx={{ color: colors.charcoal, mb: 4 }}>
                {product.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.deepUmber, mr: 1 }}>
                  Quantity:
                </Typography>
                <Typography variant="body2" sx={{ color: colors.charcoal }}>
                  {product.quantity}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    bgcolor: colors.deepUmber,
                    color: colors.goldenWheatFaint,
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: colors.deepUmberHover,
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}