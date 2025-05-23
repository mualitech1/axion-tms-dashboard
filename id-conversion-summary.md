# Axion TMS - ID Schema Conversion (UUID to Text)

## Completed Changes

The following changes have been made to align the frontend with the backend's conversion from UUIDs to Text format for IDs:

### 1. Type Definitions Updated
- Modified all entity type definitions in `src/types/` to explicitly indicate IDs are now string-based (Text format)
- Added comments documenting the change from UUID to Text format for clarity
- Updated all related ID fields (foreign keys, etc.) to ensure they're properly typed as strings

### 2. ID Utility Functions
- Updated the ID generation utils in `src/utils/id-utils.ts` to clearly document they now produce Text-based IDs
- Added notes about compatibility with the backend schema changes
- Ensured all documentation reflects the schema change

### 3. Services & API Client
- Updated the Supabase client wrapper in `src/services/supabase-client.ts` with documentation about the ID format change
- Modified the job service to use our custom ID generation function instead of the external UUID library
- Added appropriate type annotations and comments to methods that handle IDs

### 4. Mock Data & Development Tools
- Updated the mock data in `src/hooks/useIdMapper.ts` to use text-based IDs instead of UUIDs
- Changed the format to follow the `<entity>_<ulid>` pattern for consistency

## Additional Recommendations

The following areas should also be reviewed to ensure complete alignment with the new ID schema:

### 1. Components & Pages
- Review all components that display or manipulate entity IDs to ensure they handle the Text format correctly
- Check any UI elements that might format or display IDs to users

### 2. Form Validations
- Update any form validation logic that might be checking for UUID format
- Ensure any ID-related error messages reflect the correct format expectations

### 3. URLs & Routing
- Review any routes that include IDs as parameters to ensure they handle the new format
- Check navigation logic that constructs URLs with IDs

### 4. Testing
- Update test fixtures and mocks to use the new ID format
- Add tests specifically to verify correct handling of the new ID format
- Test all CRUD operations across the application to verify compatibility

### 5. Error Handling
- Review error handling related to IDs to ensure appropriate messaging
- Check any custom error logging or analytics that might capture ID-related data

## Migration Considerations

1. **Database Compatibility**: The backend has already been migrated from UUIDs to Text format. No additional database changes are needed.

2. **API Compatibility**: The API already expects and returns Text format IDs. The frontend has been updated to align with this expectation.

3. **Legacy Data**: If there's any need to support legacy UUIDs during a transition period, additional mapping logic may be needed.

4. **Performance Impact**: The Text format for IDs shouldn't have any significant performance impact compared to UUIDs.

## Verification Steps

To verify the changes are working correctly:

1. Create new entities (customers, carriers, jobs, etc.) and ensure they receive properly formatted text IDs
2. Fetch existing entities and verify the IDs are handled correctly
3. Update entities with text IDs and ensure the changes are saved
4. Delete entities using text IDs and verify the operation completes successfully
5. Test all navigation that utilizes entity IDs in routes or parameters

## Future Considerations

As the application evolves, maintain consistency with the Text format for all new entity types and relationships. When creating new utilities or components that work with IDs, ensure they're designed with the Text format in mind from the beginning. 