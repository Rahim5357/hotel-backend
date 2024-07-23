const express = require("express");
import { Request, Response } from "express";
const cors = require("cors");
import mongoose from "mongoose";
import customerRoutes from "./controllers/customerControllers";
import superAdminRoutes from "./controllers/superAdminControllers";
import adminRoutes from "./controllers/adminControllers";

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST, PUT, DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const default_route = '/api'
app.use(`${default_route}/superAdmin`, superAdminRoutes)
app.use(`${default_route}/admin`, adminRoutes)
app.use(`${default_route}/customer`, customerRoutes)

app.use((err: any, req: Request, res: Response) => {
    console.error(err.stack)
    res.status(500).json({ error: true, message: err.message ?? "Server Error" });
})

// MongoDB connection URI
const mongoURI = "mongodb+srv://abdullrahim5357:Rahim%40786@cluster0.reizxkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB and start the server
mongoose.connect(mongoURI)
    .then((result: typeof mongoose) => {
        console.log("MongoDB connected!");

        // Start the server on port 8000
        app.listen(8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((err: Error) => {
        console.error("Error connecting to MongoDB:", err.message);
    });
