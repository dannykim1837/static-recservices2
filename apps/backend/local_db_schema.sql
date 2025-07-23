USE my_backend_db; --for MySQL local database, online USE railway;

-- ========================================
-- DATABASE SCHEMA FOR EMPLOYEE SCHEDULING SYSTEM
-- ========================================
-- Author: [Your Team Name]
-- Purpose: Defines the database for managing employees, shifts, and locations.
-- Version: 1.2
-- Date: [Today's Date]
-- Notes:
-- - Designed for compatibility with MySQL (local) and Supabase (authentication).
-- - Uses `IF NOT EXISTS` to prevent errors when re-importing.
-- - Supports active/inactive employee status instead of deletion.
-- - Includes scalability and security considerations.

-- ========================================
-- SCHEMA FOR AUTHENTICATION
-- ========================================
CREATE SCHEMA IF NOT EXISTS auth;

-- ✅ Creating a local `auth.users` table for MySQL (only needed for local testing)
CREATE TABLE IF NOT EXISTS auth.users (
    id CHAR(36) PRIMARY KEY,  -- Matches Supabase UUID format (36-character string)
    email VARCHAR(100) UNIQUE NOT NULL  
);

-- **PRODUCTION NOTE:**
-- In production, Supabase manages authentication. This table exists for 
-- local development to prevent foreign key issues.

-- ========================================
-- POSITIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS positions (
    position_id INT PRIMARY KEY AUTO_INCREMENT,  
    position_name VARCHAR(45) NOT NULL,  
    position_count INT,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);

-- ✅ Security & Scalability:
-- - Prevents free-text job titles, enforcing data integrity.
-- - Can be expanded with a `department_id` in the future for better role management.

-- ========================================
-- LOCATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,  
    location_name VARCHAR(45) NOT NULL,  
    employee_count INT,  
    physical_address VARCHAR(80),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
);

-- ✅ Security & Scalability:
-- - Stores structured location data instead of free-text.
-- - If managing multiple companies, consider adding a `company_id`.

-- ========================================
-- EMPLOYEES TABLE (WITH `is_active` STATUS)
-- ========================================
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,  
    user_id CHAR(36) DEFAULT NULL,  -- Supabase User UUID (referencing auth.users.id)
    first_name VARCHAR(45) NOT NULL,  
    last_name VARCHAR(45) NOT NULL,  
    phone_number VARCHAR(15),  
    email VARCHAR(100) UNIQUE NOT NULL,  
    position_id INT,  
    location_id INT,  
    is_hourly TINYINT(1) NOT NULL DEFAULT 1,  -- 🔹 1 = Hourly, 0 = Salaried
    is_salaried TINYINT(1) NOT NULL DEFAULT 0,  -- 🔹 1 = Salaried, 0 = Hourly
    is_active TINYINT(1) NOT NULL DEFAULT 1,  -- 🔹 1 = Active, 0 = Inactive  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL,  
    FOREIGN KEY (position_id) REFERENCES positions(position_id) ON DELETE SET NULL,  
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE SET NULL  
);

-- ✅ EMPLOYEE STATUS (`is_active`):
-- - `1` = Active (Can be assigned shifts).
-- - `0` = Inactive (Retained for historical records but not scheduled).
-- - Employees remain in the system **even if their Supabase credentials are deleted**.

-- ✅ Scalability Considerations:
-- - `part_time` and `full_time` status fields could be added in the future.
-- - Consider a `student_employee` flag if tracking student workers.
-- - Future-proofing: Allows for better workforce analysis and retention policies.

-- ========================================
-- SHIFTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS shifts (
    shift_id INT PRIMARY KEY AUTO_INCREMENT,  
    employee_id INT NOT NULL,  
    shift_start DATETIME NOT NULL,  
    shift_end DATETIME NOT NULL,  
    is_up_for_trade BOOLEAN NOT NULL DEFAULT FALSE,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE  
);

-- ✅ Security & Business Rules:
-- - Ensures all shifts are assigned to existing employees.
-- - Shifts are **automatically deleted** if an employee is removed.
-- - `is_up_for_trade` allows employees to mark shifts as available for swap.

-- ========================================
-- FINAL NOTES & FUTURE CONSIDERATIONS
-- ========================================

-- ✅ **ACTIVE/INACTIVE EMPLOYEE STATUS**:
--    - **Active Employees (`is_active = 1`)**: Can be scheduled for shifts.
--    - **Inactive Employees (`is_active = 0`)**: Retained for historical data but not scheduled.
--    - **Instead of deleting records, admins can toggle `is_active`**.

-- ✅ **SUPABASE INTEGRATION**:
--    - If an employee is removed from Supabase, their `user_id` is set to `NULL`
--      but they remain in the system (`is_active = 0`).

-- ✅ **SECURITY & SCALABILITY**:
--    - `is_active` allows **auditability** (who worked when, even after leaving).
--    - **Restrict DELETE access** to `employees` to prevent accidental loss of history.
--    - **Consider adding `INDEX` on `is_active` and `shift_start` for query optimization.**
--    - In the future, `company_id` could be added for multi-tenancy support.

-- ✅ **RECOMMENDED INDEXING FOR PERFORMANCE:**
-- - Speed up employee lookups:  
--   ```sql
--   CREATE INDEX idx_employee_email ON employees(email);
--   ```
-- - Improve shift filtering by date:  
--   ```sql
--   CREATE INDEX idx_shift_start ON shifts(shift_start);
--   ```

-- ✅ **FUTURE ENHANCEMENTS:**
-- - Track employee promotions (`previous_positions` table?).
-- - Add an `employee_notes` field for HR notes or performance tracking.
-- - Introduce a `contract_expiration` field for limited-term employees.

-- END OF SCHEMA
