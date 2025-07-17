import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const announcements = [
  { date: "March 16, 2024", time: "10:00 AM", title: "New Course Launch", course: "Fundamentals 101" },
  { date: "March 18, 2024", time: "11:30 AM", title: "Assignment Deadline", course: "Data Structures" },
  { date: "March 20, 2024", time: "09:00 AM", title: "Live Doubt Session", course: "JavaScript Basics" },
  { date: "March 22, 2024", time: "02:00 PM", title: "Quiz on React", course: "React Mastery" },
];

function AnnouncementsPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f2f5", py: 5, px: 2, display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 1200 }}>

        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="#333" mb={1}>
              📢 Announcements
            </Typography>
            <Typography color="text.secondary" fontSize={14}>
              Keep your students updated with the latest announcements.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              px: 3,
              py: 1.2,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              "&:hover": { background: "linear-gradient(90deg, #8f94fb, #4e54c8)" }
            }}
          >
            Create Announcement
          </Button>
        </Box>

        {/* Filters */}
        <Grid container spacing={2} mb={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" sx={{ bgcolor: "#fff", borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
              <InputLabel>Courses</InputLabel>
              <Select
                defaultValue="all"
                label="Courses"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4e54c8" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4e54c8" },
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="math">Math</MenuItem>
                <MenuItem value="cs">Computer Science</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" sx={{ bgcolor: "#fff", borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                defaultValue="default"
                label="Sort By"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4e54c8" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4e54c8" },
                }}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="recent">Recent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Announcement Cards */}
        <Grid container spacing={4} justifyContent="center">
          {announcements.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  minHeight: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 10px rgba(32, 10, 10, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom textAlign="right">
                    {item.date} · {item.time}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="#222" sx={{ minHeight: "60px" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: "40px" }}>
                    Course: {item.course}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} mt={3} justifyContent="flex-end">
                  <IconButton
                    sx={{
                      backgroundColor: "#e3f2fd",
                      "&:hover": { backgroundColor: "#bbdefb" },
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: "#ffcdd2",
                      "&:hover": { backgroundColor: "#ef9a9a" },
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AnnouncementsPage;