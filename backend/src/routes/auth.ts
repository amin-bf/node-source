import { Router } from "express"

import { register, list, modify, deleteUser } from "../app/http/controller/auth"

const router = Router()

router.post("/api/users", register)
router.get("/api/users", list)
router.put("/api/users/:id", modify)
router.delete("/api/users/:id", deleteUser)

export default router
