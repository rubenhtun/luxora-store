# Login Component Documentation

## Overview

The `Login` component is a React functional component that allows users to log in to the application using their email and password. It includes form validation, error handling, and integrates with the backend API for authentication.

## Features

- **Email and password input fields** with validation.
- **Show/hide password** toggle using `react-icons` (`FaEye`, `FaEyeSlash`).
- **Backend error handling** with inline error messages.
- **Toast notifications** on successful or failed login (`react-toastify`).
- **Navigation** to home page on successful login.
- **Responsive design** with Tailwind CSS.

## Dependencies

- React (`useState`, `useEffect`)
- `axios` for API calls
- `react-router-dom` (`useNavigate`) for navigation
- `react-icons` (`FaEye`, `FaEyeSlash`) for password toggle icons
- `react-toastify` for notifications
- Tailwind CSS for styling

## Notes

- Ensure the backend API at `baseURL/auth/login` is active.
- JWT token is stored in `localStorage` for later authentication.
- Toast notifications require `ToastContainer` to be present in the app root.
