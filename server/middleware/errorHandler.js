// Centralized error-handling middleware
// This function catches errors thrown in any route or controller
// and sends a structured JSON response with status 500 (Internal Server Error)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log full error stack for debugging

  res.status(500).json({
    message: err.message || "Internal server error", // Send a user-friendly error message
  });
};

module.exports = errorHandler;
