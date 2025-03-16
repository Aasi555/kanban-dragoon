
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import KanbanColumn from './KanbanColumn';
import KanbanHeader from './KanbanHeader';

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  columnsContainer: {
    overflowX: 'auto',
    paddingBottom: 24,
    '&::-webkit-scrollbar': {
      height: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#d1d5db',
      borderRadius: 4,
    }
  },
  columns: {
    display: 'flex',
    gap: 16,
    paddingBottom: 16,
    minWidth: 'max-content',
    position: 'relative'
  }
}));

const KanbanBoard = () => {
  const classes = useStyles();
  
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'Open',
      cards: [
        { 
          id: 'task-1', 
          title: 'Pipe flanges are getting rusted on 2nd floor', 
          actionNumber: 'AT-24111-004',
          category: 'Plumbing',
          approver: 'Amit Kumar',
          status: 'Approval Pending',
          dueDate: '24-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Suresh Kumar', avatar: 'S' },
            { id: 3, name: 'Amit Kumar', avatar: 'A' }
          ]
        },
        { 
          id: 'task-2', 
          title: 'Spilled water on the floor 2', 
          actionNumber: 'AT-24111-003',
          category: 'Plumbing',
          approver: 'Amit Kumar',
          status: 'Unassigned',
          dueDate: '24-Nov-2024',
          teamMembers: [
            { id: 1, name: 'Suresh Kumar', avatar: 'S' }
          ]
        },
        { 
          id: 'task-3', 
          title: 'Elevators stopped working due to heavy load', 
          actionNumber: 'AT-24111-002',
          category: 'Plumbing',
          approver: 'Amit Kumar',
          status: 'Unassigned',
          dueDate: '24-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Suresh Kumar', avatar: 'S' },
            { id: 3, name: 'Amit Kumar', avatar: 'A' }
          ]
        }
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { 
          id: 'task-4', 
          title: 'Pipe flanges are getting rusted on 2nd floor', 
          actionNumber: 'AT-24108-004',
          category: 'Plumbing',
          reviewer: 'Suresh Kumar',
          status: 'Assigned',
          dueDate: '16-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Suresh Kumar', avatar: 'S' }
          ]
        },
        { 
          id: 'task-5', 
          title: 'Routine check of rigging components for safety', 
          actionNumber: 'AT-24108-002',
          category: 'Site Safety',
          reviewer: 'Suresh Kumar',
          status: 'Overdue',
          dueDate: '16-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Suresh Kumar', avatar: 'S' },
            { id: 3, name: 'Brooklyn Simmons', avatar: 'B' }
          ]
        },
        { 
          id: 'task-9', 
          title: 'Remove scarp from the LNG Pipes', 
          actionNumber: 'AT-24108-003',
          category: 'Place of Assembly',
          reviewer: 'Suresh Kumar',
          status: 'Ongoing',
          dueDate: '16-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Brooklyn Simmons', avatar: 'B' },
            { id: 3, name: 'Shyama Robin', avatar: 'S' },
            { id: 4, name: 'Ravi Varma', avatar: 'R' },
            { id: 5, name: 'Mayur Jadhar', avatar: 'M' }
          ]
        }
      ],
    },
    {
      id: 'review',
      title: 'Completed',
      cards: [
        { 
          id: 'task-6', 
          title: 'Move reinforcing steel bars to designated area', 
          actionNumber: 'AT-24101-001',
          category: 'Place of Assembly',
          reviewer: 'Suresh Kumar',
          status: 'Closed',
          dueDate: '12-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Suresh Kumar', avatar: 'S' },
            { id: 3, name: 'Amit Kumar', avatar: 'A' }
          ]
        }
      ],
    },
    {
      id: 'done',
      title: 'Rejected',
      cards: [
        { 
          id: 'task-7', 
          title: 'Moving heavy materials to designated areas', 
          actionNumber: 'AT-24101-001',
          category: 'Place of Assembly',
          reviewer: 'Suresh Kumar',
          status: 'Rejected',
          dueDate: '12-Nov-2024',
          teamMembers: [
            { id: 1, name: 'John Doe', avatar: 'J' },
            { id: 2, name: 'Suresh Kumar', avatar: 'S' },
            { id: 3, name: 'Amit Kumar', avatar: 'A' }
          ]
        }
      ],
    }
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) return;

    // If the source and destination are the same and the indexes are the same, return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // If moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newCards = Array.from(sourceColumn.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      const newColumns = columns.map(column => {
        if (column.id === source.droppableId) {
          return { ...column, cards: newCards };
        }
        return column;
      });

      setColumns(newColumns);
    } else {
      // Moving to a different column
      const sourceCards = Array.from(sourceColumn.cards);
      const destCards = Array.from(destColumn.cards);
      const [removed] = sourceCards.splice(source.index, 1);

      destCards.splice(destination.index, 0, removed);

      const newColumns = columns.map(column => {
        if (column.id === source.droppableId) {
          return { ...column, cards: sourceCards };
        }
        if (column.id === destination.droppableId) {
          return { ...column, cards: destCards };
        }
        return column;
      });

      setColumns(newColumns);
    }
  };

  return (
    <div className={classes.boardContainer}>
      <KanbanHeader />
      <div className={classes.columnsContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.columns}>
            {columns.map(column => (
              <KanbanColumn 
                key={column.id} 
                column={column}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
