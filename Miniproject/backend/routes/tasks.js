// backend/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async(req, res) => {
    const newTask = new Task(req.body);
    try {
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all tasks
router.get('/', async(req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single task
router.get('/:id', async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', async(req, res) => {
    try {
        const { title, description, completed } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', async(req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;