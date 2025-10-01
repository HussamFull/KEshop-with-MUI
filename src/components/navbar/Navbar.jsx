import * as React from 'react';
import { useState } from 'react';
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
import { Link, Links } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';  
import LanguageIcon from '@mui/icons-material/Language'; // **استيراد أيقونة اللغة**
import { useTranslation } from 'react-i18next'; // **استيراد useTranslation**
import { useMediaQuery, useTheme } from '@mui/material'; // **مكونات إضافية للاستجابة**


// الألوان الجديدة من لوحة الألوان
const colors = {
    forest: '#002623',
    goldenWheat: '#988561',
    deepUmber: '#260f14',
    white: '#ffffff',
};

// تم تعديل تعريف الدالة لاستقبال IsloggendIn و setIsloggendIn كـ props
export default function Navbar({ IsloggendIn, setIsloggendIn }) { 

    // **استخدام i18n من useTranslation لتغيير اللغة**
    const { t, i18n } = useTranslation(); 

    // حالة القائمة: الروابط، والمستخدم، واللغة
    const [anchorElNav, setAnchorElNav] = useState(null); 
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLang, setAnchorElLang] = useState(null); // **حالة قائمة اللغة الجديدة**

    const navigate = useNavigate();
    const {mode, toggleTheme} = useContext(ThemeContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // دالة تغيير اللغة
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setAnchorElLang(null); // إغلاق القائمة بعد الاختيار
    };

    // دوال فتح وإغلاق القوائم
    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setIsloggendIn(false);
        handleCloseUserMenu();
        handleCloseNavMenu(); 
        navigate("/login");
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleOpenLangMenu = (event) => { // **دالة فتح قائمة اللغة**
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseLangMenu = () => { // **دالة إغلاق قائمة اللغة**
        setAnchorElLang(null);
    };
    
    // تعريف اللغات المتوفرة
    const availableLanguages = [
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'العربية' },
       
        { code: 'de', name: 'Deutsch' },
    ];


    return (
        <AppBar position="static" sx={{ bgcolor: colors.forest }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* لوجو الديسكتوب */}
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

                    {/* -------------------- قائمة الجوال (Mobile Menu) -------------------- */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
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
                            
                            {/* روابط ثابتة */}
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                                <Typography sx={{ textAlign: 'center' }}> {t("Home")} </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/Category">
                                <Typography sx={{ textAlign: 'center' }}> {t("Categories")}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/Product">
                                <Typography sx={{ textAlign: 'center' }}>  {t("Products")}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/brand">
                                <Typography sx={{ textAlign: 'center' }}>  {t("Brands")} </Typography>
                            </MenuItem>

                            {/* زر تبديل اللغة في قائمة الجوال (لتفادي مشكلة المساحة) */}
                            { isMobile && (
                                <MenuItem onClick={handleOpenLangMenu}>
                                    <LanguageIcon sx={{ mr: 1, color: colors.goldenWheat }} />
                                    <Typography sx={{ textAlign: 'center' }}>  {t("Language")} </Typography>
                                </MenuItem>
                            )}
                            
                            {/* الروابط الشرطية للجوال */}
                            { IsloggendIn 
                                ? [ 
                                    <MenuItem key="cart-m" onClick={handleCloseNavMenu} component={Link} to="/cart">
                                        <Typography sx={{ textAlign: 'center' }}>  {t("Cart")} </Typography>
                                    </MenuItem>,
                                    <MenuItem key="logout-m" onClick={handleLogout} >
                                        <Typography sx={{ textAlign: 'center' }}>  {t("Logout")} </Typography>
                                    </MenuItem>
                                ] 
                                : [ 
                                    <MenuItem key="register-m" onClick={handleCloseNavMenu} component={Link} to="/register">
                                        <Typography sx={{ textAlign: 'center' }}>  {t("Register")} </Typography>
                                    </MenuItem>,
                                    <MenuItem key="login-m" onClick={handleCloseNavMenu} component={Link} to="/login">
                                        <Typography sx={{ textAlign: 'center' }}>  {t("Login")}</Typography>
                                    </MenuItem>
                                ] 
                            }
                        </Menu>
                    </Box>

                    {/* لوجو الجوال */}
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
                    
                    {/* -------------------- قائمة الديسكتوب (Desktop Links) -------------------- */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center',
                        }}
                    >
                        
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/">
                             {t("Home")}
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/Category">
                             {t("Categories")}
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/Product">
                              {t("Products")} 
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/brand">
                             {t("Brands")} 
                        </Button>

                        {/* الروابط الشرطية للديسكتوب */}
                        { IsloggendIn 
                            ? ( 
                                <>
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/cart">
                                         {t("Cart")}
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            handleLogout(); 
                                        }}
                                        sx={{ my: 2, color: colors.goldenWheat, display: 'block' }}
                                    >
                                        {t("Logout")} 
                                    </Button>
                                </>
                            )
                            : ( 
                                <>
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/register">
                                         {t("Register")} 
                                    </Button>
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/login">
                                          {t("Login")} 
                                    </Button>
                                </>
                            )
                        }
                    </Box>

                    {/* -------------------- زر تبديل اللغة (Language Button) -------------------- */}
                    {/* إخفاؤه في الجوال لأنه تمت إضافته داخل قائمة الجوال */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Tooltip title={t("Change Language")}>
                            <IconButton 
                                sx={{ ml: 1, color: colors.goldenWheat }} 
                                onClick={handleOpenLangMenu}
                                aria-controls="language-menu"
                                aria-haspopup="true"
                            >
                                <LanguageIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* قائمة اللغات المنسدلة */}
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
                        {availableLanguages.map((lang) => (
                            <MenuItem 
                                key={lang.code} 
                                onClick={() => handleChangeLanguage(lang.code)}
                                selected={i18n.language === lang.code} // تحديد اللغة الحالية
                            >
                                <Typography sx={{ textAlign: 'center' }}>{lang.name}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>

                    {/* -------------------- زر تبديل الثيم (Theme Toggle) -------------------- */}
                    <Tooltip title={t("Toggle Theme")}>
                        <IconButton 
                            sx={{ ml: 1, color: colors.goldenWheat }} 
                            onClick={toggleTheme} 
                            color="inherit"
                        >
                            {mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>} {/* عكس الأيقونات لتبدو أكثر منطقية */}
                        </IconButton>
                    </Tooltip>


                    {/* -------------------- قائمة إعدادات المستخدم (User Settings) -------------------- */}
                    <Box sx={{ flexGrow: 0, ml: 1 }}>
                        { IsloggendIn && (
                            <>
                                <Tooltip title={t("Open settings")}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Profile">
                                        <Typography sx={{ textAlign: 'center' }}>{t("Profile")}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Account">
                                        <Typography sx={{ textAlign: 'center' }}>{t("Account")}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Dashboard">
                                        <Typography sx={{ textAlign: 'center' }}>{t("Dashboard")}</Typography>
                                    </MenuItem>
                                    {/* زر تسجيل الخروج في قائمة الإعدادات */}
                                    <MenuItem onClick={handleLogout} >
                                        <Typography sx={{ textAlign: 'center' }}> {t("Logout")} </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}