import React, { useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import Aos from "aos";
import { NavLink, useNavigate } from "react-router-dom";


export const trendingExams = [
  {
    title: "CBSE Class X",
    image: "https://tse1.mm.bing.net/th?id=OIP.01lkeHgILmPUDys5kWSr6gHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "MP Board Class X",
    image: "https://tse1.mm.bing.net/th?id=OIP.7vK4mrcZTmk1O_gugaNztgHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "CBSE Class IX",
    image: "https://tse4.mm.bing.net/th?id=OIP.PQmHFEAX3ApPYOZaE8wdaQHaKL&pid=Api&P=0&h=180",
  },
  {
    title: "CBSE Class VI",
    image: "https://tse3.mm.bing.net/th?id=OIF.6%2b1IslQ6SUVZwjzjEwdx3Q&pid=Api&P=0&h=180",
  },
  {
    title: "ICSE Class X",
    image: "https://tse3.mm.bing.net/th?id=OIP.jZq0jJUF779LsNy_nJpVqgHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "CBSE Nursery",
    image: "https://tse4.mm.bing.net/th?id=OIP.nJzZnWQ5rYmk_LYdMqRcWQHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "Advance Economy",
    image: "https://tse3.mm.bing.net/th?id=OIP.3JFC_Q6YTGnfWox0M948IwHaHa&pid=Api&P=0&h=180",
  },
   {
    title: "CBSE Class X",
    image: "https://tse1.mm.bing.net/th?id=OIP.01lkeHgILmPUDys5kWSr6gHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "MP Board Class X",
    image: "https://tse1.mm.bing.net/th?id=OIP.7vK4mrcZTmk1O_gugaNztgHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "CBSE Class IX",
    image: "https://tse4.mm.bing.net/th?id=OIP.PQmHFEAX3ApPYOZaE8wdaQHaKL&pid=Api&P=0&h=180",
  },
  {
    title: "CBSE Class VI",
    image: "https://tse3.mm.bing.net/th?id=OIF.6%2b1IslQ6SUVZwjzjEwdx3Q&pid=Api&P=0&h=180",
  },
  {
    title: "ICSE Class X",
    image: "https://tse3.mm.bing.net/th?id=OIP.jZq0jJUF779LsNy_nJpVqgHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "CBSE Nursery",
    image: "https://tse4.mm.bing.net/th?id=OIP.nJzZnWQ5rYmk_LYdMqRcWQHaHa&pid=Api&P=0&h=180",
  },
  {
    title: "Advance Economy",
    image: "https://tse3.mm.bing.net/th?id=OIP.3JFC_Q6YTGnfWox0M948IwHaHa&pid=Api&P=0&h=180",
  },
 
];

const TrendingExams = () => {
   useEffect(() => {
        Aos.init({ duration: 1500, once: true });
      }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
const navigate = useNavigate();
  return (
    <Box sx={{ py: 5, px: isMobile ? 2 : 6, backgroundColor: "#fff" }} data-aos="fade-up">
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        color="error"
        gutterBottom
      >
        TRENDING EXAMS
      </Typography>
      <Box
        sx={{
          width: "100px",
          height: "4px",
          background: "linear-gradient(to right, red, orange, blue)",
          mx: "auto",
          mb: 4,
          borderRadius: 2,
        }}
      />
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
     <Grid container spacing={4} justifyContent="center">
  {trendingExams.map((exam, index) => (
 <Grid item xs={6} sm={4} md={2} lg={2} xl={2} key={index}>
   
      <Card
      onClick={() => navigate('/class-page', { state: { examTitle: exam.title } })}
        elevation={2}
        sx={{
          textAlign: "center",
          borderRadius: 3,
          height: "100%",
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "&:hover": {
            transform: "scale(1.03)",
            borderColor: "primary.main",
          },
        }} data-aos="fade-up"
      >
        <CardMedia
          component="img"
          image={exam.image}
          alt={exam.title}
          sx={{ height: 80, objectFit: "contain", mt: 2 }}
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            textAlign="center"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              minHeight: "48px",
              fontSize: "14px",
            }}
          >
            {exam.title}
          </Typography>
        </CardContent>
      </Card>
   
    </Grid>
  ))}
</Grid>
</Box>
    </Box>
  );
};

export default TrendingExams;
