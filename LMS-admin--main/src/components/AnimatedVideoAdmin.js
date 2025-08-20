import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Grid,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const AnimatedVideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/animated-videos");
      setVideos(res.data);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit (Add or Update)
  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.subtitle.trim() || !formData.buttonText.trim() || !formData.image.trim()) {
      setAlert({ open: true, message: "Please fill all fields", severity: "error" });
      return;
    }

    try {
      if (editId) {
        // Update
        await axios.patch(`http://localhost:5000/animated-videos/${editId}, formData`);
        setAlert({ open: true, message: "Video Updated Successfully!", severity: "success" });
      } else {
        // Create
        await axios.post("http://localhost:5000/animated-videos", formData);
        setAlert({ open: true, message: "Video Added Successfully!", severity: "success" });
      }
      setOpen(false);
      setFormData({ title: "", subtitle: "", buttonText: "", image: "" });
      setEditId(null);
      fetchVideos();
    } catch (error) {
      console.error("Error saving video", error);
      setAlert({ open: true, message: "Error saving video", severity: "error" });
    }
  };

  // Handle edit
  const handleEdit = (video) => {
    setEditId(video.id);
    setFormData({
      title: video.title,
      subtitle: video.subtitle,
      buttonText: video.buttonText,
      image: video.image,
    });
    setOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5000/animated-videos/${id}`);
      setAlert({ open: true, message: "Video Deleted Successfully!", severity: "success" });
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video", error);
      setAlert({ open: true, message: "Error deleting video", severity: "error" });
    }
  };

  return (
    <Box p={3} sx={{mt:5}}>
      {/* Heading */}
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Animated Videos Masterdata
      </Typography>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditId(null);
          setFormData({ title: "", subtitle: "", buttonText: "", image: "" });
          setOpen(true);
        }}
      >
        Add Video
      </Button>

      {/* Table */}
      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Subtitle</b></TableCell>
                <TableCell><b>Button Text</b></TableCell>
                <TableCell><b>Image</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>{video.subtitle}</TableCell>
                    <TableCell>{video.buttonText}</TableCell>
                    <TableCell>
                      <img
                        src={video.image}
                        alt={video.title}
                        width="80"
                        height="50"
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(video)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(video.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No videos found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Edit Animated Video" : "Add Animated Video"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Button Text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Image URL" name="image" value={formData.image} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AnimatedVideoAdmin;