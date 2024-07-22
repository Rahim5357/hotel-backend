import { Router } from 'express';
import superAdminRoutes from './superAdminRoutes';
import userRoutes from "./adminRoutes";
import customerRoutes from "./customerRoutes";

const router = Router();

// Define Routes
router.use('/superAdmin', superAdminRoutes);
router.use('/user', userRoutes);
router.use('/customer', customerRoutes);

export default router;
