// NoticeboardAndNotifications.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Collapse,
  Pagination,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { motion } from "framer-motion";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const noticeData = Array.from({ length: 15 }).map((_, i) => ({
  img: `https://source.unsplash.com/80x60/?notice,${i}`,
  text: `Notice ${i + 1}: Important update for all users. Please read carefully.`,
}));

const notifications = Array.from({ length: 15 }).map((_, i) => ({
  icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
  message: `Notification ${i + 1}: New content is available!`,
  time: `${i + 1} min ago`,
}));


const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const NoticeItem = ({ img, text, index }) => (
  <motion.div
    custom={index}
    variants={fadeInVariant}
    initial="hidden"
    animate="visible"
  >
    <Box
      display="flex"
      alignItems="center"
      py={1.2}
      px={2}
      sx={{
        "&:hover": {
          backgroundColor: "#e3f2fd",
          cursor: "pointer",
          borderRadius: 2,
          transform: "scale(1.01)",
        },
        transition: "all 0.3s ease",
        borderRadius: 2,
      }}
    >
      <Avatar src={img} sx={{ width: 48, height: 48, mr: 2 }} />
      <Typography fontSize="0.95rem">{text}</Typography>
    </Box>
  </motion.div>
);

const NotificationItem = ({ icon, message, time, index }) => (
  <motion.div
    custom={index}
    variants={fadeInVariant}
    initial="hidden"
    animate="visible"
  >
    <Box
      display="flex"
      alignItems="center"
      py={1.2}
      px={2}
      sx={{
        "&:hover": {
          backgroundColor: "#fce4ec",
          cursor: "pointer",
          borderRadius: 2,
          transform: "scale(1.01)",
        },
        transition: "all 0.3s ease",
        borderRadius: 2,
      }}
    >
      <Avatar src={icon} sx={{ width: 32, height: 32, mr: 2 }} />
      <Box>
        <Typography fontSize="0.95rem" fontWeight="bold">
          {message}
        </Typography>
        <Typography fontSize="0.8rem" color="text.secondary">
          {time}
        </Typography>
      </Box>
    </Box>
  </motion.div>
);

const ITEMS_PER_PAGE = 5;

const PaginatedSection = ({
  title,
  data,
  renderItem,
  page,
  setPage,
  show,
  toggleShow,
  color,
  icon,
}) => {
  const count = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedItems = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              backgroundColor: color,
              p: 0.7,
              borderRadius: "50%",
              mr: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" fontWeight="bold" color={color}>
            {title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color="primary" fontSize="0.85rem" sx={{ mr: 1 }}>
            {show ? "Hide" : "See More..."}
          </Typography>
          <IconButton size="small" onClick={toggleShow} color="primary">
            {show ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Collapse in={show}>
        {paginatedItems.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderItem(item, idx)}
            {idx < paginatedItems.length - 1 && <Divider sx={{ my: 1.5 }} />}
          </React.Fragment>
        ))}
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={count}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
            size="medium"
          />
        </Box>
      </Collapse>
    </Paper>
  );
};

const NoticeboardAndNotifications = () => {
  const [noticePage, setNoticePage] = useState(1);
  const [notifPage, setNotifPage] = useState(1);
  const [showNotices, setShowNotices] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);

  return (
    <Box p={4} sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <PaginatedSection
            title="Notice Board"
            data={noticeData}
            page={noticePage}
            setPage={setNoticePage}
            show={showNotices}
            toggleShow={() => setShowNotices(!showNotices)}
            renderItem={(item, idx) => (
              <NoticeItem {...item} index={idx} key={idx} />
            )}
            color="#0288d1"
            icon={<InfoOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PaginatedSection
            title="Notifications"
            data={notifications}
            page={notifPage}
            setPage={setNotifPage}
            show={showNotifications}
            toggleShow={() => setShowNotifications(!showNotifications)}
            renderItem={(item, idx) => (
              <NotificationItem {...item} index={idx} key={idx} />
            )}
            color="#c2185b"
            icon={<NotificationsNoneIcon sx={{ color: "#fff", fontSize: "20px" }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoticeboardAndNotifications;