// src/components/ChatBox.js
import React, { useState } from 'react';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  Button,
  Collapse
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Optionally, add a static bot reply
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Thanks for your message!", sender: "bot" }]);
      }, 500);
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {/* Floating Chat Button */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#1976d2', color: '#fff', p: 2, boxShadow: 3 }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chat Window */}
      <Collapse in={open}>
        <Paper sx={{ width: 300, height: 450, p: 2, boxShadow: 4, borderRadius: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              Assignment Help
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              height: 280,
              bgcolor: "#f9f9f9",
              p: 1,
              borderRadius: 2,
              mb: 1
            }}
          >
            {messages.map((msg, idx) => (
              <Typography
                key={idx}
                align={msg.sender === "user" ? "right" : "left"}
                sx={{
                  bgcolor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  mb: 1,
                  display: "inline-block",
                  maxWidth: "80%"
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          <TextField
            size="small"
            fullWidth
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            sx={{ mb: 1 }}
          />
          <Button
            onClick={handleSend}
            fullWidth
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Send
          </Button>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default ChatBox;
