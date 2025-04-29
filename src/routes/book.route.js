import { Router } from "express";
import { deteteBook, getAllBooks, getRecomendedBooksByUser } from "../controllers/book.controller.js";
import { ProtectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getallbooks").get(getAllBooks);
router.route("/deletebook/:id").delete(ProtectRoute, deteteBook); // Placeholder for getting a single book by ID
router.route("/getuserbooks").get(ProtectRoute, getRecomendedBooksByUser); // Placeholder for getting books by user ID


export default router;
