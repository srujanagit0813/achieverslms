import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { EmailRounded } from "@mui/icons-material";
import { Materials } from "../components/MaterialCoursesSection";

const MaterialDetails = () => {
  const { id } = useParams();
  const material = Materials.find((item) => item.id === parseInt(id));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const navigate=useNavigate();
  if (!material) return <Typography>Material not found</Typography>;

  const InfoLine = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        px: 1,
        py: 0.5,
        bgcolor: "#f9fafb",
        borderRadius: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography fontWeight="bold">{value}</Typography>
    </Box>
  );

  const discount =
    material.oldPrice && material.price
      ? Math.round(((material.oldPrice - material.price) / material.oldPrice) * 100)
      : 0;

  return (
    <Box sx={{ backgroundColor: "#f5f7fa", py: 6, mt: 10 }}>
      <Box sx={{ px: 2, mx: "auto" }}>
        <Grid container spacing={4} justifyContent={"center"}>
          {/* Left Section */}
          <Grid item xs={12} md={7}  sx={{width:isMobile?"100%":"40%"}}> 
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Box
                component="img"
                src={material.image}
                alt={material.title}
                sx={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "2px solid #e0e0e0",
                }}
              />
              <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
                {material.title}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
                ⭐ {material.rating} | By <strong>{material.instructor}</strong>
              </Typography>

              <Typography variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
                {material.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {material.content?.map((section, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      borderLeft: "4px solid",
                      borderColor: "primary.main",
                      pl: 2,
                      mb: 1,
                    }}
                  >
                    {index + 1}. {section.heading}
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.8, textAlign: "justify" }}>
                    {section.paragraph}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Right Side Panel */}
          <Grid item xs={12} md={5}>
            <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <Box
                component="img"
                src={material.image}
                alt={material.title}
                sx={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                }}
              />

              <Box sx={{ p: 3 }}>
                {/* Price & Discount */}
                <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                  ₹{material.price}
                  {material.oldPrice && (
                    <Typography
                      component="span"
                      sx={{ ml: 1, textDecoration: "line-through", color: "gray" }}
                    >
                      ₹{material.oldPrice}
                    </Typography>
                  )}
                  {discount > 0 && (
                    <Chip
                      label={`${discount}% OFF`}
                      color="error"
                      size="small"
                      sx={{ ml: 2, fontWeight: "bold" }}
                    />
                  )}
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ mt: 3 }}>
                   <Button fullWidth variant="contained" color="secondary" onClick={()=>navigate('/PaymentPage')}>
                                    Enrolle
                                  </Button>
                  {/* <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mb: 1, textTransform: "none", fontWeight: 600 }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    size="large"
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Buy Now
                  </Button> */}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Course Info */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <InfoLine label="Instructor" value={material.instructor} />
                  <InfoLine label="Category" value={material.category || "General"} />
                  <InfoLine label="Level" value={material.level || "All"} />
                  <InfoLine label="Language" value={material.language || "English"} />
                  <InfoLine label="Certificate" value="Yes" />
                </Box>

                {/* Contact Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  color="info"
                  sx={{ mt: 3, textTransform: "none", fontWeight: 500 }}
                  startIcon={<EmailRounded />}
                >
                  Contact Support
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MaterialDetails;
