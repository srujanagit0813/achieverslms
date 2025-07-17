import React,{ useRef } from "react";
import { Box, Tabs, Tab, Button, Typography, Paper, Divider, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { trendingExams } from "./TrendingExams";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PerfectCourseSection from "./PerfectCourseSection";
import TestSeriesPage from '../pages/TestSeriesPage';


function getPastDates(count = 6) {
  const dates = [];

  for (let i = 0; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString()); // Format to your preference
  }
  return dates;
}

function ClassPage() {
  
  const location = useLocation();
  const { examTitle } = location.state || {};
const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));    // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));     //

  const [tab, setTab] = React.useState(0);
  const handleChange = (event, newValue) => setTab(newValue);

  // find the matching class by title
  const matchingClass = trendingExams?.find(item => item.title === examTitle);
  const pastDates = getPastDates(6);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ p: 4 ,mt:10}}>
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 4 }}
      >
        
        <Tab label="Quizzes" />
        <Tab label="Videos" />
        <Tab label="Test Series" />
      </Tabs>

      {/* Container with light blue background */}
      <Box sx={{ p: 4, position:'relative' }}>
        {/* <Typography variant="h5" align="center" color="primary" mb={2}>
          {examTitle}
        </Typography> */}

        {/* Content Panels */}
       

        {tab === 0 && matchingClass && (
          <Box sx={{ mb: 4, position:'relative' ,ml:isMobile? 0:"5%",mr:isMobile?0:"5%"}}>
            {/* Heading Section (above cards) */}
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'40px', mb:'25px' }}>
              <Typography variant="h3" color="black">
                Quizzes
              </Typography>
              <Button variant="contained" color="success" size="small">
                Free
              </Button>
            </Box>

            <Typography variant="h5" sx={{ textAlign:'center', mb:'10px' }}>
              DAILY UPDATED FREE QUIZZES FOR PRACTICE
            </Typography>

            {/* Left arrow button */}
            <IconButton 
              onClick={scrollLeft} 
              sx={{ 
                position:'absolute', 
                left:'-35px', 
                top:'55%', 
                transform:'translateY(-50%)',
                background:'green',
                boxShadow:'0 0 5px #0003',
                color:'white',
                zIndex:'100'
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Cards Section */}
            <Box
              ref={scrollRef}
              sx={{ 
                display:'flex',
                gap:'20px',
                overflowX:'hidden',
                py:'10px',
                scrollBehavior:'smooth'
              }}
            >
              {pastDates?.map((date, index) => (
                <Paper
                   key={index}
                   elevation={3}
                   sx={{ p: 4, minWidth:'250px', textAlign:'center', transition:'0.3s',
                         "&:hover": { transform:'translateY(-5px)' } }}
                 >

                   {/* Title */}
                   <Typography variant="h6" color="primary" mb={2}>
                     {matchingClass.title}
                   </Typography>

                   {/* Quiz details */}
                   <Box sx={{ textAlign:'left', mb: 3 }}>
                      <Typography>Date: {date}</Typography>
                      <Divider sx={{ my:'8px'}}/>

                      <Typography>Questions: 20</Typography>
                      <Divider sx={{ my:'8px'}}/>

                      <Typography>Marks: 100</Typography>
                      <Divider sx={{ my:'8px'}}/>

                      <Typography>Duration (minutes): 30</Typography>
                   </Box>

                   {/* Start button */}
                   <Button
                     variant="contained"
                     color="success"
                     onClick={() => {
                          navigate('/start-quiz', { state: { examTitle: matchingClass.title, date } });

                     }}
                   >
                     Start Quiz
                   </Button>
                 </Paper>
               ))}
            </Box>

            {/* Right arrow button */}
            <IconButton 
              onClick={scrollRight} 
              sx={{ 
                position:'absolute', 
                right:'-35px', 
                top:'55%', 
                transform:'translateY(-50%)',
                background:'green',
                boxShadow:'0 0 5px #0003',
                color:'white',
                zIndex:'100'
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        )}


           {tab === 1 && (
          <Box>
            
              
              <PerfectCourseSection/>
          
            {/* Display video components here */}
          </Box>
        )}
        {tab === 2 && (
          <Box>
           <TestSeriesPage/>
            {/* Display test series components here */}
          </Box>
        )}

      </Box>
    </Box>
  )
}

export default ClassPage;