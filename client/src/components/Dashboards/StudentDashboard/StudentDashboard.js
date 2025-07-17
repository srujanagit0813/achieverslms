import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  Paper,
  useTheme,
  FormControl,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#6A0DAD", "#7D3C98", "#8E44AD"];

const lineChartData = {
  Today: [
    { label: "8AM", value: 30 },
    { label: "10AM", value: 60 },
    { label: "12PM", value: 45 },
    { label: "2PM", value: 80 },
    { label: "4PM", value: 100 },
    { label: "6PM", value: 75 },
  ],
  Weekly: [
    { label: "Mon", value: 120 },
    { label: "Tue", value: 180 },
    { label: "Wed", value: 140 },
    { label: "Thu", value: 200 },
    { label: "Fri", value: 160 },
    { label: "Sat", value: 190 },
    { label: "Sun", value: 170 },
  ],
  Monthly: [
    { label: "Week 1", value: 500 },
    { label: "Week 2", value: 750 },
    { label: "Week 3", value: 600 },
    { label: "Week 4", value: 900 },
  ],
  Yearly: [
    { label: "Jan", value: 150 },
    { label: "Feb", value: 100 },
    { label: "Mar", value: 205 },
    { label: "Apr", value: 110 },
    { label: "May", value: 160 },
    { label: "Jun", value: 145 },
    { label: "Jul", value: 175 },
    { label: "Aug", value: 155 },
    { label: "Sep", value: 148 },
    { label: "Oct", value: 220 },
    { label: "Nov", value: 180 },
    { label: "Dec", value: 245 },
  ],
};

const pieChartData = {
  Today: [
    { name: "Direct", value: 40 },
    { name: "Referral", value: 20 },
    { name: "Organic", value: 40 },
  ],
  Weekly: [
    { name: "Direct", value: 30 },
    { name: "Referral", value: 40 },
    { name: "Organic", value: 30 },
  ],
  Monthly: [
    { name: "Direct", value: 25 },
    { name: "Referral", value: 25 },
    { name: "Organic", value: 50 },
  ],
  Yearly: [
    { name: "Direct", value: 20 },
    { name: "Referral", value: 35 },
    { name: "Organic", value: 45 },
  ],
};

const StudentDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("Today");
  const theme = useTheme();

  return (
    <Box p={2} sx={{marginLeft:"-28px",width:"100%",height:"30px"}}>
      <Paper elevation={3} sx={{ borderRadius: 4, p: 3 }}>
        <Grid container spacing={3}>
          {/* Line Chart */}
          <Grid item xs={12} md={8}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h6" fontWeight="bold">Dashboard</Typography>
              <FormControl size="small">
                <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                  <MenuItem value="Today">Today</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="101%" height={200}>
              <LineChart data={lineChartData[timeFilter]}>
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6A0DAD"
                  strokeWidth={3}
                  dot={{ fill: "#6A0DAD", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          {/* Doughnut Chart */}
          {/* <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="space-between" alignItems="right" mb={2}>
              <Typography variant="h6" fontWeight="bold">Traffic</Typography>
              <FormControl size="small">
                <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                  <MenuItem value="Today">Today</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="101%" height={400}>
              <PieChart>
                <Pie
                  data={pieChartData[timeFilter]}
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieChartData[timeFilter].map((entry, index) => (
                    <Cell key={cell-${index}} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="middle" align="center" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </Grid> */}
        </Grid>
      </Paper>
    </Box>
  );
};

export default StudentDashboard;