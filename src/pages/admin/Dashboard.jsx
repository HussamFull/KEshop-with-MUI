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
import { useTheme } from "@mui/material/styles";

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
function StatCard({ title, value, icon, color }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 3,
        bgcolor: color,
        color: "#fff",
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
      <Box sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: 48 }}>{icon}</Box>
    </Card>
  );
}

export default function Dashboard() {
  const theme = useTheme();
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Dashboard Overview
      </Typography>

      {/* بطاقات الإحصائيات */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value="$24,000"
            icon={<TrendingUpIcon fontSize="inherit" />}
            color={theme.palette.mode === "dark" ? "#64b5f6" : "#2196f3"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Orders"
            value="1,250"
            icon={<ShoppingCartIcon fontSize="inherit" />}
            color={theme.palette.mode === "dark" ? "#81c784" : "#4caf50"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Customers"
            value="3,400"
            icon={<PeopleIcon fontSize="inherit" />}
            color={theme.palette.mode === "dark" ? "#ffb74d" : "#ff9800"}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value="45"
            icon={<CategoryIcon fontSize="inherit" />}
            color={theme.palette.mode === "dark" ? "#ba68c8" : "#9c27b0"}
          />
        </Grid>
      </Grid>

      {/* الرسم البياني للمبيعات */}
      <Card sx={{ p: 2, overflowX: 'auto' }}> {/* إضافة overflowX */}
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            Monthly Sales
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                dot={{ stroke: theme.palette.primary.main, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}