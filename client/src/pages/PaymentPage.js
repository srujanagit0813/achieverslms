// src/pages/PaymentPage.jsx

import React, { useState } from 'react';
import {
  Grid, Box, Button, Typography, Container, Divider, CircularProgress, Paper
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { SnackbarProvider, useSnackbar } from 'notistack';
import GPayIcon from '../assets/logos/google-pay.jpg';
import PhonePeIcon from '../assets/logos/phonepe-icon.jpg';
import UPIIcon from '../assets/logos/upi-icon.jpg';
import RazorpayIcon from '../assets/logos/razor-pay.jpg';
import OrderSummary from '../components/OrderSummary';


const paymentOptions = [
  { name: 'Google Pay', icon: GPayIcon },
  { name: 'PhonePe', icon: PhonePeIcon },
  { name: 'UPI', icon: UPIIcon },
  { name: 'Razorpay', icon: RazorpayIcon },
//   { name: 'Net Banking', icon: NetbankingIcon },
];

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleProceed = () => {
    if (!selectedOption) {
      enqueueSnackbar('Please select a payment option!', { variant: 'warning' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      enqueueSnackbar('Payment Successful!', { variant: 'success' });
      navigate('/success');
    }, 2000);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Payment
        </Typography>

        <Grid container spacing={4} direction="column">
          {/* Order Summary First */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <OrderSummary />
            </Paper>
          </Grid>

          {/* Payment Methods Next */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Select Payment Method
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {paymentOptions.map((option) => (
                <Box
                  key={option.name}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    p: 2,
                    mb: 2,
                    border: selectedOption === option.name ? '2px solid #4caf50' : '1px solid #ddd',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    bgcolor: selectedOption === option.name ? '#e8f5e9' : '#fff',
                    '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
                    width: '100%',
                  }}
                  onClick={() => setSelectedOption(option.name)}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={option.icon}
                      alt={option.name}
                      sx={{ width: 30, height: 30, mr: 2 }} // Reduced icon size
                    />
                    <Typography variant="body1" fontWeight={500}>
                      {option.name}
                    </Typography>
                  </Box>
                  <Button
                    variant={selectedOption === option.name ? 'contained' : 'outlined'}
                    color="success"
                    size="small"
                  >
                    {selectedOption === option.name ? 'Selected' : 'Select'}
                  </Button>
                </Box>
              ))}

              <Box mt={4} textAlign="right">
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  sx={{ px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: '8px' }}
                  onClick={handleProceed}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Proceed to Pay'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaymentPage;