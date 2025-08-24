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

const colors = {
  forest: '#002623',
  goldenWheat: '#988561',
  charcoal: '#161616',
  deepUmber: '#260f14',
  white: '#ffffff',
  grey: '#d0d0d0', // لون رمادي فاتح للنصوص الثانوية
};

const footerLinks = [
  { section: 'Shop', links: ['Categories', 'Products', 'Brands', 'Cart'] },
  { section: 'Company', links: ['About Us', 'Contact Us', 'Careers', 'Press'] },
  { section: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
];

function StylishFooter() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: colors.forest,
        color: colors.goldenWheat,
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
              <AdbIcon sx={{ display: 'flex', mr: 1, color: colors.goldenWheat }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: colors.goldenWheat,
                  textDecoration: 'none',
                }}
              >
                SyriaEShop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: colors.grey }}>
              Discover a world of unique products and brands. Shop confidently with our seamless and secure online experience.
            </Typography>
          </Grid>
          {footerLinks.map((col) => (
            <Grid key={col.section} item xs={6} md={2}>
              <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
                {col.section}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {col.links.map((link) => (
                  <Link 
                    key={link}
                    href="#"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      opacity: 0.8,
                      transition: 'opacity 0.3s',
                      '&:hover': { opacity: 1 },
                      fontSize: '0.9rem'
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="subtitle1" color="inherit" fontWeight="bold" gutterBottom>
              Connect with us
            </Typography>
            <Box>
              <IconButton href="https://facebook.com" color="inherit" aria-label="facebook">
                <FacebookIcon sx={{ transition: 'color 0.3s', '&:hover': { color: colors.white } }} />
              </IconButton>
              <IconButton href="https://twitter.com" color="inherit" aria-label="twitter">
                <TwitterIcon sx={{ transition: 'color 0.3s', '&:hover': { color: colors.white } }} />
              </IconButton>
              <IconButton href="https://instagram.com" color="inherit" aria-label="instagram">
                <InstagramIcon sx={{ transition: 'color 0.3s', '&:hover': { color: colors.white } }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid', borderColor: '#161616', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: colors.grey }}>
            © {new Date().getFullYear()} SyriaEShop. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default StylishFooter;