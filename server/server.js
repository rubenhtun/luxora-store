// Core & third-party imports
const express = require("express"); // Express framework for building API
const cors = require("cors"); // CORS middleware to allow cross-origin requests
const dotenv = require("dotenv"); // To load environment variables from .env file

// Local imports
const connectDB = require("./config/db"); // MongoDB connection function
const authRoutes = require("./routes/authRoutes"); // Authentication API routes
const userRoutes = require("./routes/userRoutes"); // User API routes
const productRoutes = require("./routes/productRoutes"); // Product API routes
const errorHandler = require("./middleware/errorHandler"); // Centralized error-handling middleware

// Load environment variables
dotenv.config(); // Loads variables from .env into process.env

// Initialize Express app
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow cookies or Authorization headers
  })
);

app.use(express.json({ limit: "50mb" })); // Parse incoming JSON requests
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Parse URL-encoded data

// Route mounting
app.use("/api/auth", authRoutes); // Mount auth routes at /api/auth
app.use("/api/users", userRoutes); // Mount user routers at /api/users
app.use("/api/products", productRoutes); // Mount product routes at /api/products

// Centralized error-handling middleware
app.use(errorHandler); // Handles errors from all routes

// Database connection
connectDB(); // Connect to MongoDB before starting server

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
