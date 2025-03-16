
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Typography, Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanCard from './KanbanCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    width: 280,
    flexShrink: 0
  },
  columnPaper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f9fafc',
    borderRadius: 8,
    overflow: 'hidden'
  },
  columnHeader: {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e9edf3',
    backgroundColor: 'white'
  },
  columnTitle: {
    fontWeight: 600
  },
  columnCount: {
    height: 22,
    fontSize: '0.75rem',
    backgroundColor: '#eaecef',
    color: '#57606a'
  },
  cardsList: {
    padding: 12,
    flexGrow: 1,
    overflowY: 'auto',
    minHeight: 100,
    maxHeight: 'calc(100vh - 12rem)',
    transition: 'background-color 0.2s ease'
  },
  cardsListDraggingOver: {
    backgroundColor: '#f0f4ff'
  },
  columnFooter: {
    padding: 12,
    borderTop: '1px solid #e9edf3',
    backgroundColor: 'white'
  },
  addButton: {
    justifyContent: 'flex-start',
    color: 'text.secondary',
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#f0f4f8'
    }
  }
}));

/**
 * @param {Object} props
 * @param {import('./types').ColumnType} props.column
 * @returns {JSX.Element}
 */
const KanbanColumn = ({ column }) => {
  const classes = useStyles();

  return (
    <div className={classes.columnContainer}>
      <Paper className={classes.columnPaper} elevation={1}>
        <div className={classes.columnHeader}>
          <Typography variant="subtitle1" className={classes.columnTitle}>
            {column.title}
          </Typography>
          <Chip 
            label={column.cards.length}
            size="small"
            className={classes.columnCount}
          />
        </div>
        
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${classes.cardsList} ${snapshot.isDraggingOver ? classes.cardsListDraggingOver : ''}`}
            >
              {column.cards.map((card, index) => (
                <KanbanCard key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <div className={classes.columnFooter}>
          <Button 
            fullWidth
            startIcon={<AddIcon />}
            className={classes.addButton}
          >
            Add task
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default KanbanColumn;
