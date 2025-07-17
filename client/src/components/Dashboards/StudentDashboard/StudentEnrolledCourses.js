import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  LinearProgress,
  Button,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";



// ✅ Course Data
const coursesData = [
  {
    category: "Completed",
    subject: "Data & Tech",
    lessons: 23,
    duration: "1 hr 30 min",
    title: "Foundation course to understand about software",
    price: "$32.00 / $67.00 Free",
    instructor: "Micle John",
    rating: 44,
    progress: 100,
    image: "https://media.istockphoto.com/id/578291882/photo/indian-kids-studying-on-study-table.jpg?s=2048x2048&w=is&k=20&c=aMczL6lLJJuMhfQ4_dNGIqXyZ0VSgoGxivaZN6aJEBI=",
  },
  {
    category: "Completed",
    subject: "Mechanical",
    lessons: 29,
    duration: "2 hr 10 min",
    title: "Nidnies course to understand about software",
    price: "$32.00 / $67.00 Free",
    instructor: "Rinis Jhon",
    rating: 44,
    progress: 100,
    image: "https://media.istockphoto.com/id/1029717906/photo/girl-doing-homework-at-home-stock-image.jpg?s=2048x2048&w=is&k=20&c=cayjVg70FNXXxZOZ2VfWunnDKJCyQst8X2GrKkpqbgo=",
  },
  {
    category: "Completed",
    subject: "Development",
    lessons: 25,
    duration: "1 hr 40 min",
    title: "Minws course to understand about solution",
    price: "$40.00 / $67.00 Free",
    instructor: "Micle John",
    rating: 44,
    progress: 100,
    image: "https://media.istockphoto.com/id/1029717906/photo/girl-doing-homework-at-home-stock-image.jpg?s=1024x1024&w=is&k=20&c=BYuUss39-aeNHrmqL_jNOIz1b11zm3EJZ0cC726gtGM=",
  },
  {
    category: "Active",
    subject: "Data & Tech",
    lessons: 23,
    duration: "1 hr 30 min",
    title: "Foundation course to understand about software",
    price: "$32.00 / $67.00 Free",
    instructor: "Micle John",
    rating: 44,
    progress: 80,
    image: "https://media.istockphoto.com/id/1029717906/photo/girl-doing-homework-at-home-stock-image.jpg?s=1024x1024&w=is&k=20&c=BYuUss39-aeNHrmqL_jNOIz1b11zm3EJZ0cC726gtGM=",
  },
  {
    category: "Active",
    subject: "Mechanical",
    lessons: 29,
    duration: "2 hr 10 min",
    title: "Nidnies course to understand about software",
    price: "$32.00 / $67.00 Free",
    instructor: "Rinis Jhon",
    rating: 44,
    progress: 70,
    image: "https://media.istockphoto.com/id/1029717906/photo/girl-doing-homework-at-home-stock-image.jpg?s=1024x1024&w=is&k=20&c=BYuUss39-aeNHrmqL_jNOIz1b11zm3EJZ0cC726gtGM=",
  },
];



const categories = ["Enrolled Courses", "Active Courses", "Completed Courses"];

const StudentEnrolledCourses = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filteredCourses =
    selectedTab === 0
      ? coursesData
      : coursesData.filter(
          (course) =>
            course.category ===
            categories[selectedTab].replace(" Courses", "")
        );

  return (
    <Box p={{ xs: 2, sm: 3, md: 5 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {categories[selectedTab]}
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        {categories.map((cat, idx) => (
          <Tab key={idx} label={cat} />
        ))}
      </Tabs>

      <Grid container spacing={3}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Paper sx={{ p: 2, borderRadius: 2 }} elevation={4}>
                {/* ✅ Image with subject chip overlay */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: 150, md: 180 },
                    mb: 1,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={course.image}
                    alt={course.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Chip
                    label={course.subject}
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "purple",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>

                <Stack spacing={2}>
                  {/* Lessons and Duration */}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      {course.lessons} Lessons
                    </Typography>
                    <Typography variant="subtitle1">{course.duration}</Typography>
                  </Stack>

                  {/* Course Title */}
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>

                  {/* Price */}
                  <Typography
                    sx={{
                      color: "#2e7d32",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {course.price}
                  </Typography>

                  {/* Instructor Info */}
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar>{course.instructor[0]}</Avatar>
                    <Typography>
                      {course.instructor} ({course.rating})
                    </Typography>
                  </Stack>

                  {/* Progress Bar */}
                  <Box sx={{ position: "relative", width: "100%", mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{
                        height: 20,
                        borderRadius: 2,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#1976d2",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {course.progress}% Complete
                    </Typography>
                  </Box>

                  {/* Download Certificate */}
                  {course.progress === 100 && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      sx={{
                        mt: 1,
                        backgroundColor: "#f8bbd0",
                        color: "#880e4f",
                        borderColor: "#f48fb1",
                        "&:hover": {
                          backgroundColor: "#f48fb1",
                          borderColor: "#f06292",
                        },
                      }}
                    >
                      Download Certificate
                    </Button>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>
            No courses found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default StudentEnrolledCourses;