import { Router } from "express";

const router = Router();

import { login, register, remove, reset } from "../controlers/user.js";

router.post("/",register)

router.delete("/",remove),

router.post("/login",login)

router.put("/reset",reset)

export default router;