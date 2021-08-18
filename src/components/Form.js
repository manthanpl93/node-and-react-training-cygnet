import React from "react";
import API from "../lib/api";
const Form = ({
  inputText,
  setInputText,
  todos,
  setTodos,
  setStatus,
  filterHandler,
}) => {
  const inputTextHandler = function (e) {
    setInputText(e.target.value);
  };

  const submitTodoHandler = async function (e) {
    e.preventDefault();
    const todo = await API.todos.create({
      text: inputText,
      completed: false,
    });
    setTodos(todos.concat(todo));
    setInputText("");
  };

  const statusHandler = function (e) {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        data-testid="todo-input"
        value={inputText}
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
      />
      <button
        onClick={submitTodoHandler}
        className="todo-button"
        type="submit"
        data-testid="submit-button"
      >
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select
          onChange={statusHandler}
          name="todos"
          className="filter-todo"
          data-testid="filter-todo"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
