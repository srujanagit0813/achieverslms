import React, { useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Modal, TextField, Snackbar, Alert, Link
} from '@mui/material';
import { Edit, Delete, AddCircle, UploadFile } from '@mui/icons-material';

const initialQuizzes = [
  {
    id: 1,
    title: 'Math Quiz',
    dueDate: '2025-06-25',
    fileName: 'math_quiz.pdf',
    fileUrl: '#',
    questions: [
      { id: 1, question: 'What is 2 + 2?' },
      { id: 2, question: 'What is 5 x 6?' }
    ]
  },
  {
    id: 2,
    title: 'Science Quiz',
    dueDate: '2025-06-28',
    fileName: 'science_quiz.pdf',
    fileUrl: '#',
    questions: [
      { id: 1, question: 'What is H2O?' },
      { id: 2, question: 'What planet is known as the Red Planet?' }
    ]
  },
];

const QuizManagementPage = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState({ title: '', dueDate: '', file: null, questions: [] });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [questionInput, setQuestionInput] = useState('');

  const handleCreateQuiz = () => {
    if (!newQuiz.title.trim() || !newQuiz.dueDate.trim()) return;

    const newId = quizzes.length + 1;
    const newFileUrl = newQuiz.file ? URL.createObjectURL(newQuiz.file) : '#';

    setQuizzes([
      ...quizzes,
      {
        id: newId,
        ...newQuiz,
        fileName: newQuiz.file ? newQuiz.file.name : '',
        fileUrl: newFileUrl
      }
    ]);

    setNewQuiz({ title: '', dueDate: '', file: null, questions: [] });
    setIsModalOpen(false);
    setSnackbar({ open: true, message: 'Quiz Created Successfully!', severity: 'success' });
  };

  const handleDeleteQuiz = (id) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
    setSnackbar({ open: true, message: 'Quiz Deleted', severity: 'info' });
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setNewQuiz({
      title: quiz.title,
      dueDate: quiz.dueDate,
      file: null,
      questions: quiz.questions
    });
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    setQuizzes(quizzes.map(q =>
      q.id === selectedQuiz.id
        ? {
          ...q,
          ...newQuiz,
          fileName: newQuiz.file ? newQuiz.file.name : q.fileName,
          fileUrl: newQuiz.file ? URL.createObjectURL(newQuiz.file) : q.fileUrl,
          questions: newQuiz.questions
        }
        : q
    ));
    setIsModalOpen(false);
    setSelectedQuiz(null);
    setSnackbar({ open: true, message: 'Quiz Updated Successfully!', severity: 'success' });
  };

  const handleAddQuestion = () => {
    if (questionInput.trim() === '') return;
    const updatedQuestions = [...newQuiz.questions, { id: newQuiz.questions.length + 1, question: questionInput }];
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
    setQuestionInput('');
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = newQuiz.questions.filter(q => q.id !== id);
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        Quiz Management
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          size="large"
          sx={{ textTransform: 'none', bgcolor: '#6a1b9a', '&:hover': { bgcolor: '#4a148c' } }}
          onClick={() => {
            setSelectedQuiz(null);
            setIsModalOpen(true);
          }}
        >
          Create Quiz
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#6a1b9a' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}><strong>Title</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Due Date</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>File Preview</strong></TableCell>
              <TableCell sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz) => (
              <TableRow
                key={quiz.id}
                sx={{ '&:hover': { backgroundColor: '#f3e5f5' } }}
              >
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{quiz.dueDate}</TableCell>
                <TableCell>
                  {quiz.fileName && (
                    <Link href={quiz.fileUrl} target="_blank" rel="noopener noreferrer">
                      {quiz.fileName}
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditQuiz(quiz)} sx={{ color: '#1e88e5' }}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteQuiz(quiz.id)} sx={{ color: '#e53935' }}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
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
            {selectedQuiz ? 'Edit Quiz' : 'Create Quiz'}
          </Typography>

          <TextField
            label="Quiz Title"
            fullWidth
            value={newQuiz.title}
            onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
          />

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newQuiz.dueDate}
            onChange={(e) => setNewQuiz({ ...newQuiz, dueDate: e.target.value })}
          />

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFile />}
            fullWidth
          >
            {newQuiz.file ? newQuiz.file.name : 'Upload File'}
            <input
              type="file"
              hidden
              onChange={(e) => setNewQuiz({ ...newQuiz, file: e.target.files[0] })}
            />
          </Button>

          <Box>
            <Typography variant="subtitle1" mb={1}>Quiz Questions</Typography>
            {newQuiz.questions.map((q) => (
              <Box key={q.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography>{q.question}</Typography>
                <IconButton size="small" onClick={() => handleDeleteQuestion(q.id)} sx={{ color: '#e53935' }}><Delete fontSize="small" /></IconButton>
              </Box>
            ))}

            <Box display="flex" gap={1}>
              <TextField
                label="Add Question"
                fullWidth
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddQuestion}>Add</Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={selectedQuiz ? handleSaveEdit : handleCreateQuiz}
            sx={{ textTransform: 'none', bgcolor: '#6a1b9a', '&:hover': { bgcolor: '#4a148c' } }}
          >
            {selectedQuiz ? 'Save Changes' : 'Create'}
          </Button>
        </Box>
      </Modal>

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

export default QuizManagementPage;