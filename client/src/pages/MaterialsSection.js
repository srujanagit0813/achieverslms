import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const materials = [
  {
    id: 1,
    title: 'PDF Guide: HTML Basics',
    description: 'A beginner-friendly guide to HTML fundamentals.',
  },
  {
    id: 2,
    title: 'CSS Cheat Sheet',
    description: 'Quick reference to essential CSS properties.',
  },
  {
    id: 3,
    title: 'JS Notes',
    description: 'Important notes for JavaScript learners.',
  },
  {
    id: 4,
    title: 'React Concepts PDF',
    description: 'Summary of core ReactJS concepts.',
  },
  {
    id: 5,
    title: 'Node.js Crash Course',
    description: 'Backend essentials using Node.js.',
  },
  {
    id: 6,
    title: 'API Development Notes',
    description: 'Learn how to build RESTful APIs effectively.',
  },
];

const MaterialsSection = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:960px)');

  const getCardWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '48%';
    return '32%'; // 3 in a row
  };

  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: 'white' }}>
      <Typography variant="h5" fontWeight="bold" mb={4} textAlign="center">
        📄 Course Materials
      </Typography>

      <Box
        sx={{
        
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        
        }}
      >
        {materials.map((material) => (
          <Box
            key={material.id}
            sx={{
              width: getCardWidth(),
              minWidth: '260px',
              flexGrow: 1,
              m:2
            }}
          >
            <Card
              sx={{
            
                p: 2,
                borderRadius: 3,
                height: '100%',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  {material.title}
                </Typography>
              </Box>
              <CardContent sx={{ pt: 0 }}>
                <Typography variant="body2" color="text.secondary">
                  {material.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MaterialsSection;
