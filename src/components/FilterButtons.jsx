import React from 'react';

const FilterButtons = ({ name, isPressed, setFilter, darkMode }) => {
  return (
    <button
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
      className={`${
        darkMode ? 'hover:text-darkTheme-50' : 'hover:text-lightTheme-400'
      }  text-sm md:text-base ${isPressed ? 'text-primary' : ''}`}
    >
      {name}
    </button>
  );
};

export default FilterButtons;
