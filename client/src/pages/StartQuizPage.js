import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Slide,
  Stack,
  Avatar,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Quiz";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";

function StartQuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { quizLabel, date, duration, marks, quizId } = location.state || {};
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizId) {
      axios.get(`http://localhost:5000/quiz-questions?quizId=${quizId}`)
        .then((res) => {
          
          const data = res.data.questions || res.data;
          console.log("Fetched Questions:", data);
          setQuestions(data);
        })
        .catch((err) => console.error(err));
    }
  }, [quizId]);

  if (!quizLabel) {
    return <Typography color="error">Invalid or missing quiz</Typography>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
        p: 2,
      }}
    >
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Paper
          elevation={10}
          sx={{
            py: 3,
            px: 2,
            maxWidth: "500px",
            width: "100%",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60 }}>
              <QuizIcon sx={{ fontSize: 35 }} />
            </Avatar>

            <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
              {quizLabel} Quiz
            </Typography>

            <Divider sx={{ width: "50%" }} />

            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
              <EventIcon color="action" />
              <Typography variant="h6" color="text.secondary">
                {date}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
              <AccessTimeIcon color="action" />
              <Typography variant="h6" color="text.secondary">
                {duration} Minutes | {questions.length} Questions
              </Typography>
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ px: 1 }}>
              📢 Stay focused! Once you start the quiz, you can’t pause or restart.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.3,
                fontSize: "1.1rem",
                borderRadius: "25px",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#1565c0",
                  transform: "scale(1.05)",
                },
              }}
              onClick={() =>
                navigate("/quiz-questions", {
                  state: {
                    quizId,
                    quizLabel,
                    questions, 
                    duration,
                    marks,
                    date,
                  },
                })
              }
            >
              Start Quiz Now
            </Button>
          </Stack>
        </Paper>
      </Slide>
    </Box>
  );
}

export default StartQuizPage;
