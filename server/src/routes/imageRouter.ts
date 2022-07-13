import { Router } from "express";
import { getImageController, uploadImageController } from "../controller/imageController";

const imageRouter = Router()

imageRouter.post("/", uploadImageController)
imageRouter.get("/:fileName.:extension", getImageController)

export default imageRouter