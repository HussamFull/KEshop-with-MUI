// src/layout/Dashboard/DashboardLayout.jsx

import React, { useState, useMemo } from "react";
import {
  Box,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { styled, useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    ...(!open && {
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(7),
      },
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardLayout() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#3f51b5" },
                secondary: { main: "#f50057" },
                background: { default: "#f4f6f8", paper: "#ffffff" },
              }
            : {
                primary: { main: "#90caf9" },
                secondary: { main: "#f48fb1" },
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
        typography: {
          fontFamily: "'Roboto', sans-serif",
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                ...(mode === 'dark' && {
                  boxShadow: '0 8px 24px rgba(255,255,255,0.06)',
                }),
              },
            },
          },
        },
      }),
    [mode]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // قم بتغيير القيمة الأولية لحالة الشريط الجانبي بناءً على حجم الشاشة
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerToggle = () => setOpen(!open);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        >
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Navbar>
        <Sidebar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </ThemeProvider>
  );
}