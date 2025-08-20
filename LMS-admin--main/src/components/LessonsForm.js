import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Stack,
  IconButton,
  TableContainer,
  Snackbar, Alert,
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const LessonManager = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [editId, setEditId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCourses();
    fetchLessons();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessons?_expand=course');
      setLessons(res.data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCourseId('');
    setEditId(null);
    setEditing(false);
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !courseId) {
      setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }

    try {
      if (editing) {
        await axios.put(`http://localhost:5000/lessons/${editId}`, {
          title,
          courseId,
        });
        await fetchLessons();
        setSnackbar({ open: true, message: 'Lesson updated!', severity: 'success' });
      } else {
        const res = await axios.post('http://localhost:5000/lessons', {
          title,
          courseId,
        });
        const course = courses.find((c) => c.id === courseId);
        setLessons([...lessons, { ...res.data, course }]);
        setSnackbar({ open: true, message: 'Lesson created!', severity: 'success' });
      }
      handleClose();
    } catch (err) {
      console.error('Submit error:', err);
      setSnackbar({ open: true, message: 'Something went wrong.', severity: 'error' });
    }
  };

  const handleEdit = (lesson) => {
    setEditing(true);
    setTitle(lesson.title);
    setCourseId(lesson.courseId);
    setEditId(lesson.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    try {
      await axios.delete(`http://localhost:5000/lessons/${id}`);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
      setSnackbar({ open: true, message: 'Lesson deleted!', severity: 'success' });
    } catch (err) {
      console.error('Delete error:', err);
      setSnackbar({ open: true, message: 'Failed to delete lesson.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, px: { xs: 1, sm: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Lesson Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ mt: 2 }}
        >
          Add Lesson
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
           marginLeft:'350px',
          
          },
        }}>
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 800, fontSize: '24px' }}>
          {editing ? 'Edit Lesson' : 'Create New Lesson'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Lesson Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              select
              fullWidth
              label="Select Course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </TextField>
            <DialogActions sx={{ mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" color="secondary" sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}>
            Cancel
          </Button>
              <Button type="submit" variant="contained">
                {editing ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Lessons Table */}
      <Paper elevation={3} sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Lesson Title</strong></TableCell>
                <TableCell><strong>course</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.title || 'N/A'}</TableCell>
                    <TableCell>{lesson.course?.title || 'N/A'}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleEdit(lesson)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelete(lesson.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No lessons available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Snackbar for feedback */}
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

export default LessonManager;