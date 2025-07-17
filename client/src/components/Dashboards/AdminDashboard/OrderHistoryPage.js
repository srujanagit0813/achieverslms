import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const orders = [
  { id: "#5478", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "Success" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Processing" },
  { id: "#9656", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "On Hold" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Canceled" },
  { id: "#9656", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "On Hold" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Canceled" },
  { id: "#9656", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "On Hold" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Canceled" },
  { id: "#5478", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "Success" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Processing" },
  { id: "#9656", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "On Hold" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Canceled" },
  { id: "#9656", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "On Hold" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Canceled" },
  { id: "#9656", course: "App Development", date: "January 27, 2024", price: "$100.99", status: "On Hold" },
  { id: "#4585", course: "Graphic", date: "May 27, 2024", price: "$200.99", status: "Canceled" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Success":
      return "success";
    case "Processing":
      return "info";
    case "On Hold":
      return "warning";
    case "Canceled":
      return "error";
    default:
      return "default";
  }
};

function OrderHistoryPage() {
  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f0f2f5" }}>
      <Typography variant="h4" mb={3} fontWeight="bold" color="primary.dark">
        Order History
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#e3f2fd" }}>
            <TableRow>
              <TableCell align="center"><strong>Order ID</strong></TableCell>
              <TableCell align="center"><strong>Course Name</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Price</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f9f9f9" },
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.course}</TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">{order.price}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    sx={{
                      fontWeight: "bold",
                      width: "100px",
                      justifyContent: "center",
                      borderRadius: 2,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderHistoryPage;