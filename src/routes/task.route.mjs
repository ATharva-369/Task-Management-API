import express from 'express';
const router = express.Router();
import { createTask, deleteTask, fetchTasks, updateTask } from '../controllers/task.controller.mjs';
import authenticate from '../middleware/authMiddleware.mjs';

router.post('/create-task',authenticate,createTask);
router.get('/get-tasks',authenticate,fetchTasks);
router.put('/update-task',authenticate,updateTask);
router.delete('/delete-task',authenticate,deleteTask);

export default router;