import {
  type ChangeEventHandler,
  type FormEventHandler,
  type JSX,
  useCallback,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useScan } from 'react-scan';

interface TodoData {
  id: number;
  value: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoData[];
  deleteTodo: (todoId: number) => void;
}

interface TodoItemProps {
  todo: TodoData;
  deleteTodo: (todoId: number) => void;
}

const DEFAULT_TODOS: TodoData[] = [
  {
    id: 1,
    value: 'Pet the cat',
    completed: true,
  },
  {
    id: 2,
    value: 'Give the cat food',
    completed: false,
  },
  {
    id: 3,
    value: 'Pet the cat again',
    completed: false,
  },
  {
    id: 4,
    value: 'Walk the dog',
    completed: false,
  },
];

export const TodoItem = ({ todo, deleteTodo }: TodoItemProps): JSX.Element => {
  const [completed, setCompleted] = useState(todo.completed);

  const onDeleteHandler = useCallback(() => {
    deleteTodo(todo.id);
  }, [deleteTodo, todo.id]);

  const onTodoCompletedChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((ev) => {
      setCompleted(ev.target.checked);
    }, []);

  return (
    <div className="flex gap-2 justify-start">
      <span
        className={`block w-56 font-semibold ${completed ? 'line-through decoration-2' : ''}`}
      >
        {todo.value}
      </span>
      <input
        type="checkbox"
        checked={completed}
        onChange={onTodoCompletedChange}
        className="hover:scale-125 cursor-pointer"
      />
      <button
        className="bg-transparent border-transparent cursor-pointer hover:scale-125"
        type="button"
        onClick={onDeleteHandler}
      >
        🗑️
      </button>
    </div>
  );
};

export const TodoList = ({ todos, deleteTodo }: TodoListProps): JSX.Element => (
  <div>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
    ))}
  </div>
);

export const App = (): JSX.Element => {
  useScan({
    enabled: true,
    log: true,
  });

  const [todos, setTodos] = useState<TodoData[]>(DEFAULT_TODOS);
  const [newTodoValue, setNewTodoValue] = useState<string>('');
  const generateIdRef = useRef(
    Math.max(...DEFAULT_TODOS.map((todo) => todo.id))
  );

  const generateId = useCallback(() => {
    generateIdRef.current += 1;
    return generateIdRef.current;
  }, []);

  const changeNewTodoValueHandler: ChangeEventHandler<HTMLInputElement> =
    useCallback((ev) => {
      setNewTodoValue(ev.target.value);
    }, []);

  const addTodoHandler: FormEventHandler = useCallback(
    (ev) => {
      ev.preventDefault();

      setTodos((values) => [
        ...values,
        { id: generateId(), value: newTodoValue, completed: false },
      ]);
      setNewTodoValue('');
    },
    [generateId, newTodoValue]
  );

  const deleteTodoHandler = useCallback((todoId: number) => {
    setTodos((values) => values.filter((todo) => todo.id !== todoId));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Todo List</h1>
      <div className="flex flex-col gap-2">
        <form onSubmit={addTodoHandler} className="flex gap-2">
          <input
            type="text"
            className="w-52"
            value={newTodoValue}
            onChange={changeNewTodoValueHandler}
          />
          <button type="submit" className="cursor-pointer">
            Add todo
          </button>
        </form>
        <TodoList todos={todos} deleteTodo={deleteTodoHandler} />
      </div>
    </div>
  );
};
