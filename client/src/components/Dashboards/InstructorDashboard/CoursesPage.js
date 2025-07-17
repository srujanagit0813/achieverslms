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
  Button,
} from "@mui/material";
import { CloudUpload, Edit } from "@mui/icons-material";

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
  {
    category: "Publish",
    title: "Mechanical Engineering",
    lessons: 32,
    duration: "3 hr 00 min",
    description: "Detailed mechanical concepts and solutions.",
    price: "$35.00",
    oldPrice: "$70.00",
    status: "Paid",
    instructor: "Peter Smith",
    rating: 45,
  },
  {
    category: "Pending",
    title: "Advanced Development",
    lessons: 40,
    duration: "4 hr 15 min",
    description: "Advanced software development principles.",
    price: "$50.00",
    oldPrice: "$80.00",
    status: "Paid",
    instructor: "John Doe",
    rating: 46,
  },
  {
    category: "Draft",
    title: "UX/UI Masterclass",
    lessons: 50,
    duration: "5 hr 00 min",
    description: "Complete UI/UX design bootcamp for beginners.",
    price: "$60.00",
    oldPrice: "$100.00",
    status: "Paid",
    instructor: "Anna Taylor",
    rating: 47,
  },
];

const categoryColors = {
  Publish: "success",
  Pending: "warning",
  Draft: "default",
};

function CoursesPage() {
  return (
    <Box sx={{ p: 4, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        My Courses ({courses.length})
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.01)" },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {course.title}
                  </Typography>
                  <Chip label={course.category} color={categoryColors[course.category]} />
                </Stack>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  {course.lessons} Lessons · {course.duration}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={2}
                  sx={{ minHeight: "60px" }} // Ensures description height consistency
                >
                  {course.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    {course.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {course.oldPrice}
                  </Typography>
                  <Chip label={course.status} size="small" color="info" />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Avatar>{course.instructor[0]}</Avatar>
                  <Box>
                    <Typography variant="subtitle2">{course.instructor}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({course.rating})
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>

              <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    size="small"
                    color="warning"
                    startIcon={<Edit />}
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit Course
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    startIcon={<CloudUpload />}
                    onClick={() => handleUploadCourse(course)}
                  >
                    Upload Course
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const handleEditCourse = (course) => {
  console.log("Edit Course:", course.title);
};

const handleUploadCourse = (course) => {
  console.log("Upload Course:", course.title);
};

export default CoursesPage;