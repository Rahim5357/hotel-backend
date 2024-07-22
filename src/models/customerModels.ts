import mongoose, { Document, Schema } from "mongoose";

// Interface to define the structure of Customer documents in MongoDB
export interface CustomerDocument extends Document {
    name: string;
    email: string;
    phone_number: string;
    company_name?: string; // Optional field for company name
    institute_name?: string; // Optional field for institute name
    room_number: string;
    bed_number: string;
}

// Define the schema for Customer documents
const customerSchema: Schema<CustomerDocument> = new Schema({
    name: {
        type: String,
        required: true, // Name field is required
    },
    email: {
        type: String,
        required: true, // Email field is required
    },
    phone_number: {
        type: String,
        required: true, // Phone number field is required
    },
    company_name: {
        type: String, // Optional field for company name
    },
    institute_name: {
        type: String, // Optional field for institute name
    },
    room_number: {
        type: String,
        required: true, // Room number field is required
    },
    bed_number: {
        type: String,
        required: true, // Bed number field is required
    },
});

// Export the Customer model
export default mongoose.model<CustomerDocument>("Customer", customerSchema);
