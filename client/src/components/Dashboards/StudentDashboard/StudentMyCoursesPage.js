import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Stack,
} from "@mui/material";

const courses = [
  {
    category: "Publish",
    title: "Mechanical",
    lessons: 29,
    duration: "2 hr 10 min",
    description: "Nidnies course to understand about software",
    price: "$32.00",
    oldPrice: "$67.00",
    status: "Free",
    instructor: "Rinis Jhon",
    rating: 44,
  },
  {
    category: "Pending",
    title: "Development",
    lessons: 25,
    duration: "1 hr 40 min",
    description: "Minws course to understand about solution",
    price: "$40.00",
    oldPrice: "$67.00",
    status: "Free",
    instructor: "Micle John",
    rating: 44,
  },
  {
    category: "Draft",
    title: "Ui & UX Design",
    lessons: 36,
    duration: "3 hr 40 min",
    description: "Design course to understand about solution",
    price: "$40.00",
    oldPrice: "$67.00",
    status: "Free",
    instructor: "Micle Robin",
    rating: 44,
  },
  // You can keep adding more courses here
];

const categoryColors = {
  Publish: "success",
  Pending: "warning",
  Draft: "default",
};

function StudentMyCoursesPage() {
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        My Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.01)" },
                height: "100%", // Make card stretch evenly
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Chip label={course.category} color={categoryColors[course.category]} />
                </Stack>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {course.lessons} Lessons · {course.duration}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {course.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    {course.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                    {course.oldPrice}
                  </Typography>
                  <Chip label={course.status} size="small" color="info" />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mt="auto">
                  <Avatar>{course.instructor[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle2">{course.instructor}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({course.rating})
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StudentMyCoursesPage;