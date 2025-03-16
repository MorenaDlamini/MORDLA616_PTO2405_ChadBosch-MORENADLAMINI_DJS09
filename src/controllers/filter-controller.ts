// filter-controller.ts
// Controller for filter-related operations
// Manages filter UI and coordinates with the property controller

import { Property } from '../core/models/interfaces';
import { getElement } from '../core/utils/dom-helpers';
import { createFilterControls } from '../components/ui-components';
import { PropertyController } from './property-controller';

/**
 * FilterController handles filter UI and interactions
 * Separates filter logic from property management
 */
export class FilterController {
    private filterContainer: HTMLDivElement;
    private properties: Property[];
    private propertyController: PropertyController;
    
    /**
     * Initialize the filter controller
     * 
     * @param properties - Array of property data
     * @param propertyController - Property controller instance to coordinate with
     */
    constructor(properties: Property[], propertyController: PropertyController) {
        this.properties = properties;
        this.propertyController = propertyController;
        this.filterContainer = getElement<HTMLDivElement>('#filter-container');
        
        // Create filter controls
        this.initializeFilters();
    }
    
    /**
     * Create and initialize filter controls
     */
    private initializeFilters(): void {
        // Clear existing filters
        this.filterContainer.innerHTML = '';
        
        // Create filter controls
        const filterElement = createFilterControls(
            this.properties,
            this.handleApplyFilters.bind(this),
            this.handleResetFilters.bind(this)
        );
        
        // Add to container
        this.filterContainer.appendChild(filterElement);
    }
    
    /**
     * Handle filter application
     */
    private handleApplyFilters(): void {
        // Get filter values from form elements
        const countryFilter = getElement<HTMLSelectElement>('#country-filter');
        const priceFilter = getElement<HTMLSelectElement>('#price-filter');
        const availableFilter = getElement<HTMLInputElement>('#available-filter');
        const sortSelect = getElement<HTMLSelectElement>('#sort-select');
        
        const selectedCountry = countryFilter.value;
        const selectedPrice = priceFilter.value ? parseInt(priceFilter.value) : null;
        const showOnlyAvailable = availableFilter.checked;
        const sortOption = sortSelect.value;
        
        // Apply filters through property controller
        this.propertyController.applyFilters(
            selectedCountry,
            selectedPrice,
            showOnlyAvailable,
            sortOption
        );
    }
    
    /**
     * Handle filter reset
     */
    private handleResetFilters(): void {
        this.propertyController.resetFilters();
    }
    
    /**
     * Update properties data
     * 
     * @param properties - New array of property data
     */
    updateProperties(properties: Property[]): void {
        this.properties = properties;
        this.initializeFilters(); // Recreate filters with new data
    }
}