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

// Function to get chip color based on status
const getStatusColor = (status) => {
  switch (status) {
    case "Success":
      return "success";
    case "Processing":
      return "primary";
    case "On Hold":
      return "warning";
    case "Canceled":
      return "error";
    default:
      return "default";
  }
};

function StudentOrderHistoryPage() {
  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f9f9f9" }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Order History
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f0f0f0" }}>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Course Name</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.course}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{ fontWeight: "bold" }}
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

export default StudentOrderHistoryPage;