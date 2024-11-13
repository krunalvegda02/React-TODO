import React from "react";
import { useContext, createContext } from "react";

export const ToDoContext = createContext({
  todos: [ 
    { 
      id : 1,
      todomsg : "todomsg",
      completed : false,  
    }
  ],
  addTodo: (todomsg) => {},
  updateTodo: (id, todomsg) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const ToDoProvider = ToDoContext.Provider;

export const useTodo = () => {
  return useContext(ToDoContext);
};

// export { ToDoContext, ToDoProvider, useTodo } from "./Context/TodoContext";