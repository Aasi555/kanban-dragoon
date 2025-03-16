
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)'
    }
  },
  cardDragging: {
    transform: 'rotate(1deg)'
  },
  cardTitle: {
    fontSize: '0.95rem',
    fontWeight: 500
  },
  cardDescription: {
    marginTop: 8,
    marginBottom: 16
  },
  labelsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8
  },
  label: {
    fontSize: '0.7rem',
    height: '20px'
  }
}));

/**
 * @param {Object} props
 * @param {import('./types').CardType} props.card
 * @param {number} props.index
 * @returns {JSX.Element}
 */
const KanbanCard = ({ card, index }) => {
  const classes = useStyles();

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
          className={`${classes.card} ${snapshot.isDragging ? classes.cardDragging : ''}`}
          elevation={snapshot.isDragging ? 3 : 1}
        >
          <CardContent>
            <Typography variant="h6" component="div" className={classes.cardTitle}>
              {card.title}
            </Typography>
            {card.description && (
              <Typography variant="body2" color="text.secondary" className={classes.cardDescription}>
                {card.description}
              </Typography>
            )}
            {card.labels && card.labels.length > 0 && (
              <Box className={classes.labelsContainer}>
                {card.labels.map(label => {
                  const { bg, color } = getLabelColor(label);
                  return (
                    <Chip
                      key={label}
                      label={label}
                      size="small"
                      style={{ backgroundColor: bg, color: color }}
                      className={classes.label}
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
