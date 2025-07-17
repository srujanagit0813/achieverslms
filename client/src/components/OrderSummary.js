import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from '@mui/material';

const OrderSummary = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1">Course: React Mastery</Typography>
          <Typography variant="body1">₹999</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body1">GST</Typography>
          <Typography variant="body1">₹99</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">₹1098</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;