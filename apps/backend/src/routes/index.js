import express from "express";
import employees from "./employees.js";
import shifts from "./shifts.js";
import locations from "./locations.js";
import positions from "./positions.js";

const router = express.Router();

router.use("/employees", employees);
router.use("/shifts", shifts);
router.use("/locations", locations);
router.use("/positions", positions);

export default router;
