import React from "react";
import API from "../lib/api";
const Todo = ({ todo, todos, setTodos }) => {
  const deleteHandler = async () => {
    await API.todos.delete(todo.id);
    const updatedTodos = todos.filter((el) => el.id !== todo.id);
    setTodos(updatedTodos);
  };
  const completeHandler = async () => {
    const updatedTodo = await API.todos.patch(todo.id, {
      completed: !todo.completed,
      text: todo.text,
    });
    setTodos(
      todos.map((el) => {
        if (el.id === todo.id) {
          return updatedTodo;
        }
        return el;
      })
    );
  };
  return (
    <div data-testid="todo-item" className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {todo.text}
      </li>
      <button
        data-testid={`${todo.text}-todo-patch`}
        onClick={completeHandler}
        className="complete-btn"
      >
        <i className="fas fa-check"></i>
      </button>
      <button
        data-testid={`${todo.text}-todo-remove`}
        onClick={deleteHandler}
        className="trash-btn"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
