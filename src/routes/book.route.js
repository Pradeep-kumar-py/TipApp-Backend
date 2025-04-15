import { Router } from "express";
import { deteteBook, getAllBooks } from "../controllers/book.controller.js";
import { ProtectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getallbooks").get(getAllBooks);
router.route("/deletebook/:id").delete(ProtectRoute, deteteBook); // Placeholder for getting a single book by ID


export default router;
