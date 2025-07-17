import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemIcon, ListItemText, Paper,
  useTheme, useMediaQuery, Divider, Grid
} from '@mui/material';
import {
  ExpandMore, OndemandVideo, Description, Quiz, Assignment
} from '@mui/icons-material';
import ReactPlayer from 'react-player';
import { courses } from '../components/PerfectCourseSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import coursedata from '../data/coursedata';

const CourseLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((item) => item.id === id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedVideo, setSelectedVideo] = useState(course?.video || '');
  const [expandedLessonId, setExpandedLessonId] = useState(
    coursedata.length > 0 ? coursedata[0].id : null
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!course) return <Typography sx={{ mt: 10 }}>Course not found</Typography>;

  const handlePreview = (url) => {
    setSelectedVideo(url);
  };

  const handleNavigate = (type) => {
    if (type === 'material') navigate(`/course/${id}/material`);
    else if (type === 'quiz') navigate(`/course/${id}/quiz`);
    else if (type === 'assignment') navigate(`/course/${id}/assignment`);
  };

  const iconMap = {
    video: <OndemandVideo color="primary" />,
    material: <Description color="info" />,
    quiz: <Quiz color="secondary" />,
    assignment: <Assignment color="warning" />,
  };

  return (
    <Box sx={{ mt: 15, p: { xs: 2, md: 4 }, background: '#f9f9f9', minHeight: '100vh' }} data-aos="fade-up">
      <Typography variant="h4" fontWeight={600} sx={{ mb: 4, textAlign: 'center' }}>
        🎬 {course.title} - Lessons
      </Typography>

      <Grid container spacing={10} ml={isMobile ? 0 : 15} data-aos="fade-up">
        {/* Left: Lesson List */}
        <Grid item md={6} sx={{ width: isMobile ? "100%" : "25%" }}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📚 Course Lessons
            </Typography>

            {coursedata.map((lesson) => (
              <Accordion
                key={lesson.id}
                expanded={expandedLessonId === lesson.id}
                onChange={() =>
                  setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)
                }
                sx={{ mb: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>{lesson.title}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <List>
                    {lesson.contents.map((content, idx) => (
                      <ListItem
                        button
                        key={idx}
                        onClick={() =>
                          content.type === 'video'
                            ? handlePreview(content.url)
                            : handleNavigate(content.type)
                        }
                        sx={{
                          backgroundColor:
                            content.url === selectedVideo ? '#e3f2fd' : 'transparent',
                          borderRadius: 1,
                          mb: 1,
                        }}
                      >
                        <ListItemIcon>{iconMap[content.type]}</ListItemIcon>
                        <ListItemText
                          primary={content.label}
                          secondary={content.duration ? `${content.duration}` : ''}
                        />
                      </ListItem>
                    ))}
                    {lesson.contents.length === 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        No content available.
                      </Typography>
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>

        {/* Right: Video Preview */}
        <Grid item md={5} sx={{ width: isMobile ? "100%" : "60%", mt: isMobile ? 2 : 1 }}>
          <Paper
            elevation={4}
            sx={{
              flex: 1,
              borderRadius: 3,
              overflow: 'hidden',
              minHeight: 400,
              background: '#000',
              position: 'relative',
            }}
          >
            <Box sx={{ p: 2, background: '#673ab7' }}>
              <Typography variant="h6" color="white">
                🎥 Video Preview
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
              <ReactPlayer
                url={selectedVideo}
                controls
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="white">
                Now Playing: {selectedVideo ? selectedVideo.split('v=')[1] : 'N/A'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseLesson;
