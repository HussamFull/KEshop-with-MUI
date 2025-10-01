import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import AdbIcon from '@mui/icons-material/Adb';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const colors = {
  forest: '#002623',
  goldenWheat: '#988561',
  charcoal: '#161616',
  deepUmber: '#260f14',
  white: '#ffffff',
  grey: '#d0d0d0', // لون رمادي فاتح للنصوص الثانوية
};

// **تم إزالة مصفوفة footerLinks لأن الروابط ستكون ثابتة (Static)**
// const footerLinks = [
//   { section: 'Shop', links: ['Categories', 'Products', 'Brands', 'Cart'] },
//   { section: 'Company', links: ['About Us', 'Contact Us', 'Careers', 'Press'] },
//   { section: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
// ];

// **مصفوفة تعريفية للروابط الثابتة (للتوضيح فقط، لن تُستخدم في الرندر)**
const staticFooterData = [
    { 
        sectionKey: 'Shop', 
        links: [
            { key: 'Categories', path: '/categories' }, 
            { key: 'Products', path: '/products' }, 
            { key: 'Brands', path: '/brands' }, 
            { key: 'Cart', path: '/cart' }
        ] 
    },
    { 
        sectionKey: 'Company', 
        links: [
            { key: 'About Us', path: '/about' }, 
            { key: 'Contact Us', path: '/contact' }, 
            { key: 'Careers', path: '/careers' }, 
            { key: 'Press', path: '/press' }
        ] 
    },
    { 
        sectionKey: 'Legal', 
        links: [
            { key: 'Privacy Policy', path: '/privacy' }, 
            { key: 'Terms of Service', path: '/terms' }, 
            { key: 'Cookie Policy', path: '/cookies' }
        ] 
    },
];

// دالة مساعدة لإنشاء رابط ثابت (لتجنب التكرار الكثير في الكود)
const StaticFooterLink = ({ to, text, color }) => (
    <Link 
        href={to}
        color={color}
        underline="none"
        sx={{ 
            opacity: 0.8,
            transition: 'opacity 0.3s',
            '&:hover': { opacity: 1 },
            fontSize: '0.9rem'
        }}
    >
        {text}
    </Link>
);


function StylishFooter() {
  const {t } = useTranslation();
  const theme = useTheme();

  // إعداد النمط المشترك للروابط
  const linkColor = colors.goldenWheat; 

  return (
    <Box
      sx={{
        bgcolor: colors.forest,
        color: linkColor, // تغيير اللون الأساسي إلى goldenWheat
        py: { xs: 6, md: 8 },
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: '#161616', 
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }} justifyContent="space-between">
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 2 }}>
              <AdbIcon sx={{ display: 'flex', mr: 1, color: linkColor }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: linkColor,
                  textDecoration: 'none',
                }}
              >
                SyriaEShop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: colors.grey }}>
              {t("Discover a world of unique products and brands. ")}
             {t(" Shop confidently with our seamless and secure online experience.")}
            </Typography>
          </Grid>
          
          {/* ==============================================
            ========= قسم الروابط الثابتة (Shop) ==========
            ==============================================
          */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
              {t("Shop")}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* رابط Categories */}
              <StaticFooterLink 
                  to="/categories" 
                  text={t("Categories")} 
                  color={linkColor}
              />
              {/* رابط Products */}
              <StaticFooterLink 
                  to="/products" 
                  text={t("Products")} 
                  color={linkColor}
              />
              {/* رابط Brands */}
              <StaticFooterLink 
                  to="/brands" 
                  text={t("Brands")} 
                  color={linkColor}
              />
              {/* رابط Cart */}
              <StaticFooterLink 
                  to="/cart" 
                  text={t("Cart")} 
                  color={linkColor}
              />
            </Box>
          </Grid>

          {/* ==============================================
            ======== قسم الروابط الثابتة (Company) ========
            ==============================================
          */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
              {t("Company")}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* رابط About Us */}
              <StaticFooterLink 
                  to="/about" 
                  text={t("About Us")} 
                  color={linkColor}
              />
              {/* رابط Contact Us */}
              <StaticFooterLink 
                  to="/contact" 
                  text={t("Contact Us")} 
                  color={linkColor}
              />
              {/* رابط Careers */}
              <StaticFooterLink 
                  to="/careers" 
                  text={t("Careers")} 
                  color={linkColor}
              />
              {/* رابط Press */}
              <StaticFooterLink 
                  to="/press" 
                  text={t("Press")} 
                  color={linkColor}
              />
            </Box>
          </Grid>

          {/* ==============================================
            ========= قسم الروابط الثابتة (Legal) =========
            ==============================================
          */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
              {t("Legal")}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* رابط Privacy Policy */}
              <StaticFooterLink 
                  to="/privacy" 
                  text={t("Privacy Policy")} 
                  color={linkColor}
              />
              {/* رابط Terms of Service */}
              <StaticFooterLink 
                  to="/terms" 
                  text={t("Terms of Service")} 
                  color={linkColor}
              />
              {/* رابط Cookie Policy */}
              <StaticFooterLink 
                  to="/cookies" 
                  text={t("Cookie Policy")} 
                  color={linkColor}
              />
            </Box>
          </Grid>

          {/* ==============================================
            ======== قسم روابط التواصل الاجتماعي ========
            ==============================================
          */}
          <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
              {t("Connect with us")}
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" color="inherit" aria-label="facebook" sx={{ color: linkColor }}>
                <FacebookIcon sx={{ transition: 'color 0.3s', '&:hover': { color: colors.white } }} />
              </IconButton>
              <IconButton href="https://twitter.com" color="inherit" aria-label="twitter" sx={{ color: linkColor }}>
                <TwitterIcon sx={{ transition: 'color 0.3s', '&:hover': { color: colors.white } }} />
              </IconButton>
              <IconButton href="https://instagram.com" color="inherit" aria-label="instagram" sx={{ color: linkColor }}>
                <InstagramIcon sx={{ transition: 'color 0.3s', '&:hover': { color: colors.white } }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid', borderColor: '#161616', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: colors.grey }}>
            © {new Date().getFullYear()} SyriaEShop. {t("All rights reserved.")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default StylishFooter;