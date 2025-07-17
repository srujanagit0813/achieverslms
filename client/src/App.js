import { Navigate, Route, Routes,  } from 'react-router-dom';
import './App.css';
import Landingpage from './components/Landingpage';
import Navbar from './components/Navbar';
import CourseDetails from './pages/CourseDetails';
import MaterialDetails from './pages/MaterialDetails';
import ProfileAccessPage from './pages/ProfileAccessPage';
import { useState } from 'react';
import CourseLesson from './pages/CourseLesson';

import ClassPage from './components/QuizzSection';
import HomePage from './pages/HomePage';
import PerfectCourseSection from './components/PerfectCourseSection';
import StartQuizPage from './pages/StartQuizPage';
import ContactUs from './components/ContactUs';
import { useLocation } from "react-router-dom";
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import QuizQuestions from './components/QuizQuestions';
import QuizResult from './components/QuizResult';

import DashboardPage from './components/Dashboards/AdminDashboard/DashboardPage'
import UserProfilePage from './components/Dashboards/AdminDashboard/UserProfilePage';
import ChatDashboard from './components/Dashboards/AdminDashboard/ChatDashboard'

import ReviewsPage from './components/Dashboards/AdminDashboard/ReviewsPage';
import MyCoursesPage from './components/Dashboards/AdminDashboard/MyCoursesPage';
import OrderHistoryPage from './components/Dashboards/AdminDashboard/OrderHistoryPage';
import QuizAttemptsPage from './components/Dashboards/AdminDashboard/QuizAttemptsPage';
import AnnouncementsPage from './components/Dashboards/AdminDashboard/announcements';
import CourseQuiz from './pages/CourseQuiz';
import CourseMaterial from './pages/CourseMaterial';
import CourseAssignment from './pages/CourseAssignment';


import StudentDashboardHome from "./components/Dashboards/StudentDashboard/StudentDashboardHome";
import StudentUserProfilePage from "./components/Dashboards/StudentDashboard/StudentUserProfilePage";
import StudentChatDashboard from "./components/Dashboards/StudentDashboard/StudentChatDashboard";
import StudentCourseDashboard from "./components/Dashboards/StudentDashboard/StudentDashboardSection";
import StudentReviewsPage from "./components/Dashboards/StudentDashboard/StudentReviewsPage";
import StudentQuizAttemptsPage from "./components/Dashboards/StudentDashboard/StudentQuizAttemptsPage";
import StudentOrderHistoryPage from "./components/Dashboards/StudentDashboard/StudentOrderHistoryPage";
import StudentAssignments from "./components/Dashboards/StudentDashboard/StudentAssignments";
import StudentEnrolledCourses from './components/Dashboards/StudentDashboard/StudentEnrolledCourses';
import StudentDashboardLayout from './components/Dashboards/StudentDashboard/StudentDashboardLayout';
import InstructorDashboardPage from './components/Dashboards/InstructorDashboard/InstructorDashboardPage';
import CoursesPage from './components/Dashboards/InstructorDashboard/CoursesPage';
import CreateCoursePage from './components/Dashboards/InstructorDashboard/CreateCoursePage';
import ManageAssignmentsPage from './components/Dashboards/InstructorDashboard/ManageAssignmentsPage';
import QuizManagementPage from './components/Dashboards/InstructorDashboard/QuizManagementPage';
import AnalyticsPage from './components/Dashboards/InstructorDashboard/AnalyticsPage';
import MessagesPage from './components/Dashboards/InstructorDashboard/MessagesPage';
import SubmissionsPage from './components/Dashboards/InstructorDashboard/SubmissionsPage';
import CourseDashboard from './components/Dashboards/AdminDashboard/CourseDashboard';
function App() {
  const hideNavbarRoutes = ["/login", "/signup", "/admin"];
   const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

 const hideNavbar = location.pathname === '/';
  
  return (
    <div className="App">
    
         {!hideNavbar && <Navbar />}
     
        <Routes>
           <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<Landingpage />} /> */}
        <Route path="/Landingpage" element={<Landingpage />} />
        <Route path="/profile-access" element={<ProfileAccessPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/course/:id" element={<CourseDetails />} />
         <Route path="/CourseLesson/:id" element={<CourseLesson />} />
          <Route path="/course/:id/quiz" element={<CourseQuiz />} />
       <Route path="/course/:id/material" element={<CourseMaterial />} />
      <Route path="/course/:id/assignment" element={<CourseAssignment />} /> 
        <Route path="/materials/:id" element={<MaterialDetails />} />
        <Route path='/class-page' element={<ClassPage/>}/>
        <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path='/start-quiz' element={<StartQuizPage/>}/>
        <Route path="/quiz-questions" element={<QuizQuestions />} />
            <Route path="/quiz-result" element={<QuizResult />} />
  <Route path="/view-all-courses" element={<PerfectCourseSection/>}/>
   <Route path="/PaymentPage" element={<PaymentPage/>}/>
   <Route path="/success" element={<SuccessPage/>}/>
       

          

<Route path="/Dashboard/*" element={<DashboardPage />}>
             <Route path="UserProfilePage" element={<UserProfilePage />} />
             <Route path="chat" element={<ChatDashboard />} />
             <Route path="wishlist" element={<CourseDashboard />} />
             <Route path="reviews" element={<ReviewsPage />} />
             <Route path="QuizAttemptPage" element={<QuizAttemptsPage />} />
             <Route path="OrderHistoryPage" element={<OrderHistoryPage />} />
             <Route path="MyCoursesPage" element={<MyCoursesPage />} />
             <Route path="AnnouncementsPage" element={<AnnouncementsPage />} />

             </Route>

             <Route path="/dashboard/student/*" element={<StudentDashboardLayout />}>
                   <Route index element={<StudentDashboardHome/>} /> {/* student default page */}
                       <Route path="UserProfilePage" element={<StudentUserProfilePage />} />
                       <Route path="chat" element={<StudentChatDashboard />} />
                      <Route path="StudentEnrolledCourses" element={<StudentEnrolledCourses />} />
                         <Route path="wishlist" element={<StudentCourseDashboard />} />
                        <Route path="reviews" element={<StudentReviewsPage />} />
                           <Route path="QuizAttemptPage" element={<StudentQuizAttemptsPage />} />
                         <Route path="OrderHistoryPage" element={<StudentOrderHistoryPage />} />
                        <Route path="assignments" element={<StudentAssignments />} />
          </Route>

          <Route path="/InstructorDashboard/*" element={<InstructorDashboardPage />}>
  <Route path="courses" element={<CoursesPage />} />
  <Route path="create-course" element={<CreateCoursePage />} />
  <Route path="manage-assignments" element={<ManageAssignmentsPage />} />
  <Route path="submissions" element={<SubmissionsPage />} />
  <Route path="quiz-management" element={<QuizManagementPage />} />
  <Route path="announcements" element={<AnnouncementsPage />} />
  <Route path="analytics" element={<AnalyticsPage />} />
  <Route path="messages" element={<MessagesPage />} />

        </Route>



       </Routes>
    </div>
  );
}

export default App;
