import { Router } from "express"
import { body } from "express-validator"

import {
  register,
  list,
  modify,
  deleteUser,
  currentUser,
  login
} from "../app/http/controller/auth"
import { requireAuth } from "../app/http/middleware/require-auth"

const router = Router()

router.get("/api/users", requireAuth, list)
router.put("/api/users/:id", modify)
router.delete("/api/users/:id", deleteUser)

router.post(
  "/api/auth/register",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username field in compulsory!"),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password field in compulsory!")
  ],
  register
)
router.get("/api/auth/current", currentUser)
router.post("/api/auth/login", login)

export default router
