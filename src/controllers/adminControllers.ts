import { Request, Response, Router } from "express";
import User, { UserDocument } from "../models/adminModels";
import express from "express";
import { createAdminServices, deleteAdminServices, getAdminServices, loginAdminServices, updateAdminServices } from "../services/adminServices";


const adminRoutes: Router = express.Router();

// Handle for user login
adminRoutes.post("login", async (req: Request, res: Response) => {

    try {
        // Destructure email and phone number from the request body
        const { email, phone_number }: { email: string, phone_number: string } = req?.body;
        const result = await loginAdminServices({ email })

        if (result && result?.error) {
            res.status(404).json({ error: result?.error, message: result?.message });
        } else {
            res.status(200).json({ error: result?.error, message: result?.message, accessToken: result?.accessToken });
        }

    } catch (err) {
        throw err;
    }
})

// Handle for user create
adminRoutes.post("/create", async (req: Request, res: Response) => {
    try {
        const { name, email, phone_number, hostal_name, hostal_address, photo }: {
            name: string;
            email: string;
            phone_number: string;
            hostal_name: string;
            hostal_address: string;
            photo?: string;
        } = req?.body;

        const result = await createAdminServices({ name, email, phone_number, hostal_name, hostal_address, photo });

        if (result && result?.error) {
            res.status(409).json({ error: result?.error, message: result?.message });
        } else {
            res.status(201).json({ error: result?.error, message: result?.message });
        }
    } catch (err) {
        throw err;
    }
})

// Handle for user update
adminRoutes.put("/update", async (req: Request, res: Response) => {
    try {
        const { id, name, email, phone_number, hostal_name, hostal_address, photo }: {
            id: string;
            name: string;
            email: string;
            phone_number: string;
            hostal_name: string;
            hostal_address: string;
            photo?: string;
        } = req?.body;
        const result = await updateAdminServices({ id, name, email, phone_number, hostal_name, hostal_address, photo });
        if (result && result?.error) {
            res.status(404).json({ error: result?.error, message: result?.message });
        } else {
            res.status(200).json({ error: result?.error, message: result?.message, data: result?.data })
        }
    } catch (err) {
        throw err;
    }
})

// Handle for user read
adminRoutes.get("/get", async (req: Request, res: Response) => {
    try {
        const result = await getAdminServices()
        res.status(200).json({ error: result?.error, message: result?.message, data: result?.data });
    } catch (err) {
        throw err;
    }
})

// Handle for user delete
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id }: { id: string } = req.body;
        const result = await deleteAdminServices({ id });

        if (result && result?.error) {
            res.status(404).json({ error: result?.error, message: result?.message });
        } else {
            res.status(200).json({ error: result?.error, message: result?.message });
        }
    } catch (err) {
        throw err;
    }
};

export default adminRoutes;