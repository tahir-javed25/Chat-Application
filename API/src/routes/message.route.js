import express from "express";
import { protectRoute } from "../Middleware/auth.middleware.js";
import { getAllUsers, getMessages, sendMessages } from "../Controller/message.controller.js";


const router = express.Router();

router.get("/users", protectRoute,getAllUsers);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages)


export const messageRouter = router