const express = require('express');
const { validationResult, checkSchema } = require('express-validator');
const Validator = require("./todos.validation");
const router = express.Router();
const TodoService = require("./todos.service");

router.get('/', async (req, res) => {
    TodoService.getAllTodos(req, res)
})

router.get('/:id', async (req, res) => {
    TodoService.fetchTodo(req, res)
})

router.post('/', Validator.create(), async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        TodoService.saveTodo(req, res)
    } else {
        res.status(422).send(errors.array())
    }
})

router.patch('/:id', Validator.create(), async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        TodoService.updateTodo(req, res)
    } else {
        res.status(422).send(errors.array())
    }
})

router.delete('/:id', async (req, res) => {
    TodoService.deleteTodo(req, res)
})

module.exports = router;
