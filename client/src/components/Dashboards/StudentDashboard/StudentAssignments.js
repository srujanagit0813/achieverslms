import React, { useState } from 'react';
import StudentAssignmentDetailsModal from '../StudentDashboard/StudentAssignmentDetailsModal';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Link,
  Divider,
  Modal,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadIcon from '@mui/icons-material/Upload';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';

const assignmentsData = [
  { id: 1, title: 'Math Assignment', description: 'Solve all algebra problems.', dueDate: '2025-06-20T23:59:00', status: 'Pending', submissionStatus: 'Not Submitted', fileLink: 'https://example.com/math.pdf' },
  { id: 2, title: 'Science Project', description: 'Submit the research document.', dueDate: '2025-06-21T18:00:00', status: 'Submitted', submissionStatus: 'Submitted', fileLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { id: 3, title: 'History Essay', description: 'Write about World War II.', dueDate: '2025-06-22T12:00:00', status: 'Graded', submissionStatus: 'Graded', fileLink: 'https://example.com/history.pdf' },
  { id: 4, title: 'English Assignment', description: 'Complete the grammar exercises.', dueDate: '2025-06-25T10:00:00', status: 'Pending', submissionStatus: 'Not Submitted', fileLink: 'https://example.com/english.pdf' },
  { id: 5, title: 'Computer Science', description: 'Submit coding assignment.', dueDate: '2025-06-28T23:00:00', status: 'Submitted', submissionStatus: 'Submitted', fileLink: 'https://example.com/compsci.pdf' },
  { id: 6, title: 'Geography Project', description: 'Map analysis submission.', dueDate: '2025-06-30T17:00:00', status: 'Graded', submissionStatus: 'Graded', fileLink: 'https://example.com/geography.pdf' },
  { id: 7, title: 'Physics Lab Report', description: 'Complete the practical file.', dueDate: '2025-07-02T14:00:00', status: 'Pending', submissionStatus: 'Not Submitted', fileLink: 'https://example.com/physics.pdf' },
  { id: 8, title: 'Biology Worksheet', description: 'Finish cell structure worksheet.', dueDate: '2025-07-05T17:00:00', status: 'Submitted', submissionStatus: 'Submitted', fileLink: 'https://example.com/biology.pdf' },
  { id: 9, title: 'Economics Survey', description: 'Submit market survey report.', dueDate: '2025-07-07T12:00:00', status: 'Graded', submissionStatus: 'Graded', fileLink: 'https://example.com/economics.pdf' }
];

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'warning';
    case 'submitted': return 'success';
    case 'graded': return 'secondary';
    default: return 'default';
  }
};

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadAssignment, setUploadAssignment] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmitClick = (assignment) => {
    setUploadAssignment(assignment);
  };

  const handleDescriptionClick = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    const updatedAssignments = assignments.map(a => {
      if (a.id === uploadAssignment.id) {
        return { ...a, status: 'Submitted', submissionStatus: 'Submitted' };
      }
      return a;
    });

    setAssignments(updatedAssignments);
    setUploadAssignment(null);
    showSnackbar('Assignment Submitted Successfully!', 'success');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2c3e50'
        }}
      >
        <AssignmentIcon fontSize="large" sx={{ mr: 1, color: '#1565c0' }} />
        Assignments
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          rowGap: 4,
          columnGap: 4
        }}
      >
        {assignments.map((assignment) => (
          <Box
            key={assignment.id}
            sx={{
              width: { xs: '90%', sm: '45%', md: '30%' },
              minWidth: '260px',
            }}
          >
            <Card
              sx={{
                height: 'auto',
                padding: 2,
                boxShadow: 3,
                borderRadius: 3,
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AssignmentIcon sx={{ color: '#1e88e5' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {assignment.title}
                  </Typography>
                </Box>

                <Chip
                  label={assignment.status}
                  color={getStatusColor(assignment.status)}
                  size="small"
                  sx={{ mb: 2 }}
                />

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <DescriptionIcon sx={{ color: '#6c757d' }} />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handleDescriptionClick(assignment)}
                  >
                    {assignment.description}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AccessTimeIcon sx={{ color: '#6c757d' }} />
                  <Typography variant="body2" color="text.secondary">
                    Due: {new Date(assignment.dueDate).toLocaleString()}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <InsertDriveFileIcon sx={{ color: '#6c757d' }} />
                  <Link
                    href={assignment.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    download
                  >
                    Download Assignment
                  </Link>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    variant="contained"
                    startIcon={<UploadIcon />}
                    color="primary"
                    size="small"
                    sx={{ textTransform: 'none' }}
                    onClick={() => handleSubmitClick(assignment)}
                  >
                    Submit
                  </Button>

                  <Chip
                    label={assignment.submissionStatus}
                    color={assignment.submissionStatus === 'Not Submitted' ? 'default' : 'success'}
                    icon={<TaskAltIcon />}
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* File Upload Modal */}
      <Modal
        open={!!uploadAssignment}
        onClose={() => setUploadAssignment(null)}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Upload for: {uploadAssignment?.title}</Typography>
            <IconButton onClick={() => setUploadAssignment(null)}><CloseIcon /></IconButton>
          </Box>

          {/* Drag and Drop Area */}
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
              border: isDragging ? '2px dashed #1976d2' : '2px dashed #aaa',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              mb: 2,
              backgroundColor: isDragging ? '#e3f2fd' : '#f9f9f9',
              transition: 'all 0.3s ease'
            }}
          >
            <Typography variant="body1" mb={1}>
              {isDragging ? 'Drop the file here' : 'Drag and drop your file here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">or</Typography>
          </Box>

          {/* File Select Button */}
          <Button variant="contained" component="label" fullWidth>
            Select File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
      </Modal>

      {/* Details Modal */}
      {selectedAssignment && (
        <StudentAssignmentDetailsModal
          open={!!selectedAssignment}
          handleClose={() => setSelectedAssignment(null)}
          assignment={selectedAssignment}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentAssignments;