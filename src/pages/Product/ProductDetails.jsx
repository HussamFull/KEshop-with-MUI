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
  Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // تأكد من إضافة useNavigate
import { motion } from "framer-motion";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
import { Slide, toast } from "react-toastify";
import AxiosInstanse from "../../api/AxiosInstanse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

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
   const { t, i18n } = useTranslation(); 
  
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate(); // هنا يتم تعريف useNavigate
  //const [product, setProduct] = useState({});
  //const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const response = await AxiosInstanse.get(`/Products/${id}`);
    return response;
  };
  const {
    data, // **تغيير الاسم من data إلى productsData لتجنب التعارض**
    error,
    isError,
    isLoading: loading,
  } = useQuery({
    queryKey: [`Products,id`],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  //    console.log("API Response:", data); // تحقق من الاستجابة
  // **2. التعامل مع حالات التحميل والخطأ في بداية المكون**
  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 10 }} />
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        Error loading products: {error.message}
      </Typography>
    );
  }

  // 🛒 Add to Cart Function
  const addToCart = async (id) => {
    
      const response = await AxiosUserInstanse.post(`/Carts`, {
        productId: id,
      });

      if (response.status === 200) {
        toast.success("Product added to cart successfully !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        // تحديث بيانات السلة بعد الإضافة
        queryClient.invalidateQueries( ["cartItems"]);

      }
  }
    {/* 
    try {
      //  const token = localStorage.getItem("userToken");

      // 1. تحقق من وجود التوكن
      if (!token) {
        console.error("User is not authenticated. Token not found.");
        toast.error("You must Login . Please try again. ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        //alert("❌ فشل في إضافة المنتج إلى السلة. الرجاء المحاولة مرة أخرى.");
        navigate("/login"); // توجيه المستخدم لصفحة تسجيل الدخول
        return;
      }

      const response = await AxiosUserInstanse.post(`/Carts`, {
        productId: id,
      });

      if (response.status === 200) {
        toast.success("Product added to cart successfully !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        // تحديث بيانات السلة بعد الإضافة
        queryClient.invalidateQueries( ["cartItems"]);

      }

      console.log("Product added to cart:", response.data);
      // alert("تم إضافة المنتج إلى السلة بنجاح! 🎉"); // إضافة تنبيه للمستخدم
    } catch (error) {
      // 2. معالجة الخطأ بشكل أفضل
      if (error.response && error.response.status === 401) {
        toast.error("Authentication failed. Token is invalid or expired.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });

        console.error(
          "Authentication failed. Token is invalid or expired.",
          error.response.data
        );
        // إزالة التوكن من الذاكرة وتوجيه المستخدم لتسجيل الدخول مرة أخرى
        localStorage.removeItem("usertoken");
        navigate("/login");
      } else {
        console.error("Error adding product to cart:", error.message);
        toast.error("Failed to add item to cart. Please try again. ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        //alert("❌ فشل في إضافة المنتج إلى السلة. الرجاء المحاولة مرة أخرى.");
      }
    }
  };
*/}
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
                    src={data.data.mainImageUrl}
                    alt={data.data.name}
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
                      {data.data.name}
                    </Typography>
                    <Rating
                      name="product-rating"
                      value={data.data.rate}
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
                      ${data.data.price}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography
                      variant="body1"
                      sx={{ color: colors.charcoal, mb: 4 }}
                    >
                      {data.data.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 8,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: colors.deepUmber,
                          mr: 1,
                        }}
                      ></Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.charcoal }}
                      >
                       {t("Quantity")} : <Chip label={data.data.quantity} />
                      </Typography>
                      <Typography component={"p"} variant="body1">
                       {t("Category")} : <Chip label={data.data.categoryName} />
                      </Typography>
                      <Typography component={"p"} variant="body1">
                       {t("Brand")} : <Chip label={data.data.brandName} />
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
                        onClick={() => addToCart(data.data.id)}
                      >
                           {t("Add to Cart")}
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
                <Tab label={t("Details")} />
                <Tab label={t("Reviews")} />
                <Tab label={t("Shipping")} />
              </Tabs>
              {tabValue === 0 && (
                <Typography variant="body1">
                  {data.data.description || "No additional details available."}
                </Typography>
              )}
              {tabValue === 1 && (
                <Typography variant="body1">
                  <Rating
                    name="product-rating"
                    value={data.data.rate}
                    precision={0.5}
                    sx={{ color: colors.goldenWheat, mb: 2 }}
                  />{" "}
                  <br />
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
