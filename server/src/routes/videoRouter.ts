import { Router } from "express";
import { streamVideoController, uploadVideoController } from "../controller/videoController";
import requireAdmin from "../middleware/requireAdmin";
import requireUser from "../middleware/requireUser";

const videoRouter = Router()

videoRouter.post("/", requireAdmin, uploadVideoController)
videoRouter.get("/:fileName-:mimeType", requireUser, streamVideoController)

export default videoRouter