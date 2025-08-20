import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, MenuItem, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Stack,
  CircularProgress, Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Add, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import dayjs from 'dayjs';

export default function AssignmentManagement() {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [status, setStatus] = useState('');
  const [lessonContentId, setLessonContentId] = useState('');
  const [lessonContents, setLessonContents] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchAssignments();
    fetchLessonContents();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${API_URL}/assignments`);
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const fetchLessonContents = async () => {
    try {
      setLoadingLessons(true);
      const res = await axios.get(`${API_URL}/lesson-content`);
      setLessonContents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      setLessonContents([]);
    } finally {
      setLoadingLessons(false);
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDueDate(null);
    setDownloadLink('');
    setSubmitStatus('');
    setStatus('');
    setLessonContentId('');
    setEditMode(false);
    setCurrentId(null);
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    clearForm();
  };

  const handleEdit = (assignment) => {
    setTitle(assignment.title);
    setDescription(assignment.description);
    setDueDate(dayjs(assignment.dueDate));
    setDownloadLink(assignment.downloadLink || '');
    setSubmitStatus(assignment.submitStatus);
    setStatus(assignment.status);
    setLessonContentId(assignment.lessonContentId || '');
    setCurrentId(assignment.id);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await axios.delete(`${API_URL}/assignments/${id}`);
        fetchAssignments();
        showAlert('Assignment deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting assignment:', error);
        showAlert('Error deleting assignment', 'error');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssignment = {
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString() : null,
      downloadLink,
      submitStatus,
      status,
      lessonContentId,
    };

    try {
      if (editMode && currentId) {
        await axios.patch(`${API_URL}/assignments/${currentId}, newAssignment`);
        showAlert('Assignment updated successfully!', 'success');
      } else {
        await axios.post(`${API_URL}/assignments, newAssignment`);
        showAlert('Assignment added successfully!', 'success');
      }

      fetchAssignments();
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      showAlert('Error submitting assignment. Please try again.', 'error');
    }
  };

  const showAlert = (message, severity = 'success') => {
    setAlertMsg(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={3} sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
          Assignment Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          Add Assignment
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Download Link</b></TableCell>
                <TableCell><b>Submit Status</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Lesson Title</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.description}</TableCell>
                  <TableCell>{new Date(a.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {a.downloadLink ? (
                      <a href={a.downloadLink} target="_blank" rel="noopener noreferrer">Download</a>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>{a.submitStatus}</TableCell>
                  <TableCell>{a.status}</TableCell>
<TableCell>
                    {/* ✅ Show label/title instead of ID */}
                    {a.lessonContent?.label ||
                     a.lessonContent?.title ||
                     'N/A'}
                  </TableCell>                  <TableCell>
                    <IconButton onClick={() => handleEdit(a)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(a.id)}><Delete color="error" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog Form */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'whitesmoke',
            boxShadow: '0 20px 40px rgba(6, 6, 6, 0.72)',
            overflow: 'hidden',
            marginLeft: '250px'
          },
        }}>
          <DialogTitle sx={{ color: "primary.main", fontWeight: 800, fontSize: '24px' }}>
            {editMode ? 'Edit Assignment' : 'Add Assignment'}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} mt={1}>
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                <Stack direction={'row'} spacing={2}>
                  <TextField
                    fullWidth
                    margin="normal"
                    select
                    label="Lesson Content"
                    value={lessonContentId}
                    onChange={(e) => setLessonContentId(e.target.value)}
                  >
                    {loadingLessons ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                      </MenuItem>
                    ) : lessonContents.length > 0 ? (
                      lessonContents.map((lesson) => (
                        <MenuItem key={lesson.id} value={lesson.id}>
                          {lesson.label || lesson.title || `${lesson.type} `- `${lesson.id}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No lesson content found</MenuItem>
                    )}
                  </TextField>

                  <DesktopDatePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={setDueDate}
                    renderInput={(params) => <TextField {...params} required fullWidth />}
                  />
                </Stack>

                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required fullWidth multiline rows={3} />
                <TextField label="Download Link" value={downloadLink} onChange={(e) => setDownloadLink(e.target.value)} fullWidth />

                <Stack direction={'row'} spacing={2}>
                  <TextField select label="Assignment Status" value={status} onChange={(e) => setStatus(e.target.value)} required fullWidth>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </TextField>

                  <TextField select label="Submit Status" value={submitStatus} onChange={(e) => setSubmitStatus(e.target.value)} required fullWidth>
                    <MenuItem value="Submitted">Submitted</MenuItem>
                    <MenuItem value="Not Submitted">Not Submitted</MenuItem>
                  </TextField>
                </Stack>

                <DialogActions sx={{ mt: 2 }}>
                  <Button onClick={handleClose} variant="outlined" color="secondary" sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {editMode ? 'Update' : 'Submit'}
                  </Button>
                </DialogActions>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>

        {/* Global Alert Snackbar */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleAlertClose} severity={alertSeverity}>
            {alertMsg}
          </MuiAlert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}