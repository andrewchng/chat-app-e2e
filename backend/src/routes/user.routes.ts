import userController from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);
router.get("/register", userController.registerUser);
router.get("/clear", userController.clearAllUsers)

export default router;