// src/layout/Dashboard/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { text: "Categories", icon: <CategoryIcon />, path: "/admin/categories" },
    { text: "Brands", icon: <CategoryIcon />, path: "/admin/Brands" },

  { text: "Products", icon: <ShoppingBagIcon />, path: "/admin/products" },
  { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
];

export default function Sidebar({ open, handleDrawerToggle, isMobile }) {
  const theme = useTheme();

  return (
       <StyledDrawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <DrawerHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2, overflow: 'hidden' }}>
          {open && (
            <Typography variant="h6" noWrap>
              My App
            </Typography>
          )}
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path} 
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>

  );
}