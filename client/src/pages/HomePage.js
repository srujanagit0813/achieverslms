import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Rating,
  Avatar,
  IconButton,
  
  MenuItem,
  Menu
} from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import achievers from '../assets/logos/achievers.png';
import ContactUs from '../components/ContactUs'
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Blogs from "../components/Blogs";
import Appbar from '../components/Appbar';
import TestimonialsSlider from '../components/TestimonialsSlider';

const bgImages = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
  'https://images.unsplash.com/photo-152219975583-a2bacb67c546',
  'https://images.unsplash.com/photo-1550439062-609e1531270e',
];

// Categories for the Learning Hub
const categories = [
  "CBSE", "NCERT", "ICSE", "Science Olympiad", "Maths Olympiad",
  "Delhi Public School", "Navodaya Entrance", "Sainik School Entrance", "UPSC", "CAT",
  "IIT-JEE", "NEET", "AP EAMCET", "TS EAMCET", "BITSAT", "AIEEE", "Manipal Entrance",
  "KCET", "VIT Entrance Exam", "SRMJEEE", "Engineering Entrance", "IT Placement",
  "Professional Courses", "Bank Exams", "Government Exams", "Current Affairs"
];
const testimonials = [
  {
    name: "Alice Johnson",
    role: "Web Developer",
    photo: "https://i.pravatar.cc/100?img=1",
    feedback: "This platform has transformed my career. The course content is clear, comprehensive, and very helpful!",
    rating: 5,
  },
  {
    name: "Mike Rogers",
    role: "Design Lead",
    photo: "https://i.pravatar.cc/100?img=2",
    feedback: "Excellent support and well-structured content. I improved my skills quickly!",
    rating: 4.5,
  },
  {
    name: "Samantha Lee",
    role: "Product Manager",
    photo: "https://i.pravatar.cc/100?img=3",
    feedback: "A wonderful experience from start to finish. Highly recommended!",
    rating: 4,
  },
  {
    name: "James Peterson",
    role: "Full Stack Engineer",
    photo: "https://i.pravatar.cc/100?img=4",
    feedback: "I landed a job immediately after finishing this course. Worth every penny!",
    rating: 5,
  },
];



const HomePage = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

 const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleContactClick = () => {
    handleMenuClose();
     navigate('/contact')
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted!', formData);
      setFormData({ name: '', email: '', message: '' });
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      {/* Navbar */}
      
     <Appbar/>
      

      {/* Hero Section */}
      <Box sx={{ 
        backgroundImage: `url(${bgImages[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        px: 2,
      }}>
        <Container>
          <Typography variant="h3" sx={{ 
            fontWeight: 'bold',
            mb: 3,
            textShadow: '2px 2px 4px rgba(0,0,0,0.6)', 
            fontFamily: 'Helvetica Neue', 
          }}>
            Achieve Your Dreams with Smarter Learning
          </Typography>
          <Button variant="contained" size="large" sx={{ 
            bgcolor: '#ff9800',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#ffa726' },
            mb: 4,
            fontFamily: 'Helvetica Neue', 
          }} onClick={()=>navigate('/profile-access')}>
            Join Now
          </Button>
        </Container>
      </Box>

      {/* Save Time Section */}
      <Box sx={{ width: '100%', py: 10, px: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom color="#001F54" sx={{ fontFamily: 'Helvetica Neue',  }}>
            Save 60% of Your Study Time
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', fontFamily: 'Helvetica Neue',  }}>
            Perform, Analyze, and Improve Your Learning Efficiency Today! 
          </Typography>
          <Button variant="contained" sx={{ 
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            bgcolor: '#ff9800',
            color: '#000',
            '&:hover': { bgcolor: '#fb8c00' },
            fontFamily: 'Helvetica Neue', 
          }}>
            Start
          </Button>
        </Container>
      </Box>

      {/* Learning Hub Section */}
      <Box sx={{ width: '100%', py: 6, px: 2, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 6, color: '#001F54', fontFamily: 'Helvetica Neue',  }}>
            Learning Hub
          </Typography>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' },
            gap: 2,
            mb: 4,
          }}>
            {categories.slice(0, 15).map((category) => (
              <Button
                key={category}
                variant="contained"
                size="small"
                sx={{ 
                   backgroundColor: '#2c3e70',
                   borderRadius: '20px',
                   textTransform: 'none',
                   fontWeight: '600',
                   px: 3,
                   py: 1,
                   color: '#fff',
                   '&:hover': { backgroundColor: '#ff9800', color: '#000' },
                   fontFamily: 'Helvetica Neue', 
                 }}
               >
                {category}
              </Button>
            ))}
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/Landingpage')}
            sx={{ 
              borderColor: '#2c3e70',
              color: '#2c3e70',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#2c3e70', color: '#fff' },
              fontFamily: 'Helvetica Neue', 
            }}
            
          >
            View All Courses
          </Button>
        </Container>
      </Box>
     

      <Box sx={{ mt: 0 }}>
        <AboutUs />
      </Box>
      <Box sx={{ mt: 2 }}> 
        <Blogs />
      </Box>
      {/* Testimonials Section */}
 <Box sx={{ py: 6, px: 2, backgroundColor: "#ffffff" }}>
      <TestimonialsSlider/>
    </Box>


      <Box sx={{ mt: 0 }}>
        <ContactUs />
      </Box>

      

      <Box sx={{ mt: 2 }}>
        <Footer />
      </Box>

    </>
  )
};

export default HomePage;