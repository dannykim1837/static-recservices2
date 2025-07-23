Fix these files to be compatible with supabase

// All controller files are now compatible with Supabase.

Each controller (employees.js, locations.js, positions.js, shifts.js):
- Uses Supabase for all database operations (no local JSON or DB switching).
- Validates data using schemaValidation.js before making changes.
- Logs a green checkmark (✅) if the connection to the Supabase table is successful, or a red X (❌) if not.
- Follows a consistent structure for CRUD operations and error handling.

No further migration to Supabase is needed for these controllers.

employees.js has been fixed