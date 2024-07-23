import { Request, Response, Router } from "express";
import express from "express"
import { createSuperAdminServices, loginSuperAdminServices } from "../services/superAdminServices";

const superAdminRoutes: Router = express.Router()

// Handler for Super Admin Login
export const superAdminLogin = async (req: Request, res: Response) => {
    try {
        // Destructure email and phone number from the request body
        const { email, phone_number }: { email: string; phone_number: string } = req.body;
        const result = await loginSuperAdminServices({ email })

        if (result && result?.error) {
            res.status(404).json({ error: result?.error, message: result?.message })
        } else {
            res.status(200).json({ error: result?.error, message: result?.message, accessToken: result?.accessToken })
        }
    } catch (err) {
        throw err;
    }
}

// Handler for creating a new Super Admin
export const superAdminCreate = async (req: Request, res: Response) => {
    try {
        // Destructure name, email, and phone_number from the request body
        const { name, email, phone_number }: {
            name: string;
            email: string;
            phone_number: string;
        } = req.body;

        const result = await createSuperAdminServices({ name, email, phone_number })

        if (result && result?.error) {
            res.status(409).json({ error: result?.error, message: result?.message })
        } else {
            res.status(201).json({ error: result?.error, message: result?.message })
        }
    } catch (err) {
        throw err;
    }
}

export default superAdminRoutes;

