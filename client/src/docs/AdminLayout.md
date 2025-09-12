# AdminLayout Component

## Overview

The `AdminLayout` component serves as the main layout for the admin control sections of the Luxora Store eCommerce mini web application. It features a responsive, modern interface with a sidebar for navigation, a top header with search and user controls, and a main content area for rendering routed components. This layout ensures seamless navigation and provides a consistent user experience across both desktop and mobile devices.

## Features

- **Responsive Sidebar**: Displays navigation links (Dashboard, Products, Orders, Customers, Settings) with a collapsible design for mobile devices, toggled via a menu button.
- **Dynamic Navigation**: Highlights the active link based on the current route using React Router’s `useLocation` hook, with exact matching for `/admin` and `startsWith` for subroutes (e.g., `/admin/products`).
- **Header Controls**: Includes a search bar (visible on desktop), a notification badge with a red indicator, and a user profile icon.
- **Main Content Area**: Renders child routes using the `Outlet` component from `react-router-dom`, allowing dynamic content updates without full page reloads.
- **State Management**: Manages the sidebar’s open/closed state for mobile views using React’s `useState` hook.
- **Luxury Styling**: Uses Tailwind CSS with a gradient-based design (e.g., blue-indigo for active elements, black-gold for branding) to align with the Luxora Store’s aesthetic.

## Dependencies

- **React Router**: Utilizes `Link`, `Outlet`, and `useLocation` from `react-router-dom` (version 6 or higher) for client-side routing and navigation.
- **Feather Icons**: Uses `react-icons/fi` for icons (e.g., `FiHome`, `FiBox`, `FiShoppingBag`, `FiUser`, `FiSettings`) in the sidebar, header, and profile section.
- **Tailwind CSS**: Employs utility classes for styling, providing a responsive and visually appealing design.
- **React**: Built with React (version 18 or higher) for component rendering and state management.

## Installation and Setup

1. Ensure dependencies are installed:
   ```bash
   npm install react-router-dom react-icons
   ```
