// utils.ts
// Utility functions module demonstrating TypeScript function signatures,
// DOM manipulation, and separation of concerns in a modular architecture

// DOM references with non-null assertions
const reviewTotalDisplay = document.querySelector('#reviews')!
const returningUserDisplay = document.querySelector('#returning-user')!
const userNameDisplay = document.querySelector('#user')!

// Import TypeScript enums and interfaces to ensure type safety
import { LoyaltyUser, Permissions } from '../models/enums'
import { Review } from '../models/interfaces'

/**
 * Displays review count information with appropriate formatting
 * Demonstrates string manipulation, conditional logic, and enum usage
 * 
 * @param value - Number of reviews
 * @param reviewer - Name of the most recent reviewer
 * @param isLoyalty - Loyalty status for special badge display
 */
export function showReviewTotal(value: number, reviewer: string, isLoyalty: LoyaltyUser): void {
    // Conditional rendering based on loyalty status
    const iconDisplay = isLoyalty === LoyaltyUser.GOLD_USER ? '⭐' : ''
    
    // String concatenation with dynamic content
    reviewTotalDisplay.innerHTML = value.toString() + ' review' + makeMultiple(value) + ' | last reviewed by ' + reviewer + ' ' + iconDisplay    
}

/**
 * Updates UI elements based on user authentication status
 * Demonstrates conditional rendering patterns
 * 
 * @param isReturning - Whether the user has visited before
 * @param userName - User's display name
 */
export function populateUser(isReturning: boolean, userName: string): void {
    // Conditional rendering based on user status
    if (isReturning) {
        returningUserDisplay.innerHTML = 'back'
    }
    userNameDisplay.innerHTML = userName
}

/**
 * Conditionally renders property pricing based on permission level
 * Demonstrates TypeScript union types (boolean | Permissions)
 * 
 * @param value - Permission level or boolean flag
 * @param element - DOM element to modify
 * @param price - Property price to display
 */
export function showDetails(value: boolean | Permissions, element: HTMLDivElement, price: number): void {
    // Simple authorization check
    if (value) {
        const priceDisplay = document.createElement('div')
        priceDisplay.innerHTML = price.toString() + '/night'
        element.appendChild(priceDisplay)
    }
}

/**
 * Utility function for grammatical pluralization
 * Demonstrates simple but practical string manipulation
 * 
 * @param value - Count to check for pluralization
 * @returns Plural suffix 's' or empty string
 */
export function makeMultiple(value: number): string {
    if (value > 1 || value == 0) {
        return 's'
    } else return ''
}

/**
 * Sorts and returns top reviews by star rating
 * Demonstrates array manipulation and sorting in TypeScript
 * 
 * @param reviews - Collection of review objects
 * @returns Array with the two highest-rated reviews
 */
export function getTopTwoReviews(reviews: Review[]): Review[] {
    // Array sorting with arrow function
    const sortedReviews = reviews.sort((a, b) => b.stars - a.stars)
    // Return sliced array
    return sortedReviews.slice(0, 2)
}