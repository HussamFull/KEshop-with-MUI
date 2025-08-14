import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Toolbar,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const API_URL = 'https://localhost:7227/Identity/User';
const TOKEN = 'YOUR_AUTH_TOKEN_HERE'; // استبدل هذا بالتوكن الفعلي

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    userName: '',
    fullName: '', // حقل الاسم الكامل المضاف
    email: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  // 1. قراءة كل المستخدمين
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/GetAllUsers`, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // 2. فلترة المستخدمين بناءً على البحث
  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) // فلترة حسب الاسم الكامل
    );
  }, [users, searchTerm]);

  // 3. فتح نافذة الإضافة/التعديل
  const handleOpen = (user = null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        id: user.id,
        userName: user.userName,
        fullName: user.fullName, // إعداد قيمة الاسم الكامل للتعديل
        email: user.email,
        password: ''
      });
    } else {
      setCurrentUser(null);
      setFormData({ id: '', userName: '', fullName: '', email: '', password: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);
    setFormData({ id: '', userName: '', fullName: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 4. إضافة وتعديل المستخدمين
  const handleSubmit = async () => {
    try {
      const isUpdating = !!currentUser;
      const url = isUpdating ? `${API_URL}/UpdateUser/${formData.id}` : `${API_URL}/AddUser`;
      const method = isUpdating ? 'PUT' : 'POST';

      const dataToSend = isUpdating 
        ? { id: formData.id, userName: formData.userName, fullName: formData.fullName, email: formData.email } // إرسال حقل fullName للتعديل
        : formData;
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        fetchUsers();
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`فشل ${isUpdating ? 'تعديل' : 'إضافة'} المستخدم: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('حدث خطأ أثناء الإرسال.');
    }
  };

  // 5. حذف المستخدم
  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        const response = await fetch(`${API_URL}/DeleteUser/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${TOKEN}`,
          },
        });
        if (response.ok) {
          fetchUsers();
        } else {
          console.error('Error deleting user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography variant="h5" id="tableTitle" component="div" sx={{ flex: '1 1 100%' }}>
              إدارة المستخدمين
            </Typography>
            <Tooltip title="إضافة مستخدم جديد">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
                color="primary"
              >
                إضافة
              </Button>
            </Tooltip>
          </Toolbar>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="البحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '100%', md: '300px' } }}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>الاسم الكامل</TableCell>
                <TableCell>اسم المستخدم</TableCell>
                <TableCell>البريد الإلكتروني</TableCell>
                <TableCell align="right">الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{user.id}</TableCell>
                    <TableCell>{user.fullName}</TableCell> {/* عرض الاسم الكامل */}
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="تعديل">
                        <IconButton onClick={() => handleOpen(user)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف">
                        <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    لا توجد بيانات متاحة.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* نافذة الإضافة/التعديل */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{currentUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            name="userName"
            label="اسم المستخدم"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.userName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="fullName"
            label="الاسم الكامل"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.fullName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="email"
            label="البريد الإلكتروني"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {!currentUser && (
            <TextField
              margin="dense"
              name="password"
              label="كلمة المرور"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {currentUser ? 'تعديل' : 'إضافة'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UsersPage;