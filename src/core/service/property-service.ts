// property-service.ts
// Service for property-related operations
// Encapsulates all business logic for property filtering, searching, and sorting

import { Property } from '../models/interfaces';

/**
 * Property service encapsulating all property data operations
 * Provides methods for filtering, searching and sorting properties
 */
export class PropertyService {
    /**
     * Filter properties based on multiple criteria
     * 
     * @param properties - Array of properties to filter
     * @param country - Optional country filter
     * @param price - Optional price filter
     * @param availableOnly - Whether to show only available properties
     * @returns Filtered array of properties
     */
    static filterProperties(
        properties: Property[], 
        country?: string, 
        price?: number | null, 
        availableOnly?: boolean
    ): Property[] {
        let filtered = [...properties];
        
        if (country) {
            filtered = filtered.filter(property => property.location.country === country);
        }
        
        if (price !== null && price !== undefined) {
            filtered = filtered.filter(property => property.price === price);
        }
        
        if (availableOnly) {
            filtered = filtered.filter(property => property.isAvailable);
        }
        
        return filtered;
    }
    
    /**
     * Search properties based on text query
     * 
     * @param properties - Array of properties to search
     * @param searchTerm - Search query to match against property data
     * @returns Array of properties matching the search criteria
     */
    static searchProperties(properties: Property[], searchTerm: string): Property[] {
        const term = searchTerm.trim().toLowerCase();
        
        if (!term) {
            return properties;
        }
        
        return properties.filter(property => 
            property.title.toLowerCase().includes(term) || 
            property.location.city.toLowerCase().includes(term) || 
            property.location.country.toLowerCase().includes(term)
        );
    }
    
    /**
     * Sort properties based on different criteria
     * 
     * @param properties - Array of properties to sort
     * @param sortOption - Sort option identifier
     * @returns Sorted array of properties
     */
    static sortProperties(properties: Property[], sortOption: string): Property[] {
        const sorted = [...properties];
        
        switch (sortOption) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        
        return sorted;
    }
    
    /**
     * Get unique countries from a list of properties
     * 
     * @param properties - Array of properties
     * @returns Array of unique country names
     */
    static getUniqueCountries(properties: Property[]): string[] {
        return [...new Set(properties.map(p => p.location.country))];
    }
    
    /**
     * Get unique prices from a list of properties
     * 
     * @param properties - Array of properties
     * @returns Array of unique property prices
     */
    static getUniquePrices(properties: Property[]): number[] {
        return [...new Set(properties.map(p => p.price))].sort((a, b) => a - b);
    }
    
    /**
     * Get paginated subset of properties
     * 
     * @param properties - Array of properties to paginate
     * @param page - Current page number (1-based)
     * @param itemsPerPage - Number of items per page
     * @returns Subset of properties for the current page
     */
    static getPaginatedProperties(properties: Property[], page: number, itemsPerPage: number): Property[] {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, properties.length);
        
        return properties.slice(startIndex, endIndex);
    }
}