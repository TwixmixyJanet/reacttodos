import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    console.log("Component mounted. Fetching todos from local storage...");
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos && storedTodos.length > 0) {
      console.log("Found todos in local storage:", storedTodos);
      setTodos(storedTodos);
    } else {
      console.log("No todos found in local storage.");
    }
  }, []);

  useEffect(() => {
    console.log("Todos state updated. Saving todos to local storage:", todos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value.trim();
    if (name === "") return;
    const newTodo = { id: uuidv4(), name: name, complete: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    todoNameRef.current.value = "";
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
      <div>{todos.length} todos overall</div>
    </>
  );
}

export default App;
