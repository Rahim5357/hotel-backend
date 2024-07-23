import Customer, { CustomerDocument } from "../models/customerModels";

export const deleteCustomerService = async (id: string) => {
    const existingCustomer: CustomerDocument | null = await Customer.findById(id);

    if (!existingCustomer) {
        return {
            error: true,
            message: 'Customer not found'
        }
    }

    const result = await Customer.deleteOne({ _id: id });
    return {
        error: false,
        message: "",
        data: result
    }

}

export const getCustomerService = async () => {
    // Find all Customer documents
    const existingCustomers: CustomerDocument[] = await Customer.find();
    return {
        error: false,
        message: "Customers retrieved successfully",
        data: existingCustomers
    }
}

export const updateCustomerService = async ({ id, name, phone_number, email, company_name, institute_name, room_number, bed_number }: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    company_name?: string;
    institute_name?: string;
    room_number: string;
    bed_number: string;
}) => {

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

    if (!existingCustomer) {
        return {
            error: true,
            message: "Customer not found"
        }
    }

    return {
        error: false,
        message: "Customer updated successfully",
        data: { id, name, phone_number, email, company_name, institute_name, room_number, bed_number }
    }

}

export const createCustomerService = async ({ name, phone_number, email, company_name, institute_name, room_number, bed_number }: {
    name: string;
    email: string;
    phone_number: string;
    company_name?: string;
    institute_name?: string;
    room_number: string;
    bed_number: string;
}) => {

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

    return {
        error: false,
        message: "Customer registered successfully",
    }
}