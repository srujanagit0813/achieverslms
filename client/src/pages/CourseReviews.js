import React from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  LinearProgress,
  Rating,
  Chip,
   Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Dummy data
const reviewsData = {
  overall: 5.0,
  totalReviews: 17,
  ratingBreakdown: [10, 5, 3, 2, 1], // 5⭐ to 1⭐
  reviews: [
    {
      user: "Adam Smit",
      avatar: "https://tse2.mm.bing.net/th?id=OIP.IrUBHhdMo6wWLFueKNreRwHaHa&pid=Api&P=0&h=180", // local or URL
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloribus, omnis fugit corporis iste magnam ratione.",
      date: "September 2, 2024",
    },
    {
      user: "Adam Smit",
      avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-712513.jpg&fm=jpg",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doloribus, omnis fugit corporis iste magnam ratione.",
      date: "September 2, 2024",
    },
  ],
};

const ReviewBreakdownBar = ({ stars, count, total }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Typography sx={{ width: 20 }}>{stars}</Typography>
    <Rating value={stars} readOnly size="small" />
    <Box flex={1} mx={1}>
      <LinearProgress
        variant="determinate"
        value={(count / total) * 100}
        sx={{
          height: 6,
          borderRadius: 5,
          backgroundColor: "#eee",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#f50057",
          },
        }}
      />
    </Box>
    <Typography>{count}</Typography>
  </Box>
);

const CourseReviews = () => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { overall, totalReviews, ratingBreakdown, reviews } = reviewsData;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={1}>
        {/* Left Summary Box */}
        <Grid item xs={12} md={12} sx={{width:"90%"}}>
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 2,
              background: "#fff",
              boxShadow: 1,
            }}
          >
            <Typography variant="h2" color="primary">
              {overall}
            </Typography>
            <Rating value={overall} readOnly size="large" />
            <Typography variant="body2">({totalReviews} Reviews)</Typography>

            <Box mt={3}>
              {[5, 4, 3, 2, 1].map((star, idx) => (
                <ReviewBreakdownBar
                  key={star}
                  stars={star}
                  count={ratingBreakdown[5 - star]}
                  total={totalReviews}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Right Review List */}
         <Grid item xs={12} md={8} sx={{width:"90%"}}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          borderBottom: "3px solid #e91e63",
          pb: 1,
          fontWeight: 600,
          color: "primary.main",
        }}
      >
        💬 Customer Reviews
      </Typography>

      {reviews.map((r, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": {
              boxShadow: 6,
              backgroundColor: "#f9f9f9",
            },
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={r.avatar} sx={{ width: 56, height: 56 }} />
            </Grid>

            <Grid item xs>
              <Typography fontWeight="bold" fontSize={16}>
                {r.user}
              </Typography>
              <Rating value={r.rating} readOnly size="small" />
              <Typography
                variant="body2"
                
                sx={{ mt: 1, lineHeight: 1.6,textAlign:"justify",fontSize:18 }}
              >
                {r.comment}
              </Typography>
            </Grid>

            <Grid item>
              <Chip
                label={r.date}
                variant="outlined"
                size="small"
                color="secondary"
              />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Grid>
      </Grid>
    </Box>
  );
};

export default CourseReviews;
