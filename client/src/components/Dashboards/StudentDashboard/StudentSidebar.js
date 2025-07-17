import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AccountCircle,
  Message,
  Favorite,
  RateReview,
  Quiz,
  History,
  Assignment,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const isActive = (path) => location.pathname === path;

  const activeStyle = {
    bgcolor: "#e3f2fd",
    borderRadius: 2,
    fontWeight: "bold",
    color: "#1976d2",
  };

  return (
    <Box
      sx={{
        minWidth: { xs: "100%", sm: "250px" }, // Full width on mobile, fixed on larger screens
        bgcolor: "#ffffff",
        boxShadow: 2,
        minHeight: "50vh",
        height:"70vh",
        p: 2,
        mt: { xs: 2, md: 8 },
        mx: { xs: 0, sm: "40px" }, // Remove left margin on mobile
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ListItem
          button
          onClick={() => navigate("/dashboard/student")}
          sx={isActive("/dashboard/student") ? activeStyle : {}}
        >
          <ListItemIcon>
            <DashboardIcon
              color={isActive("/dashboard/student") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/dashboard/student/UserProfilePage")}
          sx={
            isActive("/dashboard/student/UserProfilePage") ? activeStyle : {}
          }
        >
          <ListItemIcon>
            <AccountCircle
              color={
                isActive("/dashboard/student/UserProfilePage")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/dashboard/student/Chat")}
          sx={isActive("/dashboard/student/Chat") ? activeStyle : {}}
        >
          <ListItemIcon>
            <Message
              color={
                isActive("/dashboard/student/Chat") ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>

        <ListItem
          button
          onClick={() =>
            navigate("/dashboard/student/StudentEnrolledCourses")
          }
          sx={
            isActive("/dashboard/student/StudentEnrolledCourses")
              ? activeStyle
              : {}
          }
        >
          <ListItemIcon>
            <Assignment
              color={
                isActive("/dashboard/student/StudentEnrolledCourses")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Enrolled Courses" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/dashboard/student/wishlist")}
          sx={isActive("/dashboard/student/wishlist") ? activeStyle : {}}
        >
          <ListItemIcon>
            <Favorite
              color={
                isActive("/dashboard/student/wishlist")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/dashboard/student/Reviews")}
          sx={isActive("/dashboard/student/Reviews") ? activeStyle : {}}
        >
          <ListItemIcon>
            <RateReview
              color={
                isActive("/dashboard/student/Reviews") ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/dashboard/student/QuizAttemptPage")}
          sx={
            isActive("/dashboard/student/QuizAttemptPage") ? activeStyle : {}
          }
        >
          <ListItemIcon>
            <Quiz
              color={
                isActive("/dashboard/student/QuizAttemptPage")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Quiz Attempts" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate("/dashboard/student/Assignments")}
          sx={isActive("/dashboard/student/Assignments") ? activeStyle : {}}
        >
          <ListItemIcon>
            <Assignment
              color={
                isActive("/dashboard/student/Assignments")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Assignments" />
        </ListItem>

        <ListItem button onClick={() => navigate("/logout")}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default StudentSidebar;