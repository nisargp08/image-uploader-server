import { Router } from "express";
import * as controller from "./file_upload.controller";

const router = Router();

// /api/file_upload
router.route("/")
.post(controller.uploadFile);

// /api/file_upload/:id
router.route("/:id").get(controller.getOne);

export default router;
// export default images;