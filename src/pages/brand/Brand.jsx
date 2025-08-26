import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import pattern from './pattern.svg';


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

// Dummy data for horizontal scroll
const horizontalCategories = [
    { id: 1, name: 'Glassware', image: 'https://images.unsplash.com/photo-1549487922-a9b31d8c119e?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Pottery', image: 'https://images.unsplash.com/photo-1582046429219-c07a012a64c4?q=80&w=2835&auto=format&fit=crop' },
    { id: 3, name: 'Handwoven Baskets', image: 'https://images.unsplash.com/photo-1555523097-f5778832a87a?q=80&w=1974&auto=format&fit=crop' },
    { id: 4, name: 'Silk Scarves', image: 'https://images.unsplash.com/photo-1621609761923-d8c9735d4653?q=80&w=1974&auto=format&fit=crop' },
    { id: 5, name: 'Syrian Soap', image: 'https://images.unsplash.com/photo-1621609761923-d8c9735d4653?q=80&w=1974&auto=format&fit=crop' },
    { id: 6, name: 'Jewelry', image: 'https://images.unsplash.com/photo-1549487922-a9b31d8c119e?q=80&w=1974&auto=format&fit=crop' },
    { id: 7, name: 'Wooden Toys', image: 'https://images.unsplash.com/photo-1582046429219-c07a012a64c4?q=80&w=2835&auto=format&fit=crop' },
    { id: 8, name: 'Traditional Clothing', image: 'https://images.unsplash.com/photo-1555523097-f5778832a87a?q=80&w=1974&auto=format&fit=crop' },
];

export default function Brand() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ direction: 'ltr', bgcolor: colors.goldenWheatFaint }}>

                {/* === القسم الأول: صورة Hero ثابتة === */}
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: { xs: '60vh', md: '40vh' },
                        // تم تغيير الصورة لتكون الخلفية الثابتة
    backgroundImage: `url(${pattern})`, // استخدم المتغير الذي قمت باستيراده
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
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
                            Brand New Collections
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 4, maxWidth: '600px', mx: 'auto', color: colors.grey }}>
Explore the latest collections from premium Syrian brands.                        </Typography>
                    </Container>
                </Box>

                {/* === القسم الثاني: التمرير الأفقي === */}
                <Box sx={{ py: 8, bgcolor: colors.goldenWheatFaint }}>
                    <Container maxWidth="lg">
                        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 5, fontWeight: 700, color: colors.deepUmber }}>
                            All Brands
                        </Typography>
                    </Container>

                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            gap: 3,
                            pb: 2,
                            px: { xs: 2, sm: 3, md: 5 },
                            '&::-webkit-scrollbar': {
                                height: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                bgcolor: colors.deepUmber,
                                borderRadius: '10px',
                            },
                            '&::-webkit-scrollbar-track': {
                                bgcolor: colors.goldenWheatFaint,
                            },
                        }}
                    >
                        {horizontalCategories.map((category) => (
                            <Box
                                key={category.id}
                                sx={{
                                    minWidth: { xs: 200, sm: 250, md: 300 },
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: { xs: 200, sm: 250, md: 300 },
                                        backgroundImage: `url(${category.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: 3,
                                        position: 'relative',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '50%',
                                            background: `linear-gradient(to top, ${colors.deepUmber}, transparent)`,
                                            opacity: 0.8,
                                            borderRadius: '0 0 12px 12px',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 16,
                                            left: 16,
                                            color: colors.goldenWheatFaint,
                                            fontWeight: 'bold',
                                            zIndex: 1,
                                        }}
                                    >
                                        {category.name}
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