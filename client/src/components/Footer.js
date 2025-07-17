import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  Link as MuiLink
} from '@mui/material';
import achievers from '../assets/logos/achievers.png';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#0f172a', color: 'white', pt: 8, pb: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>

          {/* Brand Info */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <img src={achievers} alt="Achievers Logo" style={{ width: 140, height: 50 }} />
            </Stack>
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
              A complete digital learning solution for CBSE students from Class 1 to 12.
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)',textAlign:"justify" }}>
              Empowering learners through interactive, NCERT-aligned content.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2, color: '#60a5fa' }}>
              Explore
            </Typography>
            <Stack spacing={1}>
              <MuiLink href="/" underline="hover" color="inherit" sx={{ opacity: 0.8, '&:hover': { color: '#60a5fa' } }}>
                Home
              </MuiLink>
              <MuiLink href="/courses" underline="hover" color="inherit" sx={{ opacity: 0.8, '&:hover': { color: '#60a5fa' } }}>
                Courses
              </MuiLink>
              <MuiLink href="/about" underline="hover" color="inherit" sx={{ opacity: 0.8, '&:hover': { color: '#60a5fa' } }}>
                About Us
              </MuiLink>
            </Stack>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2, color: '#60a5fa' }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <MuiLink href="/faq" underline="hover" color="inherit" sx={{ opacity: 0.8, '&:hover': { color: '#60a5fa' } }}>
                FAQ
              </MuiLink>
              <MuiLink href="/privacy" underline="hover" color="inherit" sx={{ opacity: 0.8, '&:hover': { color: '#60a5fa' } }}>
                Privacy Policy
              </MuiLink>
              <MuiLink href="/terms" underline="hover" color="inherit" sx={{ opacity: 0.8, '&:hover': { color: '#60a5fa' } }}>
                Terms of Service
              </MuiLink>
            </Stack>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontSize: '1rem', mb: 2, color: '#60a5fa' }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}><strong>Email:</strong> trietreetech@mail.com</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}><strong>Phone:</strong> +91 6305673939</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}><strong>Address:</strong> DSL ABACUS IT PARK, UPPAL, HYDERABAD</Typography>

            <Stack direction="row" spacing={1}>
              {['Facebook', 'Twitter', 'Instagram'].map((platform) => (
                <Button
                  key={platform}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#60a5fa',
                      borderColor: '#60a5fa',
                      color: '#fff'
                    }
                  }}
                >
                  {platform}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        {/* Footer Bottom */}
        <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
          © {new Date().getFullYear()} <strong>ACHIEVERS</strong>. All rights reserved. | Affiliated with CBSE
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
