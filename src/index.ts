// index.ts
// Main entry point for the application
// Significantly simplified by moving functionality to separate modules

import { App } from './app';

// Initialize and start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create an instance of the App class
    const app = new App();
    
    // Start the application, which initializes controllers and renders the UI
    app.start();
});