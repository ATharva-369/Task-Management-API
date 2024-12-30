import { DataTypes } from "sequelize";
import sequelize from "../utils/database.mjs";
import User from "./users.model.mjs";

sequelize.authenticate().then(() => {
    console.log('Connection has been made successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database ', error);
});

const Task = sequelize.define("tasks", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdBy : {
        type: DataTypes.INTEGER,
        references: {
          model: User,    // Refers to the 'User' model
          key: 'id'       // Refers to the 'id' column in the User table
        }    }
})

export default Task;