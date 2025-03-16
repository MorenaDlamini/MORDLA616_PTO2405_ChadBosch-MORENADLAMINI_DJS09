// footer-controller.ts
// Controller for footer content
// Manages the footer section of the application

import { getElement } from '../core/utils/dom-helpers';
import { createFooterContent } from '../components/ui-components';

/**
 * FooterController handles footer UI and interactions
 * Manages location information and footer links
 */
export class FooterController {
    private footer: HTMLDivElement;
    private locationInfo: [string, string, number];
    
    /**
     * Initialize the footer controller
     * 
     * @param locationInfo - Current location information [city, time, temperature]
     */
    constructor(locationInfo: [string, string, number]) {
        this.locationInfo = locationInfo;
        this.footer = getElement<HTMLDivElement>('.footer');
        
        // Render footer content
        this.renderFooter();
    }
    
    /**
     * Render footer content
     */
    private renderFooter(): void {
        const footerContent = createFooterContent(this.locationInfo);
        
        // Clear existing content and append new footer
        this.footer.innerHTML = '';
        this.footer.appendChild(footerContent);
    }
    
    /**
     * Update location information
     * 
     * @param locationInfo - Updated location information
     */
    updateLocationInfo(locationInfo: [string, string, number]): void {
        this.locationInfo = locationInfo;
        this.renderFooter();
    }
}