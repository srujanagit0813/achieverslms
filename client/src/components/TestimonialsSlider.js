import React from "react";
import Slider from "react-slick";
import { Avatar, Box, Rating, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow
const CustomArrow = ({ direction, onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [direction === "left" ? "left" : "right"]: 10,
      zIndex: 2,
      backgroundColor: "#ffffff",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
      "&:hover": { backgroundColor: "#f0f0f0" }
    }}
  >
    {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
  </IconButton>
);

const TestimonialsSlider = ({ testimonials = [] }) => {
  const defaultTestimonials = [
    {
      photo: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Alice",
      role: "Web Developer",
      rating: 4.5,
      feedback: "Amazing platform to learn new skills!",
      background:"https://static.vecteezy.com/system/resources/thumbnails/037/245/819/small/ai-generated-beautuful-educational-background-with-copy-space-free-photo.jpg"
    },
    {
      photo: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "John",
      role: "UI Designer",
      rating: 5,
      feedback: "Great content and easy to follow!",
      background:
        "https://st3.depositphotos.com/13152218/15594/i/450/depositphotos_155946940-stock-photo-top-view-of-digital-devices.jpg"
    },
    {
      photo: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Sophia",
      role: "Full Stack Developer",
      rating: 4,
      feedback: "The quizzes really helped me solidify my understanding!",
      background:
        "https://plus.unsplash.com/premium_photo-1681843661864-3f46bfb1a4fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWR1Y2F0aW9uJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const testimonialData = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />
  };

  return (
    <Box sx={{ width: "100vw", overflow: "hidden", py: { xs: 4, md: 6 } }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        color="#2c3e70"
        gutterBottom
      >
        What Our Learners Say
      </Typography>

      <Box mt={4} sx={{ xs: 2, sm: 4 }}>
          <Box
    sx={{
      maxWidth: "1200px",
      mx: "auto", // centers horizontally
    }}
  >
        <Slider {...settings}>
          {testimonialData.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                
                position: "relative",
                height: { xs: "350px", md: "450px" },
                backgroundImage: `url(${item.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.5s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)"
                }
              }}
            >
              {/* Dark Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.4)",
                  transition: "background 0.5s ease-in-out",
                  "&:hover": {
                    background: "rgba(0,0,0,0.6)"
                  }
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: { xs: 2, md: 4 },
                  borderRadius: "12px",
                  textAlign: "center",
                  color: "#fff",
                  maxWidth: "80%",
                  zIndex: 1
                }}
              >
                <Avatar
                  src={item.photo}
                  alt={item.name}
                  sx={{
                    width: { xs: 70, md: 100 },
                    height: { xs: 70, md: 100 },
                    margin: "0 auto 16px auto",
                    border: "3px solid #ff9800",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
                  }}
                />
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "1.2rem", md: "1.5rem" }
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 1, fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  {item.role}
                </Typography>
                <Rating
                  value={item.rating}
                  precision={0.5}
                  readOnly
                  sx={{ color: "#ff9800", mb: 1 }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: "#f0f0f0"
                  }}
                >
                  “{item.feedback}”
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default TestimonialsSlider;