import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Container, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, InputAdornment, TablePagination, Avatar,
  FormControl, InputLabel, Select, MenuItem, Snackbar, Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = "https://localhost:7227/api/Admin";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();
  const location = useLocation();

  const showAlert = (message, severity = "success") => {
    setAlert({ open: true, message, severity });
  };

  // جلب البيانات (منتجات + تصنيفات + ماركات)
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    setLoading(true);
    try {
      const [productsResponse, categoriesResponse, brandsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/Products`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/Categories`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE_URL}/Brands`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
      setBrands(brandsResponse.data);

    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("فشل في جلب البيانات", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenForm = (product = null) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedProduct(null);
    fetchData();
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/Products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showAlert("تم حذف المنتج بنجاح");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("فشل في حذف المنتج", "error");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      if (selectedProduct) {
        await axios.put(`${API_BASE_URL}/Products/${selectedProduct.id}`, formData, config);
        showAlert("تم تعديل المنتج بنجاح");
      } else {
        await axios.post(`${API_BASE_URL}/Products`, formData, config);
        showAlert("تمت إضافة المنتج بنجاح");
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert("فشل في حفظ المنتج", "error");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // جدول عرض المنتجات
  const ProductTable = ({ products, onEdit, onDelete }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TextField
            label="بحث عن منتج"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>الصورة</TableCell>
                <TableCell>الاسم</TableCell>
                <TableCell>السعر</TableCell>
                <TableCell>الوصف</TableCell>
                <TableCell>الكمية</TableCell>
                <TableCell>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                          <Avatar src={product.mainImageUrl} variant="square" sx={{ width: 56, height: 56 }} />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price} $</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => onEdit(product)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(product.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    );
  };

  // نموذج إضافة/تعديل المنتج
  const ProductForm = ({ open, onClose, product, onSubmit, categories, brands }) => {
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
      if (product) {
        Object.keys(product).forEach(key => setValue(key, product[key]));
      } else {
        reset();
        setFile(null);
      }
    }, [product, reset, setValue]);

    const handleLocalSubmit = (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key.charAt(0).toUpperCase() + key.slice(1), value);
      });
      if (file) formData.append("MainImage", file);
      onSubmit(formData);
    };

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{product ? "تعديل منتج" : "إضافة منتج جديد"}</DialogTitle>
        <form onSubmit={handleSubmit(handleLocalSubmit)}>
          <DialogContent dividers>
            <TextField label="اسم المنتج" fullWidth margin="normal" {...register("name", { required: "اسم المنتج مطلوب" })} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="وصف المنتج" fullWidth margin="normal" multiline rows={4} {...register("description")} />
            <TextField label="السعر" type="number" fullWidth margin="normal" {...register("price", { required: "السعر مطلوب" })} />
            <TextField label="الخصم" type="number" fullWidth margin="normal" {...register("discount")} />
            <TextField label="الكمية" type="number" fullWidth margin="normal" {...register("quantity", { required: "الكمية مطلوبة" })} />
            <TextField label="التقييم" type="number" fullWidth margin="normal" {...register("rate")} />

            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              rules={{ required: "الفئة مطلوبة" }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
                  <InputLabel>الفئة</InputLabel>
                  <Select {...field}>
                    <MenuItem value=""><em>اختر فئة</em></MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="brandId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>العلامة التجارية</InputLabel>
                  <Select {...field}>
                    <MenuItem value=""><em>لا يوجد</em></MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
              {file ? file.name : "تحميل صورة المنتج"}
              <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>إلغاء</Button>
            <Button type="submit" variant="contained" color="primary">{product ? "تعديل" : "إضافة"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">إدارة المنتجات</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenForm()}>
          إضافة منتج جديد
        </Button>
      </Box>

      <ProductTable products={products} onEdit={handleOpenForm} onDelete={handleDelete} />
      <ProductForm open={openForm} onClose={handleCloseForm} product={selectedProduct} onSubmit={handleFormSubmit} categories={categories} brands={brands} />

      <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products;
