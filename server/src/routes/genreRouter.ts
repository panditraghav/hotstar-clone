import { Router } from "express";
import { createGenreController, getGenreController } from "../controller/genreController";
import requireAdmin from "../middleware/requireAdmin";

const genreRouter = Router()

genreRouter.post("/", requireAdmin, createGenreController)
genreRouter.get("/", getGenreController)

export default genreRouter