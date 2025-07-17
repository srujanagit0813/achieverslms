import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

const SignUpForm = () => {
  const [fullName, setFullName] = useState(''); // Correctly inferred as a string
  const [email, setEmail] = useState(''); // Correctly inferred as a string
  const [studentPhone, setStudentPhone] = useState(''); // Correctly inferred as a string
  const [parentPhone, setParentPhone] = useState(''); // Correctly inferred as a string
  const [password, setPassword] = useState(''); // Correctly inferred as a string
  const [confirmPassword, setConfirmPassword] = useState(''); // Correctly inferred as a string
  const [role, setRole] = useState('student'); // Correctly inferred as a string
  const [error, setError] = useState(''); // Correctly inferred as a string
const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const handleTogglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

const handleToggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword((prev) => !prev);
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, studentPhone, parentPhone, password, confirmPassword, role }),
      });

      if (!response.ok) {
        throw new Error('Failed to create an account');
      }

     navigate('/login'); // Redirect to login page after successful sign-up
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 550,
        mx: "auto",
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>

        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
              autoComplete="off"       // <-- Add this line

          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <TextField
            label="Student Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
            type="text"
            required
          />

          <TextField
            label="Parent Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            type="text"
            required
          />
<TextField
  label="Password"
  variant="outlined"
  fullWidth
  margin="normal"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  type={showPassword ? 'text' : 'password'}
  required
  autoComplete='new-password'
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

<TextField
  label="Confirm Password"
  variant="outlined"
  fullWidth
  margin="normal"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  type={showConfirmPassword ? 'text' : 'password'}
  required
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

          
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </>
  );
};

export default SignUpForm;