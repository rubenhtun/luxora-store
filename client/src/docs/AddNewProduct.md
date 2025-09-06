# AddNewProduct Component

## Overview

The `AddNewProduct` component provides essential input fields for creating new product entries. It is designed with both UI and UX considerations in mind. Admins can add required details as well as optional information about a product. The component primarily uses React state management to handle changes when users type into input fields. Additionally, it can also serve as an edit form by leveraging React Router’s useLocation hook to access and populate product data passed from another page.

## Features

* **Add & Edit Mode** – Create new products or edit existing ones via `useLocation`.
* **State Management** – Real-time form updates using React `useState`.
* **Comprehensive Fields** – Supports name, description, price, stock, category, badges, features, etc.
* **Image Uploads** – Preview single product image and multiple additional images.
* **Dynamic Badges** – Gradient-colored badges with default fallback.
* **Validation & Feedback** – Required fields, toast notifications, and loading states.
* **Responsive UI** – TailwindCSS design with grid layout, mobile-friendly.
* **Form Actions** – Reset, cancel, and navigate back to product list.

## Dependencies

* **[react](https://react.dev/)** – Core library for building UI.
* **[react-router-dom](https://reactrouter.com/)** – For navigation (`useNavigate`, `useLocation`).
* **[axios](https://axios-http.com/)** – To handle API requests.
* **[react-toastify](https://fkhadra.github.io/react-toastify/)** – For toast notifications.
* **[tailwindcss](https://tailwindcss.com/)** – Utility-first CSS framework for styling.