import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { EmojiEvents, MenuBook, Groups, Public } from "@mui/icons-material";

import Footer from "../../Footer";
import StudentTotalFeedbacks from "./StudentTotalFeedbacks";


// Dashboard metrics
const metrics = [
  { icon: <EmojiEvents sx={{ color: "#ff7043", fontSize: 40 }} />, label: "Enrolled Courses", value: "900+" },
  { icon: <MenuBook sx={{ color: "#42a5f5", fontSize: 40 }} />, label: "Active Courses", value: "500+" },
  { icon: <Groups sx={{ color: "#66bb6a", fontSize: 40 }} />, label: "Complete Courses", value: "30k" },
  { icon: <Public sx={{ color: "#ab47bc", fontSize: 40 }} />, label: "Total Courses", value: "1,500+" },
];

const StudentDashboardHome = () => {
  return (
    <>
      {/* Main Content Section */}
      <Box
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 2, sm: 4 },
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
          mt: 6,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={{ xs: 3, sm: 5 }}
          textAlign={{ xs: "center", md: "left" }}
        >
          Dashboard Metrics
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 4,
                  p: { xs: 3, sm: 4 },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: { xs: 180, sm: 200 },
                  bgcolor: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#f0f0f0",
                    borderRadius: "50%",
                    p: { xs: 1.5, sm: 2 },
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {metric.icon}
                </Box>
                <Typography
                  variant={window.innerWidth < 400 ? "h5" : "h4"}
                  fontWeight="bold"
                  mb={1}
                  textAlign="center"
                >
                  {metric.value}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" textAlign="center">
                  {metric.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Feedback Section */}
      <StudentTotalFeedbacks/>
      </Box>

      {/* Footer */}
      <Box sx={{ width: "100%", mt: 4 }}>
        <Footer/>
      </Box>
    </>
  );
};

export default StudentDashboardHome;