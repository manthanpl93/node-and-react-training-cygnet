const request = require("supertest");
const app = require("../../../app");
const { TODOS } = require("../../../models/index");

describe("todos api", () => {
  beforeEach(async () => {
    await TODOS.bulkCreate([
      { id: 1, text: "Coffe", completed: 1 },
      { id: 2, text: "Coding", completed: 0 },
      { id: 3, text: "Assignment", completed: 0 },
      { id: 4, text: "Essay writing", completed: 0 },
    ]);
  });

  afterEach(async () => {
    await TODOS.destroy({
      where: {},
      truncate: true,
    });
  });

  test("Fetch todos", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(4);
  });

  test("Create todos", async () => {
    const res = await request(app).post("/api/todos").send({
      text: "Coffe",
      completed: false,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(5);
    expect(res.body.text).toEqual("Coffe");
    expect(res.body.completed).toEqual(false);
  });

  test("Update todos", async () => {
    const res = await request(app).patch("/api/todos/2").send({
      text: "Coffe",
      completed: true,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.completed).toEqual(true);
  });

  test("Delete todos", async () => {
    const res = await request(app).delete("/api/todos/2");
    expect(res.statusCode).toEqual(200);
    const todos = await TODOS.findAll();
    expect(todos.length).toEqual(3);
  });
});
