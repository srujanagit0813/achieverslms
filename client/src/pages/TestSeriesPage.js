import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QuizIcon from '@mui/icons-material/Quiz';

const testSeries = [
  {
    id: 1,
    title: 'HTML Basics Test',
    questions: 20,
    duration: '30 mins',
  },
  {
    id: 2,
    title: 'CSS Intermediate Quiz',
    questions: 25,
    duration: '35 mins',
  },
  {
    id: 3,
    title: 'JavaScript Core Concepts',
    questions: 30,
    duration: '45 mins',
  },
  {
    id: 4,
    title: 'ReactJS Fundamentals',
    questions: 20,
    duration: '40 mins',
  },
  {
  id: 5,
  title: 'Advanced JavaScript Test',
  questions: 40,
  duration: '60 mins',
},
{
  id: 6,
  title: 'Node.js & Express Quiz',
  questions: 25,
  duration: '35 mins',
},
{
  id: 7,
  title: 'Frontend Web Dev Mock Test',
  questions: 50,
  duration: '90 mins',
},
{
  id: 8,
  title: 'Database & SQL Test',
  questions: 30,
  duration: '45 mins',
},

];

const TestSeriesPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ p: isMobile ? 2 : 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
        🧠 Test Series
      </Typography>

      <Grid container spacing={3} justifyContent={"justyfy"} ml={5}   >
        {testSeries.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id} m={2}>
            <Card
              sx={{
                borderRadius: 3,
                
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {test.title}
                </Typography>

                <Box display="flex" alignItems="center" mb={1}>
                  <QuizIcon sx={{ mr: 1 }} color="primary" />
                  <Typography variant="body2">
                    {test.questions} Questions
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <AccessTimeIcon sx={{ mr: 1 }} color="secondary" />
                  <Typography variant="body2">{test.duration}</Typography>
                </Box>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" color="success" fullWidth>
                  Start Test
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestSeriesPage;
