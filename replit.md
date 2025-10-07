# Overview

This is a full-stack e-commerce web application for an eyewear store called "OptiqueLens". The application allows customers to browse prescription glasses, sunglasses, and related eyewear products. It features a modern React frontend built with TypeScript and Tailwind CSS, connected to an Express.js backend with PostgreSQL database integration using Drizzle ORM.

The application serves as an online eyewear retailer with product browsing, user management capabilities, and a responsive design optimized for both desktop and mobile experiences.

# Recent Changes

- **October 07, 2025**: Completed Cloudinary integration for image hosting
  - Uploaded 37 images from local storage to Cloudinary cloud storage
  - Created image mapping system (`shared/image-mappings.ts`) for backward compatibility
  - Implemented reusable Cloudinary utilities (`shared/cloudinary-utils.ts`) with `uploadImageToCloudinary()` and `uploadImageBuffer()`
  - Created `/api/upload-image` endpoint with multer support for future uploads
  - Updated all UI components (Header, Hero, Footer, ProductCategories, ServiceSections, ProductsPage) to use Cloudinary URLs
  - Supports both `CLOUDINARY_URL` and discrete credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
  - All images now served from Cloudinary CDN for optimal performance

- **October 03, 2025**: Implemented image proxy solution for password-protected WooCommerce images
  - Created dual image proxy: Express endpoint (`/api/proxy-image`) for Replit + Vercel serverless function for production
  - Images now properly authenticate using LocalWP credentials (LOCALWP_USERNAME, LOCALWP_PASSWORD)
  - All product images automatically proxied through backend to eliminate 401 errors
  - Configured edge caching (1 hour) on Vercel for optimal performance
  
- **October 03, 2025**: Restructured to use Vercel serverless functions for WooCommerce API
  - Created `/api` directory with serverless functions for Vercel deployment
  - Implemented shared WooCommerce utilities in `shared/woocommerce-utils.ts` to avoid code duplication
  - Updated `vercel.json` to properly configure serverless functions
  - Express server continues to work for local development in Replit
  - All WooCommerce API endpoints now available as both Express routes (local) and Vercel functions (production)

- **October 01, 2025**: Connected WooCommerce API to fetch real product data
  - Configured WooCommerce REST API with query string authentication
  - Added site-level basic authentication support for LocalWP Live Links
  - Created missing queryClient.ts with default fetcher for React Query
  - Successfully integrated products, attributes, variations, and filters from WooCommerce
  - Confirmed progressive lenses are filtered out from product listings
  
- **September 06, 2025**: Created professional products listing page with modern optical website design
  - Integrated Header and Footer components for complete site consistency
  - Hero section with elegant typography and product description
  - Sticky filter bar with sort functionality and product count display
  - Modern filter sidebar with organized categories (Category, Color, Material, Shape, Price Range)
  - Professional product cards with hover effects, heart icons, and category badges
  - Responsive grid layout: 3 products per row when filters shown, 4 when filters minimized
  - Square product images with light gray background matching existing design
  - Link integration to individual product pages
  - Clean "no results" state with helpful messaging
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
- **Framework**: Express.js with TypeScript for the REST API server (local development)
- **Serverless Functions**: Vercel serverless functions in `/api` directory for production deployment
- **Shared Utilities**: Common WooCommerce logic in `shared/woocommerce-utils.ts` used by both Express and Vercel
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
- **Image Hosting**: Cloudinary CDN for all static images and media files
- **WooCommerce API**: Product data, attributes, variations, and inventory management
  - API URL: Configured via `WOOCOMMERCE_URL` environment variable
  - Authentication: Query string auth with consumer key and secret
  - Site Protection: Supports LocalWP Live Link basic authentication
- **UI Library**: Radix UI component primitives for accessibility
- **Validation**: Zod for runtime type checking and schema validation
- **State Management**: TanStack React Query for API data fetching and caching
- **Styling**: Tailwind CSS with custom design system variables
- **Development**: Replit-specific plugins for development environment integration

## WooCommerce Integration
The application fetches product data from a WooCommerce REST API:
- **Products**: Frames (eyeglasses) and Lenses (single vision, protection)
- **Attributes**: Color, Material, Frame Type, Gender, Treatment, Index
- **Variations**: Product variations based on attributes (e.g., different colors, lens treatments)
- **Filters**: Progressive lenses are automatically filtered out from product listings

### Required Environment Variables
- `WOOCOMMERCE_URL`: WooCommerce site URL
- `WOOCOMMERCE_CONSUMER_KEY`: WooCommerce REST API consumer key
- `WOOCOMMERCE_CONSUMER_SECRET`: WooCommerce REST API consumer secret
- `LOCALWP_USERNAME`: (Optional) Basic auth username for LocalWP Live Links
- `LOCALWP_PASSWORD`: (Optional) Basic auth password for LocalWP Live Links

### Image Proxy Solution
- **Automatic Image Authentication**: All WooCommerce product images are automatically proxied through the backend to handle basic authentication
  - Express endpoint: `/api/proxy-image?url={imageUrl}` (Replit local development)
  - Vercel serverless function: `/api/proxy-image.ts` (production deployment)
  - Images cached for 1 hour on Vercel edge network for optimal performance
  - Supports LocalWP Live Link password-protected sites seamlessly

The architecture follows a clean separation of concerns with shared types and schemas between frontend and backend, enabling type safety across the full stack. The application is designed for scalability with proper error handling, responsive design, and modern development practices.