// search-controller.ts
// Controller for search functionality
// Manages search UI and interactions

import { getElement } from '../core/utils/dom-helpers';
import { PropertyController } from '../controllers/property-controller';

/**
 * SearchController handles search UI and interactions
 * Provides search functionality for property listings
 */
export class SearchController {
    private searchInput: HTMLInputElement;
    private searchButton: HTMLButtonElement;
    private propertyController: PropertyController;
    
    /**
     * Initialize the search controller
     * 
     * @param propertyController - Property controller instance to coordinate with
     */
    constructor(propertyController: PropertyController) {
        this.propertyController = propertyController;
        this.searchInput = getElement<HTMLInputElement>('#search-input');
        this.searchButton = getElement<HTMLButtonElement>('#search-button');
        
        // Set up event listeners
        this.initializeEventListeners();
    }
    
    /**
     * Initialize event listeners for search functionality
     */
    private initializeEventListeners(): void {
        // Search button click event
        this.searchButton.addEventListener('click', () => this.handleSearch());
        
        // Enter key press in search input
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }
    
    /**
     * Handle search execution
     */
    private handleSearch(): void {
        const searchTerm = this.searchInput.value.trim();
        this.propertyController.searchProperties(searchTerm);
    }
    
    /**
     * Clear search input
     */
    clearSearch(): void {
        this.searchInput.value = '';
    }
}