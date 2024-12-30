import sequelize from "../utils/database.mjs";
import User from "./users.model.mjs";
import Task from "./tasks.model.mjs";

// Add models to Sequelize instance
const models = {
  User,
  Task
};

// Initialize model associations if needed
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export default models;
