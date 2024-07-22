import Customer, { CustomerDocument } from "../models/customerModels";
import { Request, Response, Router } from "express";
import { deleteCustomerService } from "../services/customerServices"

// Handler for creating a new customer
export const createCustomer = async (req: Request, res: Response) => {
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

        // Create a new Customer instance
        const newCustomer: CustomerDocument = new Customer({
            name,
            phone_number,
            email,
            company_name,
            institute_name,
            room_number,
            bed_number,
        });

        // Save the Customer to the database
        await newCustomer.save();

        // Send a success response
        res.status(201).json({ error: false, message: 'Customer registered successfully' });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Creation Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
};

// Handler for updating an existing customer
export const updateCustomer = async (req: Request, res: Response) => {
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
        const existingCustomer: CustomerDocument | null = await Customer.findByIdAndUpdate(id, {
            name,
            phone_number,
            email,
            company_name,
            institute_name,
            room_number,
            bed_number,
        });

        // Check if the Customer exists
        if (!existingCustomer) {
            return res.status(404).json({ error: true, message: 'Customer not found' });
        }

        // Send a success response
        res.status(200).json({ error: false, message: 'Customer updated successfully', data: { id, name, phone_number, email, company_name, institute_name, room_number, bed_number } });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Update Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
};

// Handler for retrieving all customers
export const getCustomer = async (req: Request, res: Response) => {
    try {
        // Find all Customer documents
        const existingCustomers: CustomerDocument[] = await Customer.find();

        // Send a success response with the retrieved customers
        res.status(200).json({ error: false, message: "Customers retrieved successfully", data: existingCustomers });
    } catch (err) {
        // Log the error for debugging purposes
        console.error("Retrieval Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
};

// Handler for deleting a customer
const customerRoutes = Router();
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
        // Log the error for debugging purposes
        console.error("Deletion Error:", err);

        // Send a generic server error response
        res.status(500).json({ error: true, message: "Server Error" });
    }
});

export default customerRoutes;
