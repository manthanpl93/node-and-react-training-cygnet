const express = require('express');
const router = express.Router();
const { TODOS } = require("../models");

router.get('/', async (req, res) => {
    const todos = await TODOS.findAll()
    res.send(todos);
})

router.get('/:id', async (req, res) => {
    const todo = await TODOS.findByPk(req.params.id);
    if (todo) {
        res.send(todo);
    } else {
        res.status(404).send("Todo not found");
    }
})

router.post('/', async (req, res) => {
    const todo = await TODOS.create(req.body);
    res.send(todo);
})

router.patch('/:id', async (req, res) => {
    await TODOS.update({
        completed: req.body.completed
    }, { where: { id: req.params.id } })
    const todo = await TODOS.findByPk(req.params.id);
    res.send(todo);
})

router.delete('/:id', async (req, res) => {
    const todo = await TODOS.findByPk(req.params.id); process
    await TODOS.destroy({
        where: { id: req.params.id }
    })
    res.send(todo);
})

module.exports = router;
