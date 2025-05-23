# AetherForge ID System Documentation

## ULID Implementation

AetherForge uses Universally Unique Lexicographically Sortable Identifiers (ULIDs) for generating unique identifiers throughout the system. This document explains the implementation and benefits of this approach.

### What are ULIDs?

ULIDs are 26-character identifiers that combine:
- 10 characters of time information (millisecond precision)
- 16 characters of randomness

Example: `01H5ZXVBTPQFRF3AHMS9XPPT8E`

### Why ULIDs for AetherForge?

1. **Time-Sorting**: ULIDs are lexicographically sortable, meaning they naturally sort in chronological order when sorted as strings.
2. **URL-Friendly**: They only use alphanumeric characters from Crockford's Base32 encoding (0-9, A-Z excluding I, L, O, U).
3. **Unique**: The combination of timestamp and randomness ensures uniqueness across distributed systems.
4. **No Coordination Required**: Unlike auto-incrementing IDs, ULIDs can be generated independently.
5. **Opaque**: Unlike sequence IDs, they don't expose information about volume.
6. **Human-Distinguishable**: Easier to differentiate visually than UUIDs.

### Implementation Details

Our ULID implementation follows the standard specification:

1. **Time Component**: 
   - 48 bits (10 characters) of millisecond timestamp
   - Monotonically increasing when sorted
   - Covers 10,889 years of timestamp data

2. **Random Component**:
   - 80 bits (16 characters) of randomness
   - Cryptographically secure random number generation
   - Provides 1.21e+24 unique combinations per millisecond

3. **Encoding**:
   - Uses Crockford's Base32 for human-friendliness
   - Excludes easily confused characters (I, L, O, U)
   - Case-insensitive for flexibility

### Usage in AetherForge

ULIDs are used throughout AetherForge for:
- Agent IDs
- Job IDs
- Workflow IDs
- Transaction IDs
- Session IDs
- Document IDs

### Helper Functions

The system provides several helper functions in `src/utils/id-utils.ts`:

- `generateULID()`: Creates a new ULID
- `getTimestampFromULID(ulid)`: Extracts the timestamp from a ULID
- `generatePrefixedId(prefix)`: Creates a prefixed ID (e.g., `job_01H5ZXVBTPQFRF3AHMS9XPPT8E`)
- `isValidULID(id)`: Validates a ULID format

### Examples

```typescript
import { generateULID, generatePrefixedId } from '../utils/id-utils';

// Generate a plain ULID
const agentId = generateULID();
// Result: 01H5ZXVBTPQFRF3AHMS9XPPT8E

// Generate a prefixed ULID for a job
const jobId = generatePrefixedId('job');
// Result: job_01h5zxvbtpqfrf3ahms9xppt8e

// Generate a prefixed ULID for an agent
const agentId = generatePrefixedId('agent');
// Result: agent_01h5zxvbtpqfrf3ahms9xppt8e
```

### Migration Notes

When migrating existing systems to use ULIDs:
1. Ensure database indexes support the new ID format
2. Consider creating mapping tables if needed for legacy IDs
3. Update API documentation to reflect the new ID format

### Security Considerations

While ULIDs contain timestamp information, they don't expose any sensitive data. The timestamp component is primarily useful for sorting and doesn't reveal any specific information about the entity itself.

### References

- [ULID Specification](https://github.com/ulid/spec)
- [Crockford's Base32 Encoding](https://www.crockford.com/base32.html) 