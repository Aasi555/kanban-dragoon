
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanCard from './KanbanCard';

/**
 * @param {Object} props
 * @param {import('./types').ColumnType} props.column
 * @returns {JSX.Element}
 */
const KanbanColumn = ({ column }) => {
  return (
    <Box sx={{ width: 280, flexShrink: 0 }}>
      <Paper 
        elevation={1} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          backgroundColor: '#f9fafc',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          px: 2, 
          py: 1.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid #e9edf3',
          backgroundColor: 'white'
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {column.title}
          </Typography>
          <Chip 
            label={column.cards.length}
            size="small"
            sx={{ 
              height: 22, 
              fontSize: '0.75rem', 
              backgroundColor: '#eaecef',
              color: '#57606a'
            }}
          />
        </Box>
        
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                p: 1.5,
                flexGrow: 1,
                overflowY: 'auto',
                minHeight: 100,
                maxHeight: 'calc(100vh - 12rem)',
                backgroundColor: snapshot.isDraggingOver ? '#f0f4ff' : '#f9fafc',
                transition: 'background-color 0.2s ease'
              }}
            >
              {column.cards.map((card, index) => (
                <KanbanCard key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        
        <Box sx={{ p: 1.5, borderTop: '1px solid #e9edf3', backgroundColor: 'white' }}>
          <Button 
            fullWidth
            startIcon={<AddIcon />}
            sx={{ 
              justifyContent: 'flex-start',
              color: 'text.secondary',
              textTransform: 'none',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: '#f0f4f8'
              }
            }}
          >
            Add task
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default KanbanColumn;
