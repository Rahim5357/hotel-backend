import express from "express";
import { Request, Response, Router } from "express";
import { createCustomerService, deleteCustomerService, getCustomerService, updateCustomerService } from "../services/customerServices"

const customerRoutes: Router = express.Router();

// Handler for creating a new customer
customerRoutes.post("/create", async (req: Request, res: Response) => {
    try {
        const { name, phone_number, email, company_name, institute_name, room_number, bed_number }: {
            name: string;
            email: string;
            phone_number: string;
            company_name?: string;
            institute_name?: string;
            room_number: string;
            bed_number: string;
        } = req.body;

        const result = await createCustomerService({ name, phone_number, email, company_name, institute_name, room_number, bed_number });

        // Send a success response
        res.status(201).json({ error: result?.error, message: result?.message });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Creation Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
})

// Handler for updating an existing customer
customerRoutes.put("/update", async (req: Request, res: Response) => {
    try {
        const { id, name, phone_number, email, company_name, institute_name, room_number, bed_number }: {
            id: string;
            name: string;
            email: string;
            phone_number: string;
            company_name?: string;
            institute_name?: string;
            room_number: string;
            bed_number: string;
        } = req.body;

        // Find the Customer by ID and update their details
        const result = await updateCustomerService({ id, name, phone_number, email, company_name, institute_name, room_number, bed_number })

        if (result && result?.error) {
            return res.status(404).json({ error: result?.error, message: result?.message });
        } else {
            res.status(200).json({ error: result?.error, message: result?.message, data: result?.data });
        }

    } catch (err) {
        throw err;
    }
})

// Handler for retrieving all customers
customerRoutes.get("/get", async (req: Request, res: Response) => {
    try {
        const result = await getCustomerService()
        // Send a success response
        res.status(200).json({ error: result.error, message: result.message, data: result.data });
    } catch (err) {
        throw err
    }
})

// Handler for deleting a customer
customerRoutes.delete("/delete", async (req: Request, res: Response) => {
    try {
        const { id }: { id: string } = req.body;

        const result = await deleteCustomerService(id);
        if (result && result.error) {
            res.status(404).json({ error: true, message: result.message });
        } else {
            // Send a success response
            res.status(200).json({ error: false, message: result.message, data: result.data });
        }

    } catch (err) {
        throw err
    }
});

export default customerRoutes;
