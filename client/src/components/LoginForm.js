import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleToggleLoginMethod = () => {
    setUseOtp(!useOtp);
    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let res;
      if (useOtp) {
        res = await axios.post("http://localhost:5000/users/login/otp", {
          email,
           otp,
        });
      } else {
        res = await axios.post("http://localhost:5000/users/login", {
          email,
          password,
        });
      }

      setMessage(res.data.message || "Login successful");
      
      if (onLoginSuccess) onLoginSuccess();  
      navigate("/Landingpage");

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users/send-otp", {
        email,
      });
      setMessage(res.data.message || "OTP sent to your email!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        mx: "auto",
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Login
      </Typography>

      <Typography variant="body1" align="center" color="text.secondary" mb={3}>
        Don&apos;t have an account?{" "}
        <Link component={RouterLink} to="/signup">
          Sign up
        </Link>
      </Typography>

      {message && (
        <Typography align="center" color="primary" mb={2}>
          {message}
        </Typography>
      )}

      <Box component="form" onSubmit={handleLogin}>
       
        <TextField
          label="Email"
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

       
        {!useOtp ? (
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <>
            <TextField
              label="OTP"
              placeholder="Enter the OTP"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={handleSendOtp}
              size="small"
              sx={{ mt: 1, mb: 2 }}
              variant="outlined"
            >
              Send OTP
            </Button>
          </>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
            }
            label="Remember me"
          />
          <Link component={RouterLink} to="/forgot-password">
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
          {useOtp ? "Login with OTP" : "Login with Password"}
        </Button>

        <Button
          fullWidth
          onClick={handleToggleLoginMethod}
          sx={{ mt: 2 }}
          color="secondary"
        >
          {useOtp ? "Switch to Password Login" : "Use OTP Login Instead"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
