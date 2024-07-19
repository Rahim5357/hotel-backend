import express, { Router } from "express";
import { superAdminLogin, superAdminCreate } from "../controllers/superAdminControllers";

const router: Router = express.Router();

router.post("/superAdmin/login", superAdminLogin);
router.post("/superAdmin/create", superAdminCreate);

export default router;