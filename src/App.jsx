import desktopLight from './assets/bg-desktop-light.jpg';
import mobileLight from './assets/bg-mobile-light.jpg';
import { useEffect, useState } from 'react';
import Todo from './components/Todo';
import { MoonIcon } from './icons';
import FilterButtons from './components/FilterButtons';

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

  const FILTER_MAP = {
    All: () => true,
    Active: (todo) => !todo.complete,
    Completed: (todo) => todo.complete,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  return (
    <section className="flex flex-col min-h-screen bg-lightTheme-100">
      <header>
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet={mobileLight}
            sizes="375px"
          />
          <source srcSet={desktopLight} sizes="1440px" />
          <img src={mobileLight} alt="mountains" className="absolute w-full" />
        </picture>
        <section className="flex justify-between pt-10 lg:pt-14 max-w-md mx-auto relative px-4 xl:max-w-xl xl:pt-20">
          <h1 className="text-lightTheme-50 text-2xl md:text-3xl tracking-[10px] font-josefin">
            TODO
          </h1>
          <MoonIcon />
        </section>
      </header>
      <main>
        <section className="max-w-md mx-auto px-4 font-josefin xl:max-w-xl">
          <form onSubmit={handleSubmit}>
            <div className="bg-lightTheme-50 relative mt-9 md:mt-4 lg:mt-6 rounded flex items-center gap-2 md:gap-4 p-4 xl:mt-10">
              <button className="rounded-full border border-lightTheme-200 p-2"></button>
              <input
                type="text"
                value={task}
                placeholder="Create a new todo..."
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none text-sm md:text-base"
              />
            </div>
          </form>

          <ul className="relative bg-lightTheme-50 rounded mt-4 mb-5 shadow-lg">
            {todos.filter(FILTER_MAP[filter]).map((todo) => (
              <Todo
                key={todo.id}
                todos={todo}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
              />
            ))}

            {todos.length !== 0 ? (
              <li className="p-4 text-lightTheme-300 flex justify-between text-sm md:text-base">
                <span>
                  {completed.length} {completed.length !== 1 ? 'items' : 'item'}{' '}
                  left
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
            <div className="flex items-center justify-center p-4 bg-lightTheme-50 rounded space-x-4 text-lightTheme-300 font-bold mb-10">
              {FILTER_NAMES.map((name) => (
                <FilterButtons
                  key={name}
                  name={name}
                  setFilter={setFilter}
                  isPressed={name === filter}
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
