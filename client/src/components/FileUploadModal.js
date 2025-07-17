import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FileUploadModal = ({ open, onClose, onFileUpload, assignmentTitle }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
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
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          <Typography variant="h6">Upload for: {assignmentTitle}</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
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

        {/* File Browse Button */}
        <Button variant="contained" component="label" fullWidth>
          Select File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Box>
    </Modal>
  );
};

export default FileUploadModal;