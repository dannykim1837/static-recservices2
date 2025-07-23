### **Clock In & Clock Out - Business Logic**

#### **Assigned Group Member**
- **Input:** LaRee Scott
- **Process:** LaRee Scott
- **Output:** LaRee Scott


#### **Overview**
- This module handles the clock-in and clock-out functionality for employees of the Rec Services department. It tracks when employees start and end their shifts, calculates worked hours, and ensures that time entries align with the employee’s scheduled shifts. The module will validate employee clock-in/out actions, handle potential errors (e.g., invalid clock-ins), and store data for payroll and attendance tracking. This will be done in such a way that those with proper authorization are able to edit the clock-in and clock-out values.

#### **Input Data & Sources**
- Define the required input data, including expected formats and sources (e.g., API request payloads, database queries, external integrations).
- The clock-in and clock-out feature requires the following data:

1. **Employee Information**:
   - **Format**: JSON or database record.
   - **Fields**: Employee ID, shift ID, role, work schedule, clock-in/out history.
   - **Source**: Database query or API call to retrieve employee and shift details.

2. **Shift Data**:
   - **Format**: JSON or database record.
   - **Fields**: Shift ID, scheduled start and end time, employee assignments.
   - **Source**: Database or API call to check shift schedule.

3. **Clock-in/Clock-out Request**:
   - **Format**: API request (POST).
   - **Fields**: Employee ID, shift ID, timestamp.
   - **Source**: User action (via mobile app, web interface).
     
4. **Manual Adjustments**:
   - **Format**: API request (POST).
   - **Fields**: Employee ID, shift ID, new clock-in/out time, reason for change.
   - **Source**: Admin action (via admin interface).
---

#### **Process & Workflow**
- Detail the step-by-step logic, including computations, validations, and business rules applied to the input data.
### 1. Clock-in Process:
- Employee opens the system interface (mobile/web) and clicks "Clock In."
- System checks the employee's scheduled shift against the current time to ensure they are clocking in within the acceptable window.
- **If valid**:
  - The system records the clock-in timestamp in the database.
  - Sends a confirmation message to the employee ("Clock-in successful").
  - The status of the employee is updated to "clocked in."
- **If invalid** (e.g., clocking in early or outside of the shift window):
  - System returns an error message ("You cannot clock in before your shift start time").

### 2. Clock-out Process:
- Employee clicks "Clock Out" when their shift ends.
- System checks if the employee is currently clocked in and verifies that the clock-out request aligns with the scheduled shift end time.
- **If valid**:
  - The system records the clock-out timestamp in the database.
  - Calculates the total worked hours.
  - Sends a confirmation message to the employee ("Clock-out successful").
  - The employee's status is updated to "clocked out."
- **If invalid** (e.g., clocking out too early or late):
  - System returns an error message ("You cannot clock out before your scheduled end time").

### 3. Manual Clock-in/Clock-out Adjustment (Admin Feature):
- **Admin Interface**: Admins can access a special interface to view and adjust employee clock-in and clock-out times.
- **Process**:
  - Admin selects the employee and the shift for which the adjustment is needed.
  - Admin enters the correct clock-in/out time and provides a reason for the change (e.g., "misclick" or "technical issue").
  - The system validates the adjustment:
    - Ensures the adjustment is within a reasonable time frame of the original clock-in/out.
    - Validates that the new time falls within the shift's scheduled window.
  - **If valid**:
    - The system updates the clock-in/out record in the database.
    - Sends a confirmation message to the admin ("Adjustment successful").
  - **If invalid**:
    - System returns an error message ("The adjusted time is outside the allowed range for this shift").

### 4. System Logic for Time Validation:
- The system checks if the clock-in time is within a defined grace period (e.g., 5 minutes before or after the scheduled shift start).
- The system ensures that clock-out times are within a reasonable range of the scheduled shift end (e.g., no earlier than the end time, or not excessively late).
- When an admin manually adjusts the clock-in/out time, the system ensures that the adjustment is within a valid range.

### 5. Error Handling and Edge Cases:
- **Clocking in before shift start time**: Return an error with instructions on the correct clock-in window.
- **Clocking out after shift end time**: Return an error or flag it for review by the admin.
- **Duplicate clock-ins/clock-outs**: Prevent double clock-ins or clock-outs by validating timestamps against the employee’s last action.
- **Missing or incomplete data**: If required fields (e.g., employee ID or shift ID) are missing, return an error to prompt the user to correct the input.
- **Manual adjustments**: Ensure that manual adjustments made by admins are within the allowed time frame and provide a valid reason for changes.

---

#### **Database & Data Handling**
- Define the database interactions (queries, stored procedures, caching, indexing, etc.).
- Specify data transformations and persistence logic.

  1. **Clock-in/Clock-out Records**:
   - **Tables**: `clock_in_out_records` or `time_entries`.
   - **Fields**: Employee ID, shift ID, clock-in time, clock-out time, total worked hours, status (e.g., “pending”, “approved”).
   - **Queries**:
     - Inserting a clock-in record upon successful clock-in.
     - Inserting a clock-out record and calculating worked hours upon successful clock-out.
     - **Updating** a record when an admin manually adjusts a clock-in/out time.

2. **Shift Data**:
   - **Tables**: `shifts`, `employee_shifts`.
   - **Fields**: Shift ID, employee ID, scheduled start and end time.
   - **Queries**: Retrieve shift details for validation during clock-in/out.

3. **Manual Adjustment Records**:
   - **Tables**: `manual_adjustments`.
   - **Fields**: Employee ID, shift ID, old clock-in/out time, new clock-in/out time, reason for adjustment, admin ID.
   - **Queries**: Insert a record for every manual adjustment made by an admin.

4. **Data Validation**:
   - **Shift time check**: Ensure clock-in and clock-out times fall within the scheduled shift.
   - **Total hours worked**: Calculate the difference between clock-in and clock-out times and store it for payroll.


---
#### **API Interactions**
- List necessary API calls, including request formats, expected responses, and error handling.

### 1. Clock-in API:
- **Request**:
    ```json
    {
      "employeeId": 12345,
      "shiftId": 6789,
      "timestamp": "2025-02-24T09:00:00Z"
    }
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Clock-in successful.",
      "clockInTime": "2025-02-24T09:00:00Z"
    }
    ```

### 2. Clock-out API:
- **Request**:
    ```json
    {
      "employeeId": 12345,
      "shiftId": 6789,
      "timestamp": "2025-02-24T17:00:00Z"
    }
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Clock-out successful.",
      "workedHours": 8.0
    }
    ```

### 3. Manual Adjustment API (Admin):
- **Request**:
    ```json
    {
      "employeeId": 12345,
      "shiftId": 6789,
      "newClockInTime": "2025-02-24T09:05:00Z",
      "newClockOutTime": "2025-02-24T17:10:00Z",
      "reason": "Technical failure",
      "adminId": 1
    }
    ```
- **Response**:
    ```json
    {
      "status": "success",
      "message": "Adjustment successful.",
      "adjustedClockInTime": "2025-02-24T09:05:00Z",
      "adjustedClockOutTime": "2025-02-24T17:10:00Z"
    }
    ```
    
### 4. Error Handling API Responses:
- **Invalid clock-in**:
    ```json
    {
      "status": "error",
      "message": "You cannot clock in before your scheduled shift start time."
    }
    ```
- **Invalid clock-out**:
    ```json
    {
      "status": "error",
      "message": "You cannot clock out before your scheduled shift end time."
    }
    ```

---

#### **Output & System Responses**
- Define the expected output, such as API responses, database updates, logs, or notifications.
  
 **Successful Clock-in**: A confirmation message is displayed to the employee, and the time is saved in the database.
- **Successful Clock-out**: A confirmation message is displayed to the employee, and the total worked hours are saved in the database.
- **Manual Adjustment**: A confirmation message is displayed to the admin, and the adjusted times are saved in the database.
- **Error Handling**: If the employee tries to clock in too early, too late, or outside their scheduled shift, an error message is returned.

---
#### **Edge Cases & Error Handling**
- Identify potential failure scenarios and the system's response (e.g., invalid inputs, service failures, concurrency issues).

- **Clock-in before shift starts**: Prevent clock-in before the shift start by returning a message explaining the correct window.
- **Clock-out after shift ends**: Prevent clock-out too early by checking against the scheduled shift end time.
- **Duplicate clock-ins/clock-outs**: Validate that the employee is not already clocked in or out.
- **Missing data**: Ensure that both employee ID and shift ID are provided, returning an error if any are missing.
- **Manual adjustments**: Ensure that the admin's manual adjustment is within a valid range and that a reason is provided.

---

#### **Dependencies**
- List required libraries, frameworks, external services, or integrations.

- **Backend Framework**: Node.js with Express.js for handling API requests.
- **Database**: PostgreSQL or MySQL for storing clock-in and clock-out records.
- **Authentication**: JWT for secure user login and session management.
- **Libraries**: Moment.js or Day.js for handling timestamps and time validation.
- **Admin Interface**: A secure interface for admins to view and modify clock-in/out times.

---

#### **Performance Considerations**
- Identify optimizations for efficiency, scalability, and security best practices.
  
- **Efficient Time Queries**: Ensure that querying for shift data and clock-in/out records is optimized by using appropriate database indexes on employee IDs and shift IDs.
- **Scalability**: The system should handle a growing number of employees and shifts, potentially across multiple departments, with minimal performance impact.
- **Error Handling**: Ensure all edge cases are handled gracefully to avoid system downtime or errors during peak usage times.

---

#### **Testing Considerations**
- Outline unit tests, integration tests, and any necessary load or security testing strategies.

1. **Unit Tests**:
   - Test the clock-in and clock-out logic independently (e.g., validating timestamps, shift matching).

2. **Integration Tests**:
   - Ensure that clock-in and clock-out requests interact correctly with the database.

3. **Security Testing**:
   - Ensure that unauthorized users cannot clock in or out.
   - Test for vulnerabilities in API endpoints (e.g., SQL injection prevention).

4. **Load Testing**:
   - Test the system under high traffic to ensure it can handle a large number of clock-ins/clock-outs without performance degradation.

---


## Notes
- Ensure a smooth user interface for clocking in and out, with clear prompts and error messages.
- Need to put more specificity in the Testing section. Specifically describing the test with its required input and expected output.

---

*This document should be maintained and updated regularly as business logic evolves.*
