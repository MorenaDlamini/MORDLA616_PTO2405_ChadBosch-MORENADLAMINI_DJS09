# Property Rental Application

A modern, TypeScript-based web application for browsing and managing property rentals. This application demonstrates effective use of TypeScript's type safety features, modular architecture, and MVC design patterns.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
  - [Core Structure](#core-structure)
  - [Key Components](#key-components)
    - [Controllers](#controllers)
    - [Models](#models)
    - [UI Components](#ui-components)
    - [State Management](#state-management)
- [Technical Details](#technical-details)
  - [TypeScript Features Used](#typescript-features-used)
  - [Design Patterns](#design-patterns)
- [Project Structure](#project-structure)
- [Application Initialization Flow](#application-initialization-flow)
- [Features](#features)
  - [Property Listings](#property-listings)
  - [Filtering and Searching](#filtering-and-searching)
  - [User Features](#user-features)
  - [UI Elements](#ui-elements)
- [Mock Data](#mock-data)
- [Development](#development)
- [Potential Enhancements](#potential-enhancements)

## Overview

This property rental application allows users to:
- Browse available rental properties with detailed information
- Filter properties by country, price, and availability
- Search properties by text query
- View property details in a modal interface
- Paginate through property listings
- View and interact with user reviews
- See location-based information in the footer

## Architecture

The application follows a modular architecture with clear separation of concerns:

### Core Structure
- **MVC Pattern**: Implements Model-View-Controller architecture
- **TypeScript**: Uses strong typing throughout the codebase
- **Modular Design**: Functionality separated into logical components

### Key Components

#### Controllers
- `PropertyController`: Manages property listings, details, and pagination
- `ReviewController`: Handles review display and interactions
- `MainPropertyController`: Manages the featured property display
- `FilterController`: Processes property filtering operations
- `SearchController`: Handles search functionality
- `FooterController`: Manages footer content and location information

#### Models
- TypeScript interfaces define data structures
- Enums for consistent type values (e.g., `Permissions`, `LoyaltyUser`)
- Custom types using TypeScript's union types

#### UI Components
- Modular UI component creation
- Reusable design patterns
- DOM manipulation through helper utilities

#### State Management
- Centralized state manager
- Mock data for development and testing
- Clean API for state manipulation

## Technical Details

### TypeScript Features Used
- **Interfaces**: Define data structures with strict typing
- **Classes**: Implement object-oriented programming patterns
- **Enums**: Define fixed sets of values (e.g., user permissions)
- **Type Aliases**: Create custom types with union types
- **Generics**: For type-safe DOM element selection
- **Tuples**: For fixed-length arrays with specific types

### Design Patterns
- **Controller Pattern**: Separate UI logic from business logic
- **Factory Pattern**: Create UI components with factory functions
- **Observer Pattern**: Event-based communication between components
- **Module Pattern**: Encapsulate functionality within modules

## Project Structure

```
├── index.ts                # Entry point
├── app.ts                  # Main application orchestration
├── state.ts                # Application state management
├── controllers/            # Controller modules
│   ├── property-controller.ts
│   ├── review-controller.ts
│   ├── main-property-controller.ts
│   ├── filter-controller.ts
│   ├── search-controller.ts
│   └── footer-controller.ts
├── components/             # UI component factories
│   └── ui-components.ts
├── core/                   # Core application modules
│   ├── models/             # Data models
│   │   ├── interfaces.ts
│   │   ├── enums.ts
│   │   ├── classes.ts
│   │   └── types.ts
│   ├── utils/              # Utility functions
│   │   ├── utils.ts
│   │   └── dom-helpers.ts
│   └── service/            # Service layer
│       └── property-service.ts
```

## Application Initialization Flow

1. `index.ts` is the entry point that initializes the application when the DOM is loaded.
2. The `App` class in `app.ts` orchestrates the application setup.
3. Controllers are initialized with their respective data.
4. UI is rendered based on the initial state.
5. Event listeners are attached to enable user interactions.

## Features

### Property Listings
- Display property cards with images and key information
- Pagination for browsing multiple properties
- Property details modal with comprehensive information

### Filtering and Searching
- Filter by country, price, and availability
- Sort properties by different criteria
- Search functionality across property titles and locations

### User Features
- User loyalty program integration (Bronze, Silver, Gold)
- Review display and management
- User context awareness (returning users)

### UI Elements
- Loading states for better UX
- Responsive design considerations
- Modular component creation

## Mock Data

The application uses mock data for demonstration purposes, including:
- Property listings with locations, pricing, and availability
- User reviews with ratings and loyalty status
- User profile information
- Current location data for footer display

## Development

This application is built with TypeScript and follows modern web development practices. It demonstrates how to build a structured, maintainable application with strong typing and clear separation of concerns.

The code is designed to be extensible, allowing for easy addition of new features or integration with backend services in a production environment.

## Potential Enhancements

- Backend API integration
- User authentication system
- Booking functionality
- Payment processing
- Location mapping
- Advanced filtering options
- User reviews submission
- Responsive design improvements
- Accessibility enhancements

