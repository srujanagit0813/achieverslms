import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import CourseCard from "./CourseCard";
import Slider from "react-slick";

const PerfectCourseSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([{ id: "All", name: "All" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:5000/courses"),
          axios.get("http://localhost:5000/categories"),
        ]);

        setCourses(coursesRes.data);
        setCategories([{ id: "All", name: "All" }, ...categoriesRes.data]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.categoryId === selectedCategory);

  // Slider settings
       const settings = {
  dots: true,
  infinite: filteredCourses.length > 4,
  speed: 500,
  slidesToShow: 4, // always 4 to keep width same
  slidesToScroll: 1,
 autoplay: true,
  autoplaySpeed: 2500,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 900,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};


  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(to bottom, #f7f0ff, #ede7f6)",
        py: 4,
      }}
    >
      <Box sx={{ px: 4, py: 4, maxWidth: "1400px", mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 1 }}
          data-aos="fade-up"
        >
          Perfect Online <span style={{ color: "#e91e63" }}>Course</span>
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Your Career
        </Typography>

        {/* Category Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((cat) => (
              <Tab
                key={cat.id}
                label={cat.name}
                value={cat.id}
                sx={{ fontWeight: "bold", textTransform: "none" }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Slider for Courses */}
        <Slider {...settings}>
          {filteredCourses.map((course) => (
            <Box key={course.id}  sx={{
               px: 2, 
        boxSizing: "border-box",
         display: "flex",           // keep card from stretching
        alignItems: "flex-start", 
            }} >
              <CourseCard course={course} index={course.id} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default PerfectCourseSection;
