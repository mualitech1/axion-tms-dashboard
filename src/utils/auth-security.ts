
import { supabase } from '@/integrations/supabase/client';
import { generateTOTP, verifyTOTP } from './totp-utils';

// Prepare TOTP (Time-based One-Time Password) setup
export async function prepareTOTPSetup(userId: string) {
  try {
    // Generate a secure random secret key
    const secret = await generateTOTP();
    
    // Store the secret in user's metadata temporarily until verification
    const { error } = await supabase.auth.updateUser({
      data: { 
        totp_secret_temp: secret,
        totp_enabled: false
      }
    });
    
    if (error) throw error;
    
    return { 
      secret,
      otpAuthUrl: `otpauth://totp/TMS:${userId}?secret=${secret}&issuer=TMS`
    };
  } catch (error) {
    console.error('Error preparing TOTP setup:', error);
    throw new Error('Failed to prepare two-factor authentication.');
  }
}

// Verify and enable TOTP
export async function verifyAndEnableTOTP(token: string) {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // Get temporary secret from metadata
    const tempSecret = user.user_metadata?.totp_secret_temp;
    if (!tempSecret) throw new Error('TOTP setup not initiated');
    
    // Verify the token against the temporary secret
    const isValid = await verifyTOTP(tempSecret, token);
    
    if (!isValid) {
      throw new Error('Invalid verification code');
    }
    
    // If valid, save the secret permanently and mark TOTP as enabled
    const { error } = await supabase.auth.updateUser({
      data: { 
        totp_secret: tempSecret,
        totp_enabled: true,
        totp_secret_temp: null
      }
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error verifying TOTP:', error);
    throw error;
  }
}

// Disable TOTP
export async function disableTOTP() {
  try {
    const { error } = await supabase.auth.updateUser({
      data: { 
        totp_secret: null,
        totp_enabled: false,
        totp_secret_temp: null
      }
    });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error disabling TOTP:', error);
    throw new Error('Failed to disable two-factor authentication');
  }
}

// Check if TOTP is enabled for the current user
export async function isTOTPEnabled() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.user_metadata?.totp_enabled === true;
  } catch (error) {
    console.error('Error checking TOTP status:', error);
    return false;
  }
}
