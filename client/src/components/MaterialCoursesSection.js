import React, { useEffect } from "react";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
export const Materials=[
    {
      "id": 1,
      "title": "Introduction to Materials Science",
      "category": "Material",
      "price": 49,
      "oldPrice": 89,
      "instructor": "Dr. Jane Smith",
      "image": "https://i.pinimg.com/originals/2c/0c/07/2c0c07672922e89c7c7f8476ec700628.jpg",
      "rating": 4.8,
      "lessons": 20,
      "description": "Learn the basics of React.js, components, hooks, and state.",
     "content": [
    {
      "heading": "What is React?",
      "paragraph": "React is a JavaScript library for building user interfaces..."
    },
    {
      "heading": "JSX in React",
      "paragraph": "JSX is a syntax extension for JavaScript used with React..."
    },
    {
      "heading": "React Components",
      "paragraph": "Components are the building blocks of React applications..."
    }
  ]
    },
    {
        "id": 2,
        "title": "Materials Engineering for Beginners",
        "category": "Material",
        "duration": "2 hr 15 min",
        "price": 59,
        "oldPrice": 99,
        "instructor": "Prof. Alan Walker",
        "image": "https://tse3.mm.bing.net/th?id=OIP.EyLYKuHv0PKzWD__xO_gewHaEL&pid=Api&P=0&h=180",
        "rating": 4.6,
        "lessons": 25,
        "description": "Learn the basics of React.js, components, hooks, and state.",
        "content": [
       {
         "heading": "What is React?",
         "paragraph": "React is a JavaScript library for building user interfaces..."
       },
       {
         "heading": "JSX in React",
         "paragraph": "JSX is a syntax extension for JavaScript used with React..."
       },
       {
         "heading": "React Components",
         "paragraph": "Components are the building blocks of React applications..."
       }
     ]
      },
      
     
      {
          "id": 3,
          "title": "Materials Engineering for Beginners",
          "category": "Material",
          "duration": "2 hr 15 min",
          "price": 59,
          "oldPrice": 99,
          "instructor": "Prof. Alan Walker",
          "image": "https://tse4.mm.bing.net/th?id=OIP.irpKmEJIU98plmw777r_0gHaEK&pid=Api&P=0&h=180",
          "rating": 4.6,
          "lessons": 25,
          "description": "Learn the basics of React.js, components, hooks, and state.",
          "content": [
         {
           "heading": "What is React?",
           "paragraph": "React is a JavaScript library for building user interfaces..."
         },
         {
           "heading": "JSX in React",
           "paragraph": "JSX is a syntax extension for JavaScript used with React..."
         },
         {
           "heading": "React Components",
           "paragraph": "Components are the building blocks of React applications..."
         }
       ]
        },
       
        {
          "id": 4,
          "title": "Nanomaterials and Nanotechnology",
          "category": "Material",
          "duration": "2 hr 5 min",
          "price": 69,
          "oldPrice": 110,
          "instructor": "Dr. Samuel Lee",
          "image": "https://tse4.mm.bing.net/th?id=OIP.f11DXSoOTvyF8oCvglo2LgHaDe&pid=Api&P=0&h=180",
          "rating": 4.9,
          "lessons": 30,
          "description": "Learn the basics of React.js, components, hooks, and state.",
          "content": [
         {
           "heading": "What is React?",
           "paragraph": "React is a JavaScript library for building user interfaces..."
         },
         {
           "heading": "JSX in React",
           "paragraph": "JSX is a syntax extension for JavaScript used with React..."
         },
         {
           "heading": "React Components",
           "paragraph": "Components are the building blocks of React applications..."
         }
       ]
        },
       
        
            {
              id: 5,
              category: "Mathematics",
              title: "Algebra Foundations for Beginners",
              instructor: "Dr. Ramesh Kumar",
              duration: "2 hrs 10 min",
              price: 15,
              oldPrice: 25,
              rating: 4.6,
              image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
              description: "This course helps students understand algebraic principles,  for academic success.",
              content: [
                {
                  heading: "Introduction to Algebra",
                  paragraph: "Understand variables, constants, and how algebra is used in everyday calculations and higher-level math."
                },
                {
                  heading: "Solving Linear Equations",
                  paragraph: "Learn step-by-step how to isolate variables, balance equations, and solve real-world problems."
                }
              ]
            },
            {
              id: 6,
              category: "Physics",
              title: "Basics of Motion and Laws",
              instructor: "Prof. Anjali Mehra",
              duration: "1 hr 45 min",
              price: 20,
              oldPrice: 30,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
              description: "A beginner-friendly course on Newton's laws, types of motion, and explained with experiments.",
              content: [
                {
                  heading: "Types of Motion",
                  paragraph: "Explore linear, circular, and periodic motion with real-world examples and simple animations."
                },
                {
                  heading: "Newton's Laws of Motion",
                  paragraph: "Understand inertia, force, action-reaction with relatable classroom and outdoor experiments."
                }
              ]
            },
          
          
           
          ];
          
  
  
const MaterialCoursesSection = () => {
   useEffect(() => {
          Aos.init({ duration: 1500, once: true });
        }, []);
  const theme = useTheme();
    const navigate = useNavigate();
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Card width based on device
  const getCardWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "46%";
    return "30%"; // for desktop
  };
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, py: { xs: 4, sm: 6 }, backgroundColor: "#f9f9f9" }} data-aos="fade-up">
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
         color="error"
        sx={{ mb: 1, textAlign: isMobile ? "center" : "center" }}
      >
        📘 Material Courses
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        gutterBottom
        sx={{ textAlign: isMobile ? "center" : "center", mb: 4 }}
      >
        Explore top-rated courses related to Materials Science, Engineering, and more.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "flex-start",
          gap: 3,
          p:2,ml:isMobile?1:5
        }}
      >
        {Materials.map((course) => (
          <Card
            key={course.id}
            sx={{
              width: getCardWidth(),
              borderRadius: 3,
              p:1,

              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              transition: "0.3s",
              ":hover": { transform: "translateY(-5px)" },
            }}
            onClick={() => navigate(`/materials/${course.id}`)} data-aos="fade-up"
          >
           
            <CardMedia
              component="img"
              height="150"
              image={course.image}
              alt={course.title}
                sx={{ borderRadius: 2 ,
              
            }}
            />
          
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom noWrap>
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                By {course.instructor}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Rating
                  value={course.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {course.rating}
                </Typography>
              </Box>
              <Typography variant="h6" color="primary">
                ${course.price}
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: "0.9rem",
                    ml: 1,
                  }}
                >
                  ${course.oldPrice}
                </Typography>
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", pb: 2 }}>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 10, textTransform: "none" }}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MaterialCoursesSection;
