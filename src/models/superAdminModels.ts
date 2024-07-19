import mongoose, { Document } from "mongoose";


export interface SuperAdminDocument extends Document {
    name: string;
    email: string;
    phone_number: string
}

const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    }
});

export default mongoose.model<SuperAdminDocument>("SuperAdmin", superAdminSchema);