
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

/**
 * @param {Object} props
 * @param {import('./types').CardType} props.card
 * @param {number} props.index
 * @returns {JSX.Element}
 */
const KanbanCard = ({ card, index }) => {
  const getLabelColor = (label) => {
    switch (label) {
      case 'priority':
        return { bg: '#ffebee', color: '#c62828' }; // red
      case 'design':
        return { bg: '#f3e5f5', color: '#7b1fa2' }; // purple
      case 'development':
        return { bg: '#e3f2fd', color: '#1565c0' }; // blue
      case 'research':
        return { bg: '#e8f5e9', color: '#2e7d32' }; // green
      case 'maintenance':
        return { bg: '#fff8e1', color: '#f9a825' }; // yellow
      case 'code review':
        return { bg: '#e8eaf6', color: '#3949ab' }; // indigo
      default:
        return { bg: '#f5f5f5', color: '#616161' }; // gray
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            backgroundColor: 'white',
            boxShadow: snapshot.isDragging ? 3 : 1,
            transform: snapshot.isDragging ? 'rotate(1deg)' : 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: 2
            }
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
              {card.title}
            </Typography>
            {card.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                {card.description}
              </Typography>
            )}
            {card.labels && card.labels.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {card.labels.map(label => {
                  const { bg, color } = getLabelColor(label);
                  return (
                    <Chip
                      key={label}
                      label={label}
                      size="small"
                      sx={{
                        backgroundColor: bg,
                        color: color,
                        fontSize: '0.7rem',
                        height: '20px'
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;
