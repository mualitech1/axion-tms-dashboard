/**
 * ID Utility Functions for Axion TMS Dashboard
 * Contains functions for generating various types of identifiers used throughout the application
 * 
 * IMPORTANT UPDATE: Backend database now uses Text format for IDs instead of UUIDs
 * All functions in this file generate text-based IDs compatible with the new schema
 */

/**
 * Generates a Universally Unique Lexicographically Sortable Identifier (ULID)
 * Implements time-ordered, sortable, URL-friendly identifiers
 * 
 * @returns {string} A 26-character ULID string
 * 
 * Format: 
 * - First 10 chars: time-based (sorts chronologically)
 * - Last 16 chars: random for uniqueness
 * 
 * Benefits:
 * - Lexicographically sortable (time-ordered)
 * - URL-friendly (all alphanumeric)
 * - Case-insensitive (can be lowercase)
 * - No special characters
 * - No timestamp collisions
 * - Human-readable (easier to distinguish than UUID)
 * - Compatible with Text format ID fields in the database
 */
export function generateULID(): string {
  // Crockford's Base32 character set (excludes I, L, O, U to avoid confusion)
  const ENCODING_CHARS = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  
  // Time part (48 bits) - first 10 characters
  const timestamp = Date.now();
  let encodedTime = '';
  let timeLeft = timestamp;
  
  for (let i = 0; i < 10; i++) {
    const mod = timeLeft % 32;
    timeLeft = Math.floor(timeLeft / 32);
    encodedTime = ENCODING_CHARS[mod] + encodedTime;
  }
  
  // Random part (80 bits) - last 16 characters
  let encodedRandom = '';
  for (let i = 0; i < 16; i++) {
    const randIndex = Math.floor(Math.random() * 32);
    encodedRandom += ENCODING_CHARS[randIndex];
  }
  
  // Combine time and random parts
  return encodedTime + encodedRandom;
}

/**
 * Extracts the timestamp from a ULID
 * 
 * @param {string} ulid - The ULID to extract timestamp from 
 * @returns {number} Timestamp in milliseconds since epoch
 */
export function getTimestampFromULID(ulid: string): number {
  if (!ulid || ulid.length !== 26) {
    throw new Error('Invalid ULID format');
  }
  
  // Crockford's Base32 character set for decoding
  const DECODING_CHARS: {[key: string]: number} = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'J': 18,
    'K': 19, 'M': 20, 'N': 21, 'P': 22, 'Q': 23, 'R': 24, 'S': 25, 'T': 26, 'V': 27,
    'W': 28, 'X': 29, 'Y': 30, 'Z': 31,
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15, 'g': 16, 'h': 17, 'j': 18,
    'k': 19, 'm': 20, 'n': 21, 'p': 22, 'q': 23, 'r': 24, 's': 25, 't': 26, 'v': 27,
    'w': 28, 'x': 29, 'y': 30, 'z': 31
  };
  
  // Extract time part (first 10 characters)
  const timePart = ulid.substring(0, 10);
  
  // Decode time value
  let timestamp = 0;
  for (let i = 0; i < 10; i++) {
    const char = timePart[i];
    const value = DECODING_CHARS[char];
    
    if (value === undefined) {
      throw new Error(`Invalid character in ULID: ${char}`);
    }
    
    timestamp = timestamp * 32 + value;
  }
  
  return timestamp;
}

/**
 * Generates a workflow-specific ID with a prefix
 * 
 * @param {string} prefix - Prefix to add to the ID (e.g., 'job', 'agent', 'workflow')
 * @returns {string} Prefixed ID with ULID compatible with Text format in database
 */
export function generatePrefixedId(prefix: string): string {
  return `${prefix}_${generateULID().toLowerCase()}`;
}

/**
 * Validates if a string is a valid ULID
 * 
 * @param {string} id - The ID to validate
 * @returns {boolean} True if valid ULID format, false otherwise
 */
export function isValidULID(id: string): boolean {
  if (!id || id.length !== 26) {
    return false;
  }
  
  // Validate against regex pattern for Crockford's Base32
  const ulidPattern = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i;
  return ulidPattern.test(id);
} 