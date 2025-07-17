import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  LinearProgress,
  Stack,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function QuizQuestions() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const {
    quizLabel,
    questions = [],
    duration = 30,
    date
  } = location.state || {};

  const [responses, setResponses] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q) => {
      if (responses[q.id] === q.answer) score++;
    });
    navigate("/quiz-result", {
      state: {
        responses,
        score,
        total: questions.length,
        examTitle: quizLabel,
        date,
        questions
      }
    });
  };

  const handleChange = (questionId, answer) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  const handlePrevious = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (!quizLabel || !Array.isArray(questions) || !questions.length) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
        Invalid or Missing Quiz Questions
      </Typography>
    );
  }

  if (!questions[currentIndex]) {
    return (
      <Typography color="error" variant="body1" align="center" sx={{ mt: 4 }}>
        Question not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: isMobile ? 2 : 3,
       
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#333",
          textAlign: "center"
        }}
      >
        {quizLabel} Quiz
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ mb: 1, color: "#555", textAlign: "center" }}
      >
        Question {currentIndex + 1} of {questions.length}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: isMobile ? "90%" : "70%",
          mb: 4,
          height: 8,
          borderRadius: 4
        }}
      />

      <Paper
        elevation={4}
        sx={{
          p: isMobile ? 3: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.01)"
          }
        }}
      >
        <Box>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            {questions[currentIndex].question}
          </Typography>

          <RadioGroup
            name={`question-${currentIndex}`}
            onChange={(e) =>
              handleChange(questions[currentIndex].id, e.target.value)
            }
            value={responses[questions[currentIndex].id] || ""}
          >
            {questions[currentIndex].options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                control={
                  <Radio
                    sx={{
                      color: "#1976d2",
                      "&.Mui-checked": { color: "#1976d2" }
                    }}
                  />
                }
                label={opt}
                value={opt}
                sx={{
                  mb: 1,
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  px: 2,
                  py: 1.2,
                  width: "100%",
                  transition: "background-color 0.2s, transform 0.2s",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    transform: "scale(1.01)"
                  }
                }}
              />
            ))}
          </RadioGroup>
        </Box>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 3 }}
        >
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentIndex <= 0}
            sx={{
              borderRadius: 3,
              px: 4,
              textTransform: "none",
              width: isMobile ? "100%" : "auto"
            }}
          >
            Previous
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                borderRadius: 3,
                px: 4,
                textTransform: "none",
                width: isMobile ? "100%" : "auto"
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: 3,
                px: 4,
                backgroundColor: "#388e3c",
                textTransform: "none",
                width: isMobile ? "100%" : "auto",
                "&:hover": { backgroundColor: "#2e7d32" }
              }}
            >
              Submit Quiz
            </Button>
          )}
        </Stack>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: "#d32f2f",
            fontWeight: "bold",
            fontSize: isMobile ? "0.9rem" : "1rem"
          }}
        >
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </Typography>
      </Paper>
    </Box>
  );
}

export default QuizQuestions;
