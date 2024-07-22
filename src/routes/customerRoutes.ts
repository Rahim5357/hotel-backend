import express, { Router } from "express";
import { createCustomer, updateCustomer, getCustomer } from "../controllers/customerControllers";
import { authenticateToken } from "../middleware/auth";
const router: Router = express.Router();

router.use(authenticateToken);

router.post("/create", createCustomer);
router.put("/update", updateCustomer);
router.get("/get", getCustomer);
// router.delete("/delete", deleteCustomer);

export default router;