const Task = require('../../models/Task');

async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: 'desc' });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to access this task' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      user: req.user._id
    });
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// async function updateTask(req, res, next) {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }
//     if (task.user.toString() !== req.user._id) {
//       return res.status(403).json({ message: 'You are not authorized to update this task' });
//     }
//     task.name = req.body.name;
//     task.description = req.body.description;
//     task.date = req.body.date;
//     await task.save();
//     res.json(task);
//   } catch (err) {
//     next(err);
//   }
// }

// async function updateCompletedTask(taskId, userId) {
//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: taskId, user: userId, completed: true },
//       { $set: { completed: false } },
//       { new: true }
//     );
//     if (!task) {
//       throw new Error('Task not found or not completed by this user');
//     }
//     return task;
//   } catch (err) {
//     throw err;
//   }
// }


async function deleteTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to delete this task' });
    }
    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateCompletedTask,
};
