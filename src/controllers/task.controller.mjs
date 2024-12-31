import Task from "../models/tasks.model.mjs";

export const createTask = async (req, res) => {
  try {
    const userId = req.id;
    const { title, description, priority, status, dueDate } = req.body;

    if (!title || !priority || !dueDate) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const newTask = await Task.create({
      title,
      priority,
      dueDate,
      createdBy: userId,
      description: description || null,
      status: status || null,
    });

    return res.status(200).json({
      message: "Task created successfully",
    });
  } catch (error) {
    console.error("Error creating task: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const fetchTasks = async (req, res) => {
  try {
    const userId = req.id;
    const { priority, status, dueDate, limit = 10, page = 1 } = req.query;

    const whereClause = { createdBy: userId };

    if (priority) whereClause.priority = priority;
    if (status) whereClause.status = status;
    if (dueDate) whereClause.dueDate = dueDate;

    const tasks = await Task.findAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit, // Calculate the starting point
      order: [["id", "ASC"]],
      where: whereClause,
    });
    return res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { taskId, title, description, priority, status, dueDate } = req.body;
    const userId = req.id;
    console.log(userId);

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(priority && { priority }),
      ...(status && { status }),
      ...(dueDate && { dueDate }),
    };

    const task = await Task.update(updateData, {
      where: {
        createdBy: userId,
        id: taskId,
      },
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating tasks: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const userId = req.id;
    const { taskId } = req.body;

    const destroyCount = await Task.destroy({
      where: {
        createdBy: userId,
        id: taskId,
      },
    });

    if (destroyCount == 0) {
      return res.status(404).json({
        message: "Task does not exist",
      });
    }

    return res.status(200).json({
      message: "Task destroyed successfully",
    });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
