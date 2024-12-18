import React from 'react';

interface SortProps {
  onSort: (order: 'asc' | 'desc') => void;
}

const Sort: React.FC<SortProps> = ({ onSort }) => {
  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Sort by:</label>
      <button
        onClick={() => onSort('asc')}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
      >
        Oldest
      </button>
      <button
        onClick={() => onSort('desc')}
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
      >
        Newest
      </button>
    </div>
  );
};

export default Sort;
