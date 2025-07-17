import React from 'react'
import AnimatedVideoSlider from './AnimatedVideoSlider'
import MaterialCoursesSection from './MaterialCoursesSection'
import PerfectCourseSection from './PerfectCourseSection'
import PopularSubjects from './PopularSubjects'
import TrendingExams from './TrendingExams'
import Navbar from './Navbar'





const Landingpage = () => {
  return (
    <div>
      
      <AnimatedVideoSlider/>
      <PopularSubjects/>
      <TrendingExams/>
      <PerfectCourseSection/>
      <MaterialCoursesSection/>
      
      
     

    </div>
  )
}

export default Landingpage
