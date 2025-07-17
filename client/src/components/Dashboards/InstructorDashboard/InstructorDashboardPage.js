import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { EmojiEvents, MenuBook, Groups, Public } from "@mui/icons-material";
import Layout from "./Layout";
import { Outlet, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const metrics = [
  { icon: <EmojiEvents sx={{ color: "#ff7043", fontSize: 40 }} />, label: "Enrolled Courses", value: "900+" },
  { icon: <MenuBook sx={{ color: "#42a5f5", fontSize: 40 }} />, label: "Active Courses", value: "500+" },
  { icon: <Groups sx={{ color: "#66bb6a", fontSize: 40 }} />, label: "Complete Courses", value: "30k" },
  { icon: <Public sx={{ color: "#ab47bc", fontSize: 40 }} />, label: "Total Courses", value: "1,500+" },
  { icon: <Groups sx={{ color: "#ffca28", fontSize: 40 }} />, label: "Total Students", value: "30k" },
  { icon: <Public sx={{ color: "#26c6da", fontSize: 40 }} />, label: "Over The World", value: "90,000k+" },
];

const lineGraphData = [
  { name: 'Jan', students: 400 },
  { name: 'Feb', students: 600 },
  { name: 'Mar', students: 800 },
  { name: 'Apr', students: 700 },
  { name: 'May', students: 1000 },
  { name: 'Jun', students: 1200 },
];

const pieData = [
  { name: 'Completed', value: 400 },
  { name: 'In Progress', value: 300 },
  { name: 'Pending', value: 300 },
];

const feedbackData = [
  { name: 'Javascript', feedbacks: 200 },
  { name: 'HTML', feedbacks: 450 },
  { name: 'Mathametics', feedbacks: 300 },
  { name: 'HR Management', feedbacks: 500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function InstructorDashboardPage() {
  const location = useLocation();
  const isBaseDashboard = location.pathname === "/InstructorDashboard";

  return (
    <Layout role="Instructor">
      {isBaseDashboard && (
        <Box sx={{ px: 4, py: 5, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
          <Typography variant="h4" fontWeight="bold" mb={5} color="textPrimary">
            Dashboard Metrics
          </Typography>

          {/* Metrics Cards */}
          <Grid container spacing={4}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 4,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 180,
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
                      p: 2,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="bold" mb={1} color="textPrimary">
                    {metric.value}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {metric.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Line Chart */}
          <Box mt={7}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Student Enrollments Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineGraphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#6a1b9a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* Pie Chart */}
          <Box mt={7}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Course Completion Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}} fill={COLORS[index % COLORS.length]`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Total Feedbacks (Bar Chart) */}
          <Box mt={7}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Total Feedbacks per Course
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="feedbacks" fill="#82ca9d" barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </Box>

        </Box>
      )}
      <Outlet />
    </Layout>
  );
}

export default InstructorDashboardPage;