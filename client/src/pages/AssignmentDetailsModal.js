// src/pages/AssignmentDetailsModal.jsx
import React from 'react';
import { Box, Typography, Modal, Link, IconButton, Button } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

const AssignmentDetailsModal = ({ open, handleClose, assignment }) => {
  if (!assignment) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 2,
        boxShadow: 24
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Assignment Details</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>

        <Typography variant="h6" gutterBottom>{assignment.title}</Typography>
        <Typography variant="body1" gutterBottom><strong>Description:</strong> {assignment.description}</Typography>
        <Typography variant="body2" gutterBottom><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleString()}</Typography>
        <Typography variant="body2" gutterBottom><strong>Status:</strong> {assignment.status}</Typography>
        <Typography variant="body2" gutterBottom><strong>Submission:</strong> {assignment.submissionStatus}</Typography>

        <Box display="flex" alignItems="center" gap={1} my={2}>
          <InsertDriveFileIcon sx={{ color: '#6c757d' }} />
          <Link href={assignment.fileLink} target="_blank" rel="noopener noreferrer" underline="hover">
            Download Assignment
          </Link>
        </Box>

        {assignment.submissionStatus === 'Not Submitted' && (
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Submission
            <input type="file" hidden />
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default AssignmentDetailsModal;