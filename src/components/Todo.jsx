import React from 'react';
import { CheckIcon, CrossIcon } from '../icons';

const Todo = ({ todos, handleToggle, handleDelete, darkMode }) => {
  return (
    <li
      key={todos.id}
      className={`border-b last:border-none flex justify-between items-center p-4 gap-2 md:gap-4 transition-colors duration-300  ${
        darkMode
          ? 'border-darkTheme-300 text-darkTheme-50'
          : 'text-lightTheme-400'
      }`}
    >
      <span className="relative flex justify-center text-lightTheme-50">
        <input
          type="checkbox"
          name="task"
          id={todos.id}
          checked={todos.complete}
          onChange={(e) => handleToggle(todos.id, e.target.checked)}
          className={`relative w-5 aspect-square appearance-none rounded-full border ${
            darkMode
              ? 'border-darkTheme-200 bg-darkTheme-400 after:hover:bg-darkTheme-400'
              : 'border-slate-300 bg-slate-50 after:hover:bg-slate-50'
          } transition-colors duration-300 before:absolute before:inset-0 before:rounded-full after:absolute after:inset-0.5 after:rounded-full after:transition-colors after:duration-300 checked:border-none checked:bg-checkBoxColor hover:border-none before:hover:bg-checkBoxColor  after:checked:hover:bg-transparent cursor-pointer`}
        />
        <CheckIcon
          className={`${
            todos.complete
              ? 'inline -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2 absolute'
              : 'hidden'
          }`}
        />
      </span>
      <label
        htmlFor={todos.id}
        className={`cursor-pointer transition flex-1 text-xs md:text-base ${
          todos.complete ? 'line-through text-lightTheme-300' : ''
        }`}
      >
        {todos.todo}
      </label>

      <CrossIcon
        onClick={() => handleDelete(todos.id)}
        className={`cursor-pointer  xl:hidden ${
          darkMode ? 'text-darkTheme-200' : 'text-lightTheme-300'
        }`}
      />
    </li>
  );
};

export default Todo;
