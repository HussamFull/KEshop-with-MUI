import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Typography,
  Box,
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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Switch,
  FormControlLabel,
  useTheme,
  InputAdornment,
  Toolbar,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const theme = useTheme();

  const API_URL = "https://localhost:7227/api/Admin/CategoriesControllers";
  const TOKEN = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      if (!TOKEN) {
        console.error("No token found. Redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setLoading(true);

      const toggleUrl = `${API_URL}/ToggleStatus/${id}`;

      const response = await axios.patch(toggleUrl, null, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });

      if (response.status === 200) {
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === id ? { ...category, isActive: !currentStatus } : category
          )
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Failed to toggle status:", error.response.statusText);
      } else if (error.request) {
        console.error("Error toggling status: No response from server.");
      } else {
        console.error("Error toggling status:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (response.ok) {
        await fetchCategories();
        setOpenAddDialog(false);
        setNewCategoryName("");
      } else {
        console.error("Failed to add category:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async () => {
    if (!editedCategoryName.trim() || !categoryToEdit) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${categoryToEdit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ id: categoryToEdit.id, name: editedCategoryName }),
      });

      if (response.ok) {
        await fetchCategories();
        handleCloseEditDialog();
      } else {
        console.error("Failed to edit category:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });
      if (response.ok) {
        await fetchCategories();
      } else {
        console.error("Failed to delete category:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setCategoryToDelete(null);
  };

  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewCategoryName("");
  };

  const handleClickOpenEditDialog = (category) => {
    setCategoryToEdit(category);
    setEditedCategoryName(category.name);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCategoryToEdit(null);
    setEditedCategoryName("");
  };

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
          Categories Management
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
          onClick={handleClickOpenAddDialog}
        >
          Add New Category
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for a category..."
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
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>ID</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Category Name</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Status</TableCell>
                <TableCell align="right" sx={{ color: theme.palette.secondary.main, fontWeight: "bold", border: 'none' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{
                      "&:hover": { bgcolor: theme.palette.action.hover },
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{category.id}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{category.name}</TableCell>
                    <TableCell sx={{ border: 'none' }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={category.isActive}
                            onChange={() => handleToggleStatus(category.id, category.isActive)}
                            name="isActive"
                            color="primary"
                          />
                        }
                        label={<Typography sx={{ color: category.isActive ? theme.palette.primary.main : theme.palette.text.secondary }}>{category.isActive ? "Active" : "Inactive"}</Typography>}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ border: 'none' }}>
                      <Tooltip title="Edit">
                        <IconButton
                          sx={{ color: theme.palette.primary.main }}
                          onClick={() => handleClickOpenEditDialog(category)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ color: theme.palette.secondary.main }}
                          onClick={() => handleClickOpenDeleteDialog(category)}
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
                    No categories to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialogs */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.primary }}>
            Are you sure you want to delete the category "{categoryToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button onClick={() => handleDelete(categoryToDelete?.id)} sx={{ color: theme.palette.secondary.main }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            sx={{
              "& label.Mui-focused": { color: theme.palette.primary.main },
              "& .MuiInput-underline:after": { borderBottomColor: theme.palette.primary.main },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button onClick={handleAddCategory} sx={{ color: theme.palette.primary.main }}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
            sx={{
              "& label.Mui-focused": { color: theme.palette.primary.main },
              "& .MuiInput-underline:after": { borderBottomColor: theme.palette.primary.main },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: theme.palette.text.secondary }}>Cancel</Button>
          <Button onClick={handleEditCategory} sx={{ color: theme.palette.primary.main }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}