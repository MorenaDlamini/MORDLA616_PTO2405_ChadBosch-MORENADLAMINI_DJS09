// property-controller.ts
// Controller for property-related operations
// Acts as a mediator between the view (UI) and model (data)

import { Property } from '../core/models/interfaces';
import { PropertyService } from '../core/service/property-service';
import { AppState } from '../state/state';
import { getElement } from '../core/utils/dom-helpers';
import { 
    createPropertyCard, 
    createPropertyModalContent, 
    createNoResultsElement,
    createPaginationControls 
} from '../components/ui-components';
import { showLoadingState } from '../core/utils/dom-helpers';

/**
 * PropertyController handles interactions between the UI and property data
 * Implements a simple MVC pattern to separate concerns
 */
export class PropertyController {
    private state: AppState;
    private propertyContainer: HTMLDivElement;
    private modalPropertyTitle: HTMLHeadingElement;
    private modalBody: HTMLDivElement;
    private propertyModal: HTMLDivElement;
    private paginationContainer: HTMLDivElement;
    
    /**
     * Initialize the property controller
     * 
     * @param state - Application state
     */
    constructor(state: AppState) {
        this.state = state;
        this.propertyContainer = getElement<HTMLDivElement>('.properties');
        this.modalPropertyTitle = getElement<HTMLHeadingElement>('#modal-property-title');
        this.modalBody = getElement<HTMLDivElement>('.modal-body');
        this.propertyModal = getElement<HTMLDivElement>('#property-modal');
        this.paginationContainer = getElement<HTMLDivElement>('#pagination');
        
        // Initialize event listeners
        this.initializeEventListeners();
    }
    
    /**
     * Set up event listeners for property-related interactions
     */
    private initializeEventListeners(): void {
        // Close modal on click outside
        window.addEventListener('click', (event) => {
            if (event.target === this.propertyModal) {
                this.closeModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.modalOpen) {
                this.closeModal();
            }
        });
        
        // Close button in modal
        const closeButton = getElement<HTMLSpanElement>('.close-button');
        closeButton.addEventListener('click', () => this.closeModal());
    }
    
    /**
     * Apply filters to the property list
     * 
     * @param country - Country filter
     * @param price - Price filter
     * @param availableOnly - Whether to show only available properties
     * @param sortOption - Sort option
     */
    applyFilters(country: string, price: number | null, availableOnly: boolean, sortOption: string): void {
        showLoadingState(this.propertyContainer);
        
        // Simulate network delay
        setTimeout(() => {
            // Filter and sort properties
            let filtered = PropertyService.filterProperties(
                this.state.currentProperties,
                country,
                price,
                availableOnly
            );
            
            filtered = PropertyService.sortProperties(filtered, sortOption);
            
            // Update application state
            this.state.filteredProperties = filtered;
            this.state.pagination.currentPage = 1;
            this.state.pagination.totalPages = Math.ceil(
                filtered.length / this.state.pagination.itemsPerPage
            );
            
            // Render filtered properties
            this.renderProperties();
            this.renderPagination();
        }, 500);
    }
    
    /**
     * Reset all filters
     */
    resetFilters(): void {
        showLoadingState(this.propertyContainer);
        
        // Simulate network delay
        setTimeout(() => {
            // Reset application state
            this.state.filteredProperties = [...this.state.currentProperties];
            this.state.pagination.currentPage = 1;
            this.state.pagination.totalPages = Math.ceil(
                this.state.currentProperties.length / this.state.pagination.itemsPerPage
            );
            
            // Reset form elements
            const countryFilter = document.getElementById('country-filter') as HTMLSelectElement;
            const priceFilter = document.getElementById('price-filter') as HTMLSelectElement;
            const availableFilter = document.getElementById('available-filter') as HTMLInputElement;
            const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;
            
            countryFilter.value = '';
            priceFilter.value = '';
            availableFilter.checked = false;
            sortSelect.selectedIndex = 0;
            
            // Render all properties
            this.renderProperties();
            this.renderPagination();
        }, 500);
    }
    
    /**
     * Search properties by text
     * 
     * @param searchTerm - Search query
     */
    searchProperties(searchTerm: string): void {
        if (!searchTerm.trim()) {
            // If search is empty, reset to all properties
            this.resetFilters();
            return;
        }
        
        showLoadingState(this.propertyContainer);
        
        // Simulate network delay
        setTimeout(() => {
            // Search in title, city, and country
            const filtered = PropertyService.searchProperties(
                this.state.currentProperties,
                searchTerm
            );
            
            // Update application state
            this.state.filteredProperties = filtered;
            this.state.pagination.currentPage = 1;
            this.state.pagination.totalPages = Math.ceil(
                filtered.length / this.state.pagination.itemsPerPage
            );
            
            // Render filtered properties
            this.renderProperties();
            this.renderPagination();
        }, 500);
    }
    
    /**
     * Render the property list
     */
    renderProperties(): void {
        this.propertyContainer.innerHTML = '';
        
        // Get paginated properties for current page
        const currentPageProperties = PropertyService.getPaginatedProperties(
            this.state.filteredProperties,
            this.state.pagination.currentPage,
            this.state.pagination.itemsPerPage
        );
        
        if (this.state.filteredProperties.length === 0) {
            this.propertyContainer.appendChild(createNoResultsElement());
            return;
        }
        
        // Render each property
        currentPageProperties.forEach(property => {
            const card = createPropertyCard(property, this.showPropertyDetails.bind(this));
            this.propertyContainer.appendChild(card);
        });
    }
    
    /**
     * Render pagination controls
     */
    renderPagination(): void {
        this.paginationContainer.innerHTML = '';
        
        // Create pagination controls
        const paginationElement = createPaginationControls(
            this.state.pagination.currentPage,
            this.state.pagination.totalPages,
            this.goToPreviousPage.bind(this),
            this.goToNextPage.bind(this)
        );
        
        this.paginationContainer.appendChild(paginationElement);
    }
    
    /**
     * Go to previous page
     */
    goToPreviousPage(): void {
        if (this.state.pagination.currentPage > 1) {
            this.state.pagination.currentPage--;
            this.renderProperties();
            this.renderPagination();
        }
    }
    
    /**
     * Go to next page
     */
    goToNextPage(): void {
        if (this.state.pagination.currentPage < this.state.pagination.totalPages) {
            this.state.pagination.currentPage++;
            this.renderProperties();
            this.renderPagination();
        }
    }
    
    /**
     * Display property details in the modal
     * 
     * @param property - Property to display
     */
    showPropertyDetails(property: Property): void {
        this.state.selectedProperty = property;
        this.state.modalOpen = true;
        
        // Set modal title
        this.modalPropertyTitle.textContent = property.title;
        
        // Clear previous content
        this.modalBody.innerHTML = '';
        
        // Create and add property details content
        const content = createPropertyModalContent(property);
        this.modalBody.appendChild(content);
        
        // Display the modal
        this.propertyModal.style.display = 'flex';
    }
    
    /**
     * Close the property details modal
     */
    closeModal(): void {
        this.propertyModal.style.display = 'none';
        this.state.modalOpen = false;
        this.state.selectedProperty = null;
    }
}