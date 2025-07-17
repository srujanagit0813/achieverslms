import React from "react";
import { Box, Button, Typography, Avatar, Stack, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";

function StudentTopbarPage() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "#6a1b9a",
          borderRadius: 3,
          p: { xs: 2, sm: 3 },
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          color: 'white',
          gap: { xs: 2, sm: 0 },
          mt:10
        }}
      >
        {/* User Section */}
        <Box display="flex" alignItems="center">
          <Avatar src="https://i.pravatar.cc/300" sx={{ width: 64, height: 64, mr: 2 }} />
          <Box>
            <Typography variant="body1">Hello</Typography>
            <Typography variant="h6" fontWeight="bold">
              Michle Obema
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={1}>
              <Typography variant="body2">📘 9 Courses Enrolled</Typography>
              <Typography variant="body2">📜 8 Certificates</Typography>
            </Stack>
          </Box>
        </Box>

        {/* Button Section */}
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: 'white',
            color: '#6a1b9a',
            '&:hover': { bgcolor: '#f3e5f5' },
            mt: { xs: 2, sm: 0 }
          }}
        >
          Create a New Course
        </Button>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ mt: 4 }}>
        {/* You can add your dashboard content here */}
      </Box>
      </>
  );
}

export default StudentTopbarPage;