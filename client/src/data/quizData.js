const quizData = {
  '1': {
    title: 'web development',
    lessons: [
      {
        id: 'lesson1',
        title: 'HTML Basics',
        quizzes: [
          {
            id: 'q1',
            label: ' Introduction ',
            questions: 5,
            duration: 1,
            marks: 25,
          },
          {
            id: 'q2',
            label: ' Tags ',
            questions: 5,
            duration: 10,
            marks: 25,
          },
           {
            id: 'q3',
            label: ' iframes ',
            questions: 15,
            duration: 20,
            marks: 30,
          },
          {
            id: 'q4',
            label: ' images ',
            questions: 25,
            duration: 30,
            marks: 45,
          },
           {
            id: 'q5',
            label: 'elements',
            questions: 5,
            duration: 10,
            marks: 25,
          },
          {
            id: 'q6',
            label: ' tables',
            questions: 5,
            duration: 10,
            marks: 25,
          }
        ]
      },
      {
        id: 'lesson2',
        title: 'HTML Advanced',
        quizzes: [
          {
            id: 'q7',
            label: 'Forms & Input Quiz',
            questions: 5,
            duration: 15,
            marks: 30,
          },
          {
            id: 'q8',
            label: 'Semantic Elements Quiz',
            questions: 6,
            duration: 12,
            marks: 28,
          }
        ]
      },
      {
        id: 'lesson3',
        title: 'CSS Basics',
        quizzes: [
          {
            id: 'q9',
            label: ' Selectors Quiz',
            questions: 5,
            duration: 10,
            marks: 25,
          },
          {
            id: 'q10',
            label: 'Colors & Fonts Quiz',
            questions: 5,
            duration: 10,
            marks: 25,
          }
        ]
      },
      {
        id: 'lesson4',
        title: 'CSS Advanced',
        quizzes: [
          {
            id: 'q11',
            label: 'Flexbox Quiz',
            questions: 6,
            duration: 15,
            marks: 30,
          },
          {
            id: 'q12',
            label: ' Grid Quiz',
            questions: 6,
            duration: 15,
            marks: 30,
          }
        ]
      }
    ]
  }
};

export default quizData;
