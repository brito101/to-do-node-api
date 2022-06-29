import { Router } from "express"

import * as TodoController from "../controllers/todoController"

const router = Router()

router.get("/", TodoController.ping)
router.get("/todo", TodoController.all)
router.post("/todo", TodoController.add)
router.put("/todo/:id", TodoController.edit)
router.delete("/todo/:id", TodoController.remove)

export default router
