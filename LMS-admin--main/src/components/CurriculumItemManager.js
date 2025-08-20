import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent, TextField,
  MenuItem, DialogActions, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Container, Stack, IconButton, TableContainer, Snackbar, Alert, Checkbox, FormControlLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const CurriculumItemManager = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    duration: '',
    preview: false,
    locked: false,
    questions: '',
    curriculumId: '',
  });
  const [editId, setEditId] = useState(null);
  const [curriculums, setCurriculums] = useState([]);
  const [items, setItems] = useState([]);
  const [filterCurriculumId, setFilterCurriculumId] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const init = async () => {
      try {
        const curriculumRes = await axios.get('http://localhost:5000/curriculum');
        setCurriculums(curriculumRes.data);
        fetchItems(curriculumRes.data);
      } catch (err) {
        console.error('Error fetching curriculums:', err);
      }
    };
    init();
  }, []);

  const fetchItems = async (curriculumList = curriculums) => {
    try {
      const res = await axios.get('http://localhost:5000/curriculum-items');
      const enriched = res.data.map(item => {
        const curriculum = curriculumList.find(c => String(c.id) === String(item.curriculumId));
        return { ...item, curriculum };
      });
      setItems(enriched);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const handleOpen = () => {
    setFormData({
      type: '',
      title: '',
      duration: '',
      preview: false,
      locked: false,
      questions: '',
      curriculumId: '',
    });
    setEditId(null);
    setEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      questions: formData.questions ? parseInt(formData.questions) : 0
    };

    try {
      if (editing && editId) {
        await axios.patch(`http://localhost:5000/curriculum-items/${editId}, payload`);
        setSnackbar({ open: true, message: 'Item updated!', severity: 'success' });
      } else {
        const res = await axios.post('http://localhost:5000/curriculum-items', payload);
        const curriculum = curriculums.find(c => String(c.id) === String(payload.curriculumId));
        setItems([...items, { ...res.data, curriculum }]);
        setSnackbar({ open: true, message: 'Item created!', severity: 'success' });
      }
      fetchItems();
      handleClose();
    } catch (err) {
      console.error('Submit error:', err);
      setSnackbar({ open: true, message: 'Something went wrong.', severity: 'error' });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      type: item.type,
      title: item.title,
      duration: item.duration || '',
      preview: item.preview || false,
      locked: item.locked || false,
      questions: item.questions?.toString() || '',
      curriculumId: item.curriculumId,
    });
    setEditId(item.id);
    setEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:5000/curriculum-items/${id}`);
      setItems(items.filter(item => item.id !== id));
      setSnackbar({ open: true, message: 'Item deleted!', severity: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
      setSnackbar({ open: true, message: 'Failed to delete item.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 1, sm: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Curriculum Item Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ mt: 2 }}
        >
          Add Curriculum Item
        </Button>
      </Box>

      {/* Filter Dropdown */}
      {/* <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="Filter by Curriculum"
          value={filterCurriculumId}
          onChange={(e) => setFilterCurriculumId(e.target.value)}
          sx={{ width: 300 }}
        >
          <MenuItem value="">All Curriculums</MenuItem>
          {curriculums.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.title || c.section || Curriculum ${c.id}}
            </MenuItem>
          ))}
        </TextField>
      </Box> */}

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
          border: '2px solid',
          borderColor: 'whitesmoke',
          boxShadow: '0 20px 40px rgba(6, 6, 6, 0.72)',
          overflow: 'hidden',
          marginLeft: '350px',
        },
      }}>
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 800, fontSize: '24px' }}>
          {editing ? 'Edit Curriculum Item' : 'Create Curriculum Item'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField fullWidth label="Duration" name="duration" value={formData.duration} onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Questions" name="questions" value={formData.questions} onChange={handleChange} type="number" sx={{ mb: 2 }} />

            <TextField
              select
              fullWidth
              required
              label="Select Curriculum"
              name="curriculumId"
              value={formData.curriculumId}
              onChange={handleChange}
              sx={{ mb: 2 }}
            >
              {curriculums.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.title || c.section || `Curriculum ${c.id}`}
                </MenuItem>
              ))}
            </TextField>

            <FormControlLabel control={<Checkbox checked={formData.preview} onChange={handleChange} name="preview" />} label="Preview" />
            <FormControlLabel control={<Checkbox checked={formData.locked} onChange={handleChange} name="locked" />} label="Locked" />

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {editing ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Items Table */}
      <Paper elevation={3} sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Duration</strong></TableCell>
                <TableCell><strong>Questions</strong></TableCell>
                <TableCell><strong>Curriculum</strong></TableCell>
                <TableCell><strong>Preview</strong></TableCell>
                <TableCell><strong>Locked</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items
                .filter(item => !filterCurriculumId || String(item.curriculumId) === String(filterCurriculumId))
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.duration || '-'}</TableCell>
                    <TableCell>{item.questions ?? 0}</TableCell>
                    <TableCell>
                      {item.curriculum?.title || item.curriculum?.section || `Curriculum ${item.curriculumId}`}
                    </TableCell>
                    <TableCell>{item.preview ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{item.locked ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton onClick={() => handleEdit(item)} color="primary"><EditIcon /></IconButton>
                        <IconButton onClick={() => handleDelete(item.id)} color="error"><DeleteIcon /></IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CurriculumItemManager;