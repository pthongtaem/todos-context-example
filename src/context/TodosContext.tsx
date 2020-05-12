import React, { createContext, useReducer, useContext } from 'react';
import {
  TodosState,
  TodosActionTypes,
  ADD_TODO,
  TOGGLE_TODO,
  AddTodoAction,
  ToggleTodoAction,
} from './types/todos';

// Initial state
const initialState: TodosState[] = [];

export const TodosContext = createContext<
  Partial<{
    items: TodosState[];
    dispatch: React.Dispatch<TodosActionTypes>;
  }>
>({});

// Action creators
let nextTodoId = 0;
export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payloads: {
    id: nextTodoId++,
    text,
  },
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payloads: {
    id,
  },
});

// Reducer
export function todosReducer(
  state: TodosState[] = [],
  action: TodosActionTypes,
): TodosState[] {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.payloads.id,
          text: action.payloads.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo: TodosState) => {
        return todo.id === action.payloads.id
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
    default:
      return state;
  }
}

function TodosProvider(props: any) {
  const [items, dispatch] = useReducer(todosReducer, initialState);

  const todoData = { items, dispatch };

  return <TodosContext.Provider value={todoData} {...props} />;
}

function useTodosContext() {
  return useContext(TodosContext);
}

export { TodosProvider, useTodosContext };
