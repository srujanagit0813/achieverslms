import React from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./InstructorSidebar";

// Layout will handle Header + Sidebar + Main
function Layout({ children, role = "Instructor" }) {
  return (
    <>
      {/* Header Section */}
      <Box
        sx={{ bgcolor: "#6a1b9a", borderRadius: 3, p: 3, display:'flex',
               alignItems:'center', justifyContent:'space-between',
               flexWrap:'wrap', color:'white',width:"93%",marginLeft:"30px",mt:12}}
      >
        <Box display="flex" alignItems="center">
          <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" sx={{ width: 64, height: 64, mr: 2 }}/>
          <Box>
            <Typography variant="body1">Hello</Typography>
            <Typography variant="h6" fontWeight="bold">
              Michle Obema
            </Typography>
          </Box>
        </Box>
        <Box textAlign="center">
          <Typography variant="body2">⭐⭐⭐⭐☆</Typography>
          <Typography variant="body2">4.0 (120 Reviews)</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor:'white', color:'#6a1b9a',
                 '&:hover': { bgcolor:'#f3e5f5' },
                 mt:{ xs: 2, sm: 0 }
               }}
        >
          Create a New Course
        </Button>
      </Box>

      {/* Main Section */}
      <Box sx={{ p: 4, bgcolor: "#f4f4f9", minHeight:'100vh', display:'flex', gap:4 }}>
        {/* Sidebar on the left */}
        <Box sx={{ flex:'0 0 250px' }}>
          <Sidebar role={role} />
        </Box>

        {/* Main content on the right */}
        <Box sx={{ flex:'1',marginLeft:'5px' }}>
          {children}
        </Box>
      </Box>
    </>
  )
}

export default Layout;