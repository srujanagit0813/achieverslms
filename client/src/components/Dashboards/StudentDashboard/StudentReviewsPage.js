import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Avatar,
  Rating,
  Divider,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";

const reviewsData = {
  received: [
    {
      student: "John Lock",
      date: "January 30, 2030",
      course: "Speaking Korean for Beginners",
      reviews: 9,
      feedback: "Good",
      rating: 4,
    },
    {
      student: "John Robi",
      date: "June 30, 2025",
      course: "PHP for Beginners",
      reviews: 9,
      feedback: "Awesome",
      rating: 5,
    },
    {
      student: "Mice Jerry",
      date: "April 30, 2024",
      course: "WordPress for Beginners",
      reviews: 9,
      feedback: "Nice Course",
      rating: 4.5,
    },
    {
      student: "Mice Jerry",
      date: "October 30, 2213",
      course: "Speaking Korean for Beginners",
      reviews: 9,
      feedback: "I want reviews page having this content",
      rating: 3.5,
    },
  ],
  given: [],
};

export default function StudentReviewsPage() {
  const [tab, setTab] = useState(0);
  const currentReviews = tab === 0 ? reviewsData.received : reviewsData.given;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minHeight: "100vh", bgcolor: "#f5f8ff", mt: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} color="primary.dark" textAlign={{ xs: 'center', md: 'left' }}>
        Reviews
      </Typography>

      {/* Tabs */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          mb: 3,
          width: { xs: "100%", sm: "60%", md: "50%" },
          mx: "auto",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="RECEIVED" />
          <Tab label="GIVEN" />
        </Tabs>
      </Paper>

      {currentReviews.length === 0 ? (
        <Typography color="text.secondary" textAlign="center">
          No reviews found.
        </Typography>
      ) : (
        currentReviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              mb: 3,
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              bgcolor: "#ffffff",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Grid container spacing={2} alignItems="flex-start">
              {/* Avatar */}
              <Grid item xs={12} sm={2} display="flex" justifyContent="center">
                <Avatar
                  sx={{
                    bgcolor: "#1976d2",
                    width: { xs: 50, sm: 60 },
                    height: { xs: 50, sm: 60 },
                  }}
                >
                  <RateReviewIcon fontSize="medium" />
                </Avatar>
              </Grid>

              {/* Review Info */}
              <Grid item xs={12} sm={10}>
                <Typography variant="h6" fontWeight="bold" color="primary.dark">
                  {review.student}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {review.date}
                </Typography>

                <Typography variant="body1" color="text.primary" mt={1}>
                  <strong>Course:</strong> {review.course}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  ({review.reviews} Reviews)
                </Typography>

                <Typography variant="body1" mt={1} color="#4e342e">
                  <em>{review.feedback}</em>
                </Typography>

                <Rating
                  name={`rating-${index}`}
                  value={review.rating}
                  precision={0.5}
                  readOnly
                  sx={{ mt: 1 }}
                />
              </Grid>
            </Grid>

            {/* Divider between reviews */}
            {index < currentReviews.length - 1 && (
              <Divider sx={{ mt: 3, borderColor: "#e0e0e0" }} />
            )}
          </Box>
        ))
      )}
    </Box>
  );
}