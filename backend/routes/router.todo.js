const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST add todo
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({ text: req.body.text });
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
