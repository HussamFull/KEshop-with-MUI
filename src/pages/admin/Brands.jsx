import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const API_BASE_URL = 'https://localhost:7227/api/Admin/Brands';
const IMAGES_BASE_URL = 'https://localhost:7227/images/';

const BrandsManagement = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [brandImageFile, setBrandImageFile] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deletingBrandId, setDeletingBrandId] = useState(null);

  const token = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : null,
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    fetchBrands();
  }, [token]);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/');
      setBrands(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('غير مصرح لك. يرجى تسجيل الدخول.');
      } else {
        setError('فشل في جلب البيانات.');
      }
      setLoading(false);
      console.error('Error fetching brands:', err);
    }
  };

  const handleAddBrand = async () => {
    const formData = new FormData();
    formData.append('Name', brandName);
    if (brandImageFile) {
      formData.append('MainImage', brandImageFile);
    }

    try {
      setError(null);
      await api.post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleCloseDialog();
      fetchBrands();
    } catch (err) {
      setError('فشل في إضافة البراند.');
      console.error('Error adding brand:', err);
    }
  };

  const handleUpdateBrand = async () => {
    const formData = new FormData();

    // نتحقق مما إذا كان الاسم قد تغير
    const isNameChanged = editingBrand && editingBrand.name !== brandName;
    // نتحقق مما إذا كان هناك ملف صورة جديد
    const isImageChanged = brandImageFile !== null;
    
    // إذا تغير الاسم، أضفه إلى FormData
    if (isNameChanged) {
      formData.append('Name', brandName);
    }
    
    // إذا تغيرت الصورة، أضفها إلى FormData
    if (isImageChanged) {
      formData.append('MainImage', brandImageFile);
    }
    
    // إذا لم يتغير شيء، لا ترسل طلبًا
    if (!isNameChanged && !isImageChanged) {
      handleCloseDialog();
      return;
    }

    try {
      setError(null);
      await api.put(`/${editingBrand.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleCloseDialog();
      fetchBrands();
    } catch (err) {
      setError('فشل في تحديث البراند.');
      console.error('Error updating brand:', err);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      setError(null);
      await api.delete(`/${deletingBrandId}`);
      handleCloseConfirmDelete();
      fetchBrands();
    } catch (err) {
      setError('فشل في حذف البراند.');
      console.error('Error deleting brand:', err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      setError(null);
      await api.patch(`/ToggleStatus/${id}`);
      fetchBrands();
    } catch (err) {
      setError('فشل في تبديل حالة البراند.');
      console.error('Error toggling status:', err);
    }
  };

  const handleOpenDialog = (brand = null) => {
    setEditingBrand(brand);
    if (brand) {
      setBrandName(brand.name);
    } else {
      setBrandName('');
      setBrandImageFile(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBrand(null);
    setBrandName('');
    setBrandImageFile(null);
  };

  const handleOpenConfirmDelete = (id) => {
    setDeletingBrandId(id);
    setConfirmDeleteDialogOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteDialogOpen(false);
    setDeletingBrandId(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
        <Typography variant="h4" component="h1">
          إدارة البراندات
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          إضافة براند جديد
        </Button>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>الاسم</TableCell>
              <TableCell>الصورة</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell align="right">الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>{brand.name}</TableCell>
                <TableCell>
                  {brand.MainImage  ? (
                    <img
    src={`${IMAGES_BASE_URL}/${brand.MainImage}`}
                      alt={brand.name}
                      style={{ width: 50, height: 50, objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontSize: '0.7rem',
                      }}
                    >
                      لا توجد صورة
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={brand.status}
                        onChange={() => handleToggleStatus(brand.id)}
                        color="primary"
                      />
                    }
                    label={brand.status ? 'مفعل' : 'معطل'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(brand)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleOpenConfirmDelete(brand.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit Brand */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingBrand ? 'تعديل براند' : 'إضافة براند جديد'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="اسم البراند"
            type="text"
            fullWidth
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            {brandImageFile ? brandImageFile.name : 'اختر صورة'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setBrandImageFile(e.target.files[0])}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            إلغاء
          </Button>
          <Button onClick={editingBrand ? handleUpdateBrand : handleAddBrand} color="primary">
            {editingBrand ? 'تحديث' : 'إضافة'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>هل أنت متأكد من أنك تريد حذف هذا البراند؟</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            إلغاء
          </Button>
          <Button onClick={handleDeleteBrand} color="secondary">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BrandsManagement;