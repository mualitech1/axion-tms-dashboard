
/**
 * Utility functions for Time-based One-Time Password (TOTP) generation and validation
 */

// Generate a secure random key of specified length
function generateRandomKey(length = 16) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; // Base32 charset
  let result = "";
  const bytes = new Uint8Array(length);
  
  // Use crypto.getRandomValues for secure random generation
  window.crypto.getRandomValues(bytes);
  
  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charset.length];
  }
  
  return result;
}

// Generate a new TOTP secret
export async function generateTOTP() {
  return generateRandomKey(16);
}

// Verify a TOTP code against a secret
export async function verifyTOTP(secret: string, token: string) {
  // In a real implementation, this would use a proper TOTP library to:
  // 1. Convert the secret to a proper format (base32 decode)
  // 2. Calculate the current time step (based on 30-second intervals)
  // 3. Generate a hash (HMAC-SHA1) using the secret and time step
  // 4. Extract a 6-digit code from the hash
  // 5. Compare it with the user-provided token
  
  // For demonstration purposes, we'll mock this behavior
  // In production, use a library like 'otplib' or implement the RFC 6238 algorithm
  
  // Mock implementation for demonstration - in a real app, use a proper TOTP library
  if (token.length !== 6 || !/^\d+$/.test(token)) {
    return false;
  }
  
  // For demo purposes, accepting any 6-digit code
  // IN PRODUCTION: Replace with actual TOTP verification
  console.log('Verifying token', token, 'against secret', secret);
  return true;
}
