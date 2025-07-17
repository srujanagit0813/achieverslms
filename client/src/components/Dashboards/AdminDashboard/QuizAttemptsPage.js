import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const quizData = [
  { status: "Running", color: "#4caf50" },
  { status: "Time Over", color: "#9c27b0" },
  { status: "Coming", color: "#2196f3" },
  { status: "Cancel", color: "#f44336" },
  { status: "Running", color: "#4caf50" },
  { status: "Time Over", color: "#9c27b0" },
];

function QuizAttemptsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: 1200, width: "100%" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          textAlign="center"
          color="#333"
        >
          Quiz Attempts
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {quizData.map((quiz, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "220px",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.15)",
                    borderColor: "#1976d2",
                  },
                  border: "1px solid transparent",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={1}
                  textAlign="right"
                >
                  December 26, 2024
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ minHeight: "48px" }}
                  color="#2e2e2e"
                >
                  Write about yourself using the 5-point structure.
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  Student: Mice Jerry
                </Typography>

                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight="500">
                      Qus: 4
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight="500">
                      TM: 8
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight="500">
                      CA: 4
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="auto"
                >
                  <Chip
                    label={quiz.status}
                    sx={{
                      bgcolor: quiz.color,
                      color: "#fff",
                      fontWeight: "bold",
                      px: 1.5,
                      py: 0.5,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Box>
                    <IconButton color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default QuizAttemptsPage;