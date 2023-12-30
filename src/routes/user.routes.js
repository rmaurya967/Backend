import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
// import { app } from "../app.js";

const router = Router()

router.route("/register").post(registerUser);


export default router;