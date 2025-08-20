import React, { useEffect, useState } from 'react';
import {
  Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, MenuItem, Paper, Snackbar, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const CurriculumManager = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ section: '', duration: '', courseId: '' });
  const [curriculums, setCurriculums] = useState([]);
  const [courses, setCourses] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCourses();
    fetchCurriculums();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    }
  };

  const fetchCurriculums = async () => {
    try {
      const res = await axios.get('http://localhost:5000/curriculum?_expand=course');
      setCurriculums(res.data);
    } catch (err) {
      console.error('Failed to fetch curriculum', err);
    }
  };

  const handleOpen = () => {
    setFormData({ section: '', duration: '', courseId: '' });
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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };

    try {
      if (editing && editId) {
        await axios.patch(`http://localhost:5000/curriculum/${editId}, payload`);
        setSnackbar({ open: true, message: 'Curriculum updated!', severity: 'success' });
      } else {
        const res = await axios.post('http://localhost:5000/curriculum', payload);
        const course = courses.find(c => c.id === payload.courseId);
        setCurriculums([...curriculums, { ...res.data, course }]);
        setSnackbar({ open: true, message: 'Curriculum created!', severity: 'success' });
      }

      fetchCurriculums();
      handleClose();
    } catch (err) {
      console.error('Submit error:', err);
      setSnackbar({ open: true, message: 'Something went wrong.', severity: 'error' });
    }
  };

  const handleEdit = (item) => {
    setEditing(true);
    setEditId(item.id);
    setFormData({
      section: item.section,
      duration: item.duration,
      courseId: item.courseId,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this curriculum?')) return;
    try {
      await axios.delete(`http://localhost:5000/curriculum/${id}`);
      setCurriculums(curriculums.filter(item => item.id !== id));
      setSnackbar({ open: true, message: 'Curriculum deleted!', severity: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
      setSnackbar({ open: true, message: 'Failed to delete curriculum.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 1, sm: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Curriculum Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          sx={{ mt: 2 }}
        >
          Add Curriculum
        </Button>
      </Box>

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
          {editing ? 'Edit Curriculum' : 'Create Curriculum'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth label="Section" name="section" value={formData.section}
              onChange={handleChange} required sx={{ mb: 2 }}
            />
            <TextField
              fullWidth label="Duration" name="duration" value={formData.duration}
              onChange={handleChange} required sx={{ mb: 2 }}
            />
            <TextField
              select fullWidth required label="Select Course"
              name="courseId" value={formData.courseId}
              onChange={handleChange} sx={{ mb: 2 }}
            >
              {courses.map(course => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </TextField>

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose} variant="outlined" color="secondary"
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {editing ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Paper elevation={3} sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Section</strong></TableCell>
                <TableCell><strong>Duration</strong></TableCell>
                <TableCell><strong>Course</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {curriculums.length > 0 ? (
                curriculums.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell>{item.course?.title || 'N/A'}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton onClick={() => handleEdit(item)} color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)} color="error">
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No curriculums found.</TableCell>
                </TableRow>
              )}
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

export default CurriculumManager;