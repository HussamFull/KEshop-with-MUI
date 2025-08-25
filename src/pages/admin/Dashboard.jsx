// src/pages/admin/Dashboard.jsx
import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";

// الألوان الجديدة من لوحة الألوان التي استخدمتها في صفحة الريجستر
const colors = {
  forest: "#002623",
  goldenWheat: "#988561",
  charcoal: "#161616",
  deepUmber: "#260f14",
  white: "#ffffff",
  grey: "#d0d0d0",
};

// بيانات الرسم البياني
const salesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
  { month: "Apr", sales: 450 },
  { month: "May", sales: 600 },
  { month: "Jun", sales: 700 },
];

// بطاقة إحصائية
function StatCard({ title, value, icon, cardColor, iconColor }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        bgcolor: cardColor, // استخدام لون البطاقة الممرر
        color: colors.white, // لون النص أبيض
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Box sx={{ color: iconColor, fontSize: 48 }}>{icon}</Box>
    </Card>
  );
}

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" , color: colors.deepUmber }}>
        Dashboard Overview
      </Typography>

      {/* بطاقات الإحصائيات */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value="$24,000"
            icon={<TrendingUpIcon fontSize="inherit" />}
            cardColor={colors.goldenWheat} // لون البطاقة من الهوية البصرية
            iconColor={"rgba(255, 255, 255, 0.6)"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Orders"
            value="1,250"
            icon={<ShoppingCartIcon fontSize="inherit" />}
            cardColor={colors.deepUmber} // لون البطاقة من الهوية البصرية
            iconColor={"rgba(255, 255, 255, 0.6)"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Customers"
            value="3,400"
            icon={<PeopleIcon fontSize="inherit" />}
            cardColor={colors.forest} // لون البطاقة من الهوية البصرية
            iconColor={"rgba(255, 255, 255, 0.6)"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value="45"
            icon={<CategoryIcon fontSize="inherit" />}
            cardColor={colors.charcoal} // لون البطاقة من الهوية البصرية
            iconColor={"rgba(255, 255, 255, 0.6)"}
          />
        </Grid>
      </Grid>

      {/* الرسم البياني للمبيعات */}
      <Card sx={{ p: 2, overflowX: "auto" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: colors.charcoal }}>
            Monthly Sales
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={colors.charcoal} />
              <YAxis stroke={colors.charcoal} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={colors.deepUmber} // لون الخط من الهوية البصرية
                strokeWidth={3}
                dot={{ stroke: colors.goldenWheat, strokeWidth: 2, r: 4 }} // لون النقطة من الهوية البصرية
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}