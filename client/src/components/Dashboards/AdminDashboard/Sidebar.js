import React, { useState } from "react";
import {
  Box, List, ListItem, ListItemIcon, ListItemText, Typography,
  IconButton, Drawer, useTheme, useMediaQuery, AppBar, Toolbar
} from "@mui/material";
import {
  Dashboard as DashboardIcon, AccountCircle, Message, Favorite, RateReview,
  Quiz, History, MenuBook, Campaign, Assignment, Settings, Logout, Menu
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
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
      {/* GENERAL */}
      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, mt: 2 }}>GENERAL</Typography>
      <List>
        <ListItem button onClick={() => navigate("/dashboard")} sx={isActive("/dashboard") ? activeStyle : {}}>
          <ListItemIcon><DashboardIcon color={isActive("/dashboard") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/UserProfilePage")} sx={isActive("/dashboard/UserProfilePage") ? activeStyle : {}}>
          <ListItemIcon><AccountCircle color={isActive("/dashboard/UserProfilePage") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/chat")} sx={isActive("/dashboard/chat") ? activeStyle : {}}>
          <ListItemIcon><Message color={isActive("/dashboard/chat") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/AnnouncementsPage")} sx={isActive("/dashboard/AnnouncementsPage") ? activeStyle : {}}>
          <ListItemIcon><Campaign color={isActive("/dashboard/AnnouncementsPage") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItem>
      </List>

      {/* OTHERS */}
      <List>
        <ListItem button onClick={() => navigate("/dashboard/reviews")} sx={isActive("/dashboard/reviews") ? activeStyle : {}}>
          <ListItemIcon><RateReview color={isActive("/dashboard/reviews") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/QuizAttemptPage")} sx={isActive("/dashboard/QuizAttemptPage") ? activeStyle : {}}>
          <ListItemIcon><Quiz color={isActive("/dashboard/QuizAttemptPage") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="My Quiz Attempts" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/OrderHistoryPage")} sx={isActive("/dashboard/OrderHistoryPage") ? activeStyle : {}}>
          <ListItemIcon><History color={isActive("/dashboard/OrderHistoryPage") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Order History" />
        </ListItem>
      </List>

      {/* COURSES */}
      <List>
        <ListItem button onClick={() => navigate("/dashboard/MyCoursesPage")} sx={isActive("/dashboard/MyCoursesPage") ? activeStyle : {}}>
          <ListItemIcon><MenuBook color={isActive("/dashboard/MyCoursesPage") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="My Courses" />
        </ListItem>
        <ListItem button onClick={() => navigate("/dashboard/assignments")} sx={isActive("/dashboard/assignments") ? activeStyle : {}}>
          <ListItemIcon><Assignment color={isActive("/dashboard/assignments") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItem>
      </List>

      {/* SETTINGS & LOGOUT */}
      <List>
        <ListItem button onClick={() => navigate("/dashboard/settings")} sx={isActive("/dashboard/settings") ? activeStyle : {}}>
          <ListItemIcon><Settings color={isActive("/dashboard/settings") ? "primary" : "inherit"} /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
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
              Dashboard
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

export default Sidebar;