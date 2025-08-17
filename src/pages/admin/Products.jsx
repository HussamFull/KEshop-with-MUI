import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
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
} from "@mui/material";

// جميل
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const TOKEN = localStorage.getItem("authToken");

const api = axios.create({
  baseURL: "https://localhost:7227/api/Admin/Products",
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const categoriesApi = axios.create({
  baseURL: "https://localhost:7227/api/Admin/Categories",
  headers: { Authorization: `Bearer ${TOKEN}` },
});
const brandsApi = axios.create({
  baseURL: "https://localhost:7227/api/Admin/Brands",
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export default function Products() {
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
      const [productsRes] = await Promise.all([
        api.get(""),
      ]);
      setProducts(productsRes.data);
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
      <Typography variant="h4" gutterBottom>
        Products 🛍️
      </Typography>

      {/* Grid container with reverse direction for right-to-left alignment */}
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: 20 }} direction="row-reverse">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Search for a product..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              style: {
                borderRadius: 25,
                backgroundColor: "#f5f5f5",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
            fullWidth
            style={{
              height: "56px",
              borderRadius: 25,
              fontWeight: "bold",
            }}
          >
            + Add New Product
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} elevation={3} style={{ borderRadius: 15, overflow: "hidden" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Category ID</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Brand ID</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.mainImageUrl}
                      alt={product.name}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.categoryId}</TableCell>
                  <TableCell>{product.brandId}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(product)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(product.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products to display.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div style={{ margin: "10px 0" }}>
            <Typography variant="body1">Upload Main Image</Typography>
            <input
              type="file"
              onChange={(e) => setMainImageFile(e.target.files[0])}
              style={{ marginTop: 8 }}
            />
          </div>
          <TextField
            fullWidth
            margin="dense"
            label="Category ID"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            type="number"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Brand ID"
            value={formData.brandId}
            onChange={(e) =>
              setFormData({ ...formData, brandId: e.target.value })
            }
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
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