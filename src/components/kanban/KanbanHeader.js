
import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

const KanbanHeader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1f36' }}>
          Project Tasks
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Manage and organize your project workflow
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          sx={{ textTransform: 'none' }}
        >
          Filter
        </Button>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ 
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Add New Task
        </Button>
      </Box>
    </Box>
  );
};

export default KanbanHeader;
