
import React from 'react';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { Box } from '@mui/material';

const Index = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f7fa',
      padding: { xs: 2, md: 3 }
    }}>
      <KanbanBoard />
    </Box>
  );
};

export default Index;
