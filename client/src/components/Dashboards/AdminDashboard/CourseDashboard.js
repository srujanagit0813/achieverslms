import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const allCourses = [
  {
    title: "Frontend Fundamentals",
    category: "Development",
    lessons: 29,
    duration: "2 hr 10 min",
    price: "$32.00",
    oldPrice: "$67.00",
    author: "Rinis Jhon",
    rating: 4.5,
    image: "https://source.unsplash.com/featured/?frontend,code,developer",
  },
  {
    title: "Healthy Living Basics",
    category: "Lifestyle",
    lessons: 25,
    duration: "1 hr 40 min",
    price: "$40.00",
    oldPrice: "$67.00",
    author: "Jane Austen",
    rating: 4.5,
    image: "https://source.unsplash.com/featured/?healthy,lifestyle,fitness",
  },
  {
    title: "Modern Web Design",
    category: "Web Design",
    lessons: 36,
    duration: "3 hr 40 min",
    price: "$40.00",
    oldPrice: "$67.00",
    author: "Micle Robin",
    rating: 4.5,
    image: "https://source.unsplash.com/featured/?webdesign,ui,ux",
  },
  {
    title: "UX/UI Bootcamp",
    category: "Design",
    lessons: 20,
    duration: "2 hr 20 min",
    price: "$25.00",
    oldPrice: "$59.00",
    author: "Laura Smith",
    rating: 4.6,
    image: "https://source.unsplash.com/featured/?ux,ui,design",
  },
  {
    title: "Finance for Beginners",
    category: "Finance",
    lessons: 18,
    duration: "1 hr 30 min",
    price: "$20.00",
    oldPrice: "$50.00",
    author: "Peter Wang",
    rating: 4.2,
    image: "https://source.unsplash.com/featured/?finance,money,investment",
  },
  {
    title: "Data Science Essentials",
    category: "Data Science",
    lessons: 30,
    duration: "4 hr 10 min",
    price: "$60.00",
    oldPrice: "$99.00",
    author: "James Bond",
    rating: 4.7,
    image: "https://source.unsplash.com/featured/?data,science,analytics",
  },
  {
    title: "Creative Writing Guide",
    category: "Writing",
    lessons: 22,
    duration: "2 hr 5 min",
    price: "$28.00",
    oldPrice: "$49.00",
    author: "Sara Miles",
    rating: 4.4,
    image: "https://source.unsplash.com/featured/?writing,books,literature",
  },
  {
    title: "Photography Basics",
    category: "Photography",
    lessons: 24,
    duration: "2 hr 30 min",
    price: "$35.00",
    oldPrice: "$70.00",
    author: "Eli Woods",
    rating: 4.3,
    image: "https://source.unsplash.com/featured/?photography,camera,photo",
  },
  {
    title: "Marketing on Social Media",
    category: "Marketing",
    lessons: 26,
    duration: "2 hr 15 min",
    price: "$38.00",
    oldPrice: "$75.00",
    author: "Chloe Moore",
    rating: 4.5,
    image: "https://source.unsplash.com/featured/?marketing,socialmedia,branding",
  },
  {
    title: "Cybersecurity 101",
    category: "Security",
    lessons: 28,
    duration: "3 hr 20 min",
    price: "$45.00",
    oldPrice: "$80.00",
    author: "John Carter",
    rating: 4.6,
    image: "https://source.unsplash.com/featured/?cybersecurity,hacking,security",
  },
];

const categories = [
  "All",
  "Development",
  "Lifestyle",
  "Web Design",
  "Design",
  "Finance",
  "Data Science",
  "Writing",
  "Photography",
  "Marketing",
  "Security",
];

export default function CourseDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredCourses =
    selectedCategory === "All"
      ? allCourses
      : allCourses.filter((course) => course.category === selectedCategory);

  return (
    <Box sx={{ p: 3, bgcolor: "#eef2f7", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">
        Explore Your Courses
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 3,
          overflowX: "auto",
          bgcolor: "#fff",
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="secondary"
          textColor="secondary"
          sx={{
            px: 2,
            "& .MuiTab-root": {
              fontWeight: 500,
              textTransform: "capitalize",
              color: "#444",
              minHeight: 48,
            },
            "& .Mui-selected": {
              color: "#d81b60",
            },
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat} label={cat} value={cat} />
          ))}
        </Tabs>
      </Paper>

      <Grid container spacing={4}>
        {filteredCourses.map((course, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card
              sx={{
                position: "relative",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 6,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                background: "linear-gradient(145deg, #ffffff, #f1f3f6)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 10,
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={course.image}
                alt={course.title}
                sx={{
                  objectFit: "cover",
                  filter: "brightness(0.9)",
                }}
              />
              <CardContent>
                <Chip
                  label={course.category}
                  sx={{
                    backgroundColor: "#d1c4e9",
                    color: "#4527a0",
                    mb: 1,
                    fontWeight: "bold",
                  }}
                />
                <Typography variant="body2" color="#666">
                  {course.lessons} Lessons • {course.duration}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  noWrap
                  title={course.title}
                  gutterBottom
                >
                  {course.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#388e3c" }}>
                  {course.price}{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "#888", ml: 1 }}
                  >
                    {course.oldPrice}
                  </Typography>
                </Typography>
                <Box mt={1} display="flex" alignItems="center" gap={1}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "#f48fb1",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {course.author[0]}
                  </Avatar>
                  <Typography variant="body2">{course.author}</Typography>
                </Box>
              </CardContent>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  bgcolor: "#ffffffdd",
                  "&:hover": { bgcolor: "#ffeef2" },
                }}
                aria-label="favorite"
              >
                <FavoriteBorderIcon sx={{ color: "#e91e63" }} />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}