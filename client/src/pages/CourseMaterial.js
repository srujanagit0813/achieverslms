import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import materialData from "../data/materialData";

const CourseMaterial = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const course = materialData[id];
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
          No materials available for this course.
        </Typography>
      </Box>
    );
  }

  const selectedLesson = course.lessons.find(
    (lesson) => lesson.id === selectedLessonId
  );

  return (
    <Box sx={{ mt: 12, px: isMobile ? 2 : 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          data-aos="fade-up"
          gutterBottom
          sx={{
            fontSize: isMobile ? "1.5rem" : "2rem",

            textAlign: isMobile ? "center" : "center",
          }}
        >
          {course.title} – Materials
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

      <Box sx={{ display: "flex", gap: 3, minHeight: "80vh", flexDirection: isResponsive ? "column" : "row", }}>
        {/* Left Panel */}
        <Box
          sx={{
             width: isResponsive ? "90%" : "20%",
            bgcolor: "linear-gradient(to bottom, #f9f9ff, #eef3f8)",
           p:isMobile? 2: 3,
            borderRadius: 4,
            border: "1px solid #dce3f0",
            boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
            height: "fit-content",
            transition: "all 0.3s ease-in-out",
             mt: 5,
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
            📚 Lessons
          </Typography>
          <List sx={{ maxHeight: "65vh", overflowY: "auto" }}>
            {course.lessons.map((lesson) => {
              const isSelected = lesson.id === selectedLessonId;
              return (
                <ListItem key={lesson.id} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    selected={lesson.id === selectedLessonId}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      py: 1.5,
                      transition: "all 0.3s ease",

                      color: isSelected ? "#black" : "#333",
                      fontWeight: 600,
                    }}
                  >
                    <ListItemText
                      primary={`📂 ${lesson.title}`}
                      primaryTypographyProps={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Right Panel */}
        <Box sx={{ width: isMobile ? "100%" : "75%", ml: isMobile ? 0 : 5 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            textAlign={"justify"}
            sx={{
              fontSize: isMobile ? "1.5rem" : "1.7rem",
              ml: isMobile ? 0 : 5,
               mt: isMobile ? 2 : 0,
              textAlign: isMobile ? "center" : "justify",
            }}
          >
            {selectedLesson?.title} – Available Materials
          </Typography>
          <Grid container spacing={8}>
            {selectedLesson?.materials?.length > 0 ? (
              selectedLesson.materials.map((mat) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={mat.id}>
                  <Paper
                    elevation={6}
                    sx={{
                      width: "100%",

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
                    <Typography variant="body1" color="primary" mb={1}>
                      {mat.label}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography variant="body1" mb={2} textAlign={"justify"}>
                      💾 size: {mat.size}
                    </Typography>
                    <Typography variant="body1" mb={2} textAlign={"justify"}>
                      📄 Pages: {mat.pages}
                    </Typography>
                    <Typography variant="body1" mb={2} textAlign={"justify"}>
                      👤 author: {mat.author}
                    </Typography>

                    {/* <Typography variant="body1" mb={2} textAlign={"justify"} >
                           📝description: {mat.description}
                        </Typography> */}

                    <Box
                      mt={2}
                      sx={{
                        // display: 'flex',
                        // flexDirection: isMobile ? 'column' : 'row',

                        p: 2,
                        borderRadius: 3,
                      }}
                    >
                      <Button
                        variant="outlined"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#0288d1",
                          borderColor: "#0288d1",
                          fontWeight: "bold",
                          px: 3,
                          py: 1,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#e1f5fe",
                            borderColor: "#0288d1",
                          },
                          width: isMobile ? "100%" : "auto",
                        }}
                      >
                        🔗 Open
                      </Button>
                      <br />

                      <Button
                        variant="contained"
                        color="secondary"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontWeight: "bold",
                          px: 3,
                          py: 1,
                          textTransform: "none",
                          width: isMobile ? "100%" : "auto",
                          mt: 3,
                          backgroundColor: "green",
                        }}
                      >
                        ⬇️ Download
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No materials available for this lesson.</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseMaterial;
