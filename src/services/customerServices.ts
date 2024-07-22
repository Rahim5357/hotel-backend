import Customer, { CustomerDocument } from "../models/customerModels";

export const deleteCustomerService = async (id: string) => {
    // Find the Customer by ID
    const existingCustomer: CustomerDocument | null = await Customer.findById(id);

    // Check if the Customer exists
    if (!existingCustomer) {
        return {
            error: true,
            message: 'Customer not found'
        }
    }

    // Delete the Customer from the database
    const result = await Customer.deleteOne({ _id: id });
    return {
        error: false,
        message: "",
        data: result
    }

}