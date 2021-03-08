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
import { authorize } from "../util/access-management"

const router = Router()

router.get("/api/users", requireAuth, authorize("role:admin"), list)
router.put("/api/users/:id", authorize("role:manager,author"), modify)
router.delete("/api/users/:id", deleteUser)

router.post("/api/auth/register", RegisterRequest.getChain(), register)
router.get("/api/auth/current", currentUser)
router.post("/api/auth/login", login)

export default router
