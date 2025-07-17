import React from "react";
import { Box, Paper, Button, Typography, Chip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function QuizResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, examTitle, responses = {}, questions = [] } = location.state || {};
  
  // Handle invalid navigation
  if (score === undefined || !Array.isArray(questions) || !questions.length) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
        Invalid submission or missing quiz data
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt:10,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "70%",
          maxWidth: "900px",
          textAlign: "center",
          borderRadius: "20px",
          boxShadow: "0 4px 30px #0003",
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h4" color="primary" mb={3} fontWeight="bold">
          {examTitle} Quiz Summary
        </Typography>

        <Chip
          label={`Score: ${score} / ${total}`}
          color="success"
          variant="filled"
          sx={{ mb: 4, fontSize: "18px", p: 1.5 }}
        />

        <Box>
          {questions.map((q, idx) => {
            const userAnswer = responses[q.id];
            const isCorrect = userAnswer === q.answer;

            return (
              <Box
                key={q.id}
                sx={{
                  mb: 2,
                  textAlign: "left",
                  padding: 1.5,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 2
                }}
              >
                {/* Question Text */}
                <Typography variant="h6" sx={{ fontSize: "18px" }}>
                  <Box component="span" sx={{ fontWeight: "bold", color: "#1976d2", mr: 1 }}>
                    Q{idx + 1}.
                  </Box>
                  <Box component="span" sx={{ fontWeight: "normal", color: "#333" }}>
                    {q.question}
                  </Box>
                </Typography>

                {/* User's Answer */}
                <Typography
                  variant="body1"
                  sx={{ color: isCorrect ? "#388e3c" : "#d32f2f", mt: 0.5, fontSize: "16px" }}
                >
                  Your Answer: {userAnswer || "Not answered"}
                </Typography>

                {/* Correct Answer */}
                {!isCorrect && (
                  <Typography variant="body1" sx={{ color: "#1976d2", fontSize: "16px" }}>
                    Correct Answer: {q.answer}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, borderRadius: 3, px: 4, textTransform: "none", fontSize: "16px" }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Paper>
    </Box>
  );
}

export default QuizResult;
