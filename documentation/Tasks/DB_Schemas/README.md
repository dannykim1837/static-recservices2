# Schemas Documentation

## Overview
This document provides a structured approach to documenting database schemas for the time management system. Replace "BLANK" with the actual schema name and complete each section accordingly.

### **How to Use This Document**
- This serves as a reference for ALLLLLLLLLL database schema tasks.
- Each schema should be documented using the structured template provided.
- The Group Leader should assign specific workflow tasks to their team members.
- Updates should be made as necessary to reflect changes in design or implementation.

---

## Task Assignments

### **Required Task Coverage**
Each assigned task should ensure documentation and implementation of the following three areas:
1. **Input**: Define what data is required, its format, and how it is captured.
2. **Processing**: Describe the logic, computations, or transformations performed on the input.
3. **Output**: Specify the expected results, UI updates, or responses from the system.

### **Current Tasks**
- **Account**: [Assign Name]
- **Login**: [Assign Name]
- **Schedule**: [Assign Name]
- **Shift**: [Assign Name]
- **TimeCard**: [Assign Name]

---

## Schemas Documentation Template

### **Feature Name**

#### **Overview**
- Describe the purpose and structure of this database schema.
- Example: "This schema defines the structure for storing employee schedules and shift details."

#### **Entities & Relationships**
- List key entities and how they relate to other tables.
- Example:
  - **Employee** (Primary Key: `employee_id`)
  - **Shifts** (Foreign Key: `employee_id` → References `Employee`)
  - **Timecards** (Foreign Key: `employee_id` → References `Employee`)
  - **Schedules** (References multiple employees and shift data)

#### **Fields & Data Types**
- Define the fields in this schema, including their types and constraints.
- Example:
  ```sql
  CREATE TABLE employees (
      employee_id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      hire_date DATE NOT NULL
  );
  
  CREATE TABLE shifts (
      shift_id SERIAL PRIMARY KEY,
      employee_id INT REFERENCES employees(employee_id),
      start_time TIMESTAMP NOT NULL,
      end_time TIMESTAMP NOT NULL
  );
  ```

#### **Indexes & Keys**
- List important indexes, primary keys, and foreign keys that optimize queries.
- Example:
  - **Primary Key:** `employee_id`, `shift_id`
  - **Foreign Key:** `employee_id` in `shifts` references `employees(employee_id)`
  - **Indexes:** Index on `start_time` for fast retrieval of schedules.

#### **Constraints & Validations**
- Outline constraints that enforce data integrity.
- Example:
  - **NOT NULL:** Ensures required fields are always filled.
  - **CHECK:** Ensures shift times are valid (e.g., `start_time < end_time`).
  - **UNIQUE:** Prevents duplicate shift assignments.

#### **Stored Procedures & Triggers**
- Define any stored procedures or triggers related to this schema.
- Example:
  ```sql
  CREATE TRIGGER prevent_overlap
  BEFORE INSERT OR UPDATE ON shifts
  FOR EACH ROW
  EXECUTE FUNCTION check_shift_overlap();
  ```

#### **Query Examples**
- Provide sample queries for interacting with this schema.
- Example:
  ```sql
  SELECT * FROM shifts WHERE employee_id = 1 AND start_time >= NOW();
  ```

#### **Edge Cases & Error Handling**
- Identify potential issues and how they should be handled.
- Example:
  - **Overlapping Shifts:** Ensure no employee is double-booked.
  - **Missing Timecards:** Validate that every shift has an associated timecard entry.
  - **Unauthorized Schedule Edits:** Restrict modifications based on user roles.

#### **Dependencies**
- List any required database systems, extensions, or external dependencies.
- Example:
  - **PostgreSQL**
  - **pgcrypto** extension for secure data storage.

#### **Testing Considerations**
- Define necessary testing strategies.
  - Unit tests for shift assignment validation.
  - Performance tests for querying employee schedules.
  - Backup and restore testing for timekeeping data integrity.

---

## Notes
- Ensure the schema supports accurate time tracking and efficient schedule management.
- Optimize indexing strategies for performance.
- Regularly update documentation as database changes occur.

---

*This document should be updated regularly as database schemas evolve.*
