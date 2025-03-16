// app.ts
// Main application initialization and orchestration
// Coordinates controllers and manages application lifecycle

import { showReviewTotal, populateUser } from './core/utils/utils';
import { createInitialState, mockData } from './state/state';
import { PropertyController } from './controllers/property-controller';
import { ReviewController } from './controllers/review-controller';
import { MainPropertyController } from './controllers/main-property-controller';
import { FilterController } from './controllers/filter-controller';
import { SearchController } from './controllers/search-controller';
import { FooterController } from './controllers/footer-controller';
import MainProperty from './core/models/classes';
import { showLoadingState, getElement } from './core/utils/dom-helpers';

/**
 * Application class orchestrating the entire application
 * Acts as the main entry point and coordinates between controllers
 */
export class App {
    // The propertyController is directly used in class methods
    private propertyController!: PropertyController;
    
    // Using underscore prefix for variables that are instantiated but not directly referenced
    // This tells TypeScript these variables are intentionally kept but not directly used
    private _reviewController!: ReviewController;
    private _mainPropertyController!: MainPropertyController;
    private _filterController!: FilterController;
    private _searchController!: SearchController;
    private _footerController!: FooterController;
    
    /**
     * Initialize the application
     */
    constructor() {
        // Show initial loading state for properties
        const propertyContainer = getElement<HTMLDivElement>('.properties');
        showLoadingState(propertyContainer);
    }
    
    /**
     * Start the application
     * Initializes all controllers and renders the UI
     */
    start(): void {
        // Simulate API call delay for more realistic UX
        setTimeout(() => {
            // Initialize application state with mock data
            const appState = createInitialState(mockData.properties);
            
            // Initialize controllers with the necessary data
            this.propertyController = new PropertyController(appState);
            this._reviewController = new ReviewController(mockData.reviews);
            
            // Create main property instance (e.g., a featured property)
            const mainProperty = new MainProperty(
                'images/italian-property.jpg', // Image URL
                'Italian Villa', // Property title
                [{ // Reviews for the main property
                    name: 'Olive',
                    stars: 5,
                    loyaltyUser: mockData.reviews[0].loyaltyUser,
                    date: '12-04-2021'
                }]
            );
            
            // Initialize remaining controllers
            this._mainPropertyController = new MainPropertyController(mainProperty);
            this._filterController = new FilterController(mockData.properties, this.propertyController);
            this._searchController = new SearchController(this.propertyController);
            this._footerController = new FooterController(mockData.currentLocation);
            
            // Initialize user data and reviews summary
            this.initializeUserData();
            
            // Render properties and pagination
            this.propertyController.renderProperties();
            this.propertyController.renderPagination();
        }, 1000); // Simulate a 1-second delay for API call
    }
    
    /**
     * Initialize user data and reviews display
     */
    private initializeUserData(): void {
        // Display review total and user information
        showReviewTotal(
            mockData.reviews.length, // Total number of reviews
            mockData.reviews[0].name, // Name of the first reviewer
            mockData.reviews[0].loyaltyUser // Loyalty status of the first reviewer
        );
        
        // Populate user information (e.g., returning user status and name)
        populateUser(
            mockData.user.isReturning, // Whether the user is a returning user
            mockData.user.firstName // User's first name
        );
    }
}