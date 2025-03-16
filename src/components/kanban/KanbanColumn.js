
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Typography, Button, Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KanbanCard from './KanbanCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  columnContainer: {
    width: 280,
    flexShrink: 0,
    transition: 'width 0.3s ease'
  },
  columnContainerMinimized: {
    width: 58,
    overflow: 'hidden'
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
  columnTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden'
  },
  columnTitle: {
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
  },
  columnControls: {
    position: 'absolute',
    right: -12,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10
  },
  collapseButton: {
    width: 24,
    height: 24,
    minWidth: 'auto',
    padding: 0,
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e9edf3',
    '&:hover': {
      backgroundColor: '#f5f7fa'
    }
  },
  statusChip: {
    fontWeight: 600,
    padding: '0 8px',
    height: 22
  },
  todoColumn: {
    '& $columnHeader': {
      borderTop: '3px solid #F97316'
    }
  },
  inProgressColumn: {
    '& $columnHeader': {
      borderTop: '3px solid #0EA5E9'
    }
  },
  reviewColumn: {
    '& $columnHeader': {
      borderTop: '3px solid #8B5CF6'
    }
  },
  doneColumn: {
    '& $columnHeader': {
      borderTop: '3px solid #10B981'
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
  const [minimized, setMinimized] = useState(false);

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const getColumnClass = () => {
    switch (column.id) {
      case 'todo':
        return classes.todoColumn;
      case 'in-progress':
        return classes.inProgressColumn;
      case 'review':
        return classes.reviewColumn;
      case 'done':
        return classes.doneColumn;
      default:
        return '';
    }
  };

  const getStatusChipColor = () => {
    switch (column.id) {
      case 'todo':
        return { bg: '#FFF7ED', color: '#EA580C' };
      case 'in-progress':
        return { bg: '#EFF6FF', color: '#0284C7' };
      case 'review':
        return { bg: '#F5F3FF', color: '#7C3AED' };
      case 'done':
        return { bg: '#ECFDF5', color: '#059669' };
      default:
        return { bg: '#F5F5F5', color: '#6B7280' };
    }
  };

  const getColumnTitle = () => {
    switch (column.id) {
      case 'todo':
        return 'Open';
      case 'in-progress':
        return 'In Progress';
      case 'review':
        return 'Review';
      case 'done':
        return 'Completed';
      default:
        return column.title;
    }
  };

  const { bg, color } = getStatusChipColor();

  return (
    <div className={`${classes.columnContainer} ${minimized ? classes.columnContainerMinimized : ''} ${getColumnClass()}`}>
      <Paper className={classes.columnPaper} elevation={1}>
        <div className={classes.columnHeader}>
          <div className={classes.columnTitleContainer}>
            <Typography variant="subtitle1" className={classes.columnTitle}>
              {getColumnTitle()}
            </Typography>
            <Chip 
              label={`(${column.cards.length})`}
              size="small"
              className={classes.columnCount}
              style={{ marginLeft: 8, backgroundColor: bg, color: color }}
            />
          </div>
          <div className={classes.columnControls}>
            <IconButton 
              size="small" 
              className={classes.collapseButton}
              onClick={toggleMinimize}
            >
              {minimized ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
            </IconButton>
          </div>
        </div>
        
        {!minimized && (
          <>
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
          </>
        )}
      </Paper>
    </div>
  );
};

export default KanbanColumn;
