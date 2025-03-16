
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';
import { ColumnType } from './types';

interface KanbanColumnProps {
  column: ColumnType;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  return (
    <div className="w-80 shrink-0 flex flex-col bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 font-medium flex items-center justify-between bg-white border-b border-gray-200">
        <h3 className="text-gray-800">{column.title}</h3>
        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
          {column.cards.length}
        </span>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 overflow-y-auto max-h-[calc(100vh-12rem)] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : ''
            }`}
          >
            {column.cards.map((card, index) => (
              <KanbanCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="p-3 border-t border-gray-200 bg-white">
        <button className="w-full text-left px-3 py-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200">
          + Add task
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
