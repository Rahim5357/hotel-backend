import mongoose, { Document, Schema } from "mongoose";

// Interface to define the structure of SuperAdmin documents in MongoDB
export interface SuperAdminDocument extends Document {
    name: string;
    email: string;
    phone_number: string;
}

// Define the schema for SuperAdmin documents
const superAdminSchema: Schema<SuperAdminDocument> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
});

// Export the SuperAdmin model
export default mongoose.model<SuperAdminDocument>("SuperAdmin", superAdminSchema);
