import React, { useState, useEffect, useCallback } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { ITodo } from '../interfaces';

declare var confirm: (question: string) => boolean;

export const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
    setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const toggleHandler = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  }, []);

  const removeHandler = useCallback((id: number) => {
    const shouldRemove = confirm('Вы уверены что хотите удалить элемент?');
    if (shouldRemove) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  }, []);

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false,
    };
    //setTodos([newTodo, ...todos]);
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <>
      <TodoForm onAdd={addHandler} />
      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        onRemove={removeHandler}
      />
    </>
  );
};
