
import mongoose, { Document, Schema } from "mongoose";

// Interface to represent a User document in MongoDB
export interface UserDocument extends Document {
    name: string;
    email: string;
    phone_number: string;
    hostal_name: string;
    hostal_address: string;
    photo?: string;
}

// Define the User schema
const UserSchema: Schema<UserDocument> = new Schema({
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
    hostal_name: {
        type: String,
        required: true
    },
    hostal_address: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    }
});

// Export the Users model
export default mongoose.model<UserDocument>("User", UserSchema)