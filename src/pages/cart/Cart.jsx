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
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// ❌ إزالة هذا الجزء، يجب أن يتم حساب الإجمالي في الـ JSX أو بعد تحميل البيانات
// const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
// const shipping = 25;
// const total = subtotal + shipping;

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

export default function Cart() {

const { t } = useTranslation(); 
const [lang , setLang] = useState(i18next.language) 
  const queryClient = useQueryClient();


  const navigate = useNavigate();
  // ✅ Solution: Initialize with a default object to avoid `undefined` errors
  const [carts, setCart] = useState({ items: [], cartTotal: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // تحديث اتجاه الصفحة عند تغيير اللغة
  // _______________________________________________
    // ** 🛠️ الخطوة 1: إنشاء الثيم داخل المكون ليتجاوب مع حالة اللغة (lang) **
    const currentDirection = i18next.dir(lang);
    const dynamicTheme = createTheme({
        // ✅ إضافة الاتجاه هنا لتحديد ترتيب الـ Flexbox والتنسيقات الأخرى في MUI
        direction: currentDirection, 
        typography: {
            fontFamily: ["Qomra typeface", "Arial", "sans-serif"].join(","),
            h1: { fontFamily: "Qomra typeface", color: colors.deepUmber },
            h2: { fontFamily: "Qomra typeface", color: colors.deepUmber },
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
        // ** (اختياري) إضافة overrides لضمان تطبيق الاتجاه على أي قوائم منسدلة **
        components: {
            MuiPopover: {
                defaultProps: {
                    container: window.document.body,
                },
                styleOverrides: {
                    root: {
                        direction: currentDirection,
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    root: {
                        direction: currentDirection,
                    },
                },
            },
        },
    });



  // 🛠️ Fetch Cart Data - Fixed and Robust
  
  // جلب بيانات السلة (React Query) - Hook لا يجب وضعه داخل شرط
  const fetchProducts = async () => {
    const response = await AxiosUserInstanse.get('/Carts');
    return response;
  };

  const { data, Error, isError, isLoading } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });
  {/* 
  const getCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(
        `https://kashop1.runasp.net/api/Customer/Carts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(response.data);
       setLang(i18next.language); 

    } catch (error) {
      console.error("Failed to load cart data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      setError("❌ Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };
*/}
  const removeItem = async (productId) => {
      // 1. إضافة التأكيد قبل عملية الحذف
const isConfirmed = window.confirm(t("Are you sure you want to remove this product?"));
    if (!isConfirmed) {
      // إذا لم يؤكد المستخدم، يتم إنهاء الفانكشن
      return;
    }
 const response = await AxiosUserInstanse.delete(`/Carts/${productId}`);
   if( response.status === 200){
     toast.success(t('Product removed successfully !'), {
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
     };
       

  };

  const clearCart = async () => {
    // 1. إضافة التأكيد قبل عملية الحذف
    const isConfirmed = window.confirm(t("Are you sure you want to All remove this products?"));
    if (!isConfirmed) {
      // إذا لم يؤكد المستخدم، يتم إنهاء الفانكشن
      return;
    }
     const response = await AxiosUserInstanse.delete(`/Carts/clear`);
   if( response.status === 200){
     toast.success('All Product removed successfully !', {
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
     };
      
     
    
  };

  const incrementItem = async (productId) => {
    const response = await AxiosUserInstanse.post(`/Carts/increment/${productId}`,{});
   if( response.status === 200){
     // تحديث بيانات السلة بعد الإضافة
        queryClient.invalidateQueries( ["cartItems"]);
     };
  };

  // 🛠️ Decrement Item Function - Corrected
  const decrementItem = async (productId) => {
     const response = await AxiosUserInstanse.post(`/Carts/decrement/${productId}`,{});
   if( response.status === 200){
     // تحديث بيانات السلة بعد الإضافة
        queryClient.invalidateQueries( ["cartItems"]);
     };


   
      // ✅ Solution: Check if 'carts' and 'carts.items' are defined first.
      if (!carts || !carts.items || carts.items.length === 0) {
        console.error("Cart data not available. Cannot decrement.");
        return;
      }

      const currentItem = carts.items.find((item) => item.productId === productId);

      if (currentItem && currentItem.count === 1) {
        await removeItem(productId);
      } 
       
  };



  useEffect(() => {
    window.document.dir = i18next.dir();
        queryClient.invalidateQueries( ["cartItems"]);
  }, [lang]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={dynamicTheme}>
      <Box
        sx={{
          direction: i18next.dir(), 
          bgcolor: colors.goldenWheatFaint,
          minHeight: "100vh",
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 8 },
              pb: 2,
              borderBottom: `2px solid ${colors.goldenWheat}`,
            }}
          >
            <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: colors.deepUmber, textTransform: "uppercase" }}>
             {t("Your Collection")} 
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: colors.charcoal }}>
              {t("Review the exquisite items you've chosen.")}
            </Typography>
          </Box>
          <Grid container spacing={4} 
            justifyContent="space-between" 
           alignItems="flex-start" 
            direction={{ xs: "column", md: "row" }}
             wrap="nowrap"
            >
            <Grid item xs={12} md={7} sx={{ minWidth: 0 }}>
              <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "background.paper", borderRadius: 3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
                {data.data.items.length === 0 ? (
                  <Typography variant="body1" align="center" sx={{ py: 4, color: colors.charcoal }}>
                     {t("Your cart is currently a blank canvas.")}
                  </Typography>
                ) : (
                  data.data.items.map((item) => (
                    <Box key={item.productId} // ✅ Solution: Use a unique `key` prop here
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 3,
                        borderBottom: `1px dashed ${colors.goldenWheat}`,
                        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box component="img" src={item.mainImage} alt={item.productName} sx={{ width: 80, height: 80, borderRadius: 2, objectFit: "cover", border: `2px solid ${colors.goldenWheat}` }} />
                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {item.productName}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.grey }}>
                            {item.price} SAR
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ display: "flex", alignItems: "center", border: `1px solid ${colors.goldenWheat}`, borderRadius: "50px", p: 0.5 }}>
                          <IconButton onClick={() => decrementItem(item.productId)} aria-label="remove" size="small" sx={{ color: colors.deepUmber }}>
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body1" sx={{ mx: 1, fontWeight: "bold", color: colors.charcoal }}>
                            {item.count}
                          </Typography>
                          <IconButton onClick={() => incrementItem(item.productId)} aria-label="add" size="small" sx={{ color: colors.deepUmber }}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: "bold", minWidth: "80px", textAlign: "center", mx: { xs: 1, md: 3 } }}>
                          {item.totalPrice} SAR
                        </Typography>
                        <Button
                          onClick={() => removeItem(item.productId)}
                          variant="text"
                          sx={{
                            color: colors.deepUmber,
                            "&:hover": { color: colors.deepUmberHover },
                            minWidth: 'auto',
                            padding: '8px',
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
                {data.data.items.length > 0 && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={clearCart}
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
                        {t("Clear Cart")}
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ minWidth: 0 }}>
              <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: colors.deepUmber, borderRadius: 3, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", color: colors.goldenWheatFaint }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: "bold", color: colors.goldenWheat, borderBottom: `2px solid ${colors.goldenWheat}`, pb: 1 }}>
                  {t("Order Summary")}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1" sx={{ color: colors.grey }}>
                       {t("Subtotal:")}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {/* ✅ Correct way to display cart totals */}
                      {data.data.cartSubTotal} SAR
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body1" sx={{ color: colors.grey }}>
                     {t("Shipping:")}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {data.data.shippingCost} SAR
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, alignItems: "baseline" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: colors.goldenWheat }}>
                     {t("Total:")}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: colors.goldenWheat }}>
                      {data.data.cartTotal} SAR
                    </Typography>
                  </Box>
                </Box>
                <Button component={Link} to='/Checkout' variant="contained" fullWidth size="large" sx={{ mt: 3, bgcolor: colors.goldenWheat, color: colors.deepUmber, py: 1.5, fontSize: "1.1rem", fontWeight: "bold", borderRadius: "50px", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { bgcolor: colors.goldenWheatFaint, boxShadow: "0px 8px 20px rgba(152, 133, 97, 0.3)", transform: "translateY(-3px)" } }}>
                    {t("Proceed to Checkout")}
                </Button>
                <Button variant="outlined" fullWidth size="large" sx={{ mt: 2, borderColor: colors.goldenWheatFaint, color: colors.goldenWheatFaint, py: 1.5, fontSize: "1.1rem", fontWeight: "bold", borderRadius: "50px", transition: "color 0.3s ease, background-color 0.3s ease", "&:hover": { bgcolor: colors.goldenWheatFaint, color: colors.deepUmber } }}>
                  {t("Continue Shopping")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}