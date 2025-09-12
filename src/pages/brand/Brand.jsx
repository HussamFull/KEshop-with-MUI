import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import pattern from "./pattern.svg";
import axios from "axios";

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
      color: colors.goldenWheatFaint,
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



export default function Brand() {

const [brands, setBrands] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const getBrands = async () => {
  try {
    const response = await axios.get("https://kashop1.runasp.net/api/Customer/Brands");
    console.log("API Response:", response); // تحقق من الاستجابة
   
    setBrands(response.data);
  } catch (error) {
    console.error("Error fetching brands:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getBrands();
}, []);


if (loading) {
  return (
    <CircularProgress />
    );
}





  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ direction: "ltr", bgcolor: colors.goldenWheatFaint }}>
        {/* === القسم الأول: صورة Hero ثابتة === */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: { xs: "60vh", md: "40vh" },
            // تم تغيير الصورة لتكون الخلفية الثابتة
            backgroundImage: `url(${pattern})`, // استخدم المتغير الذي قمت باستيراده
            backgroundSize: "cover",
            backgroundPosition: "center",
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
              sx={{ fontWeight: 700, mb: 2, color: colors.goldenWheatFaint }}
            >
              Brand New Collections
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, maxWidth: "600px", mx: "auto", color: colors.grey }}
            >
              Explore the latest collections from premium Syrian brands.{" "}
            </Typography>
          </Container>
        </Box>

        {/* === القسم الثاني: التمرير الأفقي === */}
        <Box sx={{ py: 8, bgcolor: colors.goldenWheatFaint }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
              sx={{ mb: 5, fontWeight: 700, color: colors.deepUmber }}
            >
              All Brands
            </Typography>
          </Container>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              pb: 2,
              px: { xs: 2, sm: 3, md: 5 },
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: colors.deepUmber,
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                bgcolor: colors.goldenWheatFaint,
              },
            }}
          >
            {brands.map((brand) => (
              <Box
                key={brand.id}
                sx={{
                  minWidth: { xs: 200, sm: 250, md: 300 },
                  flexShrink: 0,
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 200, sm: 250, md: 300 },
                    backgroundImage: `url(${brand.mainImageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 3,
                    position: "relative",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "50%",
                      background: `linear-gradient(to top, ${colors.deepUmber}, transparent)`,
                      opacity: 0.8,
                      borderRadius: "0 0 12px 12px",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      color: colors.goldenWheatFaint,
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  >
                    {brand.name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
