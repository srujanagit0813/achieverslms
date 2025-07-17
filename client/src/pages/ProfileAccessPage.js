import React, { useState } from 'react';
import { Box, Button, Stack, Paper } from '@mui/material';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignUpForm';

const ProfileAccessPage = ({ setIsLoggedIn }) => {
  const [view, setView] = useState('login'); // 'login' or 'signup'

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10, px: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
          <Button
            variant={view === 'login' ? 'contained' : 'outlined'}
            onClick={() => setView('login')}
          >
            Login
          </Button>
          <Button
            variant={view === 'signup' ? 'contained' : 'outlined'}
            onClick={() => setView('signup')}
          >
            Signup
          </Button>
        </Stack>

        {/* Show corresponding form */}
        {view === 'login' ? (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        )}
    </Box>
  );
};

export default ProfileAccessPage;