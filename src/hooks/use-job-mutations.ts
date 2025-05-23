  if (error) {
    console.error('❌ SUPABASE ERROR:', error);
    
    // Enhanced error handling for common issues
    if (error.message.includes('duplicate key')) {
      throw new Error('A job with this ID already exists');
    } else if (error.message.includes('violates foreign key constraint')) {
      throw new Error('Invalid relationship: Customer, carrier, vehicle or driver does not exist');
    } else if (error.message.includes('violates not-null constraint')) {
      // Extract the field name from error message
      const fieldMatch = error.message.match(/column "([^"]+)"/);
      const fieldName = fieldMatch ? fieldMatch[1] : 'unknown field';
      throw new Error(`Missing required field: ${fieldName}`);
    } else if (error.message.includes('reference') && error.message.includes('has no field')) {
      throw new Error('Schema mismatch: The database field for job identifiers is "reference". Please update your code.');
    } else if (error.message.includes('has no field "reference"')) {
      throw new Error('Schema mismatch: The database field for job identifiers is "reference". Please update your code.');
    } else if (error.message.includes('has no field')) {
      const fieldMatch = error.message.match(/has no field "([^"]+)"/);
      const fieldName = fieldMatch ? fieldMatch[1] : 'unknown field';
      throw new Error(`Schema mismatch: The field "${fieldName}" does not exist in the database. Please contact support.`);
    } else {
      throw error;
    }
  } 