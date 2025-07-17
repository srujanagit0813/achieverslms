import React from 'react';
import ConfettiAnimation from '../components/ConfettiAnimation';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <ConfettiAnimation />
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for your purchase.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </Box>
  );
};

export default SuccessPage;