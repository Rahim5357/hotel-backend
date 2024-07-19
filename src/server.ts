const express = require("express");
import mongoose from "mongoose";

import superAdminRoutes from './routes/superAdminRoutes';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", superAdminRoutes);

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
