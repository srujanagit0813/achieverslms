import React, { useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Modal, TextField, Snackbar, Alert, Link
} from '@mui/material';
import { Edit, Delete, UploadFile, AddCircle } from '@mui/icons-material';

const initialAssignments = [
  { id: 1, title: 'Math Assignment', dueDate: '2025-06-25', fileName: 'math_assignment.pdf', fileUrl: '#' },
  { id: 2, title: 'Science Project', dueDate: '2025-06-28', fileName: 'science_project.docx', fileUrl: '#' },
  { id: 3, title: 'History Essay', dueDate: '2025-07-01', fileName: 'history_essay.pdf', fileUrl: '#' },
];

const ManageAssignmentsPage = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [newAssignment, setNewAssignment] = useState({ title: '', dueDate: '', file: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formErrors, setFormErrors] = useState({ title: false, dueDate: false });

  const validateForm = () => {
    let errors = { title: false, dueDate: false };
    if (!newAssignment.title.trim()) errors.title = true;
    if (!newAssignment.dueDate.trim()) errors.dueDate = true;
    setFormErrors(errors);
    return !(errors.title || errors.dueDate);
  };

  const handleCreateAssignment = () => {
    if (!validateForm()) return;

    const newId = assignments.length + 1;
    const newFileUrl = newAssignment.file ? URL.createObjectURL(newAssignment.file) : '#';

    setAssignments([
      ...assignments,
      {
        id: newId,
        ...newAssignment,
        fileName: newAssignment.file ? newAssignment.file.name : '',
        fileUrl: newFileUrl,
      }
    ]);
    setNewAssignment({ title: '', dueDate: '', file: null });
    setIsModalOpen(false);
    setSnackbar({ open: true, message: 'Assignment Created Successfully!', severity: 'success' });
    setFormErrors({ title: false, dueDate: false });
  };

  const handleDelete = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
    setSnackbar({ open: true, message: 'Assignment Deleted', severity: 'info' });
  };

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setNewAssignment({ title: assignment.title, dueDate: assignment.dueDate, file: null });
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!validateForm()) return;

    setAssignments(assignments.map(a =>
      a.id === selectedAssignment.id
        ? {
          ...a,
          ...newAssignment,
          fileName: newAssignment.file ? newAssignment.file.name : a.fileName,
          fileUrl: newAssignment.file ? URL.createObjectURL(newAssignment.file) : a.fileUrl
        }
        : a
    ));
    setIsModalOpen(false);
    setSelectedAssignment(null);
    setSnackbar({ open: true, message: 'Assignment Updated Successfully!', severity: 'success' });
    setFormErrors({ title: false, dueDate: false });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Manage Assignments
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="large"
          sx={{ textTransform: 'none', bgcolor: '#6a1b9a', '&:hover': { bgcolor: '#4a148c' } }}
          onClick={() => {
            setSelectedAssignment(null);
            setIsModalOpen(true);
          }}
        >
          Create Assignment
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#d1c4e9' }}>
            <TableRow>
              <TableCell sx={{ color: '#4a148c', fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ color: '#4a148c', fontWeight: 'bold' }}>Due Date</TableCell>
              <TableCell sx={{ color: '#4a148c', fontWeight: 'bold' }}>File Preview</TableCell>
              <TableCell sx={{ color: '#4a148c', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow
                key={assignment.id}
                sx={{ '&:hover': { backgroundColor: '#ede7f6' } }}
              >
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>
                  {assignment.fileName && (
                    <Link href={assignment.fileUrl} target="_blank" rel="noopener noreferrer">
                      {assignment.fileName}
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(assignment)} sx={{ color: '#1e88e5' }}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(assignment.id)} sx={{ color: '#e53935' }}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Create & Edit */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {selectedAssignment ? 'Edit Assignment' : 'Create Assignment'}
          </Typography>

          <TextField
            label="Assignment Title"
            fullWidth
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            error={formErrors.title}
            helperText={formErrors.title && "Title is required"}
          />

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newAssignment.dueDate}
            onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
            error={formErrors.dueDate}
            helperText={formErrors.dueDate && "Due Date is required"}
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFile />}
            fullWidth
          >
            {newAssignment.file ? newAssignment.file.name : 'Upload File'}
            <input
              type="file"
              hidden
              onChange={(e) => setNewAssignment({ ...newAssignment, file: e.target.files[0] })}
            />
          </Button>

          <Button
            variant="contained"
            onClick={selectedAssignment ? handleSaveEdit : handleCreateAssignment}
            sx={{ textTransform: 'none', bgcolor: '#6a1b9a', '&:hover': { bgcolor: '#4a148c' } }}
          >
            {selectedAssignment ? 'Save Changes' : 'Create'}
          </Button>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageAssignmentsPage;