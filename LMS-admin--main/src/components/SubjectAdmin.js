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

const SubjectAdmin = () => {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects", error);
      setAlert({ open: true, message: "Failed to load subjects", severity: "error" });
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate inputs (simple)
  const validate = () => {
    if (!formData.title.trim()) {
      setAlert({ open: true, message: "Title is required", severity: "error" });
      return false;
    }
    if (!formData.description.trim()) {
      setAlert({ open: true, message: "Description is required", severity: "error" });
      return false;
    }
    if (!formData.icon.trim()) {
      setAlert({ open: true, message: "Icon is required", severity: "error" });
      return false;
    }
    if (formData.icon.length > 10) {
      setAlert({ open: true, message: "Icon max length is 10", severity: "error" });
      return false;
    }
    return true;
  };

  // Handle submit (add or update)
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (editId) {
        // Update existing subject
        await axios.patch(`http://localhost:5000/subjects/${editId}`, formData);
        setAlert({ open: true, message: "Subject updated successfully", severity: "success" });
      } else {
        // Add new subject
        await axios.post("http://localhost:5000/subjects", formData);
        setAlert({ open: true, message: "Subject added successfully", severity: "success" });
      }
      setOpen(false);
      setFormData({ title: "", description: "", icon: "" });
      setEditId(null);
      fetchSubjects();
    } catch (error) {
      console.error("Error saving subject", error);
      setAlert({ open: true, message: "Failed to save subject", severity: "error" });
    }
  };

  // Open dialog for edit
  const handleEdit = (subject) => {
    setEditId(subject.id);
    setFormData({
      title: subject.title,
      description: subject.description,
      icon: subject.icon,
    });
    setOpen(true);
  };

  // Delete subject with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    try {
      await axios.delete(`http://localhost:5000/subjects/${id}`);
      setAlert({ open: true, message: "Subject deleted successfully", severity: "success" });
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject", error);
      setAlert({ open: true, message: "Failed to delete subject", severity: "error" });
    }
  };

  return (
    <Box p={3} sx={{mt:4}}>
      {/* Heading & Add Button */}
      <Grid container direction="column" alignItems="flex-start" mb={2} spacing={2}>
  <Grid item>
    <Typography variant="h4" fontWeight="bold" color="primary.main">
      Subjects Masterdata
    </Typography>
  </Grid>
  <Grid item>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        setEditId(null);
        setFormData({ title: "", description: "", icon: "" });
        setOpen(true);
      }}
    >
      Add Subject
    </Button>
  </Grid>
</Grid>


      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Icon</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.title}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>{subject.icon}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(subject)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(subject.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No subjects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? "Edit Subject" : "Add Subject"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                helperText="Max 10 characters"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity} variant="filled" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubjectAdmin;