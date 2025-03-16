// classes.ts
// Class implementation demonstrating TypeScript's object-oriented features
// Shows class definition, property typing, and constructor initialization

import { Review } from '../models/interfaces'

/**
 * MainProperty class representing a featured property listing
 * Demonstrates TypeScript class syntax, property typing, and constructor implementation
 * 
 * This showcases how TypeScript enables traditional OOP patterns
 * while maintaining strict type safety
 */
export default class MainProperty {
    // Strongly typed class properties
    src: string      // Image source URL
    title: string    // Property title
    reviews: Review[] // Array of review objects
    
    /**
     * Constructor for creating new MainProperty instances
     * Demonstrates parameter typing and property initialization
     * 
     * @param src - Image source URL
     * @param title - Property title
     * @param reviews - Array of reviews
     */
    constructor(src: string, title: string, reviews: Review[]) {
        this.src = src
        this.title = title
        this.reviews = reviews
    }
    
    // This class could be extended with additional methods such as:
    // - getAverageRating(): to calculate average star rating
    // - hasGoldReviews(): to check if any reviews are from gold members
    // - getLatestReview(): to retrieve the most recent review
}