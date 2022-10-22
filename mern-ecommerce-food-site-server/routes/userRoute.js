import express from "express";

import {
  userLogin,
  userRegister,
} from "../controllers/userController.js";

import { verifyUser, verifyAdmin } from "../utils/veryfyToken.js";

const router = express.Router()

router.post("/register", userRegister)
router.post("/login", userLogin)

export default router