import { DataTypes } from "sequelize";
import sequelize from "../utils/database.mjs";

sequelize.authenticate().then(() => {
    console.log('Connection has been made successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database ', error);
})


const User = sequelize.define("users", {
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;