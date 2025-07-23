# SDD Section 5: Interface: APIs between the Back-End and Database

## 5.1 Overview

This section describes the API interfaces used by the backend application to interact with the database tier, which is powered by **Supabase**. Supabase offers a PostgreSQL backend with built-in RESTful APIs and real-time functionality. All interactions with the database (CRUD operations) are performed via Supabase's JavaScript client library, which handles authentication, permissions, and query execution.

---

## 5.2 Technology Stack

- **Database**: Supabase (PostgreSQL)
- **Communication Protocol**: HTTPS over Supabase client SDK
- **Authentication**: Supabase Auth (JWT-based session tokens)
- **Data Format**: JSON

---

## 5.3 API Interface Description

The backend uses Supabase's client library to perform operations on the following tables:

- `employees`
- `shift`
- `department`
- `position`

### 5.3.1 `employees` Table

| Operation | Endpoint | Method | Description |
|----------|----------|--------|-------------|
| Create | `.from('employees').insert()` | `POST` | Inserts a new employee record |
| Read | `.from('employees').select()` | `GET` | Retrieves employee data |
| Update | `.from('employees').update().eq()` | `PATCH` | Updates an employee record by `employee_id` |
| Delete | `.from('employees').delete().eq()` | `DELETE` | Deletes an employee by `employee_id` |

**Example: Insert Employee**
```js
const { data, error } = await supabase
  .from('employees')
  .insert([
    {
      employee_id: supabase.auth.user().id,
      first: 'Jane',
      last: 'Doe',
      position: 'Lifeguard',
      location: 'Hart',
      group: 'Lifeguards',
      email: 'jane@company.com',
    },
  ]);
