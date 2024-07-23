import { generateAccessToken } from "../helpers/generateAccessToken";
import User, { UserDocument } from "../models/adminModels";


export const loginAdminServices = async ({ email }: { email: string }) => {
    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
        return {
            error: true,
            message: "User not found"
        }
    }

    // Generate JWT token
    const accessToken = await generateAccessToken({ id: user._id, name: user?.name, email: user?.email, phone_number: user?.phone_number, hostal_name: user?.hostal_name, hostal_address: user?.hostal_address, photo: user?.photo });
    return {
        error: false,
        message: "User logged in successfully",
        accessToken
    }

}

export const createAdminServices = async ({ name, email, phone_number, hostal_name, hostal_address, photo }: {
    name: string;
    email: string;
    phone_number: string;
    hostal_name: string;
    hostal_address: string;
    photo?: string;
}) => {

    const existingUser: UserDocument | null = await User.findOne({ email });
    if (!existingUser) {
        const newUser: UserDocument = new User({ name, email, phone_number, hostal_name, hostal_address, photo });
        await newUser.save();
        return {
            error: false,
            message: 'User registered successfully',

        }
    } else {
        return {
            error: true,
            message: 'Email already in use'
        }
    }
}

export const updateAdminServices = async ({ id, name, email, phone_number, hostal_name, hostal_address, photo }: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    hostal_name: string;
    hostal_address: string;
    photo?: string;
}) => {

    const updatedUser: UserDocument | null = await User.findByIdAndUpdate(id, { name, email, phone_number, hostal_name, hostal_address, photo });

    if (!updatedUser) {
        return {
            error: true,
            message: 'User not found'
        }
    }

    return {
        error: false,
        message: 'User updated successfully',
        data: { id, name, email, phone_number, hostal_name, hostal_address, photo }
    }
}

export const getAdminServices = async () => {
    const existingUsers: UserDocument[] | [] = await User.find();
    return {
        error: false,
        message: 'Users retrieved successfully',
        data: existingUsers
    }
}

export const deleteAdminServices = async ({ id }: { id: string }) => {
    const existingUser: UserDocument | null = await User.findById(id);

    if (!existingUser) {
        return {
            error: true,
            message: 'User not found'
        }
    }

    await User.deleteOne({ _id: id });

    return {
        error: false,
        message: 'User deleted successfully'
    }
}