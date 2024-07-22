import { Request, Response } from "express";

import User, { UserDocument } from "../models/adminModels";

import jwt from 'jsonwebtoken';

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Handle for user login
export const loginUser = async (req: Request, res: Response) => {

    try {
        // Destructure email and phone number from the request body
        const { email, phone_number }: { email: string, phone_number: string } = req?.body;
        const user: UserDocument | null = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: true, message: "User not found" });
            return;
        }


        // Generate JWT token
        const accessToken = generateAccessToken({ id: user._id, name: user?.name, email: user?.email, phone_number: user?.phone_number, hostal_name: user?.hostal_name, hostal_address: user?.hostal_address, photo: user?.photo });

        // If validation is successful
        res.status(200).json({ error: false, message: "User logged in successfully", accessToken });

    } catch (err) {
        throw err;
        // Log the error for debugging purposes
        // console.error("Login Error:", err);

        // Send a generic server error response
        // res.status(500).json({ error: true, message: "Server Error" });
    }
}

// Handle for user create
export const createUser = async (req: Request, res: Response) => {

    const { name, email, phone_number, hostal_name, hostal_address, photo }: {
        name: string;
        email: string;
        phone_number: string;
        hostal_name: string;
        hostal_address: string;
        photo?: string;
    } = req?.body;

    const existingUser: UserDocument | null = await User.findOne({ email });
    if (!existingUser) {
        const newUser: UserDocument = new User({ name, email, phone_number, hostal_name, hostal_address, photo });
        await newUser.save();
        res.status(201).json({ error: false, message: 'User registered successfully' });
    } else {
        // Send an error response indicating the email is already in use
        res.status(409).json({ error: true, message: 'Email already in use' });
    }
}

// Handle for user update
export const updateUser = async (req: Request, res: Response) => {
    const { id, name, email, phone_number, hostal_name, hostal_address, photo }: {
        id: string;
        name: string;
        email: string;
        phone_number: string;
        hostal_name: string;
        hostal_address: string;
        photo?: string;
    } = req?.body;

    const updatedUser: UserDocument | null = await User.findByIdAndUpdate(id, { name, email, phone_number, hostal_name, hostal_address, photo });

    if (!updatedUser) {
        return res.status(404).json({ error: true, message: 'User not found' });
    }

    res.status(200).json({ error: false, message: 'User updated successfully', data: { id, name, email, phone_number, hostal_name, hostal_address, photo } });
}

// Handle for user read
export const getUsers = async (req: Request, res: Response) => {
    try {
        const existingUsers: UserDocument[] | [] = await User.find();
        res.status(200).json({ error: false, message: "Users retrieved successfully", data: existingUsers });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Retrieval Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
};

// Handle for user delete
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id }: { id: string } = req.body;

        const existingUser: UserDocument | null = await User.findById(id);

        if (!existingUser) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        await User.deleteOne({ _id: id });

        res.status(200).json({ error: false, message: 'User deleted successfully' });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Deletion Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
};

// Generate JWT token function
function generateAccessToken(user: any): string {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' }); // Adjust expiration as needed
}