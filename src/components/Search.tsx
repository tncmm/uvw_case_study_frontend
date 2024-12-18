import React, { useState } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search by author or tags..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 ml-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
