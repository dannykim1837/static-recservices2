# Data Model - Time Management System

## Assigned Group Member(s)
- **Design:** [Assign Name]
- **Implementation:** [Assign Name]
- **Maintenance:** [Assign Name]

---

## 1. Overview
- This document outlines the **database structure** for the time management system.
- It defines **tables, relationships, constraints, and best practices** for performance, security, and scalability.
- The goal is to **efficiently track employees, shifts, schedules, and timecards.**

---

## 2. Entity-Relationship (ER) Diagram
- Attach an **ER diagram** showing the relationships between tables.
- If a visual representation is unavailable, use a **text-based format** to describe relationships.

---

## 3. Tables & Schema Details
Below are the **core database tables** and their purpose:

| **Table Name**  | **Description** |
|---------------|----------------|
| `employees`   | Stores employee details (name, role, email, etc.). |
| `accounts`    | Stores authentication details (hashed passwords, roles). |
| `shifts`      | Defines scheduled work shifts for employees. |
| `timecards`   | Records clock-in and clock-out times for employees. |
| `schedule`    | Stores the overall work schedule and assigned shifts. |

Each table’s **detailed schema** should be documented separately.

---

## 4. Indexes & Constraints
Define **keys and constraints** that optimize queries and ensure data integrity:

### **Primary Keys**
- `employees.employee_id`
- `accounts.account_id`
- `shifts.shift_id`
- `timecards.timecard_id`

### **Foreign Keys**
- `accounts.employee_id → employees.employee_id`
- `shifts.employee_id → employees.employee_id`
- `timecards.employee_id → employees.employee_id`
- `schedule.shift_id → shifts.shift_id`

### **Unique Constraints**
- `accounts.email` (ensures unique logins)
- `shifts (employee_id, start_time, end_time)` (prevents duplicate shift entries)

### **Indexes**
- Index `shifts.start_time` for faster schedule queries.
- Index `timecards.clock_in_time` for efficient time-tracking analysis.

---

## 5. Relationships
- **One-to-Many:**  
  - One `employee` can have **multiple** `shifts` and `timecards`.  
- **Many-to-Many (via schedule table):**  
  - A `schedule` can include **multiple** `shifts` and **multiple** `employees`.  
- **One-to-One:**  
  - An `account` belongs to **one** `employee`.

---

## 6. Stored Procedures & Triggers
- **Stored Procedure:** `calculate_total_hours(employee_id, date_range)`
  - Computes total hours worked by an employee.
- **Trigger:** `prevent_duplicate_clock_ins`
  - Prevents employees from clocking in twice without clocking out.

---

## 7. Data Handling & Performance Considerations
- **Indexing:** Use indexes on `clock_in_time`, `start_time`, and `employee_id` for faster lookups.
- **Partitioning:** If the dataset grows large, consider partitioning `timecards` by **month** or **year**.
- **Caching:** Frequently accessed reports (e.g., employee work hours) should be cached.

---

## 8. Backup & Recovery Strategy
- **Backup Frequency:** Full backups **daily**, incremental backups **hourly**.
- **Method:** PostgreSQL dump & cloud-based redundancy.
- **Recovery Plan:**  
  - **Step 1:** Verify backup integrity.  
  - **Step 2:** Restore to staging environment.  
  - **Step 3:** Apply to production if verified.

---

## 9. Security Considerations
- **Role-Based Access Control (RBAC):**  
  - Admins: Full access  
  - Managers: View/edit schedules & shifts  
  - Employees: View their own shifts & timecards  
- **Encryption:**  
  - **Passwords:** Use **bcrypt** hashing for secure authentication.  
  - **Sensitive Data:** Encrypt PII (e.g., employee emails).  
- **Audit Logs:**  
  - Track login attempts, shift modifications, and timecard edits.

---

## 10. Testing Considerations
- **Schema Migration Testing:** Ensure schema changes don’t break existing queries.
- **Performance Testing:** Simulate high loads to test query speed.
- **Data Integrity Checks:** Test duplicate prevention, referential integrity, and role-based access.

---

## Notes
- This document should be updated **as database changes occur**.
- **ER diagrams, flowcharts, and sample queries** should be included for clarity.
