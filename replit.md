# Overview

This is a full-stack e-commerce web application for an eyewear store called "OptiqueLens". The application allows customers to browse prescription glasses, sunglasses, and related eyewear products. It features a modern React frontend built with TypeScript and Tailwind CSS, connected to an Express.js backend with PostgreSQL database integration using Drizzle ORM.

The application serves as an online eyewear retailer with product browsing, user management capabilities, and a responsive design optimized for both desktop and mobile experiences.

# Recent Changes

- **September 06, 2025**: Added comprehensive products listing page with advanced filtering capabilities
  - Clean left sidebar with category, color, material, shape, and price range filters
  - Responsive grid layout: 3 products per row when filters shown, 4 when filters minimized
  - Square product images with consistent light gray background matching existing design
  - Filter toggle functionality with collapsible sidebar
  - Navigation integration through header "Glasses" link
  - Route: `/products` - accessible via main navigation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: React Router DOM for client-side navigation with catch-all 404 handling
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Extensive use of Radix UI primitives through shadcn/ui for accessibility compliance

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Storage Pattern**: Repository pattern implemented through IStorage interface with both memory and database implementations
- **Development Server**: Custom Vite middleware integration for hot reloading in development
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

## Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle migrations with schema definitions in shared directory
- **Development Storage**: In-memory storage implementation for development/testing
- **Database Provider**: Configured for Neon Database (@neondatabase/serverless)

## Authentication and Authorization
- **User Schema**: Basic user table with username/password fields and serial primary keys
- **Validation**: Zod schema validation for user input with Drizzle integration
- **Session Storage**: PostgreSQL session store using connect-pg-simple for persistent sessions

## External Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Library**: Radix UI component primitives for accessibility
- **Validation**: Zod for runtime type checking and schema validation
- **State Management**: TanStack React Query for API data fetching and caching
- **Styling**: Tailwind CSS with custom design system variables
- **Development**: Replit-specific plugins for development environment integration

The architecture follows a clean separation of concerns with shared types and schemas between frontend and backend, enabling type safety across the full stack. The application is designed for scalability with proper error handling, responsive design, and modern development practices.