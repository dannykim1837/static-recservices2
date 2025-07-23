## Installation/Setup Guide

### Prerequisites
- Supported browsers: Chrome, Firefox, Safari, Edge
- Stable internet connection

### Install Steps

1. **Clone the repository:**

   ```
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies:**

   ```
   cd apps/backend
   npm install
   ```

3. **Environment Variables:**

   - Copy `.env.example` to `.env` and fill in your Supabase credentials and any other required secrets.

4. **Database Setup:**

   - The database schema is managed via Supabase. See `local_db_schema.sql` for reference.
   - Use the Supabase dashboard to manage tables, RLS policies, and authentication.

5. **Running the Backend:**
   ```
   npm start
   ```
   - The server will run on the port specified in your `.env` file (default: 3000).
