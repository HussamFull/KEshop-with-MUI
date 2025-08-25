import React, { useState, useEffect, useMemo } from 'react';
import {
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
    CircularProgress,
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
  useTheme,
  DialogContentText,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';


const GET_ALL_USERS_URL = 'https://localhost:7227/api/Identity/User/GetAllUsers';
const ADD_USER_URL = 'https://localhost:7227/api/Identity/Account/register';
const UPDATE_USER_URL = 'https://localhost:7227/api/Identity/User/UpdateUser';
const DELETE_USER_URL = 'https://localhost:7227/api/Identity/User/DeleteUser';

const UsersPage = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const TOKEN = localStorage.getItem('authToken');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(GET_ALL_USERS_URL, {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setSnackbarMessage(`Failed to fetch user data.`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
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
        password: '',
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

  const handleSubmit = async () => {
    try {
      const isUpdating = !!currentUser;
      const url = isUpdating ? `${UPDATE_USER_URL}/${formData.id}` : ADD_USER_URL;
      const method = isUpdating ? 'PUT' : 'POST';

      const dataToSend = isUpdating ?
        {
          id: formData.id,
          userName: formData.userName,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
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
          setSnackbarMessage(`User ${formData.fullName} added successfully! 🎉`);
        } else {
          setSnackbarMessage(`User ${formData.fullName} updated successfully! 🎉`);
        }
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        const contentType = response.headers.get("content-type");
        let errorDetails = 'Unknown Error';
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          errorDetails = errorData.errors ? JSON.stringify(errorData.errors) : 'Unknown Error';
        } else {
          errorDetails = await response.text();
        }
        console.error('Error:', errorDetails);
        setSnackbarMessage(`Failed to ${isUpdating ? 'update' : 'add'} user: ${errorDetails}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbarMessage('An error occurred during submission.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleClickOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    const id = userToDelete.id;
    const userNameToDelete = userToDelete.fullName;
    try {
      const response = await fetch(`${DELETE_USER_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
        setSnackbarMessage(`User ${userNameToDelete} deleted successfully!`);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        const contentType = response.headers.get("content-type");
        let errorDetails = 'Unknown Error';
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } else {
          errorDetails = await response.text();
        }
        console.error('Error deleting user:', errorDetails);
        setSnackbarMessage(`Failed to delete user: ${errorDetails}`);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('An error occurred while connecting to the server.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 4, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
          User Management
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
          onClick={() => handleOpen()}
        >
          Add New User
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for a user..."
          value={searchTerm}
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
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', border: 'none' }}>ID</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', border: 'none' }}>Full Name</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', border: 'none' }}>Username</TableCell>
                <TableCell sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', border: 'none' }}>Email</TableCell>
                <TableCell align="right" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold', border: 'none' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": { bgcolor: theme.palette.action.hover },
                      bgcolor: theme.palette.background.paper,
                    }}
                  >
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{user.id}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{user.fullName}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{user.userName}</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, border: 'none' }}>{user.email}</TableCell>
                    <TableCell align="right" sx={{ border: 'none' }}>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleOpen(user)} sx={{ color: theme.palette.primary.main }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleClickOpenDeleteDialog(user)} sx={{ color: theme.palette.secondary.main }}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: theme.palette.text.secondary }}>
                    No users to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog for Add/Edit User */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: theme.palette.primary.main }}>{currentUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            margin="dense"
            name="userName"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={formData.userName}
            onChange={handleChange}
            sx={{ mb: 2, '& .MuiInput-underline:after': { borderBottomColor: theme.palette.primary.main } }}
          />
          <TextField
            margin="dense"
            name="fullName"
            label="Full Name"
            type="text"
            fullWidth
            variant="standard"
            value={formData.fullName}
            onChange={handleChange}
            sx={{ mb: 2, '& .MuiInput-underline:after': { borderBottomColor: theme.palette.primary.main } }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2, '& .MuiInput-underline:after': { borderBottomColor: theme.palette.primary.main } }}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            value={formData.phoneNumber}
            onChange={handleChange}
            sx={{ mb: 2, '& .MuiInput-underline:after': { borderBottomColor: theme.palette.primary.main } }}
          />
          {!currentUser && (
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={formData.password}
              onChange={handleChange}
              sx={{ '& .MuiInput-underline:after': { borderBottomColor: theme.palette.primary.main } }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}>
            {currentUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ color: theme.palette.primary.main }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.primary }}>
            Are you sure you want to delete the user "{userToDelete?.fullName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} sx={{ color: theme.palette.secondary.main }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;