// components/CourseCard.jsx
import React, { useEffect } from "react";
import {
  Card, CardMedia, CardContent, Typography, Box,
  Avatar, Rating, Chip
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link } from "react-router-dom";
import Aos from "aos";

const CourseCard = ({ course, index }) => {
   useEffect(() => {
      Aos.init({ duration: 1000, once: true });
    }, []);
  return (
    <Link to={`/course/${index}`} style={{ textDecoration: "none" }}>
      
      <Card sx={{ borderRadius: 3, p: 1, width: "100%", height: "100%", transition: "0.3s", 
              ":hover": { transform: "translateY(-5px)" },
             }} data-aos="fade-up">
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="160"
            image={course.image}
            alt={course.title}
            sx={{ borderRadius: 2 ,
              
            }}
          />
          <Chip
            label={course.category}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              backgroundColor: "#ec407a",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
            <Typography variant="body2">
              <MenuBookIcon fontSize="small" sx={{ mr: 0.5 }} />
              {course.lessons} Lesson
            </Typography>
            <Typography variant="body2">
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
              {course.duration}
            </Typography>
          </Box>
          <Typography fontWeight="bold" gutterBottom>
            {course.title}
          </Typography>
          <Typography>
            <span style={{ color: "#673ab7", fontWeight: "bold" }}>
              ${course.price.toFixed(2)}
            </span>{" "}
            <span style={{ textDecoration: "line-through", color: "#aaa" }}>
              ${course.oldPrice.toFixed(2)}
            </span>{" "}
            <span style={{ color: "red" }}>Free</span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Avatar sx={{ width: 30, height: 30, mr: 1 }} />
            <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
              {course.author}
            </Typography>
            <Rating value={course.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              (44)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
