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
  MenuItem,
  Menu,
  IconButton
} from '@mui/material';
import achievers from '../assets/logos/achievers.png';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Blogs from "./Blogs";
import MenuIcon from "@mui/icons-material/Menu";


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



const Appbar = () => {
  
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // for small screen menu
  const [dashboardAnchorEl, setDashboardAnchorEl] = useState(null); // for dashboard dropdown
  // const handleContactClick = () => navigate('/contact');

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleContactClick = () => {
    handleMenuClose();
     navigate('/contact')
  };
 
 

  const handleDashboardMenuOpen = (event) => setDashboardAnchorEl(event.currentTarget);
  const handleDashboardMenuClose = () => setDashboardAnchorEl(null);

  const handleDashboardNavigate = (path) => {
    handleDashboardMenuClose();
    navigate(path);
  };
 
  
  return (
    <>
      {/* Navbar */}
       <Box
      sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', px: 0, py: 3 }}
    >
      {/* Logo Section */}
      <Box sx={{ display:'flex', alignItems:'center', ml: 2 }}>
        <img src={achievers} alt="logo" style={{ width: 250, height: 80 }}/>
      </Box>

      {/* Large screens */}
      <Box
        display={{ xs:'none', sm:'flex' }}
        gap={6}>
        <Button
          variant="text"
          sx={{ color: '#000', fontWeight: 500, textTransform:'none', '&:hover': { color:'#ff9800', background:'none'}} }
          onClick={() => navigate('/exams')}
        >
          Exams
        </Button>

        <Button
          variant="text"
          sx={{ color: '#000', fontWeight: 500, textTransform:'none', '&:hover': { color:'#ff9800', background:'none'}} }
          onClick={() => navigate('/')}
        >
          Home
        </Button>

        <Button
          variant="text"
          sx={{ color: '#000', fontWeight: 500, textTransform:'none', '&:hover': { color:'#ff9800', background:'none'}} }
          onClick={handleContactClick}
        >
          Contact Us
        </Button>
         <Button
          variant="text"
          sx={{ color: '#000', fontWeight: 500, textTransform:'none', '&:hover': { color:'#ff9800', background:'none'}} }
          onClick={() => navigate ('/AboutUs')}
        >
          AboutUs
        </Button>

        <Box>
            <Button
              variant="text"
              sx={{ color: '#000', fontWeight: 500, textTransform: 'none', '&:hover': { color: '#ff9800', background: 'none' } }}
              onClick={handleDashboardMenuOpen}
            >
              Dashboard
            </Button>
            <Menu
              anchorEl={dashboardAnchorEl}
              open={Boolean(dashboardAnchorEl)}
              onClose={handleDashboardMenuClose}
            >
              <MenuItem onClick={() => handleDashboardNavigate('/dashboard/admin')}>Admin</MenuItem>
              <MenuItem onClick={() => handleDashboardNavigate('/dashboard/instructor')}>Instuctor</MenuItem>
              <MenuItem onClick={() => handleDashboardNavigate('/dashboard/student')}>Student</MenuItem>
            </Menu>
          </Box>

        <Button
          variant="contained"
          sx={{ bgcolor:'orange', color:'#000', fontWeight:'600', textTransform:'none', '&:hover': { bgcolor:'#ff9800'}} }
        >
          Inquiry
        </Button>
      </Box>

      {/* Small screens */}
      <Box
        sx={{ display:{ xs:'flex', sm:'none' } }}
        mr={2}>
        <IconButton aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/exams'); }}>Exams</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Home</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/AboutUs'); }}>AboutUs</MenuItem>

          <MenuItem onClick={handleContactClick}>
            Contact Us
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Inquiry
          </MenuItem>
        </Menu>
      </Box>
    </Box>
    </>
  )
};

export default Appbar;