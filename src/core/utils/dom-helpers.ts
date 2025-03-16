// src/dom-helpers.ts
// Helper functions for DOM manipulation and element selection
// Encapsulates DOM-related utility functions to maintain separation of concerns

/**
 * Safely get an element from the DOM with type checking
 * Throws an error if the element doesn't exist to avoid null checks throughout the code
 * 
 * @param selector - CSS selector for the element
 * @returns The selected element with proper TypeScript typing
 */
export const getElement = <T extends HTMLElement>(selector: string): T => {
    const element = document.querySelector<T>(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
};

/**
 * Creates a loading skeleton card for property listings
 * Used during data loading to improve perceived performance
 * 
 * @returns HTML element representing a skeleton card
 */
export function createSkeletonCard(): HTMLDivElement {
    const skeletonCard = document.createElement('div');
    skeletonCard.classList.add('card', 'skeleton-card');
    
    const skeletonImage = document.createElement('div');
    skeletonImage.classList.add('skeleton-image');
    
    const skeletonTitle = document.createElement('div');
    skeletonTitle.classList.add('skeleton-title');
    
    const skeletonPrice = document.createElement('div');
    skeletonPrice.classList.add('skeleton-price');
    
    skeletonCard.appendChild(skeletonImage);
    skeletonCard.appendChild(skeletonTitle);
    skeletonCard.appendChild(skeletonPrice);
    
    return skeletonCard;
}

/**
 * Display loading state while content is being fetched
 * Improves user experience by showing skeleton UI during loading
 * 
 * @param container - Container element to show loading indicators in
 * @param count - Number of skeleton items to display
 */
export function showLoadingState(container: HTMLElement, count: number = 4): void {
    container.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        container.appendChild(createSkeletonCard());
    }
}