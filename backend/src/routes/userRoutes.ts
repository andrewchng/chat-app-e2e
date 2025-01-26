import userController from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/clear", userController.clearAllUsers)

export default router;