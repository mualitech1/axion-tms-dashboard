
/**
 * Security headers utility functions
 * These headers help protect against various web security threats
 */

// Content Security Policy (CSP) settings
// This helps prevent XSS attacks by specifying which resources can be loaded
export const getCSPHeaders = (): HeadersInit => {
  return {
    'Content-Security-Policy': [
      // Only allow scripts from the same origin and trusted CDNs
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      // Only allow styles from the same origin and trusted CDNs
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Only allow images from the same origin and trusted sources
      "img-src 'self' data: https://cdn.jsdelivr.net https://images.unsplash.com blob:",
      // Only allow fonts from trusted sources
      "font-src 'self' https://fonts.gstatic.com",
      // Default fallback - only allow from same origin
      "default-src 'self'",
      // Frame restrictions
      "frame-ancestors 'self'",
      // Form submissions only to same origin
      "form-action 'self'"
    ].join('; ')
  };
};

// CSRF Protection Headers
// These headers help protect against Cross-Site Request Forgery attacks
export const getCSRFHeaders = (csrfToken: string): HeadersInit => {
  return {
    'X-CSRF-Token': csrfToken
  };
};

// Security Headers
// These headers provide additional security protections for the application
export const getSecurityHeaders = (): HeadersInit => {
  return {
    // Prevents browsers from MIME-sniffing a response away from the declared content-type
    'X-Content-Type-Options': 'nosniff',
    // Controls how much information the browser includes when navigating from the site
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Prevents the browser from rendering the page if it detects a reflected XSS attack
    'X-XSS-Protection': '1; mode=block',
    // Prevents the page from being framed by other sites (clickjacking protection)
    'X-Frame-Options': 'SAMEORIGIN',
    // Ensures site is accessed over HTTPS (requires proper server configuration)
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  };
};

// Generate CSRF token
export function generateCSRFToken(): string {
  // Create a random string of 32 characters for CSRF token
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Store CSRF token in localStorage
export function storeCSRFToken(): string {
  const token = generateCSRFToken();
  localStorage.setItem('csrf_token', token);
  return token;
}

// Get CSRF token from localStorage
export function getCSRFToken(): string {
  let token = localStorage.getItem('csrf_token');
  
  // If token doesn't exist, generate a new one
  if (!token) {
    token = storeCSRFToken();
  }
  
  return token;
}

// Add CSRF token to form
export function addCSRFTokenToForm(formElement: HTMLFormElement): void {
  const token = getCSRFToken();
  let input = formElement.querySelector('input[name="_csrf"]');
  
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = '_csrf';
    formElement.appendChild(input);
  }
  
  (input as HTMLInputElement).value = token;
}

// Verify that request has the correct CSRF token
export function verifyCSRFToken(requestToken: string): boolean {
  const storedToken = localStorage.getItem('csrf_token');
  return storedToken === requestToken && !!storedToken;
}
