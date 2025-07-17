import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const sliderData = [
  {
    title: 'ANIMATED VIDEOS',
    subtitle: 'Animated Videos: Learning Comes to Life',
    buttonText: 'Start now',
    image: 'https://img.freepik.com/premium-photo/online-learning-experience_117255-2614.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: 'ANIMATED VIDEOS',
    subtitle: 'Animated Videos: Learning Comes to Life',
    buttonText: 'Start now',
    image: 'https://img.freepik.com/free-photo/asia-businesswoman-using-laptop-talk-colleagues-about-plan-video-call-meeting-living-room_7861-3171.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: 'ANIMATED VIDEOS',
    subtitle: 'Animated Videos: Learning Comes to Life',
    buttonText: 'Start now',
    image: 'https://img.freepik.com/free-photo/employees-working-together-side-view_23-2150152250.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: 'ANIMATED VIDEOS',
    subtitle: 'Animated Videos: Learning Comes to Life',
    buttonText: 'Start now',
    image: 'https://img.freepik.com/free-photo/young-student-sitting-table-use-laptop_1157-27564.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: 'ANIMATED VIDEOS',
    subtitle: 'Animated Videos: Learning Comes to Life',
    buttonText: 'Start now',
    image: 'https://img.freepik.com/free-photo/young-woman-attending-online-class_23-2148854936.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: 'ANIMATED VIDEOS',
    subtitle: 'Animated Videos: Learning Comes to Life',
    buttonText: 'Start now',
    image: 'https://img.freepik.com/free-photo/friends-attending-online-classes-together_23-2148854886.jpg?semt=ais_hybrid&w=740',
  },
];

const AnimatedVideoSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <Box
        component="ul"
        sx={{
          position: 'absolute',
          bottom: 16,
          display: 'flex !important',
          justifyContent: 'center',
          width: '100%',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          zIndex: 5,
        }}
      >
        {dots}
      </Box>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: 12,
          height: 12,
          bgcolor: 'white',
          borderRadius: '50%',
          mx: 0.5,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'primary.main',
          },
        }}
      />
    ),
  };

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden', mt: 8 }}>
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: isMobile ? '400px' : isTablet ? '450px' : '500px',
              position: 'relative',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              mx: 2,
            }}
          >
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 3,
              }}
            />

            {/* Text Content */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                color: 'white',
                textAlign: 'center',
                px: isMobile ? 2 : 4,
                mt:5
              }}
            >
              <Typography
                variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h3'}
                fontWeight="bold"
                gutterBottom
              >
                {item.title}
              </Typography>
              <Typography
                variant={isMobile ? 'body1' : isTablet ? 'h6' : 'h5'}
                gutterBottom
              >
                {item.subtitle}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: '30px',
                  px: isMobile ? 3 : 4,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '14px' : '16px',
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                {item.buttonText}
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default AnimatedVideoSlider;
