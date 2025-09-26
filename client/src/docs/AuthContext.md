# Authentication Context Documentation

## Overview

The `AuthContext` provides a centralized authentication state and helper functions for managing user sessions across the application. It handles login, signup, logout, and automatic token refresh, while exposing authentication status and user data to all components.

## Features

* **Global authentication state**: Stores the current user, authentication status, and error messages.
* **Token refresh mechanism**:
  * Attempts to refresh the access token on app startup.
  * Sets a 55-minute interval to refresh tokens automatically.
  * Clears session and resets user if refresh fails.
* **Authentication actions**:
  * `login(credentials)`: Authenticates the user and updates context state.
  * `signup(userData)`: Registers a new user and updates context state.
  * `logout()`: Logs out the user, clears tokens, and resets context state.
* **Loading state handling**: Displays a full-screen loading spinner while verifying authentication.
* **Error handling**: Stores error messages for login, signup, and session checks.

## Dependencies

* **React Context API** (`createContext`, `useContext`) for global state.
* **React Hooks** (`useState`, `useEffect`) for managing authentication lifecycle.
* **Axios instance** (`api`) for HTTP requests to backend routes (`/auth/login`, `/auth/signup`, `/auth/logout`, `/auth/refresh`, `/users/me`).

## Notes

* The backend must implement `/auth/refresh` to issue new tokens and `/users/me` to return current user details.
* The refresh interval (55 minutes) should align with your backend’s token expiry policy.
* The `useAuth` hook must only be used inside components wrapped with `AuthProvider`.
* On authentication failure, the context resets the `user` to `null` and provides an error message for UI display.