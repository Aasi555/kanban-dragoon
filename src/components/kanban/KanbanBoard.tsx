
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import KanbanHeader from './KanbanHeader';
import { CardType, ColumnType } from './types';

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        { id: 'task-1', title: 'Research market trends', description: 'Analyze competitor strategies and identify market opportunities', labels: ['research', 'priority'] },
        { id: 'task-2', title: 'Design new homepage', description: 'Create wireframes for the homepage redesign', labels: ['design'] }
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        { id: 'task-3', title: 'Implement authentication', description: 'Add user login and registration functionality', labels: ['development', 'priority'] },
        { id: 'task-4', title: 'Create API endpoints', description: 'Develop RESTful APIs for the application', labels: ['development'] }
      ],
    },
    {
      id: 'review',
      title: 'Review',
      cards: [
        { id: 'task-5', title: 'Review pull requests', description: 'Code review for recent feature implementations', labels: ['code review'] }
      ],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [
        { id: 'task-6', title: 'Update dependencies', description: 'Update project packages to the latest versions', labels: ['maintenance'] }
      ],
    }
  ]);

  const onDragEnd = (result: DropResult) => {
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
    <div className="flex flex-col h-full">
      <KanbanHeader />
      <div className="overflow-x-auto pb-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 p-2 min-w-max">
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
