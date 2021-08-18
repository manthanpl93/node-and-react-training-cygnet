import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { server } from "./mocks/server";
import userEvent from "@testing-library/user-event";

test("Display todo lists", async () => {
  render(<App />);
  const todos = await screen.findAllByTestId("todo-item");
  expect(todos).toHaveLength(3);
});

test("Display empty todo message", async () => {
  //Override default mock response
  server.resetHandlers(
    rest.get("http://localhost:3001/api/todos", (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );
  render(<App />);
  await waitFor(async () => {
    const noTodosMessage = await screen.getByTestId("no-todos");
    expect(noTodosMessage).toBeInTheDocument();
  });
});

test("Completed filter", async () => {
  render(<App />);

  await screen.findAllByTestId("todo-item");
  userEvent.selectOptions(screen.getByTestId("filter-todo"), "completed");
  const updatedTodos = await screen.findAllByTestId("todo-item");
  expect(updatedTodos).toHaveLength(1);
});

test("Add todo list", async () => {
  render(<App />);

  await screen.findAllByTestId("todo-item");

  const inputBox = screen.getByTestId("todo-input");
  userEvent.type(inputBox, `Movie`);

  const saveButton = screen.getByTestId("submit-button");
  userEvent.click(saveButton);

  await waitFor(async () => {
    const newTodoLists = await screen.findAllByTestId("todo-item");
    expect(newTodoLists).toHaveLength(4);
  });
});

test("Delete todo list", async () => {
  render(<App />);
  const coffeTodoDeleteBtn = await screen.findByTestId("Coffe-todo-remove");
  userEvent.click(coffeTodoDeleteBtn);
  await waitFor(async () => {
    const todos = await screen.findAllByTestId("todo-item");
    expect(todos).toHaveLength(2);
  });
});

test("Update todo list to completed to uncompleted", async () => {
  render(<App />);
  const coffeTodoPatchBtn = await screen.findByTestId("Coffe-todo-patch");
  userEvent.click(coffeTodoPatchBtn);
  await waitFor(async () => {
    userEvent.selectOptions(screen.getByTestId("filter-todo"), "uncompleted");
    const updatedTodos = await screen.findAllByTestId("todo-item");
    expect(updatedTodos).toHaveLength(3);
  });
});
