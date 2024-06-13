const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json({ data: tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, priority, completed, recurring } = req.body;
    const newTask = await Task.create({ title, priority, completed, recurring });
    res.json({ data: newTask, message: "Task Added Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ data: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, priority, completed, recurring } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title;
    task.priority = priority;
    task.completed = completed;
    task.recurring = recurring;
    task.updatedAt = new Date();
    await task.save();
    res.json({ data: task, message: "Task Updated Successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task Deleted Successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
