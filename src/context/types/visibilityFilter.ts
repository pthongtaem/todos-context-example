export const SET_VISIBILITY_FILTER =
  'todos-context-example/visibilityFilter/SET_VISIBILITY_FILTER';

export interface TodosState {
  id: number;
  text: string;
  completed: boolean;
}

export enum VisibilityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

export interface SetVisibilityFilterAction {
  type: typeof SET_VISIBILITY_FILTER;
  payloads: { filter: VisibilityFilters };
}

export type VisibilityFilterActionTypes = SetVisibilityFilterAction;
