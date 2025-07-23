# Rec Services Backend Developer’s Guide

## 1. Project Overview

This backend powers the Rec Services Time Management application, handling shift scheduling, employee management, authentication, and API endpoints for the frontend. The backend is currently implemented using Node.js, Express, and Supabase (PostgreSQL) for data storage and authentication.

**Frontend Integration:**
The backend provides RESTful APIs and authentication for the React frontend application located in the `static-recservices/` folder. All user interactions, such as shift management and time clock operations, are performed through the React app, which communicates with this backend via HTTP requests.

---

## 2. Tech Stack

- **Language:** JavaScript (Node.js)
- **Framework:** Express.js (legacy), Supabase (current)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (JWT-based)
- **API Type:** RESTful APIs (JSON)
- **Testing:** None Yet

---

## 3. Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)
- Supabase account and project access
- (Optional) GitHub account for code contributions

### Setup

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

---

## 4. Project Structure

```
apps/backend/
  ├── server.js                # Main entry point
  ├── package.json
  ├── local_db_schema.sql      # Database schema (reference)
  └── src/
      ├── config/              # Configuration files
      ├── controllers/         # Route handlers (business logic)
      ├── data/                # Static data or seed files
      ├── database/            # DB connection logic
      ├── middleware/          # Express middleware
      ├── migrations/          # DB migration scripts (if any)
      ├── models/              # Data models (if used)
      ├── routes/              # API route definitions
      ├── seeds/               # Seed scripts
      ├── supabase/            # Supabase integration logic
      ├── utils/               # Utility functions
      └── validation/          # Input validation logic
```

---

## 5. Coding Standards

- Use consistent code style (e.g., Prettier, ESLint if configured)
- Use async/await for asynchronous code
- Keep controllers focused on business logic; use services/utils for reusable logic
- Validate all incoming data
- Use environment variables for secrets and configuration

---

## 6. API Endpoints

- All API endpoints are defined in `src/routes/`
- Controllers are in `src/controllers/`
- See OpenAPI spec (`openapi.json`) for full API documentation

---

## 7. Authentication

- Supabase Auth is used for user authentication and authorization
- Protect sensitive routes using middleware (see `src/middleware/`)
- Role-based access is managed via Supabase RLS policies

---

## 8. Database

- Supabase (PostgreSQL) is the primary database
- Schema is defined in `local_db_schema.sql` and managed via the Supabase dashboard
- Use Supabase client libraries for database access

---

## 9. Testing

- (Describe how to run backend tests, if any. E.g., `npm test`)
- (Describe how to add new tests)

---

## 10. Deployment

- (Describe deployment process: e.g., Vercel, Heroku, Supabase hosting, etc.)
- Ensure environment variables are set in the deployment environment

---

## 11. Troubleshooting

- Check `.env` for correct Supabase credentials
- Use logs for debugging (add logging as needed)
- Check Supabase dashboard for database and auth issues

---

## 12. Contributing

- Create a new branch for your feature or bugfix
- Follow code style and commit message guidelines
- Open a pull request for review
- Link related issues in your PR

---

## 13. Further Help

- Supabase docs: https://supabase.com/docs
- Node.js docs: https://nodejs.org/en/docs
- Express docs: https://expressjs.com/
- Contact: Brother Clements or current team/project leader
