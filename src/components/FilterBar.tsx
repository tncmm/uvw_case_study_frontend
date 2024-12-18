import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { setFilter, clearFilter } from '../redux/slices/postsSlice';

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [tag, setTag] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleApply = () => {
    const filters: any = {};
    if (tag) filters.tag = tag;
    if (authorId) filters.authorId = authorId;
    dispatch(setFilter(filters));
  };

  const handleClear = () => {
    setTag('');
    setAuthorId('');
    dispatch(clearFilter());
  };

  return (
    <div className="bg-white p-4 rounded shadow flex space-x-4 items-end">
      <div>
        <label className="block mb-1">Tag</label>
        <input 
          className="border p-2 rounded w-full" 
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">Author ID</label>
        <input 
          className="border p-2 rounded w-full" 
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
        />
      </div>
      <button onClick={handleApply} className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
      <button onClick={handleClear} className="bg-gray-600 text-white px-4 py-2 rounded">Clear</button>
    </div>
  );
};

export default FilterBar;
