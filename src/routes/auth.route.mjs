import express from "express";
const router = express.Router();
import {login, signup} from '../controllers/user.controller.mjs'

router.post("/signup", signup)
router.put("/login",login);

export default router;