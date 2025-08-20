import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const API_URL = 'http://localhost:5000/categories';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchCategories = async () => {
    
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      showSnackbar('Failed to fetch categories', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpen = () => {
    setEditingId(null);
    setName('');
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setName('');
    setEditingId(null);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.patch(`${API_URL}/${editingId}, { name }`);
        showSnackbar('Category updated successfully');
      } else {
        await axios.post(API_URL, { name });
        showSnackbar('Category created successfully');
      }
      fetchCategories();
      handleClose();
    } catch (err) {
      showSnackbar('Error saving category', 'error');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      showSnackbar('Category deleted');
      fetchCategories();
    } catch (err) {
      showSnackbar('Error deleting category', 'error');
    }
  };

  return (
    <Container maxWidth={false} sx={{ px: { xs: 1, sm: 4 }, mt: 4 }}>
      {/* Header */}
      <Box p={2}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary.main"
          textAlign={{ xs: 'center', sm: 'left' }}
          mb={2}
        >
          Category Management
        </Typography>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* Table */}
      <Paper elevation={3} sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat, index) => (
                <TableRow key={cat.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(cat)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(cat.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog for Add/Edit */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'whitesmoke',
            boxShadow: '0 20px 40px rgba(6, 6, 6, 0.72)',
            overflow: 'hidden',
           marginLeft:'120px'
          },
        }}
      >
        <DialogTitle 
          sx={{ 
            color: "primary.main", 
            fontWeight: 800,
            
            
            borderColor: 'primary.light',
          }}
        >
          {editingId ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ 
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions 
          sx={{ 
            backgroundColor: "#f9f9f9", 
            px: 3, 
            py: 2,
            
            borderColor: 'divider',
          }}
        >
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            color="secondary"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              },
            }}
          >
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}