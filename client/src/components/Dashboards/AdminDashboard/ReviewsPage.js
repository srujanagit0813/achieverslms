import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
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
      feedback: "Excellent course structure!",
      rating: 3.5,
    },
  ],
  given: [],
};

export default function ReviewsPage() {
  const [tab, setTab] = useState(0);
  const currentReviews = tab === 0 ? reviewsData.received : reviewsData.given;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", py: 5, px: 2 }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
          Reviews
        </Typography>

        <Paper
          elevation={3}
          sx={{
            borderRadius: 3,
            mb: 4,
            maxWidth: 400,
            mx: "auto",
            bgcolor: "#ffffff",
          }}
        >
          <Tabs
            value={tab}
            onChange={(e, newVal) => setTab(newVal)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Received" />
            <Tab label="Given" />
          </Tabs>
        </Paper>

        {currentReviews.length === 0 ? (
          <Typography color="text.secondary" textAlign="center">
            No reviews found.
          </Typography>
        ) : (
          <List>
            {currentReviews.map((review, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      <RateReviewIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {review.student} &nbsp; 
                        <Typography variant="caption" color="text.secondary">
                          ({review.date})
                        </Typography>
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body1" color="text.primary">
                          <strong>Course:</strong> {review.course}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {review.reviews} Reviews
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                          "{review.feedback}"
                        </Typography>
                        <Rating
                          name={`rating-${index}`}
                          value={review.rating}
                          precision={0.5}
                          readOnly
                          sx={{ mt: 1 }}
                        />
                      </>
                    }
                  />
                </ListItem>
                {index < currentReviews.length - 1 && (
                  <Divider variant="inset" component="li" sx={{ my: 1 }} />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}