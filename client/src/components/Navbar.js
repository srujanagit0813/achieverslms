import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Typography,
  IconButton,
  Stack,
  Dialog,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  AccountCircle,
  Search as SearchIcon,
  WhatsApp as WhatsAppIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, NavLink } from 'react-router-dom';
import achievers from '../assets/logos/achievers.png';

const Navbar = () => {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed" color="inherit" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NavLink to="/Landingpage">
              <Box
                component="img"
                src={achievers}
                alt="Logo"
                sx={{ height: isMobile ? 40 : 60 }}
              />
            </NavLink>

            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f1f1f1',
                  borderRadius: 50,
                  px: 2,
                  py: 0.5,
                  width: isTablet ? 180 : 300,
                }}
              >
                <InputBase placeholder="Search Courses" fullWidth />
                <SearchIcon />
              </Box>
            )}
          </Box>

          {/* Actions */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={() => navigate('/profile-access')}
              >
                Sign In
              </Button>

              <Stack direction="row" spacing={1}>
                <WhatsAppIcon color="success" />
                <Box>
                  <Typography variant="body2">8886221222</Typography>
                  <Typography variant="caption">(8:00 AM - 8:00 PM)</Typography>
                </Box>
              </Stack>
            </Box>
          ) : (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile View */}
     <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
  <Box sx={{ width: 250, p: 2 }}>
    <List>
      <ListItem disablePadding>
        <Box sx={{ width: '100%', px: 2, py: 1 }}>
          <Button
         
            variant="contained"
                 size="small"
            color="success"
            onClick={() => {
              navigate('/profile-access');
              setDrawerOpen(false);
            }}
          >
            Sign In
          </Button>
         
        </Box>
      </ListItem>
    {/* 🔍 Search bar for mobile */}
      <ListItem>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f1f1',
            borderRadius: 50,
            px: 2,
            py: 0.5,
            width: '100%',
          }}
        >
          <InputBase placeholder="Search Courses" fullWidth />
          <SearchIcon />
        </Box>
      </ListItem>

      <ListItem>
        <WhatsAppIcon color="success" sx={{ mr: 1 }} />
        <Box>
          <Typography variant="body2">8886221222</Typography>
          <Typography variant="caption">(8:00 AM - 8:00 PM)</Typography>
        </Box>
      </ListItem>
    </List>
  </Box>
</Drawer>

    </>
  );
};

export default Navbar;
