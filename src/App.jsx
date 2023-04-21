import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import FilterButtons from './components/FilterButtons';
import Input from './components/Input';
import Header from './components/Header';

const App = () => {
  const [todos, setTodos] = useState(() => {
    let value = localStorage.getItem('todos');
    if (value !== null) {
      return JSON.parse(value);
    }
    return [];
  });
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('dark_mode') === 'true'
  );

  const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.complete,
    Completed: (todo) => todo.complete,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('dark_mode', darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task === '') return;

    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        complete: false,
        todo: task,
      },
    ]);

    setTask('');
  };

  const handleToggle = (id, checked) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: checked };
        }
        return todo;
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => id !== todo.id);
    });
  };

  const clearComplete = () => {
    setTodos((prev) => {
      return prev.filter((todo) => !todo.complete);
    });
  };

  const completed = todos.filter((todo) => !todo.complete);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section
      className={`flex flex-col min-h-screen transition-colors ${
        darkMode ? 'bg-darkTheme-500' : 'bg-lightTheme-100'
      }`}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main>
        <section className="max-w-md mx-auto px-4 font-josefin xl:max-w-xl">
          <Input
            task={task}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            darkMode={darkMode}
          />

          <ul
            className={`relative rounded mt-4 mb-5 shadow-lg ${
              darkMode ? 'bg-darkTheme-400' : 'bg-lightTheme-50'
            }`}
          >
            {todos.filter(FILTER_MAP[filter]).map((todo) => (
              <Todo
                key={todo.id}
                todos={todo}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
                darkMode={darkMode}
              />
            ))}

            {todos.length !== 0 ? (
              <li className="p-4 text-lightTheme-300 flex justify-between text-sm md:text-base">
                <span>
                  {completed.length} {completed.length !== 1 ? 'items' : 'item'}{' '}
                  left
                </span>
                <span className="hidden xl:inline space-x-4">
                  {FILTER_NAMES.map((name) => (
                    <FilterButtons
                      key={name}
                      name={name}
                      setFilter={setFilter}
                      isPressed={name === filter}
                      darkMode={darkMode}
                    />
                  ))}
                </span>
                <button
                  onClick={clearComplete}
                  className="hover:text-lightTheme-400"
                >
                  Clear Completed
                </button>
              </li>
            ) : (
              <li className="py-4 px-4 text-lightTheme-300 flex justify-between">
                Add new todo!
              </li>
            )}
          </ul>

          {todos.length !== 0 && (
            <div
              className={`flex items-center justify-center p-4  rounded space-x-4  font-bold mb-10 xl:hidden ${
                darkMode
                  ? 'bg-darkTheme-400 text-darkTheme-100'
                  : 'bg-lightTheme-50 text-lightTheme-300'
              }`}
            >
              {FILTER_NAMES.map((name) => (
                <FilterButtons
                  key={name}
                  name={name}
                  setFilter={setFilter}
                  isPressed={name === filter}
                  darkMode={darkMode}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </section>
  );
};

export default App;
