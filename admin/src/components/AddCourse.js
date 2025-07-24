import {
  Container, TextField, Typography, Box, Button, Switch,
  FormControlLabel, Paper, Divider
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: '',
    category: '',
    duration: '',
    price: 0,
    oldPrice: 0,
    free: false,
    author: '',
    rating: 0,
    video: '',
    image: '',
    description: '',
    instructorId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['price', 'oldPrice', 'rating'];
    setCourse((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value
    }));
  };

  const handleSwitch = () => {
    setCourse((prev) => ({ ...prev, free: !prev.free }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/courses', course);
      console.log('Submitted:', response.data);
      alert('Course submitted successfully!');
      setCourse({
        title: '',
        category: '',
        duration: '',
        price: 0,
        oldPrice: 0,
        free: false,
        author: '',
        rating: 0,
        video: '',
        image: '',
        description: '',
        instructorId: ''
      });
    } catch (error) {
      console.error('Error submitting course:', error);
      alert('Failed to submit course.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Add New Course
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handleSubmit}>
          {[
            { name: 'title', label: 'Course Title', required: true },
            { name: 'category', label: 'Category', required: true },
            { name: 'duration', label: 'Duration (e.g., 5h 30m)', required: true },
            { name: 'price', label: 'Price', type: 'number', required: true },
            { name: 'oldPrice', label: 'Old Price', type: 'number' },
            { name: 'author', label: 'Author', required: true },
            {
              name: 'rating', label: 'Rating (e.g., 4.5)', type: 'number',
              required: true, inputProps: { step: '0.1', min: 0, max: 5 }
            },
            { name: 'video', label: 'Intro Video URL' },
            { name: 'image', label: 'Thumbnail Image URL', required: true },
            { name: 'description', label: 'Course Description', multiline: true, rows: 4 },
            { name: 'instructorId', label: 'Instructor ID', required: true }
          ].map((field) => (
            <TextField
              key={field.name}
              fullWidth
              margin="normal"
              {...field}
              value={course[field.name]}
              onChange={handleChange}
            />
          ))}

          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Switch checked={course.free} onChange={handleSwitch} />}
            label="Free Course"
          />

          <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }}>
            Submit Course
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
