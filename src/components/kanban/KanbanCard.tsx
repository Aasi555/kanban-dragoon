
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CardType } from './types';

interface KanbanCardProps {
  card: CardType;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, index }) => {
  const getLabelColor = (label: string) => {
    switch (label) {
      case 'priority':
        return 'bg-red-100 text-red-700';
      case 'design':
        return 'bg-purple-100 text-purple-700';
      case 'development':
        return 'bg-blue-100 text-blue-700';
      case 'research':
        return 'bg-green-100 text-green-700';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700';
      case 'code review':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
            snapshot.isDragging ? 'rotate-1 shadow-md' : ''
          }`}
        >
          <h4 className="font-medium text-gray-800 mb-2">{card.title}</h4>
          {card.description && (
            <p className="text-sm text-gray-600 mb-3">{card.description}</p>
          )}
          {card.labels && card.labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {card.labels.map(label => (
                <span
                  key={label}
                  className={`text-xs px-2 py-0.5 rounded-full ${getLabelColor(label)}`}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
