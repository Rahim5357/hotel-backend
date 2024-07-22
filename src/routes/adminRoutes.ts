import express, { Router } from "express";
import { loginUser, createUser, updateUser, getUsers, deleteUser } from "../controllers/adminControllers";
import { authenticateToken } from "../middleware/auth";

const router: Router = express.Router();

// Define routes with appropriate HTTP methods and descriptive function names
router.post("/login", loginUser);

router.use(authenticateToken);

router.post("/create", createUser);
router.get("/get", getUsers);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
