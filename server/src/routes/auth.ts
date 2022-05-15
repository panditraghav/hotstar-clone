import * as bcrypt from "bcrypt"
import { Router, Request, Response } from "express";
import {authController, loginController, registerController } from "../controller/authController"
const authRouter = Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.post("/", authController)

export default authRouter