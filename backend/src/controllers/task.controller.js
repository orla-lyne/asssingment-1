const taskService = require("../services/task.service");

const getAll = async (req, res, next) => {
  try {
    const tasks = await taskService.findAll(req.user.id);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const task = await taskService.findById(req.params.id, req.user.id);
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const task = await taskService.create(req.body, req.user.id);
    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const task = await taskService.update(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await taskService.remove(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne, create, update, remove };
