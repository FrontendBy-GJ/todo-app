import React from 'react';

const FilterButtons = ({ name, isPressed, setFilter }) => {
  return (
    <button
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
      className={`hover:text-lightTheme-400 ${isPressed ? 'text-primary' : ''}`}
    >
      {name}
    </button>
  );
};

export default FilterButtons;
