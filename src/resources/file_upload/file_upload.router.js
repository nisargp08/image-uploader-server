import { Router } from "express";
import * as controller from "./file_upload.controller";

const router = Router();

// /api/file_upload
router.route("/").get(controller.uploadFile).post(controller.uploadFile);

export default router;