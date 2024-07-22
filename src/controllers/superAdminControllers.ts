import { Request, Response } from "express";
import SuperAdmin, { SuperAdminDocument } from "../models/superAdminModels";

import jwt from 'jsonwebtoken';

// Load environment variables from a .env file into process.env
require('dotenv').config();


// Handler for Super Admin Login
export const superAdminLogin = async (req: Request, res: Response) => {
    try {
        // Destructure email and phone number from the request body
        const { email, phone_number }: { email: string; phone_number: string } = req.body;

        // Find the Super Admin by email
        const superAdmin: SuperAdminDocument | null = await SuperAdmin.findOne({ email });

        // Check if the Super Admin exists
        if (!superAdmin) {
            res.status(404).json({ error: true, message: "User not found" });
            return;
        }

        // Generate JWT token
        const accessToken = generateAccessToken({ id: superAdmin._id, name: superAdmin?.name, email: superAdmin?.email, phone_number: superAdmin?.phone_number }); // Assuming you want to include user ID in the token

        // Here you should validate the password (e.g., by comparing the hash)
        // Assuming password validation is done

        // If validation is successful
        res.status(200).json({ error: false, message: "User logged in successfully", accessToken });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Login Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
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

        // Find the Super Admin by email
        const existingSuperAdmin: SuperAdminDocument | null = await SuperAdmin.findOne({ email });

        if (!existingSuperAdmin) {
            // Create a new Super Admin instance if the email does not already exist
            const newSuperAdmin: SuperAdminDocument = new SuperAdmin({ name, email, phone_number });

            // Save the new Super Admin to the database
            await newSuperAdmin.save();

            // Send a success response indicating the Super Admin was registered successfully
            res.status(201).json({ error: false, message: 'Super Admin registered successfully' });
        } else {
            // Send an error response indicating the email is already in use
            res.status(409).json({ error: true, message: 'Email already in use' });
        }


    } catch (err) {
        // Log the error for debugging purposes
        console.error("Creation Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
}


// Generate JWT token function
function generateAccessToken(user: any): string {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' }); // Adjust expiration as needed
}