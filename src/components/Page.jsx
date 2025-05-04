import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch('https://todo-list-vj48.onrender.com/api/todos');
      const json = await res.json();
      if (json.success) setTodos(json.data);
    } catch (e) {
      toast.error('Failed to load todos');
    }
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    try {
      const res = await fetch('https://todo-list-vj48.onrender.com/api/todos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: task })
      });
      const json = await res.json();
      if (json.success) {
        toast.success('successfully added')
        setTodos([json.data, ...todos]);
        setTask('');
      }
    } catch (e) {
      toast.error('Failed to add todo');
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await fetch(`https://todo-list-vj48.onrender.com/api/todos/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      const json = await res.json();
      if (json.success) {
        setTodos(todos.map(t => t._id === id ? json.data : t));
      }
    } catch (e) {
      toast.error('Failed to update');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://todo-list-vj48.onrender.com/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(t => t._id !== id));
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-white">Todo List</h1>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 text-black border-teal-950 rounded-lg"
            placeholder="New task"
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyDown={e => e.key==='Enter' && addTodo()}
          />
          <button onClick={addTodo} className="bg-white text-purple-600 px-4 cursor-pointer rounded-lg">Add</button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo._id} className="flex justify-between bg-white/50 p-3 rounded-lg">
              <span
                onClick={() => toggleComplete(todo._id, todo.completed)}
                className={todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}
              >{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} className="text-red-600">✕</button>
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </div>
  );
}