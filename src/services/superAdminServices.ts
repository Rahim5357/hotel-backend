import { generateAccessToken } from "../helpers/generateAccessToken";
import SuperAdmin, { SuperAdminDocument } from "../models/superAdminModels";


export const createSuperAdminServices = async ({ name, email, phone_number }: {
    name: string;
    email: string;
    phone_number: string;
}) => {

    // Find the Super Admin by email
    const existingSuperAdmin: SuperAdminDocument | null = await SuperAdmin.findOne({ email });

    if (!existingSuperAdmin) {
        // Create a new Super Admin instance if the email does not already exist
        const newSuperAdmin: SuperAdminDocument = new SuperAdmin({ name, email, phone_number });

        // Save the new Super Admin to the database
        await newSuperAdmin.save();

        return {
            error: false,
            message: "Super Admin registered successfully"
        }
    } else {
        return {
            error: true,
            message: 'Email already in use'
        }
    }
}


export const loginSuperAdminServices = async ({ email }: { email: string }) => {

    const superAdmin: SuperAdminDocument | null = await SuperAdmin.findOne({ email });

    if (!superAdmin) {
        return {
            error: true,
            message: "User not found"
        }
    }
    const accessToken = await generateAccessToken({ id: superAdmin._id, name: superAdmin?.name, email: superAdmin?.email, phone_number: superAdmin?.phone_number })
    return {
        error: false,
        message: "User logged in successfully",
        accessToken
    }
}