const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, user: req.userId });
  await task.save();
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
};

exports.getTaskSummary = async (req, res) => {
    try {
      const totalTasks = await Task.countDocuments({ user: req.userId });
      const pendingTasks = await Task.countDocuments({ user: req.userId, status: 'Pending' });
      const completedTasks = await Task.countDocuments({ user: req.userId, status: 'Completed' });
  
      res.json({
        totalTasks,
        pendingTasks,
        completedTasks,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };