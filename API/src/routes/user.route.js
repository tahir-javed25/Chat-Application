import express, { Router } from "express";
import { checkAuth, login, logout, signup, update} from "../Controller/user.controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";


// const router = express.Router();
const router = Router();

router.post("/signup", signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/update-profile",protectRoute,update)
router.get("/check",protectRoute,checkAuth)

export const userRouter = router;