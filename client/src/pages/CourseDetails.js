import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ReactPlayer from "react-player";
import { courses } from "../components/PerfectCourseSection";
import CourseReviews from "./CourseReviews";

const CourseDetails = () => {
   const navigate = useNavigate();
  const { id } = useParams();
  
   //const course = courses[parseInt(id)];
   const course = courses.find((item) => item.id === id);
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



   const handlePreviewClick = () => {
    navigate(`/CourseLesson/${id}`); 
  };
  if (!course) return <Typography>Course not found</Typography>;

  const InfoLine = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", py: 6, px: { xs: 2, md: 6 }, mt: 10 }} >
      <Grid   container
      justifyContent={"center"}
        spacing={4}
        direction={isMobile ? "column" : "row"}
        alignItems="flex-start" >
        {/* Left Section */}
        <Grid item xs={12} md={4} sx={{width:isMobile?"100%":"50%"}}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box
              component="img"
              src={course.image}
              alt={course.title}
              sx={{
                width: "100%",
                height: isMobile ? 200 : 300,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Typography  sx={{ mt: 1, textAlign:"end"}}>
             <b> Last Update</b>: {course.lastUpdated}
            </Typography>

            <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
              {course.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                mt: 2,
                gap: 2,
                justifyContent:"center"
              }}
            >
              <Typography variant="h6" color="green" fontWeight={600}>
                ${course.price}
              </Typography>
              <Typography
             
                sx={{ textDecoration: "line-through", color: "red" }}
              >
                ${course.oldPrice}
              </Typography>
              <Typography>
                {course.lessons} Lessons ⭐ {course.rating} ({course.reviews?.length})
              </Typography>
            </Box>

           
          </Paper>

            <Box sx={{ mt: 4 }}>
              <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                sx={{ mb: 2 }}
              >
                <Tab label="Curriculum" />
                <Tab label="Description" />
                <Tab label="Reviews" />
                <Tab label="Instructor" />
              </Tabs>

              {/* Tabs Content */}
              {tab === 0 && (
                <Box>
                  {course.curriculum?.map((section, index) => (
                    <Accordion
                      key={index}
                      defaultExpanded={index === 0}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        "&:before": { display: "none" },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ bgcolor: "#f9f9f9", borderRadius: "8px" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Typography fontWeight={600}>{section.section}</Typography>
                          <Chip
                            label={section.duration}
                            size="small"
                            color="default"
                            variant="outlined"
                          />
                        </Box>
                      </AccordionSummary>

                      <AccordionDetails>
                        <List disablePadding>
                          {section.items?.map((item, idx) => (
                            <ListItem
                              key={idx}
                              sx={{
                                pl: 2,
                                py: 1.5,
                                borderBottom: "1px solid #f0f0f0",
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: "32px" }}>
                                {item.type === "video" && <PlayCircleIcon color="primary" />}
                              </ListItemIcon>

                              <ListItemText
                                primary={
                                  <Typography fontSize={14} fontWeight={500}>
                                    {item.title}
                                  </Typography>
                                }
                              />

                              {item.duration && (
                                <Typography
                                  variant="caption"
                                  sx={{ mr: 2, color: "gray" }}
                                >
                                  ⏱ {item.duration}
                                </Typography>
                              )}

                              {item.preview && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="success"
                                  sx={{ mr: 1 }}
                                  startIcon={<VisibilityIcon />}
                                  onClick={handlePreviewClick}
                                >
                                  Preview
                                </Button>
                              )}

                              {item.locked && <LockIcon sx={{ color: "#999", ml: 1 }} />}
                              {item.questions && (
                                <Typography
                                  variant="caption"
                                  sx={{ ml: 2, color: "gray" }}
                                >
                                  📝 {item.questions} Ques
                                </Typography>
                              )}
                            </ListItem>
                          ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              {tab === 1 && (
              
                <Typography sx={{ textAlign: "justify", mt: 2 }}>
                  {course.description}
                </Typography>
                
              )}

              {tab === 2 && (
                <Box sx={{ mt: 2 }}>
                 <CourseReviews/>
                </Box>
              )}

              {tab === 3 && (
            

                   <Box sx={{ mt: 4 }}>
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 3,
      display: "flex",
      alignItems: "center",
      gap: 2,
      backgroundColor: "#f9f9f9",
    }}
  >
    <Avatar
      src={course.instructor?.avatar || "/default-avatar.png"}
      alt={course.instructor?.name}
      sx={{ width: 64, height: 64 }}
    />

    <Box>
      <Typography variant="h6" fontWeight={600} color="primary">
        {course.instructor?.name}
      </Typography>

      <Typography  sx={{ mt: 0.5, lineHeight: 1.6,fontWeight:"bold", fontSize:18}}>
        {course.instructor?.bio || "No bio available."}
      </Typography>
    </Box>
  </Paper>
</Box>

              )}
            </Box>
         

        </Grid>

        {/* Right Panel */}
        <Grid item xs={12} md={6} sx={{width:isMobile?"100%":"30%"}}>
          <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <ReactPlayer
                url={course.video}
                controls
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  
                   
                }}
              />
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography variant="h5" color="green" fontWeight={600}>
                ${course.price}
                <Typography
                  component="span"
                  sx={{ ml: 1, textDecoration: "line-through", color: "red" }}
                >
                  ${course.oldPrice}
                </Typography>
                <Chip
                  label="68% OFF"
                  color="error"
                  size="small"
                  sx={{ ml: 2, fontWeight: "bold" }}
                />
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Button fullWidth variant="contained" color="secondary" onClick={()=>navigate('/PaymentPage')}>
                  Enrolle
                </Button>
                {/* <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 1 }}
                >
                  Buy Now
                </Button> */}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <InfoLine label="Instructor" value="D. William" />
                <InfoLine label="Start Date" value="05 Dec 2024" />
                <InfoLine label="Total Duration" value="08 Hrs 32 Min" />
                <InfoLine label="Enrolled" value="100" />
                <InfoLine label="Lectures" value="30" />
                <InfoLine label="Skill Level" value="Basic" />
                <InfoLine label="Language" value="Spanish" />
                <InfoLine label="Quiz" value="Yes" />
                <InfoLine label="Certificate" value="Yes" />
              </Box>

              <Button
                fullWidth
                variant="outlined"
                color="info"
                sx={{ mt: 3 }}
                startIcon={"📞"}
              >
                +47 333 78 901
              </Button>
            </Box>
          </Paper>
        
        
               
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    📩 Get in Touch
                  </Typography>
                  <TextField label="Enter Name" fullWidth size="small" sx={{ mb: 2 }} />
                  <TextField label="Enter your mail" fullWidth size="small" sx={{ mb: 2 }} />
                  <TextField label="Message" fullWidth multiline rows={3} size="small" sx={{ mb: 2 }} />
                  <Button fullWidth variant="contained" color="primary">
                    SEND MESSAGE
                  </Button>
                </Paper>
              
      </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetails;