import sequelize from "./src/utils/database.mjs";
import express from "express";
import models from "./src/models/index.mjs";
import authRoute from "./src/routes/auth.route.mjs";
import taskRoute from "./src/routes/task.route.mjs";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };

dotenv.config();

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been made successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database ", error);
  });

sequelize
  .sync({ alter: true }) // Synchronizes all models
  .then(() => {
    console.log("All models synchronized");
  })
  .catch((err) => {
    console.error("Error syncing models:", err);
  });

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/task",taskRoute);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
