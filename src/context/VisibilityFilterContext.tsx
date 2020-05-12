import React, { createContext, useReducer, useContext } from 'react';
import {
  VisibilityFilters,
  VisibilityFilterActionTypes,
  SET_VISIBILITY_FILTER,
  SetVisibilityFilterAction,
} from './types/visibilityFilter';

// Initial state
const initialState: VisibilityFilters = VisibilityFilters.SHOW_ALL;

export const VisibilityFilterContext = createContext<
  Partial<{
    visibilityFilter: VisibilityFilters;
    dispatch: React.Dispatch<VisibilityFilterActionTypes>;
  }>
>({});

// Action creators
export const setVisibilityFilter = (
  filter: VisibilityFilters,
): SetVisibilityFilterAction => ({
  type: SET_VISIBILITY_FILTER,
  payloads: { filter },
});

// Reducer
export function visibilityFilterReducer(
  state: VisibilityFilters = VisibilityFilters.SHOW_ALL,
  action: VisibilityFilterActionTypes,
) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.payloads.filter;
    default:
      return state;
  }
}

function VisibilityFilterProvider(props: any) {
  const [visibilityFilter, dispatch] = useReducer(
    visibilityFilterReducer,
    initialState,
  );

  const visibilityFilterData = { visibilityFilter, dispatch };

  return (
    <VisibilityFilterContext.Provider value={visibilityFilterData} {...props} />
  );
}

function useVisibilityFilterContext() {
  return useContext(VisibilityFilterContext);
}

export { VisibilityFilterProvider, useVisibilityFilterContext };
