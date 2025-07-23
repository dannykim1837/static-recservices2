import express from "express";
import { getMany, getOne, create, update, deleteOne } from "../controllers/shifts.js";

const router = express.Router();

router.get("/", getMany);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteOne);

export default router;
