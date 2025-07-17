import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, IconButton, Button, Snackbar, Alert,
  TextField, Modal, Link, InputAdornment, Avatar, Tabs, Tab
} from '@mui/material';
import { CheckCircle, Visibility, Search, Download, Person } from '@mui/icons-material';

const initialAssignmentSubmissions = [
  { id: 1, studentName: 'John Doe', fileName: 'john_assignment.pdf', fileUrl: '#', submissionDate: '2025-06-20', status: 'Pending', grade: '', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, studentName: 'Jane Smith', fileName: 'jane_assignment.pdf', fileUrl: '#', submissionDate: '2025-06-21', status: 'Pending', grade: '', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, studentName: 'Alice Brown', fileName: 'alice_assignment.pdf', fileUrl: '#', submissionDate: '2025-06-22', status: 'Graded', grade: 'A+', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const initialQuizSubmissions = [
  { id: 1, studentName: 'John Doe', quizTitle: 'Math Quiz', submissionDate: '2025-06-20', status: 'Pending', grade: '', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, studentName: 'Jane Smith', quizTitle: 'Science Quiz', submissionDate: '2025-06-21', status: 'Graded', grade: '9/10', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, studentName: 'Alice Brown', quizTitle: 'History Quiz', submissionDate: '2025-06-22', status: 'Pending', grade: '', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const SubmissionsPage = () => {
  const [tab, setTab] = useState(0);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState(initialAssignmentSubmissions);
  const [quizSubmissions, setQuizSubmissions] = useState(initialQuizSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [studentProfile, setStudentProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGrade = (submission) => {
    setSelectedSubmission({ ...submission, type: tab === 0 ? 'assignment' : 'quiz' });
    setGrade('');
  };

  const handleSubmitGrade = () => {
    if (grade.trim() === '') return;

    if (selectedSubmission.type === 'assignment') {
      setAssignmentSubmissions(assignmentSubmissions.map(sub =>
        sub.id === selectedSubmission.id ? { ...sub, status: 'Graded', grade } : sub
      ));
    } else {
      setQuizSubmissions(quizSubmissions.map(sub =>
        sub.id === selectedSubmission.id ? { ...sub, status: 'Graded', grade } : sub
      ));
    }

    setSelectedSubmission(null);
    setSnackbar({ open: true, message: 'Submission Graded Successfully!', severity: 'success' });
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const filteredAssignments = assignmentSubmissions.filter(sub =>
    sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuizzes = quizSubmissions.filter(sub =>
    sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center" color="#2c3e50">
        Student Submissions
      </Typography>

      <Box display="flex" justifyContent="center" mb={3}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
          <Tab label="Assignments" />
          <Tab label="Quizzes" />
        </Tabs>
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          placeholder="Search by name or status"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
          sx={{ width: { xs: '100%', sm: '300px' } }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}><strong>Student</strong></TableCell>
              {tab === 0 ? <TableCell sx={{ color: 'white' }}><strong>File</strong></TableCell> : <TableCell sx={{ color: 'white' }}><strong>Quiz</strong></TableCell>}
              <TableCell sx={{ color: 'white' }}><strong>Submission Date</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Status</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Grade</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(tab === 0 ? filteredAssignments : filteredQuizzes).map((submission) => (
              <TableRow key={submission.id} sx={{ '&:hover': { backgroundColor: '#f0f4c3' } }}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={submission.avatar} alt={submission.studentName} />
                    <Typography>{submission.studentName}</Typography>
                    <IconButton sx={{ color: '#1e88e5' }} onClick={() => setStudentProfile(submission)}>
                      <Person />
                    </IconButton>
                  </Box>
                </TableCell>
                {tab === 0 ? (
                  <TableCell>
                    <Link href={submission.fileUrl} underline="hover" target="_blank" rel="noopener noreferrer">
                      {submission.fileName}
                    </Link>
                  </TableCell>
                ) : (
                  <TableCell>{submission.quizTitle}</TableCell>
                )}
                <TableCell>{submission.submissionDate}</TableCell>
                <TableCell>
                  <Chip
                    label={submission.status}
                    color={submission.status === 'Graded' ? 'success' : 'warning'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                </TableCell>
                <TableCell>{submission.grade ? submission.grade : '-'}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: '#1e88e5' }} onClick={() => handleGrade(submission)}>
                    <CheckCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Grade Modal */}
      <Modal open={!!selectedSubmission} onClose={() => setSelectedSubmission(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Typography variant="h6">Grade Submission</Typography>
          <Typography>Student: {selectedSubmission?.studentName}</Typography>

          <TextField
            label="Enter Grade"
            fullWidth
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ textTransform: 'none', bgcolor: '#43a047', '&:hover': { bgcolor: '#2e7d32' } }}
            onClick={handleSubmitGrade}
          >
            Submit Grade
          </Button>
        </Box>
      </Modal>

      {/* Student Profile Modal */}
      <Modal open={!!studentProfile} onClose={() => setStudentProfile(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center'
          }}
        >
          <Avatar src={studentProfile?.avatar} alt={studentProfile?.studentName} sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }} />
          <Typography variant="h6" mb={1}>{studentProfile?.studentName}</Typography>
          {tab === 0 ? (
            <Typography variant="body1">Submitted File: {studentProfile?.fileName}</Typography>
          ) : (
            <Typography variant="body1">Quiz: {studentProfile?.quizTitle}</Typography>
          )}
          <Typography variant="body2" mt={1}>Submission Date: {studentProfile?.submissionDate}</Typography>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default SubmissionsPage;