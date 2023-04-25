import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import FilterButtons from './components/FilterButtons';
import Input from './components/Input';
import Header from './components/Header';
import { AnimatePresence, motion } from 'framer-motion';

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
    <div
      className={`flex flex-col min-h-screen transition-colors ${
        darkMode ? 'bg-darkTheme-500' : 'bg-lightTheme-100'
      }`}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      <main>
        <section className="max-w-md mx-auto px-4 font-josefin xl:max-w-xl overflow-hidden">
          <Input
            task={task}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            darkMode={darkMode}
          />

          {todos.length === 0 ? (
            <motion.div
              initial={{
                y: '100%',
                opacity: 0,
              }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                bounce: 0.1,
                duration: 0.3,
              }}
              className={`absolute inset-0 flex items-center justify-center`}
            >
              <span
                className={`${
                  darkMode ? 'text-darkTheme-100' : 'text-lightTheme-300'
                }`}
              >
                Add new todo!
              </span>
            </motion.div>
          ) : (
            <motion.ul
              initial={{ y: '100%', scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                bounce: 0.1,
                duration: 0.3,
              }}
              className={`z-50 relative rounded mt-4 mb-5 shadow-lg`}
            >
              <AnimatePresence initial={false}>
                {todos.filter(FILTER_MAP[filter]).map((todo) => (
                  <Todo
                    key={todo.id}
                    todos={todo}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                    darkMode={darkMode}
                  />
                ))}
              </AnimatePresence>

              {todos.length !== 0 && (
                <li
                  className={`p-4 flex justify-between text-sm md:text-base ${
                    darkMode
                      ? 'bg-darkTheme-400 border-darkTheme-300 text-darkTheme-50'
                      : 'bg-lightTheme-50 text-lightTheme-400'
                  }`}
                >
                  <span>
                    {completed.length}{' '}
                    {completed.length !== 1 ? 'items' : 'item'} left
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
              )}
            </motion.ul>
          )}

          {todos.length !== 0 && (
            <div
              className={`flex items-center justify-center p-4  rounded space-x-4  font-bold mb-10 xl:hidden relative z-50 ${
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
    </div>
  );
};

export default App;
