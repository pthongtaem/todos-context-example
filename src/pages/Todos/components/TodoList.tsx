import React from 'react';
import Todo from './Todo';
import { useTodosContext, toggleTodo } from '../../../context/TodosContext';
import { useVisibilityFilterContext } from '../../../context/VisibilityFilterContext';
import { TodosState } from '../../../context/types/todos';
import { VisibilityFilters } from '../../../context/types/visibilityFilter';

const getVisibleTodos = (todos: TodosState[], filter: VisibilityFilters) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const TodoList = () => {
  const { items, dispatch: todoDispatch } = useTodosContext();
  const { visibilityFilter } = useVisibilityFilterContext();

  const todos = getVisibleTodos(items!, visibilityFilter!);

  return (
    <ul>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => todoDispatch!(toggleTodo(todo.id))}
        />
      ))}
    </ul>
  );
};

export default TodoList;
