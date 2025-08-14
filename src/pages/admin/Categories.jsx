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
  Switch, // إضافة Switch
  FormControlLabel, // لإضافة تسمية للـ Switch
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

  // تم تصحيح المسار (URL)
  const API_URL = "https://localhost:7227/api/Admin/CategoriesControllers"; 
  const TOKEN = localStorage.getItem("authToken"); // استرجاع التوكن من الذاكرة
  const navigate = useNavigate(); // استخدام useNavigate

  // دالة لجلب البيانات من الـ API
  const fetchCategories = async () => {
    try {
      if (!TOKEN) {
        console.error("No token found. Redirecting to login.");
        navigate("/login"); // إعادة توجيه المستخدم إذا لم يكن هناك توكن
        return;
      }
      
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`, // إضافة التوكن لرأس الطلب
        },
      });

      if (response.ok) { // التحقق من حالة الاستجابة
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

  // دالة لتبديل حالة الفئة (مثلاً تفعيل/تعطيل)
   const handleToggleStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      
      const toggleUrl = `${API_URL}/ToggleStatus/${id}`;
      
      const response = await axios.patch(toggleUrl, null, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });

      if (response.status === 200) { // التحقق من حالة الاستجابة باستخدام Axios
        // تحديث حالة الفئة في قائمة الفئات
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category.id === id ? { ...category, isActive: !currentStatus } : category
          )
        );
      }
    } catch (error) {
      if (error.response) {
        // إذا كان هناك استجابة من الخادم (مثل خطأ 404)
        console.error("Failed to toggle status:", error.response.statusText);
      } else if (error.request) {
        // إذا لم يكن هناك استجابة من الخادم (مثل مشكلة في الشبكة)
        console.error("Error toggling status: No response from server.");
      } else {
        // أي خطأ آخر
        console.error("Error toggling status:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // دالة لإضافة فئة جديدة
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`, // إضافة التوكن
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

  // دالة لتعديل فئة موجودة
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
        // إرسال الـ ID واسم الفئة
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

  // دالة للحذف
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${TOKEN}`, // إضافة التوكن
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

  // ... (بقية الكود الخاص بالـ UI كما هو)
  
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
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Categories Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <TextField
          label="Search Categories"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpenAddDialog}
        >
          Add New Category
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Status</TableCell> {/* عمود جديد للحالة */}

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {filteredCategories.map((category) => (
    <TableRow key={category.id}>
      <TableCell>{category.id}</TableCell><TableCell>{category.name}</TableCell>
      <TableCell>
        <FormControlLabel
          control={
            <Switch
              checked={category.isActive}
              onChange={() => handleToggleStatus(category.id, category.isActive)}
              name="isActive"
              color="primary"
            />
          }
          label={category.isActive ? "Active" : "Inactive"}
        />
      </TableCell><TableCell align="right">
        <IconButton color="primary" onClick={() => handleClickOpenEditDialog(category)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleClickOpenDeleteDialog(category)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      )}

      {/* نافذة تأكيد الحذف */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category "{categoryToDelete?.name}"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(categoryToDelete?.id)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* نافذة إضافة فئة جديدة */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Category</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddCategory}>Add</Button>
        </DialogActions>
      </Dialog>
      
      {/* نافذة تعديل الفئة */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Category</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditCategory}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}