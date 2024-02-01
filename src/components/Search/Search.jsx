import React from 'react';
import css from './Search.module.css';

const Search = ({ filter, onFilterChange }) => {
  return (
    <div className={css.searchBox}>
      <label>
        Find contact by name:
        <input type="text" value={filter} onChange={onFilterChange} />
      </label>
    </div>
  );
};

export { Search };
