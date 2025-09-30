import React, { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import pattern from "./pattern.svg";
import { Link, useNavigate } from "react-router-dom"; // تأكد من استيراد Link
import AxiosUserInstanse from "../../api/AxiosUserInstanse";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosInstanse from "../../api/AxiosInstanse";
import { useQuery } from "@tanstack/react-query";

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
  typography: {
    fontFamily: ["Qomra typeface", "Arial", "sans-serif"].join(","),
    h1: {
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

const truncateName = (name, limit) => {
  return name.length > limit ? `${name.substring(0, limit)}...` : name;
};

export default function Product() {
  const navigate = useNavigate();

  // نقل هذه الـ Hooks إلى أعلى المكون
  const [activeSlide, setActiveSlide] = useState(0);
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    const response = await AxiosInstanse.get("/Products");
    return response.data;
  };
  const {
    data: productsData, // **تغيير الاسم من data إلى productsData لتجنب التعارض**
    error,
    isError,
    isLoading: loading,
  } = useQuery({
    queryKey: ["Products"],
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
  const Products = productsData || []; // استخدام البيانات التي تم جلبها مباشرة

  // 🛒 Add to Cart Function
  // 🛒 Add to Cart Function
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("userToken");

      // 1. تحقق من وجود التوكن
      if (!token) {
        toast.error("You must be logged in to add products to the cart.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login");
        return; // توقف عن تنفيذ الدالة هنا
      }

      // قم بتمرير التوكن في الـ headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await AxiosUserInstanse.post(
        `/Carts`,
        { productId: productId },
        config // أضف الـ config هنا
      );

      if (response.status === 200) {
        toast.success("Product added to cart successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Slide,
        });
      }

      console.log("Product added to cart:", response.data);
    } catch (error) {
      // 2. معالجة الخطأ بشكل أفضل
      if (error.response && error.response.status === 401) {
        toast.error("Authentication failed. Please log in again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        console.error(
          "Authentication failed. Token is invalid or expired.",
          error.response.data
        );
        localStorage.removeItem("userToken"); // يجب استخدام نفس المفتاح "userToken"
        navigate("/login");
      } else {
        console.error("Error adding product to cart:", error.message);
        toast.error("Failed to add item to cart. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  //  useEffect(() => {getProducts();}, []);

  // استخدام البيانات الفعلية من API
  const handleNext = () => {
    // نتحقق من وجود منتجات لتجنب خطأ محتمل
    if (Products.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % Products.slice(0, 5).length);
  };

  const handlePrev = () => {
    if (Products.length === 0) return;
    setActiveSlide(
      (prev) =>
        (prev - 1 + Products.slice(0, 5).length) % Products.slice(0, 5).length
    );
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 6. تصحيح منطق تقسيم المنتجات والـ Slider
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = Products.slice(startIndex, endIndex); // المنتجات المعروضة في المعرض

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: colors.goldenWheatFaint }}>
        {/* === Section 1: Exquisite Hero Slider === */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: { xs: "70vh", md: "90vh" },
          }}
        >
          {/* Slider Items */}
          {Products.slice(0, 5).map((slide, index) => (
            <Box
              key={slide.id}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${pattern})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "opacity 0.6s ease-in-out",
                opacity: activeSlide === index ? 1 : 0,
                zIndex: activeSlide === index ? 1 : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <Container
                sx={{ position: "relative", zIndex: 2, color: colors.white }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: colors.goldenWheatFaint,
                  }}
                >
                  {slide.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    maxWidth: "600px",
                    mx: "auto",
                    color: colors.grey,
                  }}
                >
                  {slide.description}
                </Typography>
                {/*
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
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    sx={{
                      color: colors.deepUmber,
                      borderColor: colors.deepUmber,
                      borderRadius: '50px',
                      px: 5,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: colors.deepUmber,
                        color: colors.white,
                      },
                    }}
                  >
                    Details
                  </Button>
                </Box> */}
              </Container>
            </Box>
          ))}
          {/* Slider Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              color: colors.goldenWheatFaint,
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              color: colors.goldenWheatFaint,
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
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
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      maxWidth: 300,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.mainImageUrl}
                        alt={product.name}
                        sx={{
                          objectFit: "contain",
                          transition: "transform 0.5s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                      {/* Price Badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: colors.deepUmber,
                          color: colors.goldenWheatFaint,
                          px: 2,
                          py: 0.5,
                          borderRadius: "50px",
                          fontWeight: "bold",
                        }}
                      >
                        {product.price} $
                      </Box>
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        {/* Fixed height for product name */}
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h3"
                          sx={{
                            color: colors.deepUmber,
                            fontWeight: "bold",
                            fontFamily: "Qomra typeface",
                            mb: 1,
                            minHeight: "2.5rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.name.split(" ").slice(0, 4).join(" ")}
                        </Typography>
                        {/* Fixed height for description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.charcoal,
                            mb: 2,
                            minHeight: "3rem",
                            overflow: "hidden",
                          }}
                        >
                          {product.description}
                        </Typography>
                        {/* Quantity Badge */}

                        <Box
                          sx={{
                            //position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: colors.deepUmber,
                            color: colors.goldenWheatFaint,
                            px: 1,
                            py: 0.2,
                            borderRadius: "50px",
                            fontWeight: "bold",
                          }}
                        >
                          Quantity: {product.quantity}
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "center", pb: 3, pt: 0, gap: 1 }}
                    >
                      <Button
                        onClick={() => addToCart(product.id)}
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          bgcolor: colors.goldenWheat,
                          color: colors.deepUmber,
                          borderRadius: "50px",
                          fontWeight: "bold",
                          flexGrow: 1,
                          "&:hover": {
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
                          borderRadius: "50px",
                          fontWeight: "bold",
                          flexGrow: 1,
                          "&:hover": {
                            bgcolor: colors.deepUmber,
                            color: colors.white,
                          },
                        }}
                        component={Link}
                        to={`/product/${product.id}`}
                      >
                        Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack spacing={2} sx={{ mt: 6, alignItems: "center" }}>
              <Pagination
                count={Math.ceil(Products.length / productsPerPage)}
                page={page}
                onChange={handlePageChange}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: colors.deepUmber,
                    "&.Mui-selected": {
                      bgcolor: colors.deepUmber,
                      color: colors.goldenWheatFaint,
                      "&:hover": {
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
