import { Request, Response } from "express";
import SuperAdmin, { SuperAdminDocument } from "../models/superAdminModels";

export const superAdminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string; password: string } = req.body;
        const superAdmin: SuperAdminDocument | null = await SuperAdmin.findOne({ email });

        if (!superAdmin) {
            res.status(404).json({ error: true, message: "User not found" });
            return;
        }
        res.status(200).json({ error: false, message: "User logged in successfully" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Server Error" });
    }
}


export const superAdminCreate = async (req: Request, res: Response) => {
    try {
        const { name, email, phone_number }: {
            name: string;
            email: string;
            phone_number: string
        } = req?.body;

        const superAdmin: SuperAdminDocument = new SuperAdmin({ name, email, phone_number });

        await superAdmin.save();
        res.status(201).json({ message: 'Super Admin registered successfully' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: true, message: "Server Error" });
    }
}