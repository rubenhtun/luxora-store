# API Configuration Documentation

## Overview

The `api` module is a configured Axios instance used for making HTTP requests to the backend API. It centralizes the API base URL, headers, credentials handling, and error interception logic. This ensures consistent and secure communication between the frontend and backend, especially for authentication-protected routes.

## Features

* **Base URL configuration**: Automatically prefixes all requests with the backend `baseURL` defined in `config.js`.
* **Cookie support**: Enables `withCredentials: true` to send and receive cookies for authentication (important for session handling).
* **Default headers**: Sets `Content-Type: application/json` for all outgoing requests.
* **401 Unauthorized handling**:

  * Detects `401` responses.
  * Automatically attempts to refresh the session by calling `/auth/refresh`.
  * Retries the original failed request once after refreshing.
  * Redirects to `/login` if the refresh fails.

## Dependencies

* **Axios** (`axios`): For HTTP request handling.
* **config.js**: Provides the `baseURL` for backend communication.

## Notes

* Ensure the backend implements a `/auth/refresh` endpoint for renewing sessions (e.g., via refresh tokens).
* If the refresh fails, the user is redirected to the `/login` page to re-authenticate.
* The interceptor prevents infinite retry loops by setting a `_retry` flag on the original request.
* All components should import and use this `api` instance instead of raw `axios` to benefit from automatic error handling and consistent configuration.