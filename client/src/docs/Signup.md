# Signup Component

## Overview

The `Signup` component provides a user-friendly interface for creating new user accounts. It integrates frontend validations, password visibility toggling, and communicates with the backend API to securely register new users. React state management is used to handle real-time input changes, and toast notifications or inline error messages provide immediate feedback to users. The component also ensures proper navigation after successful signup using React Router.

## Features

- **User Registration** – Allows new users to sign up with name, email, and password.
- **Password Visibility Toggle** – Users can switch between showing and hiding their password inputs.
- **Frontend Validation** – Checks for password length, password confirmation match, and required fields before submission.
- **Backend Validation Integration** – Displays backend errors (e.g., email already in use) directly on the form.
- **Error & Success Feedback** – Inline messages for field-level errors and general form-level errors, plus toast notifications on success.
- **State Management** – Handles real-time form updates and error states using React `useState`.
- **Navigation** – Redirects users to the home page or login page after successful signup.
- **Responsive UI** – TailwindCSS-based design ensures a mobile-friendly and visually consistent form.

## Dependencies

- **[react](https://react.dev/)** – Core library for building the UI.
- **[react-router-dom](https://reactrouter.com/)** – For navigation (`useNavigate`).
- **[axios](https://axios-http.com/)** – To send HTTP requests to the backend.
- **[react-icons](https://react-icons.github.io/react-icons/)** – For eye/eye-slash icons in password fields.
- **[react-toastify](https://fkhadra.github.io/react-toastify/)** – For toast notifications.
- **[tailwindcss](https://tailwindcss.com/)** – Utility-first CSS framework for styling.