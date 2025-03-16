// main-property-controller.ts
// Controller for main featured property
// Handles displaying and managing the main property

import MainProperty from '../core/models/classes';
import { getElement } from '../core/utils/dom-helpers';

/**
 * MainPropertyController handles the featured property display
 * Encapsulates main property functionality
 */
export class MainPropertyController {
    private mainProperty: MainProperty;
    private mainImageContainer: HTMLDivElement;
    private mainPropertyTitle: HTMLHeadingElement;
    
    /**
     * Initialize the main property controller
     * 
     * @param mainProperty - Main property instance
     */
    constructor(mainProperty: MainProperty) {
        this.mainProperty = mainProperty;
        this.mainImageContainer = getElement<HTMLDivElement>('.main-image');
        this.mainPropertyTitle = getElement<HTMLHeadingElement>('#main-property-title');
        
        // Initialize the main property display
        this.renderMainProperty();
    }
    
    /**
     * Render the main property in the UI
     */
    private renderMainProperty(): void {
        // Set the title
        this.mainPropertyTitle.textContent = this.mainProperty.title;
        
        // Create and set the main image
        const mainImage = document.createElement('img');
        mainImage.setAttribute('src', this.mainProperty.src);
        mainImage.setAttribute('alt', this.mainProperty.title);
        mainImage.classList.add('main-property-image');
        
        // Clear container and append the image
        this.mainImageContainer.innerHTML = '';
        this.mainImageContainer.appendChild(mainImage);
    }
    
    /**
     * Update the main property with new data
     * 
     * @param mainProperty - Updated main property instance
     */
    updateMainProperty(mainProperty: MainProperty): void {
        this.mainProperty = mainProperty;
        this.renderMainProperty();
    }
}