import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Divider,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { LocationOn, Email, Phone } from '@mui/icons-material';
import Footer from './Footer';
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from 'react-router-dom';


const ContactUs = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleContactClick = () => {
    handleMenuClose();
     navigate('/contact')
  };
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
    <Box
      sx={{
        minHeight: '100vh',
        background: '#f3f6f9',
        p: { xs: 2, md: 12 },
        pb: 10, // padding bottom for space above footer
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 5, color: '#2c3e70' }}
      >
        Contact Us
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        paragraph
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.3rem',
          color: 'text.secondary',
          mb: 7,
          fontWeight: 500,
          maxWidth: 800,           // Limit width for line break
          mx: 'auto',              // Center horizontally
          textAlign: 'center',     // Ensure text is centered
          lineHeight: 1.8,
        }}
      >
        At Achievers LMS, we are committed to empowering learners and educators with a
        comprehensive, easy-to-use platform that enhances knowledge sharing and professional growth.
        Reach out to us anytime — your success is our priority.
      </Typography>
      {/* Location Section */}
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 4,
        alignItems: 'stretch', // makes height equal

    justifyContent: 'center',
    mb: 6,
  }}
>
  {/* Left: Location Text */}
  <Paper
    sx={{
       flex: 1,
      p: 4,
      borderRadius: 2,
      bgcolor: '#ffffff',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      maxWidth: 600,
      minHeight: 350, // ensure equal height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Box>
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{ color: '#2c3e70', mb: 2 }}
    >
      Our Location
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
    >
      Visit us at our office for inquiries about our educational content and test
      series for students from nursery to class X.
    </Typography>

    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ mt: 3, mb: 1, color: '#2c3e70' }}
    >
      Address
    </Typography>
    <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
      Ground Floor, DSL Abacus IT Park, <br />
      Survey of India, Uppal, Hyderabad
    </Typography>

    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{ mt: 3, mb: 1, color: '#2c3e70' }}
    >
      Hours
    </Typography>
    <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
      9 AM - 8 PM
    </Typography>
    </Box>
  </Paper>

  {/* Right: Google Map */}
  <Paper
    sx={{
      flex: 1,
      borderRadius: 2,
      overflow: 'hidden',
      height: 450,
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
       maxWidth: 600,
      width: '100%',
    }}
  >
    <iframe
      title="Google Map"
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0 }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.564260002089!2d78.55218007474261!3d17.43462918337062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb994e30111c41%3A0xf3dbb00cc1904a3e!2sDSL%20Abacus%20IT%20Park!5e0!3m2!1sen!2sin!4v1717673709301!5m2!1sen!2sin"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </Paper>
</Box>


      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Left: Office Info */}
        <Paper
          sx={{
            flex: 1,
            p: 6,
            borderRadius: 2,
            bgcolor: '#2c3e70',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 350,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: '1.7rem', textAlign: 'center', mb: 4 }}
          >
            Office Address
          </Typography>

          <Box display="flex" alignItems="flex-start" mb={4} justifyContent="center">
            <LocationOn sx={{ mr: 2, mt: '4px', fontSize: '2.5rem' }} />
            <Typography variant="body1" sx={{ fontSize: '1.3rem', lineHeight: 1.8 }}>
              TrieTreeTech Pvt. Ltd.
              <br />
              2nd Floor, Knowledge Hub,
              <br />
              Nagole, Hyderabad, Telangana
              <br />
              India - 500081
            </Typography>
          </Box>

          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: '1.7rem', textAlign: 'center', mb: 4 }}
          >
            Contact
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
            <Email sx={{ mr: 2, fontSize: '1.8rem' }} />
            <Typography variant="body1" sx={{ fontSize: '1.3rem', lineHeight: 1.8 }}>
              trietreetech@mail.com
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Phone sx={{ mr: 2, fontSize: '1.8rem' }} />
            <Typography variant="body1" sx={{ fontSize: '1.3rem', lineHeight: 1.8 }}>
              +91 6305673939
            </Typography>
          </Box>
        </Paper>

        {/* Right: Contact Form */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
            minHeight: 350,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 3, color: '#2c3e70' }}
          >
            Send Us a Message
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Your Name" variant="outlined" required fullWidth />
            <TextField label="Your Email" variant="outlined" type="email" required fullWidth />
            <TextField label="Your Phone Number" variant="outlined" type="tel" required fullWidth />
            <TextField
              label="Your Message"
              variant="outlined"
              multiline
              rows={5}
              required
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: '#2c3e70',
                ':hover': { backgroundColor: '#1565c0' },
              }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>

      {/* Optional: Divider above footer */}
      <Divider sx={{ my: 8, borderColor: 'rgba(0,0,0,0.05)' }} />

      {/* <Footer /> */}
    </Box>
    </>
  );
};

export default ContactUs;