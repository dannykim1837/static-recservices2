
# RecServices Employee CLI — Program Summary

## Overview

This project is a terminal-based Node.js CLI for managing employee data stored in a local MySQL database. It enables Create, Read, Update, and Delete (CRUD) operations on the `employees` table and is designed to be developer-friendly and easily extendable for future database entities.

All code and database logic can be found in the following files:

- [`app.js`](./app.js): CLI controller and program flow
- [`queries.js`](./queries.js): SQL logic and database operation functions
- [`db.js`](./db.js): Establishes connection to MySQL
- [`recservicedatabase.sql`](./recservicedatabase.sql): Schema definition
- [`employee_and_shift_population.sql`](./employee_and_shift_population.sql): Sample data population

---

## Architecture & Design Rationale

This CLI was developed with clarity, simplicity, and extensibility in mind. Here's why the system is built the way it is:

- **CLI-based**: A full GUI wasn't necessary. A terminal interface is sufficient for administrators and dev teams.
- **Modular Codebase**: Separation of concerns is maintained across files for easier maintenance.
- **Direct SQL Queries**: Queries are written in raw SQL for transparency and fine-tuned control.
- **MySQL with `mysql2/promise`**: Chosen for promise-based syntax and strong support for relational data.

---

## How to Set Up and Run the Program

### Prerequisites

- Node.js installed locally
- MySQL Server running on `localhost`

### 1. Set up the database

Use the following files to setup a local instance in your MySQL Workbench:

- [`recservicedatabase.sql`](./recservicedatabase.sql): Schema definition
- [`employee_and_shift_population.sql`](./employee_and_shift_population.sql): Sample data population

This will create the `recservices` database and populate it with the necessary tables and demo data.

### 2. Install Node.js dependencies

`bash`
```bash
npm install mysql2
```

### 3. Run the CLI

`bash`
```bash
node app.js
```

Make sure you are in the same directory as the `app.js` file.

You will be prompted for your MySQL username and password. These are used to connect to the `recservices` database.

## Code Functionalities

All operations are accessible through the interactive menu in `app.js`.

### 1. Insert Employee

Prompts for all required fields and adds a new employee to the database using a parameterized INSERT query.

### 2. View All Employees

Displays all records from the `employees` table.

### 3. Search Employees

Allows searching by any field (ID, first name, last name, position, etc.) using an exact match query.

### 4. Update Employee

Prompts for each field of the selected employee and updates only the changed fields.

### 5. Delete Employee.

Removes an employee by ID.

---

## File Descriptions

### `app.js`

- Entry point of the program.

- Uses `readline` to display a text-based menu.

- Handles user input and calls appropriate query functions.

### `queries.js`

- Contains all SQL logic as asynchronous functions.

- Implements parameterized queries for security.

- Modular and easy to extend with new table logic.

### `db.js`

- Handles MySQL connection setup using provided credentials.

- Exits *gracefully* on connection failure. (Program kills itself.)

### `recservicedatabase.sql`

- Defines the schema for `employees`, `shifts`, and any other future tables.

- Includes constraints and types necessary for initial deployment.

### `employee_and_shift_population.sql`

- Populates sample records for demo and testing.

- Useful (hopefully) for developers to work with non-empty datasets.

---

## Future Plans & Best Practices

### Technical Enhancements

- Environment Configuration: Store DB credentials in `.env` using `dotenv.`

- CLI UX: Migrate from `readline` to `inquirer.js` for a more structured and user-friendly interface. Or move UI/UX to app. Probably that. No one likes CLI anymore ;-;

- Input Validation: Add checks for numeric input, emails, etc., to reduce invalid data entries.

- Error Handling: Wrap all database operations in `try/catch` blocks.

- Logging: Introduce a logging system (e.g. `winston`) for audits and debugging.

### Feature Expansion

- More Tables:

    - `departments`, `roles`, `shifts`, etc. for a more normalized schema.

- User Roles: Add login system with admin vs. employee access.

- Audit Logs: Track changes to employee records.

- ORM Migration: Move to an ORM like Prisma for larger scale features.

- Docker Support: Dockerize for easier deployment and consistent environments.

---

Best of luck!

Your friend,

Dallin Williams :]
