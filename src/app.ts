const express = require("express");
const cors = require("cors");
import mongoose from "mongoose";
import apiRoutes from './routes/index';
import customerRoutes from "./controllers/customerControllers";

const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET,POST, PUT, DELETE', // Allow only these methods
    allowedHeaders: 'Content-Type,Authorization', // Allow only these headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const default_route = '/api'
app.use(`${default_route}`, apiRoutes);
app.use(`${default_route}/customer`, customerRoutes)

app.use((err: any, req: any, res: any) => {
    console.error(err.stack)
    res.status(422).json({
        message: err.message
    })
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
