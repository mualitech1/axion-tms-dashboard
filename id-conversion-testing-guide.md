# UUID to Text ID Conversion - Testing Guide

This guide outlines the specific test cases to verify that all components correctly handle the new text-based ID format.

## Testing Approach

### 1. Manual Testing of Key Flows

#### Job Creation Flow
1. Navigate to the Jobs page
2. Click "Create New Job"
3. Fill in all required fields
4. Submit the form
5. Verify the created job has a text-based ID in the format `job_[timestamp]_[random]`
6. Verify the job details page loads correctly with the new ID

#### Job Status Updates
1. Navigate to any job detail page 
2. Update the job status via the JobStatusCard
3. Verify the status change is saved correctly
4. Check network requests to confirm the ID is sent as a string

#### Customer/Carrier Details
1. Navigate to any customer or carrier detail page
2. Verify all data loads correctly
3. Make an update to the customer/carrier
4. Verify changes save correctly 

### 2. Automated Testing with ID Format Tester

We've created utility functions in `src/utils/id-format-tester.ts` to validate IDs:

```typescript
// Example usage in console or tests
import { batchTestIds, deepCheckObjectIds } from '../utils/id-format-tester';

// Test job IDs from API response
const jobIds = jobs.map(job => job.id);
const results = batchTestIds(jobIds, 'job');
console.log(results.summary); // Should show 100% valid

// Deeply check objects for valid IDs
const objectCheck = deepCheckObjectIds(complexObject);
if (objectCheck.invalidIds.length > 0) {
  console.error('Invalid IDs found:', objectCheck.invalidIds);
}
```

### 3. Key Components to Test

| Component | Test Method | Expected Result |
|-----------|-------------|-----------------|
| JobDetailPage | Load several different jobs | All job data displays correctly |
| JobCreationForm | Create new jobs | IDs follow `job_[timestamp]_[random]` format |
| JobStatusCard | Update job status | Status updates save correctly |
| CarrierDetails | View and update carrier | All data loads and saves correctly |
| CustomerDetailPage | View and update customers | All data loads and saves correctly |

### 4. Testing API Interactions

Use the browser developer tools to:

1. Monitor network requests during CRUD operations
2. Verify that IDs are consistently passed as strings
3. Check that response handling correctly processes string IDs

### 5. Edge Cases to Test

- Jobs with very long IDs (test performance)
- Special characters in IDs (should be properly escaped)
- Sorting and filtering by ID
- Import/export functionality with the new ID format

## Reporting Issues

If you find any components or functions not correctly handling text-based IDs, please:

1. Document the specific issue with screenshots
2. Note the component name and file path
3. Provide steps to reproduce
4. File an issue in the tracking system with the tag "id-conversion"

## Verification Checklist

- [ ] All job IDs follow the `job_[timestamp]_[random]` format
- [ ] Job creation generates valid text IDs
- [ ] Job detail page loads correctly with text IDs
- [ ] Job status updates work correctly
- [ ] Customer pages handle text IDs correctly
- [ ] Carrier pages handle text IDs correctly
- [ ] API calls pass IDs as strings
- [ ] No type errors in console
- [ ] Search and filtering work with text IDs
- [ ] Automatic ID format validation passes on all pages 