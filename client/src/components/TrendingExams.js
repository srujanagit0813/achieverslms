import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Aos from "aos";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrendingExams = () => {
  const [trendingExams, setTrendingExams] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    Aos.init({ duration: 1500, once: true });

    const fetchTrendingExams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/trending-exams"); 
        // 👆 Replace with your actual backend API endpoint
        setTrendingExams(res.data);
      } catch (error) {
        console.error("Error fetching trending exams:", error);
      }
    };

    fetchTrendingExams();
  }, []);

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
                onClick={() =>
                  navigate("/class-page", { state: { examTitle: exam.title } })
                }
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
                }}
                data-aos="fade-up"
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
