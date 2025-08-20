import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function QuizManager() {
  const [formData, setFormData] = useState({
    label: '',
    questions: '',
    duration: '',
    marks: '',
    lessonContentId: ''
  });

  const [quizzes, setQuizzes] = useState([]);
  const [lessonContents, setLessonContents] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuizzes();
    fetchLessonContents();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/quiz');
      setQuizzes(res.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchLessonContents = async () => {
    try {
      setLoadingLessons(true);
      const res = await axios.get('http://localhost:5000/lesson-content');
      if (Array.isArray(res.data)) {
        setLessonContents(res.data);
      } else {
        setLessonContents([]);
      }
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      setLessonContents([]);
    } finally {
      setLoadingLessons(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      questions: parseInt(formData.questions),
      duration: parseInt(formData.duration),
      marks: parseInt(formData.marks)
    };

    try {
      if (editMode) {
        await axios.patch(`http://localhost:5000/quiz/${editId}, payload`);
        setSnack({ open: true, message: 'Quiz updated successfully!', severity: 'success' });
      } else {
        await axios.post('http://localhost:5000/quiz', payload);
        setSnack({ open: true, message: 'Quiz created successfully!', severity: 'success' });
      }
      fetchQuizzes();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving quiz:', err);
      setSnack({ open: true, message: 'Failed to save quiz.', severity: 'error' });
    }
  };

  const handleEdit = (quiz) => {
    setFormData({
      label: quiz.label,
      questions: quiz.questions,
      duration: quiz.duration,
      marks: quiz.marks,
      lessonContentId: quiz.lessonContentId
    });
    setEditId(quiz.id);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`http://localhost:5000/quiz/${id}`);
        fetchQuizzes();
        setSnack({ open: true, message: 'Quiz deleted successfully!', severity: 'success' });
      } catch (err) {
        console.error("Failed to delete quiz", err);
        setSnack({ open: true, message: 'Failed to delete quiz.', severity: 'error' });
      }
    }
  };

  const handleCloseDialog = () => {
    setFormData({
      label: '',
      questions: '',
      duration: '',
      marks: '',
      lessonContentId: ''
    });
    setEditMode(false);
    setEditId(null);
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 4, mt: 5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Quiz Management
      </Typography>

      <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
        Create Quiz
      </Button>

      <Paper sx={{ overflowX: 'auto', mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><strong>Label</strong></TableCell>
                <TableCell><strong>Questions</strong></TableCell>
                <TableCell><strong>Duration (mins)</strong></TableCell>
                <TableCell><strong>Marks</strong></TableCell>
                <TableCell><strong>Lesson Content</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.label}</TableCell>
                  <TableCell>{quiz.questions}</TableCell>
                  <TableCell>{quiz.duration}</TableCell>
                  <TableCell>{quiz.marks}</TableCell>
                  <TableCell>
                    {/* ✅ Show label/title instead of ID */}
                    {quiz.lessonContent?.label ||
                     quiz.lessonContent?.title ||
                     'N/A'}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(quiz)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(quiz.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" sx={{marginTop:'20px',marginLeft:'120px'}}>
        <DialogTitle sx={{ color: "primary.main", fontWeight: 800, fontSize: '24px' }}>
          {editMode ? 'Edit Quiz' : 'Create Quiz'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Label"
              name="label"
              value={formData.label}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Questions Count"
              name="questions"
              type="number"
              value={formData.questions}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Duration (mins)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Marks"
              name="marks"
              type="number"
              value={formData.marks}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              select
              label="Lesson Content"
              name="lessonContentId"
              value={formData.lessonContentId}
              onChange={handleChange}
            >
              {loadingLessons ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                </MenuItem>
              ) : lessonContents.length > 0 ? (
                lessonContents.map((lesson) => (
                  <MenuItem key={lesson.id} value={lesson.id}>
                    {lesson.label || lesson.title || `${lesson.type}` - `${lesson.id}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No lesson content found</MenuItem>
              )}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseDialog} variant="outlined" color="secondary" sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((prev) => ({ ...prev, open: false }))}
          severity={snack.severity}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}