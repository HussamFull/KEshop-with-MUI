import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
  useTheme,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
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
  const [searchTerm, setSearchTerm] = useState("");

  const theme = useTheme();
  const token = localStorage.getItem('authToken');

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : null,
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
        setError('Unauthorized. Please log in.');
      } else {
        setError('Failed to fetch data.');
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
      setError('Failed to add the brand.');
      console.error('Error adding brand:', err);
    }
  };

  const handleUpdateBrand = async () => {
    const formData = new FormData();

    const isNameChanged = editingBrand && editingBrand.name !== brandName;
    const isImageChanged = brandImageFile !== null;

    if (isNameChanged) {
      formData.append('Name', brandName);
    }

    if (isImageChanged) {
      formData.append('MainImage', brandImageFile);
    }

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
      setError('Failed to update the brand.');
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
      setError('Failed to delete the brand.');
      console.error('Error deleting brand:', err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      setError(null);
      await api.patch(`/ToggleStatus/${id}`);
      fetchBrands();
    } catch (err) {
      setError('Failed to toggle brand status.');
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

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
          Brands Management
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            borderRadius: 1,
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            minWidth: '200px'
          }}
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Brand
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for a brand..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: '100%',
            "& .MuiOutlinedInput-root": {
              borderRadius: 25,
              backgroundColor: theme.palette.background.paper,
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
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 6, borderRadius: 2, overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Image</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Name</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Status</TableCell>
                <TableCell align="right" sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <TableRow
                    key={brand.id}
                    sx={{
                      "&:hover": { bgcolor: theme.palette.action.hover },
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <TableCell sx={{ border: 'none' }}>
                      {brand.mainImage ? (
                        <img
                          src={`${IMAGES_BASE_URL}${brand.mainImage}`}
                          alt={brand.name}
                          style={{ width: 50, height: 50, objectFit: 'cover' }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            backgroundColor: theme.palette.action.disabledBackground,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme.palette.text.disabled,
                            fontSize: '0.7rem',
                            border: `1px solid ${theme.palette.text.disabled}`
                          }}
                        >
                          No Image
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{brand.name}</TableCell>
                    <TableCell sx={{ border: 'none' }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={brand.status}
                            onChange={() => handleToggleStatus(brand.id)}
                            color="primary"
                          />
                        }
                        label={<Typography sx={{ color: brand.status ? theme.palette.primary.main : theme.palette.text.secondary }}>{brand.status ? 'Active' : 'Inactive'}</Typography>}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ border: 'none' }}>
                      <Tooltip title="Edit">
                        <IconButton
                          sx={{ color: theme.palette.primary.main }}
                          onClick={() => handleOpenDialog(brand)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ color: theme.palette.secondary.main }}
                          onClick={() => handleOpenConfirmDelete(brand.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: theme.palette.text.secondary }}>
                    No brands to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog for Add/Edit Brand */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Brand Name"
            type="text"
            fullWidth
            variant="standard"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            sx={{
              '& label.Mui-focused': { color: theme.palette.primary.main },
              '& .MuiInput-underline:after': { borderBottomColor: theme.palette.primary.main },
            }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{
              mt: 2,
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.secondary.dark,
              },
            }}
          >
            {brandImageFile ? brandImageFile.name : 'Choose Image'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setBrandImageFile(e.target.files[0])}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button
            onClick={editingBrand ? handleUpdateBrand : handleAddBrand}
            sx={{ color: theme.palette.primary.main }}
          >
            {editingBrand ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: theme.palette.text.primary }}>Are you sure you want to delete this brand?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button onClick={handleDeleteBrand} sx={{ color: theme.palette.secondary.main }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrandsManagement;