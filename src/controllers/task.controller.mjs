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
  } catch (error) {}
};
export const updateTask = async (req, res) => {
  try {
  } catch (error) {}
};
export const deleteTask = async (req, res) => {
  try {
  } catch (error) {}
};
