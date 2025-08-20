import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './pages/AdminLayout';
import Dashboard from './pages/Dashboard';
import CourseForm from './components/CourseForm';
import AssignmentForm from './components/AssignmentForm';
import CreateQuizWithQuestionsForm from './components/QuizForm';
import MaterialForm from './components/MaterialForm';
import InstructorForm from './components/InstructorForm';
import LessonContentForm from './components/LessonsForm';
import QuizQuestionForm from './components/QuizQuestionForm';
import LessonContent from './components/LessonContent';
import CategoryForm from './components/CategoryForm';
import CurriculumItemManager from './components/CurriculumItemManager';
import CurriculumManager from './components/CurriculumManager';
import TrendingExamAdmin from './components/TrendingExamAdmin';
import AnimatedVideoAdmin from './components/AnimatedVideoAdmin';
import SubjectAdmin from './components/SubjectAdmin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='CurriculumItemManager' element={<CurriculumItemManager />} />
          <Route path='curriculummanager' element={<CurriculumManager />} />
          <Route path="create-course" element={<CourseForm />} />
          <Route path="assignments" element={<AssignmentForm />} />
          <Route path="quizform" element={<CreateQuizWithQuestionsForm />} />
          <Route path="materialform" element={<MaterialForm />} />
          <Route path="instructorform" element={<InstructorForm />} />
          <Route path="lessonform" element={<LessonContentForm />} />
          <Route path="lessoncontent" element={<LessonContent/>} />

          <Route path="quizquestionform" element={<QuizQuestionForm />} />

          <Route path="categoryform" element={<CategoryForm />} />

            <Route path="trendingexams" element={<TrendingExamAdmin />} />
          <Route path="animatedvideo" element={<AnimatedVideoAdmin/>} />
          <Route path="subjectadmin" element={<SubjectAdmin/>} />




        </Route>
      </Routes>
    </Router>
  );
}

export default App;