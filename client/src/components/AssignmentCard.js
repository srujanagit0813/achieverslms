import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Box, Link } from '@mui/material';
import { Assignment as AssignmentIcon, Description as DescriptionIcon, AccessTime as AccessTimeIcon, InsertDriveFile as InsertDriveFileIcon, Upload as UploadIcon, TaskAlt as TaskAltIcon } from '@mui/icons-material';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'warning';
    case 'submitted': return 'success';
    case 'graded': return 'secondary';
    default: return 'default';
  }
};

const AssignmentCard = ({ assignment, onSubmitClick }) => {
  return (
    <Card sx={{ minHeight: 290, padding: 2, boxShadow: 3, borderRadius: 3, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AssignmentIcon sx={{ color: '#1e88e5' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>{assignment.title}</Typography>
        </Box>

        <Chip label={assignment.status} color={getStatusColor(assignment.status)} size="small" sx={{ mb: 2 }} />

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <DescriptionIcon sx={{ color: '#6c757d' }} />
          <Typography variant="body1" color="text.secondary">{assignment.description}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AccessTimeIcon sx={{ color: '#6c757d' }} />
          <Typography variant="body2" color="text.secondary">Due: {new Date(assignment.dueDate).toLocaleString()}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <InsertDriveFileIcon sx={{ color: '#6c757d' }} />
          <Link href={assignment.fileLink} target="_blank" rel="noopener noreferrer" underline="hover">Download Assignment</Link>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            color="primary"
            size="small"
            sx={{ textTransform: 'none' }}
            onClick={() => onSubmitClick(assignment)}
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
  );
};

export default AssignmentCard;