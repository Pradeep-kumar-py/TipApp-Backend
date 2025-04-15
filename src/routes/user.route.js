import { Router } from "express";

import { generateNewAccessToken, getAllUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";




const router = Router();

router.route("/user").get((req, res) => {
    res.json(
        {"message": "Hello from the user route!"}
    );
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/getalluser").get(getAllUser);
router.route("/refresh-token").post(generateNewAccessToken);




export default router;