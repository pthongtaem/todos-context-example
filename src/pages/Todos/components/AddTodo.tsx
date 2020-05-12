import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useTodosContext, addTodo } from '../../../context/TodosContext';

const AddTodo = () => {
  const [value, setValue] = useState('');
  const { dispatch } = useTodosContext();

  return (
    <div>
      <Input
        value={value}
        style={{ width: '400px' }}
        onChange={e => setValue(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() => {
          if (value.trim()) {
            dispatch!(addTodo(value));
            setValue('');
          }
        }}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
