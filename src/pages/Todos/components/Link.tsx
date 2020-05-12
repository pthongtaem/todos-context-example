import React from 'react';
import { Button } from 'antd';
import {
  useVisibilityFilterContext,
  setVisibilityFilter,
} from '../../../context/VisibilityFilterContext';
import { VisibilityFilters } from '../../../context/types/visibilityFilter';

const Link: React.FC<{ filter: VisibilityFilters }> = ({
  filter,
  children,
}) => {
  const { visibilityFilter, dispatch } = useVisibilityFilterContext();

  const active = visibilityFilter === filter;

  return (
    <Button
      onClick={() => dispatch!(setVisibilityFilter(filter))}
      disabled={active}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </Button>
  );
};

export default Link;
