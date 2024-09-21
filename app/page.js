'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    if (!response.ok) {
      console.error('Failed to fetch todos:', response.status);
      return;
    }
    const data = await response.json();
    console.log(data); // 데이터를 콘솔에 출력
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (!todoText) return;
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: todoText }),
    });
    if (response.ok) {
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setTodoText('');
    } else {
      console.error('Failed to add todo:', response.status);
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const response = await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, text: todo.text, completed: !todo.completed }),
    });
    if (response.ok) {
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } else {
      console.error('Failed to update todo:', response.status);
    }
  };

  const handleDeleteTodo = async (id) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      console.error('Failed to delete todo:', response.status);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow">
      <h1 className="text-xl font-bold mb-5">Todo App</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        className="border p-2 w-full mb-4"
        placeholder="Add a new todo..."
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Todo
      </button>
      <div className="mt-5">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
