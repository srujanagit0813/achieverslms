import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper,
  Divider,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const instructors = [
  {
    name: 'Sanki Jho',
    reviews: '25,895',
    students: 692,
    courses: '15+',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Nidmjae Mollin',
    reviews: '21,895',
    students: 95,
    courses: '10+',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    name: 'Jane Austen',
    reviews: '17,895',
    students: 325,
    courses: '20+',
    image: 'https://randomuser.me/api/portraits/women/34.jpg',
  },
];

const courses = [
  {
    title: 'Foundation course to understand about software',
    instructor: 'Micle Jhon',
    lessons: 23,
    time: '1 hr 30 min',
    image:"https://randomuser.me/api/portraits/women/34.jpg" ,
  },
  {
    title: 'Nidnies course to understand about software',
    instructor: 'Rinis Jhon',
    lessons: 29,
    time: '2 hr 10 min',
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    title: 'Minws course to understand about solution',
    instructor: 'Jane Austen',
    lessons: 25,
    time: '1 hr 40 min',
    image: "https://randomuser.me/api/portraits/women/34.jpg",
  },
];

const InstructorCard = ({ name, reviews, students, courses, image }) => (
  <Box display="flex" alignItems="center" py={2} flexWrap="wrap">
    <Avatar src={image} sx={{ width: 64, height: 64, mr: 2 }} />
    <Box flex={1}>
      <Typography fontWeight="bold" variant="h6">{name}</Typography>
      <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
        <Typography variant="body2" display="flex" alignItems="center">
          <RateReviewIcon fontSize="small" sx={{ mr: 0.5 }} />
          {reviews} Reviews
        </Typography>
        <Typography variant="body2" display="flex" alignItems="center">
          <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
          {students} Students
        </Typography>
        <Typography variant="body2" display="flex" alignItems="center">
          <MenuBookIcon fontSize="small" sx={{ mr: 0.5 }} />
          {courses} Courses
        </Typography>
      </Stack>
    </Box>
  </Box>
);

const CourseCard = ({ title, instructor, lessons, time, image }) => (
  <Box display="flex" alignItems="center" py={2} flexWrap="wrap">
    <Box sx={{ minWidth: 100, mr: 2 }}>
      <img src={image} alt={title} style={{ width: '100px', height: '60px', borderRadius: 8 }} />
    </Box>
    <Box flex={1}>
      <Typography fontWeight="500" fontSize="0.95rem" gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
        <Typography variant="body2" fontWeight="bold">{instructor}</Typography>
        <Typography variant="body2" display="flex" alignItems="center">
          <MenuBookIcon fontSize="small" sx={{ mr: 0.5 }} />
          {lessons} Lessons
        </Typography>
        <Typography variant="body2" display="flex" alignItems="center">
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
          {time}
        </Typography>
      </Stack>
    </Box>
  </Box>
);

const StudentDashboardSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box p={{ xs: 2, sm: 3, md: 4 }}>
      <Grid container spacing={3}>
        {/* Popular Instructor Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">Popular Instructors</Typography>
              <IconButton color="primary" size="small">
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
            {instructors.map((inst, index) => (
              <React.Fragment key={index}>
                <InstructorCard {...inst} />
                {index < instructors.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Paper>
        </Grid>

        {/* Recent Course Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">Recent Courses</Typography>
              <IconButton color="primary" size="small">
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </Box>
            <Divider sx={{ my: 1 }} />
            {courses.map((course, index) => (
              <React.Fragment key={index}>
                <CourseCard {...course} />
                {index < courses.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboardSection;