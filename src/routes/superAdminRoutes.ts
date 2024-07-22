import express, { Router } from "express";
import { superAdminLogin, superAdminCreate } from "../controllers/superAdminControllers";

const router: Router = express.Router();

router.post("/login", superAdminLogin);
router.post("/create", superAdminCreate);

export default router;