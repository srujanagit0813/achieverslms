import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import StudentTopbarPage from './StudentTopbarPage';

const StudentDashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '150vh',
      
     }}>
      {/* Topbar at the top of the page */}
      <StudentTopbarPage />

      {/* Content Area with Sidebar and Main Section */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          mt: { xs: 0, sm: 0, md: -8 }, // Removed fixed -88 (use dynamic spacing)
          flexDirection: { xs: 'column', md: 'row' },
          // Sidebar stacks on mobile
        }}
      >
        <StudentSidebar />

        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboardLayout;