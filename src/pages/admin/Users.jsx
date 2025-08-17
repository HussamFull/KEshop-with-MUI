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
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Search as SearchIcon,
} from '@mui/icons-material';

// تعريف الروابط الأساسية لكل عملية API
const GET_ALL_USERS_URL = 'https://localhost:7227/api/Identity/User/GetAllUsers'; // مسار جلب كل المستخدمين
const ADD_USER_URL = 'https://localhost:7227/api/Identity/Account/register'; // مسار تسجيل مستخدم جديد
const UPDATE_USER_URL = 'https://localhost:7227/api/Identity/User/UpdateUser'; // مسار تعديل مستخدم
const DELETE_USER_URL = 'https://localhost:7227/api/Identity/User/DeleteUser'; // مسار حذف مستخدم

const TOKEN = 'YOUR_AUTH_TOKEN_HERE'; // استبدل هذا بالتوكن الفعلي

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        userName: '',
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        fetchUsers();
    }, []);

    // **1. دالة جلب كل المستخدمين (API GET)**
    const fetchUsers = async () => {
        try {
            const response = await fetch(GET_ALL_USERS_URL, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                },
            });

            if (!response.ok) {
                // إذا لم يكن الاستجابة OK، فسيتم التعامل معها هنا
                const errorText = await response.text();
                throw new Error(`Failed to fetch users: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setSnackbarMessage(`فشل في جلب بيانات المستخدمين. الخطأ: ${error.message}`);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const filteredUsers = useMemo(() => {
        if (!searchTerm) {
            return users;
        }
        return users.filter(user =>
            user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    const handleOpen = (user = null) => {
        if (user) {
            setCurrentUser(user);
            setFormData({
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber || '',
                email: user.email,
                password: ''
            });
        } else {
            setCurrentUser(null);
            setFormData({ id: '', userName: '', fullName: '', phoneNumber: '', email: '', password: '' });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentUser(null);
        setFormData({ id: '', userName: '', fullName: '', phoneNumber: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // **2. دالة إضافة وتعديل المستخدمين (API POST/PUT)**
    const handleSubmit = async () => {
        try {
            const isUpdating = !!currentUser;
            const url = isUpdating ? `${UPDATE_USER_URL}/${formData.id}` : ADD_USER_URL;
            const method = isUpdating ? 'PUT' : 'POST';

            // تجهيز البيانات المراد إرسالها بناءً على العملية
            const dataToSend = isUpdating ?
                {
                    id: formData.id,
                    userName: formData.userName,
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email
                } :
                {
                    fullName: formData.fullName,
                    userName: formData.userName,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                    password: formData.password,
                };

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
                if (!isUpdating) {
                    setSnackbarMessage(`تم إضافة المستخدم ${formData.fullName} بنجاح! 🎉`);
                    setSnackbarSeverity('success');
                } else {
                    setSnackbarMessage(`تم تعديل المستخدم ${formData.fullName} بنجاح! 🎉`);
                    setSnackbarSeverity('success');
                }
                setSnackbarOpen(true);
            } else {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                    const errorDetails = errorData.errors ? JSON.stringify(errorData.errors) : 'خطأ غير معروف';
                    setSnackbarMessage(`فشل ${isUpdating ? 'تعديل' : 'إضافة'} المستخدم: ${errorDetails}`);
                } else {
                    const textError = await response.text();
                    console.error('Error:', textError);
                    setSnackbarMessage(`فشل ${isUpdating ? 'تعديل' : 'إضافة'} المستخدم: ${textError}`);
                }
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSnackbarMessage('حدث خطأ أثناء الإرسال.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    // **3. دالة حذف المستخدم (API DELETE)**
    const handleDelete = async (id) => {
        const userToDelete = users.find(user => user.id === id);
        const userNameToDelete = userToDelete ? userToDelete.fullName : 'المستخدم';

        if (window.confirm(`هل أنت متأكد من حذف ${userNameToDelete}؟`)) {
            try {
                const response = await fetch(`${DELETE_USER_URL}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${TOKEN}`,
                    },
                });

                if (response.ok) {
                    setUsers(users.filter(user => user.id !== id));
                    setSnackbarMessage(`تم حذف ${userNameToDelete} بنجاح!`);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                } else {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const errorData = await response.json();
                        console.error('Error deleting user:', errorData);
                        setSnackbarMessage(`فشل حذف المستخدم: ${JSON.stringify(errorData)}`);
                    } else {
                        const textError = await response.text();
                        console.error('Error deleting user:', textError);
                        setSnackbarMessage(`فشل حذف المستخدم: ${textError}`);
                    }
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                setSnackbarMessage('حدث خطأ أثناء الاتصال بالخادم.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
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
                                        <TableCell>{user.fullName}</TableCell>
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
                        autoFocus
                        margin="dense"
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        variant="outlined"
                        autoComplete="phoneNumber"
                        value={formData.phoneNumber}
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

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UsersPage;