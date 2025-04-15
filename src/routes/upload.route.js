import { Router } from "express";
import { uploadBook, uploadProfileImage } from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ProtectRoute } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/book").post(ProtectRoute, upload.single("image"), uploadBook)
router.route("/profileimage").post(ProtectRoute, upload.single("profileImage") ,uploadProfileImage);


export default router;