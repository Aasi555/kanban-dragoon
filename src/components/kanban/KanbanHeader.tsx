
import React from 'react';
import { Button } from '@/components/ui/button';

const KanbanHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Project Tasks</h1>
        <p className="text-gray-600">Manage and organize your project workflow</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm">Filter</Button>
        <Button size="sm">Add New Task</Button>
      </div>
    </div>
  );
};

export default KanbanHeader;
