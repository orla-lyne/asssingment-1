const prisma = require("../config/database");
const AppError = require("../utils/appError");

const allowedStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];

const findAll = (userId) =>
  prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

const findById = async (id, userId) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new AppError("Task not found", 404);
  return task;
};

const create = (data, userId) =>
  prisma.task.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim() || "",
      status: data.status || "PENDING",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      userId,
    },
  });

const update = async (id, data, userId) => {
  await findById(id, userId);
  return prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title.trim() }),
      ...(data.description !== undefined && { description: data.description.trim() }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.dueDate !== undefined && {
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      }),
    },
  });
};

const remove = async (id, userId) => {
  await findById(id, userId);
  await prisma.task.delete({ where: { id } });
};

module.exports = { allowedStatus, findAll, findById, create, update, remove };
