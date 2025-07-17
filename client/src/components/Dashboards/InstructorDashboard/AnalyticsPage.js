import React from 'react';
import {
  Box, Typography, Paper
} from '@mui/material';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from 'recharts';

const pieData = [
  { name: 'Completed Quizzes', value: 500 },
  { name: 'Pending Quizzes', value: 200 },
];

const barData = [
  { name: 'Math', submissions: 20 },
  { name: 'Science', submissions: 15 },
  { name: 'History', submissions: 10 },
  { name: 'English', submissions: 12 },
];

const lineData = [
  { date: 'June 15', logins: 35 },
  { date: 'June 16', logins: 50 },
  { date: 'June 17', logins: 45 },
  { date: 'June 18', logins: 70 },
  { date: 'June 19', logins: 65 },
];

const COLORS = ['#00C49F', '#FFBB28'];

const AnalyticsPage = () => {
  return (
    <Box p={4} sx={{ maxWidth: '1600px', margin: 'auto' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={6}
        textAlign="center"
        color="#2e3c62"
      >
        📊 Analytics Dashboard
      </Typography>

      {/* Pie Chart */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: '16px', mb: 6 }}>
        <Typography variant="h5" textAlign="center" mb={4} color="#4a148c">
          Quiz Participation
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={180}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}} fill={COLORS[index % COLORS.length]`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      {/* Bar Chart */}
      {/* Bar Chart */}
<Paper elevation={4} sx={{ p: 4, borderRadius: '16px', mb: 6 }}>
  <Typography variant="h5" textAlign="center" mb={4} color="#4a148c">
    Assignment Submissions
  </Typography>
  <ResponsiveContainer width="100%" height={500}>
    
    <BarChart data={barData} barCategoryGap="15%" barGap={5}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="bottom" />
      <Bar 
        dataKey="submissions" 
        fill="#4caf50" 
        radius={[10, 10, 0, 0]} 
        barSize={60} // Increased thickness
      />
    </BarChart>
  </ResponsiveContainer>
</Paper>

      {/* Line Chart */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: '16px', mb: 6 }}>
        <Typography variant="h5" textAlign="center" mb={4} color="#4a148c">
          Daily Logins
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="bottom" />
            <Line type="monotone" dataKey="logins" stroke="#1976d2" strokeWidth={4} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;