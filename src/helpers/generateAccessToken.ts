import jwt from 'jsonwebtoken';
// Load environment variables from a .env file into process.env
require('dotenv').config();
// Generate JWT token function
export const generateAccessToken = async (user: any): Promise<string> => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
}