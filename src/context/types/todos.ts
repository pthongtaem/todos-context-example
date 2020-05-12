export const ADD_TODO = 'todos-context-example/todos/ADD_TODO';
export const TOGGLE_TODO = 'todos-context-example/todos/TOGGLE_TODO';

export interface TodosState {
  id: number;
  text: string;
  completed: boolean;
}

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payloads: { id: number; text: string };
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payloads: { id: number };
}

export type TodosActionTypes = AddTodoAction | ToggleTodoAction;
