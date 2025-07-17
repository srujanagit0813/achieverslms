// components/PerfectCourseSection.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import CourseCard from "./CourseCard";

export const courseCategories = [
  "All",
  "Computer Science",
  "Data science",
  "Engineering",
  "Web Development",
  "Architecture",
];

export const courses = [
  {
   id:"1",
    category: "Computer Science",
    title: "Foundation course to understand about software",
    lessons: 23,
    duration: "1 hr 30 min",
    price: 32,
    oldPrice: 67,
    free: true,
    author: "Micle Jhon",
    rating: 4.5,
    video:"https://youtu.be/6DP7cMN99zQ?t=728",
    image: "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid_1.13280665.png&w=750&q=75",
    lastUpdated: "Sep 29, 2024",
    description: "Learn the basics of React including hooks, components, state management and more.Learn the basics of React including hooks, components, state management and more.Learn the basics of React including hooks, components, state management and more.Learn the basics of React including hooks, components, state management and more.",
      instructor: {
    name: "D. William",
    bio: "Senior frontend engineer with 10+ years of experience.",
  },
  curriculum: [
    {
      section: "Intro Course content",
      duration: "02hr 35min",
      items: [
        { type: "video", title: "Video ", duration: "22 minutes", preview: true, 
           videoUrl: "https://youtu.be/6DP7cMN99zQ?t=728", 
    duration: "10:23", },
          { type: "video", title: "Video ", duration: "32 minutes", preview: true },
        { type: "video", title: "Video ", duration: "22 minutes", locked: true },
        { type: "exam", title: "Lesson 3 Exam", questions: 20 },
      ],
    },
    {
      section: "Course Fundamentals",
      duration: "1hr 20min",
      items: [
         { type: "video", title: "Video ", duration: "22 minutes", locked: true },
          { type: "video", title: "Video", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Core Concept",
      duration: "2hr 2min",
      items: [
         { type: "video", title: "Video ", duration: "22 minutes", locked: true },
          { type: "video", title: "Video", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Conclusion",
      duration: "4hr 20min",
      items: [
         { type: "video", title: "Video ", duration: "22 minutes", locked: true },
          { type: "video", title: "Video", duration: "32 minutes", locked: true },
        { type: "video", title: "Video ", duration: "22 minutes", locked: true },
       
      ],
      
    },
  ],
 
  reviews: [
    { user: "Alice", comment: "Great explanation!" },
    { user: "Bob", comment: "Really helped me understand hooks." },
  ]
  
  },
  {
    id:"2",
    category: "Data science",
    title: "Nidnies course to under stand about software",
    lessons: 29,
    duration: "2 hr 10 min",
    price: 32,
    oldPrice: 67,
    free: true,
    author: "Rinis Jhon",
    rating: 4.5,
    video:"https://youtu.be/ceV3RsG946s",
    image: "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid_2.b4b9a2fc.png&w=750&q=75",
    lastUpdated: "Sep 29, 2024",
    description: "Learn the basics of React including hooks, components, state management and more.Learn the basics of React including hooks, components, state management and more.",
      instructor: {
    name: "D. William",
    bio: "Senior frontend engineer with 10+ years of experience.",
  },
  curriculum: [
    {
      section: "Intro Course content",
      duration: "02hr 35min",
      items: [
        { type: "video", title: "Video ", duration: "22 minutes", preview: true },
          { type: "video", title: "Video ", duration: "32 minutes", preview: true },
        { type: "video", title: "Video ", duration: "22 minutes", locked: true },
        { type: "exam", title: "Lesson 03 Exam", questions: 20 },
      ],
    },
    {
      section: "Course Fundamentals",
      duration: "1hr 20min",
      items: [
         { type: "video", title: "Video ", duration: "22 minutes", locked: true },
          { type: "video", title: "Video ", duration: "32 minutes", locked: true },
        { type: "video", title: "Video ", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Core Concept",
      duration: "2hr 2min",
      items: [
         { type: "video", title: "Video ", duration: "22 minutes", locked: true },
          { type: "video", title: "Video ", duration: "32 minutes", locked: true },
        { type: "video", title: "Video ", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Conclusion",
      duration: "4hr 20min",
      items: [
         { type: "video", title: "Video ", duration: "22 minutes", locked: true },
          { type: "video", title: "Video ", duration: "32 minutes", locked: true },
        { type: "video", title: "Video ", duration: "22 minutes", locked: true },
       
      ],
      
    },
  ],
 
  reviews: [
    { user: "Alice", comment: "Great explanation!" },
    { user: "Bob", comment: "Really helped me understand hooks." },
  ]
  
  },
  {
    id:"3",
    category: "Engineering",
    title: "Minws course to under stand about solution",
    lessons: 25,
    duration: "1 hr 40 min",
    price: 40,
    oldPrice: 67,
    free: true,
    author: "Jane Austen",
    rating: 4.2,
    video:"https://youtu.be/SqcY0GlETPk",
    image: "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid_3.34a6552d.png&w=750&q=75",
    lastUpdated: "Sep 29, 2024",
    description: "Learn the basics of React including hooks, components, state management and more.",
      instructor: {
    name: "D. William",
    bio: "Senior frontend engineer with 10+ years of experience.",
  },
  curriculum: [
    {
      section: "Intro Course content",
      duration: "02hr 35min",
      items: [
        { type: "video", title: "Video 1", duration: "22 minutes", preview: true },
          { type: "video", title: "Video 2", duration: "32 minutes", preview: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
        { type: "exam", title: "Lesson 03 Exam", questions: 20 },
      ],
    },
    {
      section: "Course Fundamentals",
      duration: "1hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Core Concept",
      duration: "2hr 2min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Conclusion",
      duration: "4hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
  ],
 
  reviews: [
    { user: "Alice", comment: "Great explanation!" },
    { user: "Bob", comment: "Really helped me understand hooks." },
  ]
  
  },
  {
    id:"4",
    category: "Web Development",
    title: "big data to under stand about solution and software",
    lessons: 30,
    duration: "3 hr 40 min",
    price: 40,
    oldPrice: 67,
    free: true,
    author: " Ge.orwell",
    rating: 4.2,
    video:"https://youtu.be/JDJ0zQLvpOA?list=PLhnVDNT5zYN_PfPXedWpMy_UTeYNExbfR",
    image: "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid_6.1149718f.png&w=750&q=75",
    lastUpdated: "Sep 29, 2024",
    description: "Learn the basics of React including hooks, components, state management and more.",
      instructor: {
    name: "D. William",
    bio: "Senior frontend engineer with 10+ years of experience.",
  },
  curriculum: [
    {
      section: "Intro Course content",
      duration: "02hr 35min",
      items: [
        { type: "video", title: "Video 1", duration: "22 minutes", preview: true },
          { type: "video", title: "Video 2", duration: "32 minutes", preview: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
        { type: "exam", title: "Lesson 03 Exam", questions: 20 },
      ],
    },
    {
      section: "Course Fundamentals",
      duration: "1hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Core Concept",
      duration: "2hr 2min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Conclusion",
      duration: "4hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
  ],
 
  reviews: [
    { user: "Alice", comment: "Great explanation!" },
    { user: "Bob", comment: "Really helped me understand hooks." },
  ]
  
  },
  {
    id:"5",
    category: "Architecture",
    title: "Minws course to under stand about solution",
    lessons: 25,
    duration: "1 hr 40 min",
    price: 40,
    oldPrice: 67,
    free: true,
    author: "Jane Austen",
    rating: 4.2,
    video:"https://youtu.be/NlQFSgvTaFw?list=PLhnVDNT5zYN_PfPXedWpMy_UTeYNExbfR",
    image: "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid_5.1cca53ab.png&w=750&q=75",
    lastUpdated: "Sep 29, 2024",
    description: "Learn the basics of React including hooks, components, state management and more.",
      instructor: {
    name: "D. William",
    bio: "Senior frontend engineer with 10+ years of experience.",
  },
  curriculum: [
    {
      section: "Intro Course content",
      duration: "02hr 35min",
      items: [
        { type: "video", title: "Video 1", duration: "22 minutes", preview: true },
          { type: "video", title: "Video 2", duration: "32 minutes", preview: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
        { type: "exam", title: "Lesson 03 Exam", questions: 20 },
      ],
    },
    {
      section: "Course Fundamentals",
      duration: "1hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Core Concept",
      duration: "2hr 2min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Conclusion",
      duration: "4hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
  ],
 
  reviews: [
    { user: "Alice", comment: "Great explanation!" },
    { user: "Bob", comment: "Really helped me understand hooks." },
  ]
  
  },
  {
    id:"6",
    category: "Architecture",
    title: "Minws course to under stand about solution",
    lessons: 25,
    duration: "1 hr 40 min",
    price: 40,
    oldPrice: 67,
    free: true,
    author: "Jane Austen",
    rating: 4.2,
    video:"https://youtu.be/paG4rx4CB4s?list=PLhnVDNT5zYN_PfPXedWpMy_UTeYNExbfR",
    image: "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgrid_4.1f298d26.png&w=750&q=75",
    lastUpdated: "Sep 29, 2024",
    description: "Learn the basics of React including hooks, components, state management and more.",
        instructor: {
    name: "D. William",
    bio: "Senior frontend engineer with 10+ years of experience.",
  },
  curriculum: [
    {
      section: "Intro Course content",
      duration: "02hr 35min",
      items: [
        { type: "video", title: "Video 1", duration: "22 minutes", preview: true },
          { type: "video", title: "Video 2", duration: "32 minutes", preview: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
        { type: "exam", title: "Lesson 03 Exam", questions: 20 },
      ],
    },
    {
      section: "Course Fundamentals",
      duration: "1hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Core Concept",
      duration: "2hr 2min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
     {
      section: "Course Conclusion",
      duration: "4hr 20min",
      items: [
         { type: "video", title: "Video 1", duration: "22 minutes", locked: true },
          { type: "video", title: "Video 2", duration: "32 minutes", locked: true },
        { type: "video", title: "Video 3", duration: "22 minutes", locked: true },
       
      ],
      
    },
  ],
 
  reviews: [
    { user: "Alice", comment: "Great explanation!" },
    { user: "Bob", comment: "Really helped me understand hooks." },
  ]
  },

 
 
 
];


const PerfectCourseSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
     <Box sx={{ 
      width: "100%", 
      background: "linear-gradient(to bottom, #f7f0ff, #ede7f6)", 
      py: 4 
    }}>
    <Box sx={{  px: 4,
    py: 4,
    maxWidth: "1400px",
    mx: "auto",  }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 1 }} 
data-aos="fade-up"      >
        Perfect Online <span style={{ color: "#e91e63" }}>Course</span>
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Your Carrer
      </Typography>

      <Box
        elevation={3}
        sx={{ display: "flex", justifyContent: "center", mb: 4 }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(e, newValue) => setSelectedCategory(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          
        >
          {courseCategories.map((cat) => (
            <Tab key={cat} label={cat} value={cat} sx={{fontWeight:"bold"}} />
          ))}
        </Tabs>
      </Box>

   <Grid container spacing={4} justifyContent="center">
  {filteredCourses.map((course) => (
    <Grid item xs={12} sm={6} md={3} key={course.id}>
      <CourseCard course={course} index={course.id}/>
    </Grid>
  ))}
</Grid>

    </Box>
    </Box>
  );
};

export default PerfectCourseSection;
