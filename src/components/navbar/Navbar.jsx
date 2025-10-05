import React, { useState, useEffect, useContext, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import i18next from 'i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import AxiosUserInstanse from '../../api/AxiosUserInstanse';
import AxiosProfileInstanse from '../../api/AxiosProfileInstanse';

// ألوان (كما في كودك)
const colors = {
  forest: '#002623',
  goldenWheat: '#988561',
  deepUmber: '#260f14',
  white: '#ffffff',
};

export default function Navbar({ IsloggendIn, setIsloggendIn }) {
  // -------------------------
  // جميع الـ Hooks يجب أن تكون هنا وفي ترتيب ثابت
  // -------------------------
  const { t, i18n } = useTranslation();

  // Theme context (التأكد من وجود fallback)
  const themeContext = useContext(ThemeContext) || {};
  const mode = themeContext.mode || 'light';
  const toggleTheme = themeContext.toggleTheme || (() => {});

  // MUI theme from ancestor (لا تُغيِّر هذا مكانه)
  const outerTheme = useTheme();
  const isMobile = useMediaQuery(outerTheme.breakpoints.down('md'));

  // حالة اللغة
  const [lang, setLang] = useState(i18next.language || 'en');

  // قوائم الـ menus (anchors)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);

  // نافيجيتور
  const navigate = useNavigate();
  // -------------------------

  // -------------------------
  // UserProfile state
    const fetchProfile = async () => {
    const response = await AxiosProfileInstanse.get('/Users/Profile');
    return response;
  };

  const { data:user } = useQuery({
    queryKey: ['User'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
  });

  console.log(user);
  // -------------------------


  // جلب بيانات السلة (React Query) - Hook لا يجب وضعه داخل شرط
  const fetchProducts = async () => {
    const response = await AxiosUserInstanse.get('/Carts');
    return response;
  };

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  // حساب عدد عناصر السلة بأمان
  const cartItemCount = useMemo(() => {
    return data?.data?.items?.length ?? 0;
  }, [data]);

  // تهيئة الثيم مع اتجاه الصفحة (memoize)
  const themeWithDirection = useMemo(() => {
    const dir = i18next.dir(lang);
    return createTheme({
      direction: dir,
      palette: { mode },
      components: {
        MuiAppBar: { styleOverrides: { root: { direction: dir } } },
        MuiToolbar: { styleOverrides: { root: { direction: dir } } },
      },
    });
  }, [mode, lang]);

  // تأثير لتغيير اتجاه المستند عند تغيير اللغة
  useEffect(() => {
    document.documentElement.dir = i18next.dir(lang);
  }, [lang]);

  // -------------------------
  // الآن يمكن أن نستخدم إرجاع مبكر للـ loading / error بأمان
  // (كل الـ Hooks سُتُدعَى دائمًا قبل هذه الـ returns)
  // -------------------------
  if (isError) {
    console.error('Navbar fetch error:', error);
    return <div>Error: {error?.message || 'Unknown'}</div>;
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  // -------------------------
  // العمليات والأحداث (غير-Hook)
  // -------------------------
  const handleChangeLanguage = (langCode) => {
    i18next.changeLanguage(langCode);
    setLang(langCode);
    setAnchorElLang(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsloggendIn(false);
    setAnchorElUser(null);
    setAnchorElNav(null);
    navigate('/login');
  };

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleOpenLangMenu = (e) => setAnchorElLang(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseLangMenu = () => setAnchorElLang(null);

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
  ];

  // -------------------------
  // JSX للإظهار
  // -------------------------
  return (
    <ThemeProvider theme={themeWithDirection}>
      <AppBar position="static" sx={{ bgcolor: colors.forest }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: colors.goldenWheat }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: colors.goldenWheat,
                textDecoration: 'none',
              }}
            >
              SyriaEShop
            </Typography>

            {/* Mobile menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon sx={{ color: colors.goldenWheat }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                  <Typography>{t('Home')}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/Category">
                  <Typography>{t('Categories')}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/Product">
                  <Typography>{t('Products')}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/brand">
                  <Typography>{t('Brands')}</Typography>
                </MenuItem>

                {isMobile && (
                  <MenuItem onClick={handleOpenLangMenu}>
                    <LanguageIcon sx={{ mr: 1, color: colors.goldenWheat }} />
                    <Typography>{t('Language')}</Typography>
                  </MenuItem>
                )}

                {IsloggendIn ? (
                  <>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to="/cart">
                      <Typography>{t('Cart')} {cartItemCount}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography>{t('Logout')}</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to="/register">
                      <Typography>{t('Register')}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu} component={Link} to="/login">
                      <Typography>{t('Login')}</Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            {/* Mobile logo */}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: colors.goldenWheat }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: colors.goldenWheat,
                textDecoration: 'none',
              }}
            >
              SyriaEShop
            </Typography>

            {/* Desktop links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat }} component={Link} to="/">
                {t('Home')}
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat }} component={Link} to="/Category">
                {t('Categories')}
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat }} component={Link} to="/Product">
                {t('Products')}
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat }} component={Link} to="/brand">
                {t('Brands')}
              </Button>

              {IsloggendIn ? (
                <>
                  <Button component={Link} to="/cart" sx={{ my: 2, color: colors.goldenWheat }}>
                    {t('Cart')} ({cartItemCount})
                  </Button>
                  <Button onClick={() => { handleCloseNavMenu(); handleLogout(); }} sx={{ my: 2, color: colors.goldenWheat }}>
                    {t('Logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/register" sx={{ my: 2, color: colors.goldenWheat }}>
                    {t('Register')}
                  </Button>
                  <Button component={Link} to="/login" sx={{ my: 2, color: colors.goldenWheat }}>
                    {t('Login')}
                  </Button>
                </>
              )}
            </Box>

            {/* Language button */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title={t('Change Language')}>
                <IconButton sx={{ ml: 1, color: colors.goldenWheat }} onClick={handleOpenLangMenu}>
                  <LanguageIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Menu
              sx={{ mt: '45px' }}
              id="language-menu"
              anchorEl={anchorElLang}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              {availableLanguages.map((lng) => (
                <MenuItem key={lng.code} onClick={() => handleChangeLanguage(lng.code)} selected={i18n.language === lng.code}>
                  <Typography>{lng.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Theme toggle */}
            <Tooltip title={t('Toggle Theme')}>
              <IconButton sx={{ ml: 1, color: colors.goldenWheat }} onClick={toggleTheme}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* User menu */}
            <Box sx={{ flexGrow: 0, ml: 1 }}>
              {IsloggendIn && (
                <>
                  <Tooltip title={t('Open settings')}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar-user"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu} >
                      <Typography>{t('Welcome')} {user?.data.fullName} </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Profile">
                      <Typography>{t('Profile')}</Typography>
                    </MenuItem>
                   {/*  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Account">
                      <Typography>{t('Account')}</Typography>
                    </MenuItem> */}
                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Dashboard">
                      <Typography>{t('Dashboard')}</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography>{t('Logout')}</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
