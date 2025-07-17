import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  useMediaQuery,
  useTheme,
  Slide,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CircleIcon from "@mui/icons-material/Circle";

const initialMessages = [
  { id: 1, sender: "Student", name: "John Doe", text: "I have a doubt regarding the assignment." },
  { id: 2, sender: "Student", name: "Alice Smith", text: "When will the next quiz be available?" },
  { id: 3, sender: "Student", name: "Michael Johnson", text: "Can you please share the class notes?" },
];

const MessagesPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = { id: messages.length + 1, sender: "Instructor", name: "Instructor", text: newMessage };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 4, display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="#6a1b9a">
        Instructor Messages 💬
      </Typography>

      {/* Chat Box */}
      <Paper
        sx={{
          flexGrow: 1,
          p: 2,
          mb: 2,
          bgcolor: "#f0f4ff",
          borderRadius: 4,
          overflowY: "auto",
          maxHeight: "70vh",
          border: "2px solid #e0e0e0",
        }}
      >
        {messages.map((msg, index) => (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit key={msg.id}>
            <Box
              sx={{
                display: "flex",
                justifyContent: msg.sender === "Instructor" ? "flex-end" : "flex-start",
                mb: 3,
              }}
            >
              {msg.sender !== "Instructor" && (
                <Box display="flex" alignItems="center" mr={2}>
                  <Avatar sx={{ bgcolor: "#ff7043" }}>{msg.name.charAt(0)}</Avatar>
                  <CircleIcon sx={{ color: "#00e676", fontSize: 14, ml: -1.5, animation: "pulse 1.5s infinite" }} />
                </Box>
              )}

              <Box
                sx={{
                  background: msg.sender === "Instructor"
                    ? "linear-gradient(135deg, #6a1b9a, #8e24aa)"
                    : "linear-gradient(135deg, #42a5f5, #478ed1)",
                  color: "white",
                  p: 2,
                  borderRadius: msg.sender === "Instructor" ? "16px 0px 16px 16px" : "0px 16px 16px 16px",
                  maxWidth: "60%",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" mb={0.5}>
                  {msg.name}
                </Typography>
                <Typography variant="body1">{msg.text}</Typography>
              </Box>

              {msg.sender === "Instructor" && (
                <Box display="flex" alignItems="center" ml={2}>
                  <Avatar sx={{ bgcolor: "#6a1b9a" }}>I</Avatar>
                  <CircleIcon sx={{ color: "#00e676", fontSize: 14, ml: -1.5, animation: "pulse 1.5s infinite" }} />
                </Box>
              )}
            </Box>
          </Slide>
        ))}
        <div ref={chatEndRef} />
      </Paper>

      {/* Input Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#6a1b9a",
            "&:hover": { bgcolor: "#8e24aa" },
            minWidth: isMobile ? "100%" : "150px",
            height: isMobile ? "auto" : "56px",
          }}
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>

      {/* Pulse Animation Keyframe */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default MessagesPage;