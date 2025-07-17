import React, { useState } from "react";
import {
  Box, List, ListItem, ListItemIcon, ListItemText, Typography,
  IconButton, Drawer, Divider, useTheme, useMediaQuery, AppBar, Toolbar
} from "@mui/material";
import {
  Dashboard, MenuBook, AddCircle, Assignment, FolderOpen,
  Quiz, Campaign, BarChart, Message, Settings, Logout, Menu
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const InstructorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const activeStyle = {
    bgcolor: "#e3f2fd",
    borderRadius: 2,
    fontWeight: "bold",
    color: "#1976d2",
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 2 }}>GENERAL</Typography>
      <List>
        <ListItem button onClick={() => navigate("/InstructorDashboard")} sx={isActive("/InstructorDashboard") ? activeStyle : {}}>
          <ListItemIcon><Dashboard color={isActive("/InstructorDashboard") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate("/InstructorDashboard/messages")} sx={isActive("/InstructorDashboard/messages") ? activeStyle : {}}>
          <ListItemIcon><Message color={isActive("/InstructorDashboard/messages") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </List>

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 2 }}>COURSE MANAGEMENT</Typography>
      <List>
        <ListItem button onClick={() => navigate("/InstructorDashboard/courses")} sx={isActive("/InstructorDashboard/courses") ? activeStyle : {}}>
          <ListItemIcon><MenuBook color={isActive("/InstructorDashboard/courses") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItem>
        <ListItem button onClick={() => navigate("/InstructorDashboard/create-course")} sx={isActive("/InstructorDashboard/create-course") ? activeStyle : {}}>
          <ListItemIcon><AddCircle color={isActive("/InstructorDashboard/create-course") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Create Course" />
        </ListItem>
        <ListItem button onClick={() => navigate("/InstructorDashboard/manage-assignments")} sx={isActive("/InstructorDashboard/manage-assignments") ? activeStyle : {}}>
          <ListItemIcon><Assignment color={isActive("/InstructorDashboard/manage-assignments") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Manage Assignments" />
        </ListItem>
        <ListItem button onClick={() => navigate("/InstructorDashboard/submissions")} sx={isActive("/InstructorDashboard/submissions") ? activeStyle : {}}>
          <ListItemIcon><FolderOpen color={isActive("/InstructorDashboard/submissions") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Submissions" />
        </ListItem>
        <ListItem button onClick={() => navigate("/InstructorDashboard/quiz-management")} sx={isActive("/InstructorDashboard/quiz-management") ? activeStyle : {}}>
          <ListItemIcon><Quiz color={isActive("/InstructorDashboard/quiz-management") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Quiz Management" />
        </ListItem>
        <ListItem button onClick={() => navigate("/InstructorDashboard/announcements")} sx={isActive("/InstructorDashboard/announcements") ? activeStyle : {}}>
          <ListItemIcon><Campaign color={isActive("/InstructorDashboard/announcements") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItem>
      </List>

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 2 }}>ANALYTICS</Typography>
      <List>
        <ListItem button onClick={() => navigate("/InstructorDashboard/analytics")} sx={isActive("/InstructorDashboard/analytics") ? activeStyle : {}}>
          <ListItemIcon><BarChart color={isActive("/InstructorDashboard/analytics") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 2 }}>SETTINGS</Typography>
      <List>
        {/* <ListItem button onClick={() => navigate("/InstructorDashboard/settings")} sx={isActive("/InstructorDashboard/settings") ? activeStyle : {}}>
          <ListItemIcon><Settings color={isActive("/InstructorDashboard/settings") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem> */}
        <ListItem button onClick={() => navigate("/logout")}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar position="fixed" sx={{ bgcolor: "#6a1b9a" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Instructor Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{ width: 250, bgcolor: "#ffffff", boxShadow: 2, minHeight: "100vh", p: 2 }}>
          {drawerContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: 250 }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default InstructorSidebar;