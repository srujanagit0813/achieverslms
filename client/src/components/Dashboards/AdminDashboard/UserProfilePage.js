import React from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import {
  Email,
  Phone,
  Person,
  CalendarMonth,
  LockReset,
  VpnKey,
  Edit,
} from "@mui/icons-material";

const profile = {
  registrationDate: "20, January 2024 9:00 PM",
  firstName: "Michle",
  lastName: "Obema",
  username: "obema007",
  email: "obema@example.com",
  phone: "+55 669 4456 25987",
  expert: "Graphics Design",
  biography:
    "Creative and detail-oriented graphic designer with 5+ years of experience. Passionate about delivering top-quality visual solutions for a variety of projects.",
};

function UserProfilePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: 900,
        }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Avatar */}
          <Avatar
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt={profile.firstName}
            sx={{
              width: 150,
              height: 150,
              border: "4px solid #1976d2",
              boxShadow: 4,
            }}
          />

          {/* Name & Role */}
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              @{profile.username}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight="500">
              {profile.expert}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<LockReset />}
            >
              Change Password
            </Button>
            <Button
              variant="outlined"
              color="success"
              startIcon={<VpnKey />}
            >
              Set Password
            </Button>
          </Stack>

          <Divider sx={{ width: "100%" }} />

          {/* Profile Details */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<CalendarMonth color="primary" />}
                label="Registered"
                value={profile.registrationDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<Person color="primary" />}
                label="Username"
                value={profile.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<Email color="primary" />}
                label="Email"
                value={profile.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DetailItem
                icon={<Phone color="primary" />}
                label="Phone"
                value={profile.phone}
              />
            </Grid>
          </Grid>

          <Divider sx={{ width: "100%" }} />

          {/* Biography */}
          <Box width="100%">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Biography
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.biography}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

// Reusable DetailItem component
const DetailItem = ({ icon, label, value }) => (
  <Box display="flex" alignItems="center" gap={1} mb={1}>
    {icon}
    <Typography variant="body1">
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

export default UserProfilePage;