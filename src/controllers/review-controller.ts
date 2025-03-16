// review-controller.ts
// Controller for review-related operations
// Handles displaying and sorting reviews

import { Review } from '../core/models/interfaces';
import { getElement } from '../core/utils/dom-helpers';
import { createReviewCard } from '../components/ui-components';
import { getTopTwoReviews } from '../core/utils/utils';

/**
 * ReviewController handles review-related operations
 * Implements a module pattern to encapsulate review functionality
 */
export class ReviewController {
    private reviewContainer: HTMLDivElement;
    private reviewButton: HTMLButtonElement;
    private reviews: Review[];
    
    /**
     * Initialize the review controller
     * 
     * @param reviews - Array of review data
     */
    constructor(reviews: Review[]) {
        this.reviews = reviews;
        this.reviewContainer = getElement<HTMLDivElement>('.reviews');
        this.reviewButton = getElement<HTMLButtonElement>('#review-button');
        
        // Set up event listeners
        this.initializeEventListeners();
    }
    
    /**
     * Initialize event listeners for review functionality
     */
    private initializeEventListeners(): void {
        this.reviewButton.addEventListener('click', () => this.showReviews());
    }
    
    /**
     * Show top reviews in the review container
     */
    showReviews(): void {
        const topReviews = getTopTwoReviews(this.reviews);
        this.reviewContainer.innerHTML = '';
        
        // Create and append review cards for top reviews
        topReviews.forEach(review => {
            const card = createReviewCard(review);
            this.reviewContainer.appendChild(card);
        });
        
        // Hide the button after showing reviews
        this.reviewButton.style.display = 'none';
    }
    
    /**
     * Update reviews data
     * 
     * @param reviews - New array of review data
     */
    updateReviews(reviews: Review[]): void {
        this.reviews = reviews;
    }
}