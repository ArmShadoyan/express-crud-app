import { Router } from "express";

const router = Router()

import { add, get, remove, update } from "../controlers/cars.js";



router.get("/",get);

router.post("/", add);

router.put("/", update)

router.delete("/", remove);


export default router;

