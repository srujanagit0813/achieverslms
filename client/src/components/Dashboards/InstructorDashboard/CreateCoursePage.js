import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
  Grid,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = ["Web Development", "Data Science", "Design", "Marketing", "Business"];

const CreateCoursePage = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnail: null,
    materials: [],
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    setCourseData({ ...courseData, thumbnail: e.target.files[0] });
  };

  const handleMaterialsChange = (e) => {
    setCourseData({ ...courseData, materials: Array.from(e.target.files) });
  };

  const removeMaterial = (index) => {
    const updatedMaterials = [...courseData.materials];
    updatedMaterials.splice(index, 1);
    setCourseData({ ...courseData, materials: updatedMaterials });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseData.title || !courseData.description || !courseData.category || !courseData.price || !courseData.thumbnail) {
      alert("Please fill in all fields including the thumbnail.");
      return;
    }

    console.log("Course Created:", courseData);
    setSuccess(true);
    setCourseData({
      title: "",
      description: "",
      category: "",
      price: "",
      thumbnail: null,
      materials: [],
    });
  };

  return (
    <Box sx={{ p: 4, minHeight: "90vh", backgroundColor: "#f7f8fc" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="#6a1b9a" textAlign="center">
        🎓 Create a New Course
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: "900px",
          mx: "auto",
          bgcolor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
        elevation={3}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Title"
                variant="outlined"
                name="title"
                value={courseData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Description"
                variant="outlined"
                name="description"
                multiline
                rows={4}
                value={courseData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Select Category"
                variant="outlined"
                name="category"
                value={courseData.category}
                onChange={handleChange}
              >
                {categories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Course Price (INR)"
                variant="outlined"
                name="price"
                value={courseData.price}
                onChange={handleChange}
              />
            </Grid>

            {/* Thumbnail Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" mb={1}>
                Upload Course Thumbnail
              </Typography>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  background: "linear-gradient(to right, #8e24aa, #6a1b9a)",
                  "&:hover": { background: "linear-gradient(to right, #6a1b9a, #4a148c)" },
                }}
              >
                Choose Thumbnail
                <input type="file" hidden onChange={handleThumbnailChange} />
              </Button>
              {courseData.thumbnail && (
                <Typography variant="body2" mt={1}>
                  Selected Thumbnail: {courseData.thumbnail.name}
                </Typography>
              )}
            </Grid>

            {/* Course Material Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" mb={1}>
                Upload Course Materials (PDFs, Videos, etc.)
              </Typography>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  color: "#6a1b9a",
                  borderColor: "#6a1b9a",
                  "&:hover": { bgcolor: "#f3e5f5" },
                }}
              >
                Upload Materials
                <input type="file" hidden multiple onChange={handleMaterialsChange} />
              </Button>

              {/* Show Selected Materials */}
              {courseData.materials.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle2" mb={1}>
                    Selected Files:
                  </Typography>
                  {courseData.materials.map((file, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{
                        p: 1.5,
                        mb: 1,
                        bgcolor: "#f5f5f5",
                        borderRadius: 2,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography variant="body2">{file.name}</Typography>
                      <IconButton color="error" onClick={() => removeMaterial(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: "1rem",
                  background: "linear-gradient(to right, #8e24aa, #6a1b9a)",
                  color: "#fff",
                  "&:hover": {
                    background: "linear-gradient(to right, #6a1b9a, #4a148c)",
                  },
                  borderRadius: 3,
                }}
              >
                Create Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          🎉 Course created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateCoursePage;