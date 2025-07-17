import express from "express";
import { RegisterUser } from "../controllers/RegisterController.js";
import { getUsers, login } from "../controllers/LoginController.js";
const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", login);
router.get('/allusers',getUsers)
export default router;
