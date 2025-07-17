import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  IconButton,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import TopbarPage from './TopbarPage';
import Sidebar from './Sidebar';

const messages = [
  { name: 'Rex Allen', text: 'Hey, How are you?', time: '12 min' },
  { name: 'Julia Jhones', text: 'Are you free tomorrow?', time: '9 min' },
  { name: 'Anderson', text: 'Let’s catch up!', time: '1 hr' },
  { name: 'Rex Allen', text: 'Hey, How are you?', time: '12 min' },
  { name: 'Julia Jhones', text: 'Are you free tomorrow?', time: '9 min' },
  { name: 'Anderson', text: 'Let’s catch up!', time: '1 hr' },
  { name: 'Rex Allen', text: 'Hey, How are you?', time: '12 min' },
  { name: 'Julia Jhones', text: 'Are you free tomorrow?', time: '9 min' },
  { name: 'Anderson', text: 'Let’s catch up!', time: '1 hr' },
];

const chatHistory = [
  { name: 'Bradshaw', msg: 'Dolor sit amet consectetur', time: '5:03 PM', position: 'left' },
  { name: 'Julia Jhones', msg: 'Lorem ipsum dolor sit amet consectetur adipisicing sed.', time: '4:40 PM', position: 'right' },
  { name: 'Julia Jhones', msg: 'Dolor sit amet consectetur', time: '4:42 PM', position: 'right' },
  { name: 'Bradshaw', msg: 'Lorem ipsum dolor sit amet consectetur adipisicing sed.', time: '4:32 PM', position: 'left' },
  { name: 'Bradshaw', msg: 'Dolor sit amet consectetur', time: '4:30 PM', position: 'left' },
];

export default function ChatDashboard() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', py: 4, px: { xs: 2, md: 6 } }}>
     
      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Messages List */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, height: '100%', borderRadius: '16px', maxHeight: 600, overflowY: 'auto' }}
          >
            <Typography variant="h6" fontWeight="bold" color="#3f51b5" mb={2}>
              Messages
            </Typography>
            <List>
              {messages.map((msg, idx) => (
                <ListItem
                  button
                  key={idx}
                  sx={{
                    borderRadius: '12px',
                    mb: 1,
                    '&:hover': { bgcolor: 'rgba(63, 81, 181, 0.1)' },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src='{https://i.pravatar.cc/15${idx}}' />
                  </ListItemAvatar>
                  <ListItemText primary={msg.name} secondary={msg.text} />
                  <Typography variant="caption" color="text.secondary">
                    {msg.time}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Section */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
            }}
          >
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                bgcolor: 'rgba(63, 81, 181, 0.1)',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Avatar src="https://i.pravatar.cc/302" sx={{ mr: 2 }} />
              <Box flexGrow={1}>
                <Typography fontWeight="bold">Bradshaw</Typography>
                <Typography variant="body2" color="text.secondary">
                  Stay at home, Stay safe
                </Typography>
              </Box>
              <IconButton color="primary">
                <VideoCallIcon />
              </IconButton>
              <IconButton color="primary">
                <CallIcon />
              </IconButton>
              <IconButton color="primary">
                <ChatIcon />
              </IconButton>
            </Box>

            {/* Chat Body */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                overflowY: 'auto',
                bgcolor: '#fafafa',
              }}
            >
              {chatHistory.map((chat, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    justifyContent:
                      chat.position === 'right' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 2,
                      borderRadius: '16px',
                      bgcolor: chat.position === 'right' ? '#3f51b5' : '#e3e7ef',
                      color: chat.position === 'right' ? '#fff' : '#000',
                    }}
                  >
                    <Typography>{chat.msg}</Typography>
                    <Typography
                      variant="caption"
                      color={chat.position === 'right' ? 'rgba(255,255,255,0.7)' : 'text.secondary'}
                      sx={{ display: 'block', mt: 1 }}
                    >
                      {chat.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Chat Input */}
            <Box
              sx={{
                p: 2,
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                placeholder="Type a message…"
                variant="outlined"
                size="small"
                sx={{ mr: 2 }}
              />
              <IconButton color="primary">
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}