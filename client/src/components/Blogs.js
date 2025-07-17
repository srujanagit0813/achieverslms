import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import { Share as ShareIcon, ArrowForward } from '@mui/icons-material';

const sampleBlogs = [
  {
    id: 1,
    title: 'How to Prepare for Competitive Exams Efficiently',
    author: 'John Doe',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: 'June 10, 2025',
    excerpt:
      'Discover proven strategies and tips to help you prepare smarter for your upcoming competitive exams...',
    categories: ['Exams', 'Study Tips', 'Productivity'],
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    url: '#',
  },
  {
    id: 2,
    title: 'Top 10 Study Apps You Must Try',
    author: 'Jane Smith',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: 'May 28, 2025',
    excerpt:
      'Boost your learning with these top-rated study apps that make studying easier and more efficient...',
    categories: ['Apps', 'Tech', 'Study Hacks'],
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    url: '#',
  },
  {
    id: 3,
    title: 'Time Management Tips for Students',
    author: 'Emily Johnson',
    authorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    date: 'May 15, 2025',
    excerpt:
      'Master time management with these essential tips and tricks to balance your studies and life..................',
    categories: ['Time Management', 'Student Life'],
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    url: '#',
  },
  {
    id: 4,
    title: 'Healthy Study Habits to Boost Your Focus',
    author: 'Mark Wilson',
    authorAvatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    date: 'April 22, 2025',
    excerpt:
      'A healthy mind leads to productive study sessions. Explore habits that improve concentration.......',
    categories: ['Health', 'Study Tips'],
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    url: '#',
  },
];

const Blogs = () => {
  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2, py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ mb: 8}}
      >
        Latest Insights & Blogs
      </Typography>

      <Grid container spacing={6}>
        {sampleBlogs.map((blog) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={blog.id}>
            <Card
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 8,
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={blog.image}
                alt={blog.title}
                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />

              <CardContent sx={{ p: 2, flexGrow: 1 }}>
                <Stack direction="row" spacing={0.5} mb={1} flexWrap="wrap">
                  {blog.categories.map((cat) => (
                    <Chip
                      key={cat}
                      label={cat}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', mb: 0.5 }}
                      color="primary"
                    />
                  ))}
                </Stack>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  noWrap
                >
                  {blog.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ height: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {blog.excerpt}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 1, pt: 0 }}>
                <Button
                  href={blog.url}
                  size="small"
                  endIcon={<ArrowForward />}
                  sx={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'none' }}
                >
                  Read More
                </Button>

                <Box sx={{ ml: 'auto' }}>
                  <Tooltip title="Share">
                    <IconButton size="small" color="primary">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>

              <Divider sx={{ mx: 2 }} />

              <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={blog.authorAvatar}
                  alt={blog.author}
                  sx={{ width: 28, height: 28, mr: 1 }}
                />
                <Typography variant="caption" fontWeight={500}>
                  {blog.author}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 'auto' }}
                >
                  {blog.date}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Blogs;