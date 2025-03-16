// interfaces.ts
// Interface definitions demonstrating TypeScript's structural typing system
// Shows how to define complex object shapes with nested properties and type constraints

import { LoyaltyUser } from './enums'
import { Price, Country } from './types'

/**
 * Review interface defining the structure of user-submitted reviews
 * Demonstrates basic TypeScript interface with primitive and enum types
 * 
 */
export interface Review {
    name: string;        // Reviewer name
    stars: number;       // Star rating (1-5)
    loyaltyUser: LoyaltyUser;  // Loyalty program status
    date: string;        // Review date
}

/**
 * Property interface defining the structure of rental property listings
 * Demonstrates complex TypeScript interface with nested objects and custom types
 * 
 */
export interface Property {
    image: string;       // Property image URL
    title: string;       // Property title
    price: Price;        // Price per night (using custom Price type)
    location: {          // Nested location object
        firstLine: string;  // Address line 1
        city: string;       // City
        code: number | string;  // Union type for postal code (handles both numeric and alphanumeric formats)
        country: Country    // Country (using custom Country type)
    }
    contact: [number, string];  // Tuple type for [phone, email]
    isAvailable: boolean;       // Availability status
}