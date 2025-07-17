import React from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Email,
  Phone,
  Person,
  CalendarMonth,
  LockReset,
  VpnKey,
  Edit,
  MenuBook,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

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

function StudentUserProfilePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        bgcolor: "#f0f4f8",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: { xs: 2, sm: 4 },
        mt:2
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: 900,
          mt: 2,
        }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Avatar */}
          <Avatar
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt={profile.firstName}
            sx={{
              width: { xs: 120, sm: 150 },
              height: { xs: 120, sm: 150 },
              border: "4px solid #1976d2",
              boxShadow: 4,
            }}
          />

          {/* Name */}
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {profile.firstName} {profile.lastName}
            </Typography>
          </Box>

          <Divider sx={{ width: "100%" }} />

          {/* Profile Details */}
          <Stack spacing={4} width="100%">
            <DetailItem
              icon={<CalendarMonth color="primary" />}
              label="Registered"
              value={profile.registrationDate}
              valueFontSize={{ xs: "1rem", sm: "1.3rem" }}
            />
            <DetailItem
              icon={<Person color="primary" />}
              label="Username"
              value={profile.username}
              valueFontSize={{ xs: "1rem", sm: "1.3rem" }}
            />
            <DetailItem
              icon={<Email color="primary" />}
              label="Email"
              value={profile.email}
              valueFontSize={{ xs: "1rem", sm: "1.3rem" }}
            />
            <DetailItem
              icon={<Phone color="primary" />}
              label="Phone"
              value={profile.phone}
              valueFontSize={{ xs: "1rem", sm: "1.3rem" }}
            />
            <DetailItem
              icon={<MenuBook color="primary" />}
              label="Biography"
              value={profile.biography}
              valueFontSize={{ xs: "1rem", sm: "1.3rem" }}
            />

            {/* Action Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                fullWidth={isMobile}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<LockReset />}
                fullWidth={isMobile}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                color="success"
                startIcon={<VpnKey />}
                fullWidth={isMobile}
              >
                Set Password
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

// Reusable DetailItem component with responsive font size
const DetailItem = ({ icon, label, value, valueFontSize = "1rem" }) => (
  <Box display="flex" alignItems="flex-start" gap={1}>
    <Box sx={{ mt: 0.5 }}>{icon}</Box>
    <Typography
      variant="body1"
      sx={{ fontSize: valueFontSize, wordBreak: "break-word" }}
    >
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

export default StudentUserProfilePage;