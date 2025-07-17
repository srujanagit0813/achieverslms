import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Aos from "aos";

export const subjects = [
   {
    title: "Business Studies",
    desc: "Business is succes",
    icon: "📈",
  },
  {
    title: "Programming Tech",
    desc: "update your skill",
    icon: "💻",
  },
  {
    title: "Artist & Design",
    desc: "show creativity",
    icon: "💡",
  },
  {
    title: "Machine Learning",
    desc: "Science is power",
    icon: "📘",
  },
  {
    title: "Health & Fitness",
    desc: "health is wealth",
    icon: "⌚",
  },
 
  {
    title: "Marketing Analysis",
    desc: "Science is power",
    icon: "🎯",
  },
    {
    title: "Business Studies",
    desc: "Business is succes",
    icon: "📈",
  },
  {
    title: "Programming Tech",
    desc: "update your skill",
    icon: "💻",
  },
  {
    title: "Artist & Design",
    desc: "show creativity",
    icon: "💡",
  },
  {
    title: "Machine Learning",
    desc: "Science is power",
    icon: "📘",
  },
  {
    title: "Health & Fitness",
    desc: "health is wealth",
    icon: "⌚",
  },
 
  {
    title: "Marketing Analysis",
    desc: "Science is power",
    icon: "🎯",
  },
];

const PopularSubjects = () => {
   useEffect(() => {
      Aos.init({ duration: 1500, once: true });
    }, []);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box  
      sx={{
        px: isMobile ? 2 : isTablet ? 4 : 7,
        py: isMobile ? 3 : 5,
       
        background: "linear-gradient(to bottom, #f9f5fd, #eee5ff)",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
        align="center"
         color="error"
        sx={{
          mb: 4,
      
          position: "relative",
        }}
        data-aos="fade-up"
      >
        Popular Subjects
      </Typography>

      <Grid container spacing={isMobile ? 2 : 4}   justifyContent={"center"} data-aos="fade-up">
        {subjects.map((subject, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: isMobile ? 2 : 4,
                textAlign: "center",
                borderRadius: 3,
                minHeight: isMobile ? 120 : 160,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }} data-aos="fade-up"
            >
              <Box fontSize={isMobile ? 30 : 40} mb={1}>
                {subject.icon}
              </Box>
              <Typography fontWeight="bold" fontSize={isMobile ? "1rem" : "1.1rem"}>
                {subject.title}
              </Typography>
              <Typography color="text.secondary" fontSize={isMobile ? "0.85rem" : "1rem"}>
                {subject.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularSubjects;
