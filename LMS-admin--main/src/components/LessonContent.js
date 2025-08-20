import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  Snackbar, Alert,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  DialogActions,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';

const LessonContentManager = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    type: '',
    duration: '',
    url: '',
    title: '',
    lessonId: '',
  });

  const contentTypes = ['video', 'assignment', 'material', 'quiz'];

  const fetchLessons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessons');
      if (Array.isArray(res.data)) setLessons(res.data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  const fetchContentList = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lesson-content');
      if (Array.isArray(res.data)) setContentList(res.data);
    } catch (err) {
      console.error('Error fetching lesson content:', err);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchContentList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      label: '',
      type: '',
      duration: '',
      url: '',
      title: '',
      lessonId: '',
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      label: formData.label,
      type: formData.type,
      lessonId: formData.lessonId,
      ...(formData.type === 'video' && {
        duration: formData.duration,
        url: formData.url,
      }),
      ...(formData.type === 'assignment' && {
        title: formData.title,
      }),
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/lessons/content/${formData.id}, payload`);
        setSnackbar({ open: true, message: 'Content updated', severity: 'success' });
      } else {
        await axios.post('http://localhost:5000/lessons/content', payload);
        setSnackbar({ open: true, message: 'Content created', severity: 'success' });
      }
      fetchContentList();
      setOpenDialog(false);
      resetForm();
    } catch (err) {
      console.error('Error submitting form:', err);
      setSnackbar({ open: true, message: 'Failed to submit', severity: 'error' });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      label: item.label,
      type: item.type,
      duration: item.duration || '',
      url: item.url || '',
      title: item.title || '',
      lessonId: item.lessonId,
    });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    try {
      await axios.delete(`http://localhost:5000/lessons/content/${id}`);
      fetchContentList();
      setSnackbar({ open: true, message: 'Content deleted', severity: 'success' });
    } catch (err) {
      console.error('Delete failed', err);
      setSnackbar({ open: true, message: 'Failed to delete content', severity: 'error' });
    }
  };

  return (
    <Container  maxWidth="false" sx={{ ml: -3 }}>
      <Box p={3} sx={{ mt: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Lesson Content Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            resetForm();
            setOpenDialog(true);
          }}
          sx={{ mb: 2, mt: 2 }}
        >
          Add Lesson
        </Button>
      </Box>

      {/* Dialog Form */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          resetForm();
        }}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'whitesmoke',
            boxShadow: '0 20px 40px rgba(6, 6, 6, 0.72)',
            overflow: 'hidden',
           marginLeft:'350px',
           width:'700px',
          
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'primary.main',
            fontWeight: 800,
            fontSize: '24px',
          }}
        >
          {isEditing ? 'Edit' : 'Create'} Lesson Content
        </DialogTitle>
        <DialogContent >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
          >
            <TextField
              label="Label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Content Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              required
            >
              {contentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            {formData.type === 'video' && (
              <>
                <TextField
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Video URL"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </>
            )}

            {formData.type === 'assignment' && (
              <TextField
                label="Assignment Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
            )}

            <TextField
              select
              label="Lesson"
              name="lessonId"
              value={formData.lessonId}
              onChange={handleChange}
              fullWidth
              required
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </MenuItem>
              ))}
            </TextField>
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setOpenDialog(false)} variant="outlined" color="secondary" sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}>
            Cancel
          </Button>
              <Button type="submit" variant="contained">
                {isEditing ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <TableContainer sx={{ Width: '100%' }}>
          <Table stickyHeader>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Lesson</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>URL</TableCell>
                <TableCell>Assignment Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
             <TableBody sx={{ width: '100%' }}>
              {Array.isArray(contentList) && contentList.length > 0 ? (
                contentList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.lesson?.title || item.lessonId}</TableCell>
                    <TableCell>{item.duration || '-'}</TableCell>
                    <TableCell>{item.url || '-'}</TableCell>
                    <TableCell>{item.title || '-'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(item)} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No content available
                  </TableCell>
                </TableRow>
              )}
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
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default LessonContentManager;