import * as React from 'react';
import { useState } from 'react'; // **التصحيح: تأكد من استيراد useState بشكل صحيح**
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

// الألوان الجديدة من لوحة الألوان
const colors = {
    forest: '#002623',
    goldenWheat: '#988561',
    deepUmber: '#260f14',
    white: '#ffffff',
};

// تم تعديل تعريف الدالة لاستقبال IsloggendIn و setIsloggendIn كـ props
export default function Navbar({ IsloggendIn, setIsloggendIn }) { 
    // **التصحيح: استخدام useState مباشرة**
    const [anchorElNav, setAnchorElNav] = useState(null); 
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

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

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                        {/* ... (باقي كود أيقونة القائمة) ... */}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                                <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/Category">
                                <Typography sx={{ textAlign: 'center' }}>Categorys</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/Product">
                                <Typography sx={{ textAlign: 'center' }}>Products</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} component={Link} to="/brand">
                                <Typography sx={{ textAlign: 'center' }}>Brands</Typography>
                            </MenuItem>

                            {/* الروابط الشرطية للجوال - تم التخلص من Fragment */}
                            { IsloggendIn 
                                ? [ // إذا كان مسجلاً للدخول
                                    <MenuItem key="cart-m" onClick={handleCloseNavMenu} component={Link} to="/cart">
                                        <Typography sx={{ textAlign: 'center' }}>Cart</Typography>
                                    </MenuItem>,
                                    <MenuItem key="logout-m" onClick={handleLogout} >
                                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                    </MenuItem>
                                ] 
                                : [ // إذا لم يكن مسجلاً للدخول
                                    <MenuItem key="register-m" onClick={handleCloseNavMenu} component={Link} to="/register">
                                        <Typography sx={{ textAlign: 'center' }}>Register</Typography>
                                    </MenuItem>,
                                    <MenuItem key="login-m" onClick={handleCloseNavMenu} component={Link} to="/login">
                                        <Typography sx={{ textAlign: 'center' }}>Login</Typography>
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
                        LOGO
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
                            Home
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/Category">
                            Categorys
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/Product">
                            Products
                        </Button>
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/brand">
                            Brands
                        </Button>

                        {/* الروابط الشرطية للديسكتوب */}
                        { IsloggendIn 
                            ? ( // إذا كان مسجلاً للدخول (LoggedIn)
                                <>
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/cart">
                                        Cart
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            handleLogout(); 
                                        }}
                                        sx={{ my: 2, color: colors.goldenWheat, display: 'block' }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )
                            : ( // إذا لم يكن مسجلاً للدخول (LoggedOut)
                                <>
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/register">
                                        Register
                                    </Button>
                                    <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: colors.goldenWheat, display: 'block' }} component={Link} to="/login">
                                        Login
                                    </Button>
                                </>
                            )
                        }
                    </Box>

                    {/* -------------------- قائمة إعدادات المستخدم (User Settings) -------------------- */}
                    <Box sx={{ flexGrow: 0 }}>
                        {/* **ستظهر أيقونة المستخدم والقائمة المنسدلة فقط عند IsloggendIn = true** */}
                        { IsloggendIn && (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {/* **صورة المستخدم الدائرية** */}
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
                                        <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Account">
                                        <Typography sx={{ textAlign: 'center' }}>Account</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/Dashboard">
                                        <Typography sx={{ textAlign: 'center' }}>Dashboard</Typography>
                                    </MenuItem>
                                    {/* زر تسجيل الخروج في قائمة الإعدادات */}
                                    <MenuItem onClick={handleLogout} >
                                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
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