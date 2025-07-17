import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import StarRateIcon from '@mui/icons-material/StarRate';
import lab from '../assets/logos/lab.jpg';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LanguageIcon from '@mui/icons-material/Language';

const AboutUs = () => {
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState('auto');

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.offsetHeight);
    }
  }, []);

  return (
    <Box sx={{ fontFamily: `'Montserrat', sans-serif` }}>
      {/* About Section */}
      <Box
        sx={{ backgroundColor: 'aliceblue', py: { xs: 4, md: 8 },
          px: { xs: 2, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: { xs: 4, md: 6 },
          maxWidth: '90%',
          margin: 'auto',
        }}
      >
        {/* Text Content */}
        <Box ref={textRef} sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: 'black', fontWeight: 'bold', textTransform: 'uppercase',textAlign:"center",marginLeft:"80%",mt:-5 }}
          >
            About Us
          </Typography>

         

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600,textAlign:"justify" }}>
            Smart learning is key for your success
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 ,textAlign:"justify"}}>
            At Achievers LMS, we believe that success is not just about hard work — it’s about the right
            tools, guidance, and platform.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 ,textAlign:"justify"}}>
            We help students prepare smarter, not harder. Our platform offers test series, mock exams,
            study materials, and analytics to build your confidence.
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 ,textAlign:"justify"}}>
            <strong>Features include:</strong>
            <ul style={{ marginLeft: '1.2rem', marginTop: '0.5rem' }}>
              <li>Interactive test preparation</li>
              <li>Real-time performance tracking</li>
              <li>Personalized learning paths</li>
              <li>Adaptive question banks</li>
              <li>Access anytime, anywhere</li>
            </ul>
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 ,textAlign:"justify"}}>
            <strong>Our mission:</strong>
             Empower students to unlock their potential. You're not just practicing — you're
            preparing to succeed.
          </Typography>
           <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 ,textAlign:"justify"}}>
            <strong>Our vission:</strong>

            To become the most trusted and effective learning platform, helping students achieve academic and professional excellence.

          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2,textAlign:"justify" }}>
            <strong>core values:</strong>

            <ul style={{ paddingLeft: '5rem', marginTop:1 }}>
                   <li>Student-Centric Approach</li>
                   <li>Innovation in Learning</li>
                   <li>Integrity & Transparency</li>
                   <li>Commitment to Quality</li>
                </ul>

          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2,textAlign:"justify" }}>
                        <strong>Our journey:</strong>

           Since our inception, Achievers LMS has grown to become a beacon of smart education, empowering learners across India.


          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600,textAlign:"justify" }}>
            Join us and take the next step toward your dream future!  
          </Typography>
        </Box>

        {/* Image */}
       <Box
          sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', height: { md: textHeight }, }}
        >
          <Box
            component="img"
            src={lab}
            alt="Achievers LMS"
            sx={{ width: '100%', height: "50%", objectFit: 'cover', borderRadius: 3, boxShadow: 2,mt:5 }}
          />
        </Box>
      </Box>

      {/* Statistics */}
      <Box
        sx={{ backgroundColor: '#fff', py: { xs: 4, md: 4 },
          px: { xs: 1, md: 6 },
          maxWidth: '1200px',
          margin: 'auto',
          mt: 6,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ color: '#2c3e70', mb: 4 }}
        >
          Trusted by Thousands of Learners
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: '#e3f2fd', color: '#2c3e70' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PeopleIcon sx={{ fontSize: 30, color: '#2c3e70', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                   25K+
                </Typography>
                <Typography variant="subtitle2">Active Learners</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{ p: 2, borderRadius: 3, backgroundColor: '#fff8e1', color: '#004d40' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <SchoolIcon sx={{ fontSize: 30, color: '#004d40', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                   120+
                </Typography>
                <Typography variant="subtitle2">Expert Courses</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: '#e0f2f1', color: '#795548' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StarRateIcon sx={{ fontSize: 30, color: '#fbc02d', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                   4.8/5
                </Typography>
                <Typography variant="subtitle2">Average Rating</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Exam Success Rate */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{ p: 2, borderRadius: 3, backgroundColor: '#f3e5f5', color: '#6a1b9a' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <EmojiEventsIcon sx={{ fontSize: 30, color: '#6a1b9a', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                   92%
                </Typography>
                <Typography variant="subtitle2">Exam Success Rate</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Courses Completed */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{ p: 2, borderRadius: 3, backgroundColor: '#e8f5e9', color: '#1b5e20' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <LibraryBooksIcon sx={{ fontSize: 30, color: '#1b5e20', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                   15K+
                </Typography>
                <Typography variant="subtitle2">Courses Completed</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Countries Reached */}
          <Grid item xs={12} md={4}>
            <Card
              elevation={3}
              sx={{ p: 2, borderRadius: 3, backgroundColor: '#e1f5fe', color: '#0277bd' }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <LanguageIcon sx={{ fontSize: 30, color: '#0277bd', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                   25+
                </Typography>
                <Typography variant="subtitle2">Countries Reached</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

     
    </Box>
  )
};

export default AboutUs;