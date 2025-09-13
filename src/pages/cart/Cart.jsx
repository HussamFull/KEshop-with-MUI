import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { removeItem } from "framer-motion";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";

// Updated Color Palette
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

// Custom Material-UI Theme
const theme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: ["Qomra typeface", "Arial", "sans-serif"].join(","),
    h1: {
      fontFamily: "Qomra typeface",
      color: colors.deepUmber,
    },
    h2: {
      fontFamily: "Qomra typeface",
      color: colors.deepUmber,
    },
    h4: {
      fontFamily: "Qomra typeface",
      color: colors.deepUmber,
    },
    h5: {
      fontFamily: "Qomra typeface",
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


const subtotal = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
const shipping = 25;
const total = subtotal + shipping;

// Cart Page Component
export default function Cart() {
  const navigate = useNavigate(); // هنا يتم تعريف useNavigate
  const [carts, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🛠️ Fetch Product Details
  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");

      // 1. تحقق من وجود التوكن
      if (!token) {
        console.error("User is not authenticated. Token not found.");
        navigate("/login"); // توجيه المستخدم لصفحة تسجيل الدخول
        return;
      }
      const response = await axios.get(
        `https://kashop1.runasp.net/api/Customer/Carts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cart :", response.data);
      setCart(response.data);
    } catch (error) {
      setError("❌ Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.delete(
        `https://kashop1.runasp.net/api/Customer/Carts/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cart :", response.data);
      // setCart(response.data);
      getCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError("❌ Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.delete(
        `https://kashop1.runasp.net/api/Customer/Carts/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Cart :", response.data);
      //setCart(response.data);
      if (response.status === 200) {
        getCart();
      }
    } catch (error) {
      setError("❌ Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data on component mount   

  const incrementItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await AxiosUserInstanse.post(
        `/Carts/increment/${productId}`,
        {}, 
        
      );
      console.log("Incremented Item:", response.data);
      if (response.status === 200){
      getCart(); 
    }
    } catch (error) {
      setError("❌ Failed to increment item quantity.");
    } finally {
      setLoading(false);
    }   
  };

  // 🛠️ Decrement Item Function - Simplified and Fixed
  const decrementItem = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }

      // Check the current count of the item
      const currentItem = carts.items.find((item) => item.productId === productId);
      
      // If the item count is 1, call removeItem. Otherwise, just decrement.
      if (currentItem && currentItem.count === 1) {
          await removeItem(productId);
      } else {
        await AxiosUserInstanse.post(
          `/Carts/decrement/${productId}`,
          {},
         
        );
        // After a successful operation, get the updated cart from the server
        getCart();
      }
    } catch (error) {
      console.error("Error decrementing item:", error);
      setError("❌ Failed to decrement item quantity.");
    }
  };















  useEffect(() => {
    getCart();
  }, []);

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          direction: "ltr",
          bgcolor: colors.goldenWheatFaint,
          minHeight: "100vh",
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          {/* Page Title Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 8 },
              pb: 2,
              borderBottom: `2px solid ${colors.goldenWheat}`,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                color: colors.deepUmber,
                textTransform: "uppercase",
              }}
            >
              Your Collection
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: colors.charcoal }}>
              Review the exquisite items you've chosen.
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems="flex-start"
            direction={{ xs: "column", md: "row" }}
            wrap="nowrap" // 🔹 يمنع العناصر من النزول سطر جديد
          >
            {/* Cart Items List - Takes 12 columns on mobile, 7 on medium screens and up */}
            <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  p: { xs: 2, md: 4 },
                  bgcolor: "background.paper",
                  borderRadius: 3,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                }}
              >
                {carts.items.length === 0 ? (
                  <Typography
                    variant="body1"
                    align="center"
                    sx={{ py: 4, color: colors.charcoal }}
                  >
                    Your cart is currently a blank canvas.
                  </Typography>
                ) : (
                  carts.items.map((item, index) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 3,
                        borderBottom: `1px dashed ${colors.goldenWheat}`,
                        transition:
                          "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          src={item.mainImage}
                          alt={item.productName}
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: 2,
                            objectFit: "cover",
                            border: `2px solid ${colors.goldenWheat}`,
                          }}
                        />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {item.productName}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: colors.grey }}
                          >
                            {item.price} SAR
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: `1px solid ${colors.goldenWheat}`,
                            borderRadius: "50px",
                            p: 0.5,
                          }}
                        >
                          <IconButton
                            onClick={() => decrementItem(item.productId)}
                            aria-label="remove"
                            size="small"
                            sx={{ color: colors.deepUmber }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="body1"
                            sx={{
                              mx: 1,
                              fontWeight: "bold",
                              color: colors.charcoal,
                            }}
                          >
                            {item.count}
                          </Typography>
                          <IconButton
                              onClick={() => incrementItem(item.productId)}
                            aria-label="add"
                            size="small"
                            sx={{ color: colors.deepUmber }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            minWidth: "80px",
                            textAlign: "center",
                            mx: { xs: 1, md: 3 },
                          }}
                        >
                          {item.totalPrice} SAR
                        </Typography>

                      <Button
                                onClick={() => removeItem(item.productId)}
                                variant="text"
                                sx={{
                                  color: colors.deepUmber,
                                  "&:hover": { color: colors.deepUmberHover },
                                  minWidth: 'auto', // يجعل الزر بحجم الأيقونة
                                  padding: '8px', // يضيف بعض التباعد
                                }}
                              >
                                <DeleteIcon /> {/* 2. وضع الأيقونة بدلاً من النص */}
                              </Button>
                                                    </Box>
                                                  </Box>
                                                ))
                                              )}

                {carts && carts.items && carts.items.length > 0 && (
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        clearCart();
                        console.log("Clear Cart clicked");
                      }}
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        borderColor: colors.deepUmber,
                        color: colors.deepUmber,
                        "&:hover": {
                          borderColor: colors.deepUmberHover,
                          backgroundColor: colors.deepUmberHover,
                          color: colors.white,
                        },
                      }}
                    >
                      Clear Cart
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Order Summary Section - Takes 12 columns on mobile, 5 on medium screens and up */}
            <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
              <Box
                sx={{
                  p: { xs: 2, md: 4 },
                  bgcolor: colors.deepUmber,
                  borderRadius: 3,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  color: colors.goldenWheatFaint,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontWeight: "bold",
                    color: colors.goldenWheat,
                    borderBottom: `2px solid ${colors.goldenWheat}`,
                    pb: 1,
                  }}
                >
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ color: colors.grey }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {subtotal} SAR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body1" sx={{ color: colors.grey }}>
                      Shipping:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {shipping} SAR
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                      alignItems: "baseline",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: colors.goldenWheat }}
                    >
                      Total:
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: colors.goldenWheat }}
                    >
                      {carts.cartTotal} SAR
                    </Typography>
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
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      bgcolor: colors.goldenWheatFaint,
                      boxShadow: "0px 8px 20px rgba(152, 133, 97, 0.3)",
                      transform: "translateY(-3px)",
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
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    transition: "color 0.3s ease, background-color 0.3s ease",
                    "&:hover": {
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
