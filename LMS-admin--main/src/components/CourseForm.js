import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, MenuItem, InputLabel, FormControl, Select, Snackbar, Alert,
  FormControlLabel, Checkbox, Stack, Tooltip
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const API_URL = 'http://localhost:5000/courses';
const INSTRUCTOR_API = 'http://localhost:5000/instructors';
const CATEGORY_API = 'http://localhost:5000/categories';

const initialForm = {
  title: '',
  instructorId: '',
  categoryId: '',
  duration: '',
  actualPrice: '',
  discountedPrice: '',
  rating: '',
  videoUrl: '',
  image: null,
  description: '',
  free: false,
};

export default function CourseFormWithTable() {
  const [form, setForm] = useState(initialForm);
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_URL);
      setCourses(res.data);
    } catch (err) {
      console.error('Fetch Courses Error:', err);
    }
  };

  const fetchInstructors = async () => {
    try {
      const res = await axios.get(INSTRUCTOR_API);
      setInstructors(res.data);
    } catch (err) {
      console.error('Fetch Instructors Error:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch (err) {
      console.error('Fetch Categories Error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    const {
      title,
      instructorId,
      categoryId,
      duration,
      actualPrice,
      discountedPrice,
      rating,
      videoUrl,
      image,
      description,
      free,
    } = form;

    if (!title || !instructorId || !categoryId || !duration || !videoUrl || !description || (!image && !editingId)) {
      setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
      return;
    }

    const formData = new FormData();
formData.append('title', title);
formData.append('instructorId', instructorId);
formData.append('categoryId', categoryId);
formData.append('duration', duration);
formData.append('actualPrice', String(free ? 0 : parseFloat(actualPrice) || 0));
formData.append('discountedPrice', String(free ? 0 : parseFloat(discountedPrice) || 0));
formData.append('rating', String(parseFloat(rating) || 0));
formData.append('videoUrl', videoUrl); // ✅ Must be 'videoUrl'
formData.append('description', description);
formData.append('free', String(free));
formData.append('lastUpdated', new Date().toISOString());

// ✅ Add this: check if image is a File
if (image && image instanceof File) {
  formData.append('image', image);
}


    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Course updated successfully!', severity: 'success' });
      } else {
        await axios.post(`${API_URL}/create`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSnackbar({ open: true, message: 'Course created successfully!', severity: 'success' });
      }

      await fetchCourses();
      handleClose();
    } catch (error) {
      console.error('Submit Error:', error?.response?.data || error.message);
      setSnackbar({
        open: true,
        message: 'Error creating/updating course: ' + (error.response?.data?.message || error.message),
        severity: 'error',
      });
    }
  };

  const handleEdit = (course) => {
    const { lastUpdated, imageUrl, ...rest } = course;
    setForm({
      ...initialForm,
      ...rest,
      actualPrice: String(rest.actualPrice ?? ''),
      discountedPrice: String(rest.discountedPrice ?? ''),
      rating: String(rest.rating ?? ''),
      free: Boolean(rest.free),
      image: null,
    });
    setEditingId(course.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSnackbar({ open: true, message: 'Course deleted', severity: 'info' });
      fetchCourses();
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setEditingId(null);
    setOpenDialog(false);
  };

  return (
    <Box p={3} sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Course Management
      </Typography>

      <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
        Add Course
      </Button>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth ='20px' sx={{marginLeft:'150px'}}>
        <DialogTitle sx={{ color: "primary.main", fontWeight: 800, fontSize: '24px' }}>
          {editingId ? 'Edit Course' : 'Add Course'}
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} />
            
            <FormControl fullWidth>
              <InputLabel>Instructor</InputLabel>
              <Select name="instructorId" value={form.instructorId} label="Instructor" onChange={handleChange}>
                {instructors.map((inst) => (
                  <MenuItem key={inst.id} value={inst.id}>{inst.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select name="categoryId" value={form.categoryId} label="Category" onChange={handleChange}>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth label="Duration" name="duration" value={form.duration} onChange={handleChange} />

            <FormControlLabel
              control={<Checkbox checked={form.free} onChange={handleChange} name="free" color="primary" />}
              label="Free Course"
            />

            <TextField fullWidth label="Actual Price" name="actualPrice" type="number" value={form.actualPrice} onChange={handleChange} disabled={form.free} />
            <TextField fullWidth label="Discounted Price" name="discountedPrice" type="number" value={form.discountedPrice} onChange={handleChange} disabled={form.free} />
            <TextField fullWidth label="Rating" name="rating" type="number" inputProps={{ min: 0, max: 5, step: 0.1 }} value={form.rating} onChange={handleChange} />
            <TextField fullWidth label="Video URL" name="videoUrl" value={form.videoUrl} onChange={handleChange} />

            <Button variant="outlined" component="label">
              Upload Image
              <input hidden accept="image/*" type="file" name="image" onChange={handleChange} />
            </Button>
            {form.image instanceof File && <Typography>{form.image.name}</Typography>}

            <TextField fullWidth multiline rows={4} label="Description" name="description" value={form.description} onChange={handleChange} />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#f0f0f0', px: 4, py: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Course Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discounted</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{instructors.find(i => i.id === course.instructorId)?.name || 'N/A'}</TableCell>
                <TableCell>{categories.find(c => c.id === course.categoryId)?.name || 'N/A'}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.actualPrice}</TableCell>
                <TableCell>{course.discountedPrice}</TableCell>
                <TableCell>{course.rating}</TableCell>
                <TableCell>{course.free ? 'Free' : 'Paid'}</TableCell>
                <TableCell>
                  {course.imageUrl ? (
    <img
      src={`http://localhost:5000/uploads/${course.imageUrl}`}
      alt="Course"
      width="60"
      height="40"
    />
  ) : 'No Image'}
                </TableCell>
                <TableCell>{course.description.length > 60 ? course.description.slice(0, 60) + '...' : course.description}</TableCell>
                <TableCell>{course.lastUpdated ? new Date(course.lastUpdated).toLocaleString() : 'N/A'}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(course)} color="primary"><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(course.id)} color="error"><Delete /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Box>
  );
}