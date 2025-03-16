// ui-components.ts
// UI component creation and rendering logic
// Encapsulates DOM creation for various UI components used in the application

import { Property } from '../core/models/interfaces';
import { LoyaltyUser } from '../core/models/enums';
import { PropertyService } from '../core/service/property-service';

/**
 * Create a property card element
 * 
 * @param property - Property data to render
 * @param onClickHandler - Function to call when the card is clicked
 * @returns Property card DOM element
 */
export function createPropertyCard(property: Property, onClickHandler: (property: Property) => void): HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-title', property.title);
    
    const image = document.createElement('img');
    image.setAttribute('src', property.image);
    image.setAttribute('alt', property.title);
    image.setAttribute('loading', 'lazy');
    card.appendChild(image);
    
    // Add availability badge
    const availabilityBadge = document.createElement('div');
    availabilityBadge.classList.add('availability-badge');
    availabilityBadge.textContent = property.isAvailable ? 'Available' : 'Booked';
    availabilityBadge.classList.add(property.isAvailable ? 'available' : 'unavailable');
    card.appendChild(availabilityBadge);
    
    // Price display
    const priceDisplay = document.createElement('div');
    priceDisplay.classList.add('price-display');
    priceDisplay.textContent = `$${property.price}/night`;
    card.appendChild(priceDisplay);
    
    // Location snippet
    const locationSnippet = document.createElement('div');
    locationSnippet.classList.add('location-snippet');
    locationSnippet.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location.city}, ${property.location.country}`;
    card.appendChild(locationSnippet);
    
    // Add click event to show property details
    card.addEventListener('click', () => {
        onClickHandler(property);
    });
    
    return card;
}

/**
 * Create property modal content
 * 
 * @param property - Property to display details for
 * @returns Modal content HTML element
 */
export function createPropertyModalContent(property: Property): HTMLDivElement {
    const content = document.createElement('div');
    content.classList.add('modal-content-wrapper');
    
    // Property image
    const image = document.createElement('img');
    image.setAttribute('src', property.image);
    image.setAttribute('alt', property.title);
    image.classList.add('modal-image');
    content.appendChild(image);
    
    // Property details
    const details = document.createElement('div');
    details.classList.add('property-details');
    
    // Price
    const price = document.createElement('p');
    price.innerHTML = `<strong>Price:</strong> $${property.price}/night`;
    price.classList.add('detail-item');
    details.appendChild(price);
    
    // Location
    const location = document.createElement('div');
    location.classList.add('detail-item');
    location.innerHTML = `
        <strong>Location:</strong>
        <p>${property.location.firstLine}</p>
        <p>${property.location.city}, ${property.location.code}</p>
        <p>${property.location.country}</p>
    `;
    details.appendChild(location);
    
    // Contact
    const contact = document.createElement('div');
    contact.classList.add('detail-item');
    contact.innerHTML = `
        <strong>Contact:</strong>
        <p><i class="fas fa-phone"></i> ${property.contact[0]}</p>
        <p><i class="fas fa-envelope"></i> ${property.contact[1]}</p>
    `;
    details.appendChild(contact);
    
    // Availability
    const availability = document.createElement('p');
    availability.classList.add('detail-item');
    availability.innerHTML = `<strong>Status:</strong> <span class="${property.isAvailable ? 'available-text' : 'unavailable-text'}">${property.isAvailable ? 'Available' : 'Booked'}</span>`;
    details.appendChild(availability);
    
    // Add booking button if available
    if (property.isAvailable) {
        const bookButton = document.createElement('button');
        bookButton.textContent = 'Book Now';
        bookButton.classList.add('book-button');
        bookButton.addEventListener('click', (event) => {
            event.stopPropagation();
            alert(`Booking ${property.title} - This would connect to a booking system in a real application`);
        });
        details.appendChild(bookButton);
    }
    
    content.appendChild(details);
    return content;
}

/**
 * Create filter controls for property filtering
 * 
 * @param properties - Property data to derive filter options from
 * @param onFilterApply - Callback for when filters are applied
 * @param onFilterReset - Callback for when filters are reset
 * @returns Filter controls container element
 */
export function createFilterControls(
    properties: Property[], 
    onFilterApply: () => void,
    onFilterReset: () => void
): HTMLDivElement {
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-container');
    
    // Country filter
    const countryFilter = document.createElement('select');
    countryFilter.id = 'country-filter';
    countryFilter.classList.add('filter-select');
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'All Countries';
    countryFilter.appendChild(defaultOption);
    
    // Add options for each country
    const countries = PropertyService.getUniqueCountries(properties);
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.text = country;
        countryFilter.appendChild(option);
    });
    
    // Price filter
    const priceFilter = document.createElement('select');
    priceFilter.id = 'price-filter';
    priceFilter.classList.add('filter-select');
    
    // Add default option
    const priceDefaultOption = document.createElement('option');
    priceDefaultOption.value = '';
    priceDefaultOption.text = 'All Prices';
    priceFilter.appendChild(priceDefaultOption);
    
    // Add options for each price
    const prices = PropertyService.getUniquePrices(properties);
    prices.forEach(price => {
        const option = document.createElement('option');
        option.value = price.toString();
        option.text = `$${price}`;
        priceFilter.appendChild(option);
    });
    
    // Availability filter
    const availabilityFilter = document.createElement('div');
    availabilityFilter.classList.add('checkbox-container');
    availabilityFilter.innerHTML = `
        <label for="available-filter" class="checkbox-label">
            <input type="checkbox" id="available-filter" /> 
            Show only available properties
        </label>
    `;
    
    // Add labels and append filters
    const countryLabel = document.createElement('div');
    countryLabel.classList.add('filter-group');
    countryLabel.innerHTML = `<label for="country-filter">Country:</label>`;
    countryLabel.appendChild(countryFilter);
    
    const priceLabel = document.createElement('div');
    priceLabel.classList.add('filter-group');
    priceLabel.innerHTML = `<label for="price-filter">Price:</label>`;
    priceLabel.appendChild(priceFilter);
    
    // Sort options
    const sortSelect = document.createElement('select');
    sortSelect.id = 'sort-select';
    sortSelect.classList.add('filter-select');
    
    const sortOptions = [
        { value: 'price-asc', text: 'Price: Low to High' },
        { value: 'price-desc', text: 'Price: High to Low' },
        { value: 'name-asc', text: 'Name: A to Z' },
        { value: 'name-desc', text: 'Name: Z to A' }
    ];
    
    sortOptions.forEach(option => {
        const sortOption = document.createElement('option');
        sortOption.value = option.value;
        sortOption.text = option.text;
        sortSelect.appendChild(sortOption);
    });
    
    const sortLabel = document.createElement('div');
    sortLabel.classList.add('filter-group');
    sortLabel.innerHTML = `<label for="sort-select">Sort by:</label>`;
    sortLabel.appendChild(sortSelect);
    
    // Filter button
    const filterButton = document.createElement('button');
    filterButton.textContent = 'Apply Filters';
    filterButton.classList.add('filter-button');
    filterButton.addEventListener('click', onFilterApply);
    
    // Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('reset-button');
    resetButton.addEventListener('click', onFilterReset);
    
    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(filterButton);
    buttonContainer.appendChild(resetButton);
    
    // Append all filters to the container
    filterContainer.appendChild(countryLabel);
    filterContainer.appendChild(priceLabel);
    filterContainer.appendChild(availabilityFilter);
    filterContainer.appendChild(sortLabel);
    filterContainer.appendChild(buttonContainer);
    
    return filterContainer;
}

/**
 * Create pagination controls
 * 
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param onPrevious - Callback for previous page button
 * @param onNext - Callback for next page button
 * @returns Pagination controls element
 */
export function createPaginationControls(
    currentPage: number,
    totalPages: number,
    onPrevious: () => void,
    onNext: () => void
): HTMLDivElement {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination-container');
    
    // Don't show pagination if only one page
    if (totalPages <= 1) return paginationContainer;
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('pagination-button');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', onPrevious);
    
    // Page indicator
    const pageIndicator = document.createElement('span');
    pageIndicator.classList.add('page-indicator');
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('pagination-button');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', onNext);
    
    // Add elements to the pagination container
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageIndicator);
    paginationContainer.appendChild(nextButton);
    
    return paginationContainer;
}

/**
 * Create review card element
 * 
 * @param review - Review data
 * @returns Review card element
 */
export function createReviewCard(review: any): HTMLDivElement {
    const card = document.createElement('div');
    card.classList.add('review-card');
    
    // Rating stars display
    const starsDiv = document.createElement('div');
    starsDiv.classList.add('stars-display');
    
    for (let j = 1; j <= 5; j++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.classList.add(j <= review.stars ? 'filled' : 'empty');
        star.innerHTML = '★';
        starsDiv.appendChild(star);
    }
    
    // Review content
    const reviewContent = document.createElement('div');
    reviewContent.classList.add('review-content');
    
    // Add loyalty badge if gold user
    const nameElement = document.createElement('div');
    nameElement.classList.add('reviewer-name');
    if (review.loyaltyUser === LoyaltyUser.GOLD_USER) {
        nameElement.innerHTML = `${review.name} <span class="loyalty-badge gold">★</span>`;
    } else {
        nameElement.textContent = review.name;
    }
    
    const dateElement = document.createElement('div');
    dateElement.classList.add('review-date');
    dateElement.textContent = review.date;
    
    reviewContent.appendChild(nameElement);
    reviewContent.appendChild(dateElement);
    reviewContent.appendChild(starsDiv);
    card.appendChild(reviewContent);
    
    return card;
}

/**
 * Create "No results" element when no properties match filters
 * 
 * @returns No results element
 */
export function createNoResultsElement(): HTMLDivElement {
    const noResults = document.createElement('div');
    noResults.textContent = 'No properties match your search criteria';
    noResults.classList.add('no-results');
    return noResults;
}

/**
 * Create footer content
 * 
 * @param locationInfo - Current location information [city, time, temperature]
 * @returns Footer content element
 */
export function createFooterContent(locationInfo: [string, string, number]): HTMLDivElement {
    const footerContent = document.createElement('div');
    footerContent.classList.add('footer-content');
    footerContent.innerHTML = `
        <div class="footer-location">
            <i class="fas fa-map-marker-alt"></i> Current location: ${locationInfo[0]}
            <br>Time: ${locationInfo[1]} | Temperature: ${locationInfo[2]}°C
        </div>
        <div class="footer-links">
            <a href="#" class="footer-link">About Us</a>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Terms & Conditions</a>
            <a href="#" class="footer-link">Privacy Policy</a>
        </div>
        <div class="copyright">© ${new Date().getFullYear()} Property Rental App. All rights reserved.</div>
    `;
    return footerContent;
}