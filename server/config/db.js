// Import Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    // useNewUrlParser and useUnifiedTopology are recommended options for Mongoose
    await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB")); // Log success message
  } catch (error) {
    // If connection fails, log the error
    console.error("Error connecting to MongoDB:", error);

    // Exit the process with failure code 1
    process.exit(1);
  }
};

// Export the connectDB function to be used in server.js
module.exports = connectDB;
