import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001/api/todos", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          text: "Coffe",
          completed: true,
          createdAt: "2021-08-16T23:06:24.000Z",
          updatedAt: "2021-08-16T23:06:24.000Z",
        },
        {
          id: 2,
          text: "Coding",
          completed: false,
          createdAt: "2021-08-16T23:06:24.000Z",
          updatedAt: "2021-08-16T23:06:24.000Z",
        },
        {
          id: 3,
          text: "Assignment",
          completed: false,
          createdAt: "2021-08-16T23:06:24.000Z",
          updatedAt: "2021-08-16T23:06:24.000Z",
        },
      ])
    );
  }),
  rest.post("http://localhost:3001/api/todos", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 5,
        text: "Movie",
        completed: false,
        updatedAt: "2021-08-18T20:34:20.294Z",
        createdAt: "2021-08-18T20:34:20.294Z",
      })
    );
  }),
  rest.delete("http://localhost:3001/api/todos/1", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        text: "Coffe",
        completed: true,
        createdAt: "2021-08-18T22:06:38.000Z",
        updatedAt: "2021-08-18T22:06:38.000Z",
      })
    );
  }),
  rest.patch("http://localhost:3001/api/todos/1", (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        text: "Coffe",
        completed: true,
        createdAt: "2021-08-18T22:06:38.000Z",
        updatedAt: "2021-08-18T22:06:38.000Z",
      })
    );
  }),
];
