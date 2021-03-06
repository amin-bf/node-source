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
import { RegisterRequest } from "../app/http/request/auth/register-request"
import { permission } from "../util/access-management"

const router = Router()

router.get("/api/users", requireAuth, list)
router.put("/api/users/:id", modify)
router.delete("/api/users/:id", deleteUser)

router.post(
  "/api/auth/register",
  permission("user.viewAny"),
  RegisterRequest.getChain(),
  register
)
router.get("/api/auth/current", currentUser)
router.post("/api/auth/login", login)

export default router
