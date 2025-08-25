import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  useTheme, // Added useTheme hook
  MenuItem, // Added MenuItem for dropdown
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const TOKEN = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "https://localhost:7227/api/Admin/Products",
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const categoriesApi = axios.create({
  baseURL: "https://localhost:7227/api/Admin/CategoriesControllers", // Corrected URL based on previous examples
  headers: { Authorization: `Bearer ${TOKEN}` },
});
const brandsApi = axios.create({
  baseURL: "https://localhost:7227/api/Admin/Brands",
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export default function Products() {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brandId: "",
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchAllData = async () => {
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        api.get(""),
        categoriesApi.get(""),
        brandsApi.get(""),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to fetch products",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleOpen = (product = null) => {
    setEditingProduct(product);
    setFormData(
      product || {
        name: "",
        description: "",
        categoryId: "",
        brandId: "",
      }
    );
    setMainImageFile(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setMainImageFile(null);
    setFormData({
      name: "",
      description: "",
      categoryId: "",
      brandId: "",
    });
  };

  const handleSave = async () => {
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("name", formData.name);
      formDataWithFile.append("description", formData.description);
      if (mainImageFile) {
        formDataWithFile.append("mainImage", mainImageFile);
      }
      formDataWithFile.append("categoryId", formData.categoryId);
      formDataWithFile.append("brandId", formData.brandId);

      if (editingProduct) {
        await api.put(`/${editingProduct.id}`, formDataWithFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSnackbar({
          open: true,
          message: "Product updated successfully!",
          severity: "success",
        });
      } else {
        await api.post("", formDataWithFile, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSnackbar({
          open: true,
          message: "Product added successfully!",
          severity: "success",
        });
      }

      fetchAllData();
      handleClose();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to save product.", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setSnackbar({
        open: true,
        message: "Product deleted",
        severity: "info",
      });
      fetchAllData();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to delete product.",
        severity: "error",
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
        Products Management 🛍️
      </Typography>

      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Search for a product..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 25,
                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[100],
                "& fieldset": {
                  borderColor: theme.palette.primary.main,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            fullWidth
            sx={{
              height: "56px",
              borderRadius: 25,
              fontWeight: "bold",
              bgcolor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            + Add New Product
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
            <TableRow>
              <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} sx={{ '&:hover': { bgcolor: theme.palette.action.hover } }}>
                  <TableCell>
                    <img
                      src={`https://localhost:7227/images/${product.mainImageUrl}`}
                      alt={product.name}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{product.name}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>{product.description}</TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {categories.find(c => c.id === product.categoryId)?.name || 'N/A'}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {brands.find(b => b.id === product.brandId)?.name || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(product)}
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product.id)}
                      size="small"
                      sx={{ color: theme.palette.secondary.main }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: theme.palette.text.secondary }}>
                  No products to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{
              "& label.Mui-focused": { color: theme.palette.primary.main },
              "& .MuiInput-underline:after": { borderBottomColor: theme.palette.primary.main },
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{
              "& label.Mui-focused": { color: theme.palette.primary.main },
              "& .MuiInput-underline:after": { borderBottomColor: theme.palette.primary.main },
            }}
          />
          <TextField
            select
            fullWidth
            margin="dense"
            label="Category"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            sx={{
              "& label.Mui-focused": { color: theme.palette.primary.main },
              "& .MuiInput-underline:after": { borderBottomColor: theme.palette.primary.main },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            margin="dense"
            label="Brand"
            value={formData.brandId}
            onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
            sx={{
              "& label.Mui-focused": { color: theme.palette.primary.main },
              "& .MuiInput-underline:after": { borderBottomColor: theme.palette.primary.main },
            }}
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </TextField>
          <div style={{ margin: "10px 0" }}>
            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
              Upload Main Image
            </Typography>
            <input
              type="file"
              onChange={(e) => setMainImageFile(e.target.files[0])}
              style={{ marginTop: 8 }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main, "&:hover": { bgcolor: theme.palette.primary.dark } }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
}