import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

// Base API URL
import { baseURL } from "../../config";

export default function Login() {
  // State to manage email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to manage for showing or hiding password
  const [showPassword, setShowPassword] = useState(false);

  // State for inline error message
  const [error, setError] = useState({});

  const navigate = useNavigate(); // Navigation function

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      // Send a POST request to the signup API endpoint
      const response = await axios.post(`${baseURL}/auth/login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // Access token (short-lived) from response body
      const { token } = response.data;

      // If login is successful (HTTP status 200)
      if (response.status === 200) {
        localStorage.setItem("accessToken", token); // Save token again
        toast.success("Logged in successfully!");
        navigate("/"); // Redirect user to home page
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      // Display backend/general error under form
      setError({ form: error.response?.data?.message || "Login failed." });
      console.error("Login error:", error); // Log error for debugging
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Login to Your Account
        </h2>

        {/* Display backend/general error */}
        {error.form && (
          <p className="text-red-500 text-center mb-4">{error.form}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Extra */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
