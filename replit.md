# Optique Lens - Eyewear E-commerce Platform

## Project Overview
A modern eyewear e-commerce platform built with React, Express, and TypeScript. Features prescription glasses and sunglasses with integrated shopping experience.

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js with TypeScript
- **Routing**: Wouter (adapted from react-router-dom for Replit compatibility)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Database**: In-memory storage (MemStorage) with Drizzle ORM schema

## Recent Changes
- **2025-07-20**: Migrated from Lovable to Replit environment
  - Replaced react-router-dom with wouter for better Replit compatibility
  - Added query client configuration with proper error handling
  - Ensured all image assets are properly located in client/public/
  - Fixed routing system to use wouter hooks and components
  - Maintained existing component structure and functionality

## Key Components
- Header with mobile navigation
- Hero section with responsive banners
- Product categories and trending frames
- Shopping cart and user management
- Service sections and footer

## User Preferences
*None specified yet*

## Development Notes
- Uses modern React patterns with hooks
- Responsive design with mobile-first approach
- Component-based architecture with reusable UI elements
- Server runs on port 5000 with both API and static content