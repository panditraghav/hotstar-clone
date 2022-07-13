import express, { Request, Response } from "express"
import { getShowsByGenreController, getShowsByTypeController, uploadShowController } from "../controller/showController"
import requireAdmin from "../middleware/requireAdmin"

const showRouter = express.Router()

showRouter.post("/", requireAdmin, uploadShowController)
// showRouter.get("/:_id", uploadShowController)
showRouter.get("/all/type=:type", getShowsByTypeController)
showRouter.get("/all/genre=:genre", getShowsByGenreController)

export default showRouter