// enums.ts
// Enumeration definitions demonstrating TypeScript's enum capabilities
// Shows both authorization levels and user loyalty tiers

/**
 * Permissions enum defining user authorization levels
 * Demonstrates TypeScript's string enum pattern for better debuggability
 * 
 * In a real application, this would integrate with authentication middleware
 * to enforce proper access controls throughout the application
 */
export enum Permissions {
    ADMIN = 'ADMIN',       // Administrator with full access
    READ_ONLY = 'READ_ONLY' // Basic user with limited access
}

/**
 * LoyaltyUser enum defining loyalty program tiers
 * Demonstrates another application of TypeScript's string enums
 * 
 * This pattern ensures consistent naming and type safety when
 * dealing with predefined categories or status levels
 */
export enum LoyaltyUser {
    GOLD_USER = 'GOLD_USER',     // Premium tier
    SILVER_USER = 'SILVER_USER', // Mid tier
    BRONZE_USER = 'BRONZE_USER'  // Entry tier
}

