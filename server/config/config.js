// Export configuration variables for the project
// These values are read from environment variables, or fallback to defaults if not set
module.exports = {
  // Secret key for signing JWT tokens
  JWT_SECRET: process.env.JWT_SECRET || "secret_key",

  // MongoDB connection URI
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/luxora-store",
};
