import express from "express"
import {logOutController, refreshAccessTokenController, signInController, signUpController} from "../controllers/authController"
const router = express.Router();

//Those routes dont need deserializingUser middleware
router.post("/api/v1/signup", signUpController)
router.post("/api/v1/signin", signInController)
router.delete("/api/v1/logout", logOutController)
router.post("/api/v1/refresh", refreshAccessTokenController);

export default router
