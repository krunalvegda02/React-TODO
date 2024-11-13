import { useState, useEffect } from "react";
import "./App.css";
import { ToDoProvider } from "./Context/todoContext";
import TodoForm from "./ToDoForm";
import TodoItem from "./ToDoItem";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((oldTodo) => [...oldTodo, { ...todo, id: Date.now() }]); //* i spread our todo object and change the id and add it in oldTodo
  };

  const deleteTodo = (id) => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, todo) => {
    setTodos(
      (oldTodo) =>
        oldTodo.map((oldTodo) => (oldTodo.id === id ? todo : oldTodo)) //* if id is matched then update then todo otherwise pahele jaise todo rakho
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <ToDoProvider
      value={{ addTodo, deleteTodo, updateTodo, todos, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <todoItem todo={todo} />
              </div>
            ))}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}
