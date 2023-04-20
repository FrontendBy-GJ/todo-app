import React from 'react';
import { CrossIcon } from '../icons';

const Todo = ({ todos, handleToggle, handleDelete }) => {
  return (
    <li
      key={todos.id}
      className="border-b last:border-none flex justify-between items-center p-4 gap-4 text-lightTheme-400"
    >
      <input
        type="checkbox"
        name="task"
        id={todos.id}
        checked={todos.complete}
        onChange={(e) => handleToggle(todos.id, e.target.checked)}
        className="appearance-none border border-lightTheme-200 p-2 rounded-full checked:bg-gradient-to-br from-gradient1 to-gradient2 hover:bg-transparent"
      />
      <label
        htmlFor={todos.id}
        className={`cursor-pointer transition flex-1 ${
          todos.complete ? 'line-through text-lightTheme-300' : ''
        }`}
      >
        {todos.todo}
      </label>

      <CrossIcon
        onClick={() => handleDelete(todos.id)}
        className="cursor-pointer"
      />
    </li>
  );
};

export default Todo;
