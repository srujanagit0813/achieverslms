import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Paper,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import assignmentData from "../data/assignmentData";
import AssignmentIcon from "@mui/icons-material/Assignment";

import SendIcon from "@mui/icons-material/Send";
import ChatBox from "./ChatBox";

const CourseAssignment = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));

  const course = assignmentData[id];
  const [selectedLessonId, setSelectedLessonId] = useState(
    course?.lessons?.[0]?.id || ""
  );

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  if (!course) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5">
          No assignments available for this course.
        </Typography>
      </Box>
    );
  }

  const selectedLesson = course.lessons.find(
    (lesson) => lesson.id === selectedLessonId
  );

  return (
    <Box sx={{ mt: 10, px: isMobile ? 2 : 6 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          data-aos="fade-up"
          gutterBottom
        >
          {course.title} – Assignments
        </Typography>
        <Breadcrumbs
          separator="›"
          sx={{ display: "flex", justifyContent: "center" }}
          data-aos="fade-up"
        >
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <Typography color="primary">Home</Typography>
          </NavLink>
          <Typography color="text.primary">{course.title}</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: "flex",   flexDirection: isResponsive ? "column" : "row", // column on mobile/tablet
    gap: 3, }}>
        {/* Left Panel */}
        <Box
          sx={{
            width:   "90%",...(isResponsive ? {} : { width: "25%" }),
            bgcolor: "linear-gradient(to bottom, #f9f9ff, #eef3f8)",
            p:isMobile? 2: 3,
            borderRadius: 4,
            border: "1px solid #dce3f0",
            boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
            height: "fit-content",
            transition: "all 0.3s ease-in-out",
            mt:5
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: "1.2rem",
              color: "#333",
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            📘 Lessons
          </Typography>
          <List>
            {course.lessons.map((lesson) => (
              <ListItem key={lesson.id} disablePadding>
                <ListItemButton
                  selected={lesson.id === selectedLessonId}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  sx={{ borderRadius: 2, mb: 1 }}
                >
                  <ListItemText
                    primary={`📂 ${lesson.title}`}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Panel */}
        <Box sx={{ width: "100%",...(isResponsive ? {} : { width: "75%" }), ml: isMobile ? 0 : 0 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            textAlign={"justify"}
          >
            {selectedLesson?.title} – Assignments
          </Typography>
          <Grid container spacing={3}>
            {selectedLesson?.assignments?.length > 0 ? (
              selectedLesson.assignments.map((assign) => (
                <Grid item xs={12} sm={6} md={4} key={assign.id}>
                  <Paper
                    sx={{
                      width: "100%",
                      maxWidth: 300,
                      minWidth: 250,
                      p: 3,
                      borderRadius: 4,
                      textAlign: "center",
                      transition: "0.3s",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      color="primary"
                      mb={1}
                    >
                      <AssignmentIcon fontSize="small" sx={{ mr: 1 }} />
                      {assign.title}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    {/* <Chip
                        label={assign.status}
                        color={assign.status === 'Completed' ? 'success' : 'warning'}
                        size="small"
                        sx={{ height: 24 }}
                      /> */}

                    <Typography variant="body1" mb={2} textAlign={"justify"}>
                      📝{assign.description}
                    </Typography>
                    <Typography variant="body1" mb={2} textAlign={"justify"}>
                      ⏰Due: {new Date(assign.dueDate).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      mb={2}
                      textAlign={"justify"}
                      color="primary"
                    >
                      ⬇️Download Assignment
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={2}
                    >
                      <Button
                        startIcon={<SendIcon />}
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          width: "40%",
                          backgroundColor: "green",
                          borderRadius: 2,
                          fontWeight: "bold",
                          color: "#fff",
                          "&:hover": { backgroundColor: "darkgreen" },
                        }}
                      >
                        Submit
                      </Button>

                      <Chip
                        label={assign.submitStatus}
                        variant="outlined"
                        sx={{
                          fontWeight: "bold",
                          bgcolor:
                            assign.submitStatus === "Submitted"
                              ? "#4caf50"
                              : "transparent", // green for submitted
                          color:
                            assign.submitStatus === "Submitted"
                              ? "#fff"
                              : "default",
                          borderColor:
                            assign.submitStatus === "Submitted"
                              ? "#4caf50"
                              : "#ccc",
                        }}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>
                  No assignments available for this lesson.
                </Typography>
               </Grid>

            )}

             <Grid item xs={12} sm={6} md={4} >
                    <ChatBox/>
                </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseAssignment;
