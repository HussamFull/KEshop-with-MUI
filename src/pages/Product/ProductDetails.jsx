
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Divider,
  Card,
  CardContent,
    Tabs,
    Tab,
    Rating,
    Chip
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

// 🎨 Updated Color Palette
const colors = {
  forest: "#002623",
  goldenWheat: "#988561",
  goldenWheatFaint: "#edebe0",
  charcoal: "#161616",
  deepUmber: "#260f14",
  deepUmberHover: "#4a151e",
  white: "#ffffff",
  grey: "#d0d0d0",
};

// 🌟 Custom Material-UI Theme
const theme = createTheme({
  typography: {
    fontFamily: ["Qomra typeface", "Arial", "sans-serif"].join(","),
    h1: { fontFamily: "Qomra typeface", color: colors.deepUmber },
    h4: { fontFamily: "Qomra typeface", color: colors.deepUmber },
    h5: { fontFamily: "Qomra typeface", color: colors.deepUmber },
    h6: { color: colors.deepUmber },
    body1: { color: colors.charcoal },
    body2: { color: colors.grey },
  },
  palette: {
    primary: { main: colors.deepUmber },
    secondary: { main: colors.goldenWheat },
    background: { default: colors.goldenWheatFaint, paper: colors.white },
  },
});

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);


  // 🛠️ Fetch Product Details
  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://kashop1.runasp.net/api/Customer/Products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      setError("❌ Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  // ⏳ Loading State
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ⚠️ Error State
  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  // 🚫 Product Not Found
  if (!product) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5">Product not found.</Typography>
      </Box>
    );
  }

  // 🌟 Main UI
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: `linear-gradient(135deg, ${colors.goldenWheatFaint}, #fff)`,
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
           
            <Grid item xs={12} md={6}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card
                  elevation={6}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      maxHeight: "600px",
                    }}
                    src={product.mainImageUrl}
                    alt={product.name}
                  />
                </Card>
              </motion.div>
            </Grid>

      
            <Grid item xs={12} md={6}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: "20px",
                  p: 4,
                  background: `linear-gradient(145deg, ${colors.white}, ${colors.goldenWheatFaint})`,
                }}
              >
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {product.name}
                    </Typography>
                    <Rating
                      name="product-rating"
                      value={product.rate}
                        precision={0.5}
                       
                        sx={{ color: colors.goldenWheat, mb: 2 }}
                    />  


                    <Typography
                      variant="h5"
                      sx={{
                        color: colors.goldenWheat,
                        mb: 2,
                        fontWeight: "bold",
                      }}
                    >
                      ${product.price}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography
                      variant="body1"
                      sx={{ color: colors.charcoal, mb: 4 }}
                    >
                      {product.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 8 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: colors.deepUmber,
                          mr: 1,
                        }}
                      >
                       
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.charcoal }}>
                        Quantity: <Chip label={product.quantity} />
                        
                      </Typography>

                    <Typography component={'p'} variant="body1" >
                      Category: <Chip label={product.categoryName} />
                      </Typography>

                        <Typography component={'p'} variant="body1">
                             Brand: <Chip label={product.brandName} />
                        
                      </Typography>




                    </Box>

                
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          mt: 4,
                          bgcolor: colors.deepUmber,
                          color: colors.goldenWheatFaint,
                          borderRadius: "50px",
                          px: 5,
                          py: 1.5,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                          "&:hover": { bgcolor: colors.deepUmberHover },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

            <Box sx={{ mt: 8 }}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "20px",
                p: 4,
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                textColor="primary"
                indicatorColor="primary"
                centered
                sx={{ mb: 3 }}
              >
                <Tab label="Details" />
                <Tab label="Reviews" />
                <Tab label="Shipping" />
              </Tabs>

              {tabValue === 0 && (
                <Typography variant="body1">
                  {product.description || "No additional details available."}
                </Typography>
              )}
              {tabValue === 1 && (
                <Typography variant="body1">
                  <Rating
                      name="product-rating"
                      value={product.rate}
                        precision={0.5}
                       
                        sx={{ color: colors.goldenWheat, mb: 2 }}
                    />   <br />
                  "Great product! Highly recommended."
                </Typography>
              )}
              {tabValue === 2 && (
                <Typography variant="body1">
                  📦 Free shipping on orders above $100. <br />
                  Estimated delivery: 3–5 business days.
                </Typography>
              )}
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}


