/**
 * Utility functions for generating and handling URL slugs
 */

/**
 * Generates a URL-friendly slug from a string
 * @param text The text to convert to a slug (typically customer name)
 * @returns A normalized, URL-friendly slug
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Finds a customer by slug from a list of customers
 * @param customers Array of customers
 * @param slug The slug to search for
 * @returns The customer with the matching slug, or undefined if not found
 */
export function findCustomerBySlug(customers: any[], slug: string): any | undefined {
  if (!slug || !customers?.length) return undefined;
  
  return customers.find(customer => 
    generateSlug(customer.name) === slug
  );
}

/**
 * Create a customer URL that uses the slug and ID
 * @param customerId The customer ID
 * @param customerName The customer name to convert to a slug
 * @param tab Optional tab name to activate
 * @returns A URL string with the slug and ID query parameter
 */
export function createCustomerUrl(customerId: string, customerName: string, tab?: string): string {
  const slug = generateSlug(customerName);
  const baseUrl = `/customers/${slug}`;
  const params = new URLSearchParams();
  
  // Add ID as a query parameter for accurate lookup
  params.append('id', customerId);
  
  // Add tab if provided
  if (tab) {
    params.append('tab', tab);
  }
  
  return `${baseUrl}?${params.toString()}`;
} 