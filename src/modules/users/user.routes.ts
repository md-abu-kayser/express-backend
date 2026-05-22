import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "@/middlewares/validate";
import { registerSchema, loginSchema } from "./user.validation";
import { authenticate } from "@/middlewares/auth";

const router = Router();
const controller = new UserController();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.get("/profile", authenticate, controller.getProfile);

export default router;
