// Core & third-party imports
const express = require("express"); // Express framework for building API
const cors = require("cors"); // CORS middleware to allow cross-origin requests
const dotenv = require("dotenv"); // To load environment variables from .env file

// Local imports
const connectDB = require("./config/db"); // MongoDB connection function
const authRoute = require("./routes/authRoute"); // Authentication API routes
const productRoute = require("./routes/productRoute"); // Product API routes
const errorHandler = require("./middleware/errorHandler"); // Centralized error-handling middleware

// Load environment variables
dotenv.config(); // Loads variables from .env into process.env

// Initialize Express app
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies or Authorization headers
  })
);

app.use(express.json({ limit: "50mb" })); // Parse incoming JSON requests
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Parse URL-encoded data

// Route mounting
app.use("/api/auth", authRoute); // Mount auth routes at /api/auth
app.use("/api/products", productRoute); // Mount product routes at /api/products

// Centralized error-handling middleware
app.use(errorHandler); // Handles errors from all routes

// Database connection
connectDB(); // Connect to MongoDB before starting server

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
