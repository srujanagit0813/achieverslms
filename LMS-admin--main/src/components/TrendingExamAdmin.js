import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  IconButton
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const TrendingExamAdmin = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTrendingExams();
  }, []);

  const fetchTrendingExams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/trending-exams");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !image.trim()) {
      setAlert({ open: true, message: "Please fill all fields", severity: "error" });
      return;
    }

    try {
      if (editId) {
        // Update request
        await axios.patch(`http://localhost:5000/trending-exams/${editId}`, { title, image });
        setAlert({ open: true, message: "Trending exam updated successfully!", severity: "success" });
      } else {
        // Add request
        await axios.post("http://localhost:5000/trending-exams", { title, image });
        setAlert({ open: true, message: "Trending exam added successfully!", severity: "success" });
      }
      setOpen(false);
      setTitle("");
      setImage("");
      setEditId(null);
      fetchTrendingExams();
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: "Failed to save exam", severity: "error" });
    }
  };

  const handleEdit = (exam) => {
    setEditId(exam.id);
    setTitle(exam.title);
    setImage(exam.image);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await axios.delete(`http://localhost:5000/trending-exams/${id}`);
      setAlert({ open: true, message: "Deleted successfully!", severity: "success" });
      fetchTrendingExams();
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: "Failed to delete exam", severity: "error" });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, ml: 2 }}>
      {/* Heading & Button */}
      <Box mb={2}>
        <Typography variant="h4" fontWeight="bold" color="primary.main">
          Trending Exams Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditId(null);
            setTitle("");
            setImage("");
            setOpen(true);
          }}
          sx={{ mt: 2 }}
        >
          Add Trending Exam
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 300 }}>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Image</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>
                    <img
                      src={exam.image}
                      alt={exam.title}
                      style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(exam)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(exam.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Edit Trending Exam" : "Add Trending Exam"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Exam Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TrendingExamAdmin;