import React from "react";
import Todo from "./Todo";

export default function ToDoList({ todos, toggleTodo }) {
  return todos.map((todo) => (
    <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
  ));
}
