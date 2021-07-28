const { TODOS } = require("../../../models/index");
class TodosService {

    async getAllTodos(req, res) {
        const todos = await TODOS.findAll()
        res.send(todos);
    }

    async fetchTodo(req, res) {
        const todo = await TODOS.findByPk(req.params.id);
        if (todo) {
            res.send(todo);
        } else {
            res.status(404).send("Todo not found");
        }
    }

    async saveTodo(req, res) {
        const todo = await TODOS.create(req.body);
        res.send(todo);
    }

    async updateTodo(req, res) {
        await TODOS.update({
            completed: req.body.completed
        }, { where: { id: req.params.id } })
        const todo = await TODOS.findByPk(req.params.id);
        res.send(todo);
    }

    async deleteTodo(req, res) {
        const todo = await TODOS.findByPk(req.params.id); process
        await TODOS.destroy({
            where: { id: req.params.id }
        })
        res.send(todo);
    }
}

module.exports = new TodosService()