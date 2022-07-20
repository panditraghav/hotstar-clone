import express, { Request, Response } from "express"
import { getShowsByGenreController, deleteShowController, updateShowController, getShowByIdController, getShowsByTypeController, uploadShowController } from "../controller/showController"
import requireAdmin from "../middleware/requireAdmin"

const showRouter = express.Router()

showRouter.post("/", requireAdmin, uploadShowController)
showRouter.patch("/", requireAdmin, updateShowController)
showRouter.delete("/:id", requireAdmin, deleteShowController)
showRouter.get("/:id", getShowByIdController)
showRouter.get("/all/type=:type", getShowsByTypeController)
showRouter.get("/all/genre=:genre", getShowsByGenreController)

export default showRouter