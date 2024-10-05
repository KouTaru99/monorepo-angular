# Application Description

This is an Angular application that uses Module Federation to create a micro-frontend architecture. The application consists of two main parts:

1. Main Application (ng-mf): This is the shell application that contains the common routing and layout.
2. Shared Library (my-lib): Contains reusable components such as sidebar, topbar, button, icon, and datatable.

The application uses Angular Material for styling and Nx to manage the monorepo.

# Usage Instructions

## Installation

1. Clone the repository to your local machine.
2. Run `npm install` to install the dependencies.

## Development

1. To run the application in development mode:
   ```
   npx nx serve ng-mf
   ```
   The application will run at `http://localhost:4200`.

2. To build the application:
   ```
   npx nx build ng-mf
   ```

3. To build the shared library:
   ```
   npx nx build my-lib
   ```

## Project Structure

- `apps/ng-mf`: Contains the main application
- `apps/my-lib`: Contains the shared components library

## Using the Components

### VcsSidenavComponent

This is a sidebar component that can be expanded/collapsed. It includes the following features:

- **Toggle Collapse**: Allows the sidebar to be toggled between expanded and collapsed states.
- **Responsive Design**: Automatically collapses the sidebar when the screen width is less than or equal to 768 pixels.
- **Nested Menu Items**: Supports multiple levels of nested menu items.
- **Active State Indication**: Highlights the active menu item based on the current route.
- **Animations**: Includes animations for expanding/collapsing the sidebar and rotating icons.

To use the `VcsSidenavComponent`, include it in your template and provide the necessary data for the navigation items. The component will handle the rest, including the responsive behavior and animations.

