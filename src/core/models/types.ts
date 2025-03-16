// types.ts
// Custom type definitions that demonstrate TypeScript's powerful type system
// Shows how to use literal unions to create type-safe enumerations

/**
 * Price type using a union of numeric literals
 * Demonstrates how TypeScript can restrict values to a predefined set
 * This approach ensures type safety while maintaining runtime performance
 */
export type Price = 25 | 30 | 35 | 45;

/**
 * Country type using a union of string literals
 * Demonstrates TypeScript's ability to create type-safe string enumerations
 * 
 * This approach offers better IDE autocompletion than regular strings
 * while enforcing valid values at compile time
 */
export type Country = 'Colombia' | 'Poland' | 'United Kingdom' | 'Malaysia';

/**
 * PropertyStatus type to represent availability status
 */
export type PropertyStatus = 'available' | 'booked' | 'maintenance';

/**
 * SortOption type to represent available sorting options
 */
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

/**
 * FilterOptions interface for property filtering
 */
export interface FilterOptions {
    country?: string;
    price?: number | null;
    availableOnly?: boolean;
    sortOption?: SortOption;
}

/**
 * PaginationOptions interface for pagination configuration
 */
export interface PaginationOptions {
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
}

/**
 * SearchOptions interface for search configuration
 */
export interface SearchOptions {
    searchTerm: string;
    searchFields: string[];
}

/**
 * GeoCoordinates type to represent geographic coordinates
 */
export interface GeoCoordinates {
    latitude: number;
    longitude: number;
}

/**
 * DateRange type for booking periods
 */
export interface DateRange {
    startDate: Date;
    endDate: Date;
}