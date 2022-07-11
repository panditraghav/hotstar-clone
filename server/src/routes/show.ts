import express, { Request, Response } from "express"
import { uploadShowController } from "../controller/showController"
import requireAdmin from "../middleware/requireAdmin"

const showRouter = express.Router()

showRouter.post("/", requireAdmin, uploadShowController)

export default showRouter