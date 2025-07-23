### **Assign Shift - Business Logic**

#### **Assigned Group Member**
- **Input:** David Perez
- **Process:** David Perez
- **Output:** David Perez


#### **Overview**
- Describe the purpose and expected functionality of this business logic.
- Example: "This module processes user authentication by verifying credentials against the database and generating a session token."

#### **Input Data & Sources**
Operation: Create (doesn't assign)

Endpoint: `POST /api/shifts`

Source: `Employee_ID` from database

JSON Body:
```json
{
    "Employee_ID": 1,
    "start": "string",
    "end": "string"
}
```
- String format example: `02:00 PM`

---

Operation: Update

Endpoint: `PATCH /api/shifts/{shift_id}`

JSON Body:
```json
{
    "start": "string",
    "end": "string"
}
```
- String format example: `09:00 AM`

---

Operation: Assign Shift to Schedule (Manually)

Endpoint: `POST /api/schedules/{schedule_id}/shifts/{shift_id}`

Example: Assigns Shift ID 10 to Schedule ID 1

`POST /api/schedules/1/shifts/10`

---

Operation: Assign Shift to Schedule (Single API call)

Endpoint: `POST /api/schedules/{schedule_id}/shifts`

Source: `Employee_ID` from database

JSON body:
```json
{
    "Employee_ID": 1,
    "start": "string",
    "end": "string"
}
```
- String format example: `05:00 PM`

### **Process & Workflow**
- Create (doesn't assign)
    1. User sends a `POST` request to `/api/shifts` with `Employee_ID`, `start`, and `end` times.
    2. The system checks if the user is authorized to create shifts.
    3. The request is validated to ensure:
    - `Employee_ID` exists in the database.
    - `start` and `end` follow the correct time format (`hh:mm AM/PM`).
    4. If valid, a new shift is created in the database but is not yet assigned to a schedule.
    5. The API returns a response with the newly created `shift_id`.
- Update
    1. User sends a `PATCH` request to `/api/shifts/{shift_id}` with updated `start` and/or `end` times.
    2. The system checks if the user has the necessary permissions to update shifts.
    3. The request is validated to ensure:
    - `shift_id` exists in the database.
    - `start` and `end`, if provided, follow the `hh:mm AM/PM` format.
    4. If valid, the shift is updated in the database.
    5. The API returns a success response confirming the update.
- Assign Shift to Schedule (Manually)
    1. User manually selects a shift and a schedule from the system interface.
    2. The system verifies the user's authorization to assign shifts.
    3. A `POST` request is sent to `/api/schedules/{schedule_id}/shifts/{shift_id}`.
    4. The system ensures that:
    - `schedule_id` and `shift_id` exist in the database.
    5. If valid, the shift is linked to the specified schedule.
    6. The API returns a confirmation response.
- Assign Shift to Schedule (Single API call)
    1. User sends a `POST` request to `/api/schedules/{schedule_id}/shifts` with `Employee_ID`, `start`, and `end` times.
    2. The system checks if the user is authorized to assign shifts.
    3. The request is validated to ensure:
    - `Employee_ID` exists in the database.
    - `start` and `end` follow the `hh:mm AM/PM` format.
    4. If valid, a new shift is created and automatically assigned to the specified schedule.
    5. The API returns a response with the `shift_id` and confirmation of assignment.

### **Database & Data Handling**
- Assigning a shift to an employee
```sql
INSERT INTO shifts (employee_id, start_time, end_time)
VALUES (?, ?, ?);
```

- Add shift to schedule (store in junction table)
```sql
INSERT INTO schedule_has_shifts (schedule_id, shift_id) 
VALUES (?, ?);
```

- Checking if a shift is already assigned to a schedule (to prevent duplicates)
```sql
SELECT COUNT(*) FROM schedule_has_shifts WHERE schedule_id = ? AND shift_id = ?;
```

- Checking if an employee is available before assigning a shift
```sql
SELECT COUNT(*) 
FROM shifts 
WHERE employee_id = ? 
AND date = ? 
AND ((start_time BETWEEN ? AND ?) OR (end_time BETWEEN ? AND ?));
```

- Data Transformations & Persistence

When a shift is created, the application:
1. Validates input data (e.g., start_time < end_time).
2. Transforms time formats to UTC before storing.
3. Persists the data in the shifts table.
4. Optionally assigns the shift to a schedule (if provided).

#### **API Interactions**
- List necessary API calls, including request formats, expected responses, and error handling.

### **Output & System Responses**
#### Create shift (Doesn't Assign)

Endpoint: POST /api/shifts

Success - 201 Created
```json
{
    "message": "Shift created successfully.",
    "shift_id": 15,
    "employee_id": 1,
    "start": "02:00 PM",
    "end": "06:00 PM"
}
```

Validation Error - 400 Bad Request
```json
{
    "error": "Invalid time format. Please use 'HH:MM AM/PM'."
}
```

Response (Employee Not Found - 404 Not Found)
```json
{
    "error": "Employee with ID 1 not found."
}
```

#### Update a Shift
Endpoint: PATCH /api/shifts/{shift_id}

Response (Success - 200 OK):
```json
{
    "message": "Shift updated successfully.",
    "shift_id": 15,
    "start": "09:00 AM",
    "end": "01:00 PM"
}
```

Response (Shift Not Found - 404 Not Found):
```json
{
    "error": "Shift with ID 15 not found."
}
```

Response (Invalid Time Format - 400 Bad Request):
```json
{
    "error": "Invalid time format. Please use 'HH:MM AM/PM'."
}
```

### Assign Shift to Schedule (Manually)
Endpoint: POST /api/schedules/{schedule_id}/shifts/{shift_id}

Response (Success - 201 Created):
```json
{
    "message": "Shift 10 successfully assigned to Schedule 1."
}
```

Response (Shift Already Assigned - 409 Conflict):
```json
{
    "error": "Shift 10 is already assigned to Schedule 1."
}
```

Response (Shift or Schedule Not Found - 404 Not Found):
```json
{
    "error": "Shift with ID 10 or Schedule with ID 1 not found."
}
```

#### Assign Shift to Schedule (Single API Call)

Endpoint: POST /api/schedules/{schedule_id}/shifts

Response (Success - 201 Created):
```json
{
    "message": "Shift created and assigned to Schedule 1 successfully.",
    "shift_id": 16,
    "employee_id": 1,
    "schedule_id": 1,
    "start": "05:00 PM",
    "end": "09:00 PM"
}
```

Response (Employee Not Found - 404 Not Found):
```json
{
    "error": "Employee with ID 1 not found."
}
```

Response (Invalid Time Format - 400 Bad Request):
```json
{
    "error": "Invalid time format. Please use 'HH:MM AM/PM'."
}
```

#### Summary
| **Operation**                   | **Success Code** | **Failure Code(s)** | **Failure Reasons**                           |
|----------------------------------|-----------------|---------------------|-----------------------------------------------|
| **Create a Shift**               | `201 Created`   | `400`, `404`        | Invalid format, Employee not found           |
| **Update a Shift**               | `200 OK`        | `400`, `404`        | Invalid format, Shift not found              |
| **Assign Shift (Manually)**      | `201 Created`   | `404`, `409`        | Shift/Schedule not found, Already assigned   |
| **Assign Shift (Single Call)**   | `201 Created`   | `400`, `404`        | Invalid format, Employee not found           |


### **Edge Cases & Error Handling**
#### **1. Overlapping Shifts for the Same Employee**
**Edge Case:**  
- A shift is assigned to an employee, but it **overlaps** with another shift they already have.

### **Handling Approach:**
- **Check for overlaps before inserting the shift.**
- Query the database to ensure there’s no existing shift for the same employee at the given time.
- Example SQL Query:
  ```sql
  SELECT COUNT(*) 
  FROM shifts 
  WHERE employee_id = ? 
  AND date = ? 
  AND ((start_time BETWEEN ? AND ?) OR (end_time BETWEEN ? AND ?));
  ```

---

#### **2. Assigning a Shift to a Non-Existent Employee**
**Edge Case:**  
- The provided `Employee_ID` does not exist in the database.

### **Handling Approach:**
- Check for the employee before assigning a shift.
- Example in **Express (using Sequelize/Knex):**
  ```js
  const employee = await db('employees').where({ id: employee_id }).first();
  if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
  }
  ```

---

#### **3. Assigning a Shift to a Non-Existent Schedule**
**Edge Case:**  
- The `schedule_id` provided does not exist.

### **Handling Approach:**
- Validate the `schedule_id` before inserting the shift into `schedule_has_shifts`.
- Example check:
  ```js
  const schedule = await db('schedules').where({ id: schedule_id }).first();
  if (!schedule) {
      return res.status(404).json({ error: "Schedule not found." });
  }
  ```

---

#### **4. Shift Already Assigned to the Schedule**
**Edge Case:**  
- The same shift is **assigned multiple times** to the same schedule.

### **Handling Approach:**
- Use a **unique constraint** in the database or a query to prevent duplicate assignments.
- SQL Example:
  ```sql
  SELECT COUNT(*) FROM schedule_has_shifts WHERE schedule_id = ? AND shift_id = ?;
  ```

---

#### **5. Shift Time Format is Invalid**
**Edge Case:**  
- The `start` and `end` times are not in a valid **12-hour AM/PM format**.

### **Handling Approach:**
- Use regex to validate time format in Express:
  ```js
  const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  if (!timeRegex.test(req.body.start) || !timeRegex.test(req.body.end)) {
      return res.status(400).json({ error: "Invalid time format. Please use 'HH:MM AM/PM'." });
  }
  ```

---

#### **6. Shift Ends Before It Starts**
**Edge Case:**  
- The **end time** is before the **start time**.

### **Handling Approach:**
- Convert times to **24-hour format** and compare them.
- Example in JavaScript:
  ```js
  const startTime = new Date(`1970-01-01 ${req.body.start}`);
  const endTime = new Date(`1970-01-01 ${req.body.end}`);

  if (endTime <= startTime) {
      return res.status(400).json({ error: "End time must be after start time." });
  }
  ```

---

#### **7. Assigning a Shift in the Past**
**Edge Case:**  
- A shift is assigned with a **past date**, which might not be allowed.

### **Handling Approach:**
- Compare the shift date with today’s date.
- Example:
  ```js
  const shiftDate = new Date(req.body.date);
  const today = new Date();
  
  if (shiftDate < today) {
      return res.status(400).json({ error: "Cannot assign a shift in the past." });
  }
  ```

---

#### **Summary of Edge Cases & Solutions**
| **Edge Case** | **Solution** | **Response Code** |
|--------------|-------------|------------------|
| Overlapping shifts for the same employee | Check existing shifts before inserting | `400 Bad Request` |
| Assigning shift to non-existent employee | Validate `Employee_ID` before inserting | `404 Not Found` |
| Assigning shift to non-existent schedule | Validate `schedule_id` before inserting | `404 Not Found` |
| Shift already assigned to schedule | Check before inserting to `schedule_has_shifts` | `409 Conflict` |
| Invalid time format | Use regex to validate `HH:MM AM/PM` | `400 Bad Request` |
| Shift ends before it starts | Convert to 24-hour format and compare | `400 Bad Request` |
| Assigning shift in the past | Compare date with today's date | `400 Bad Request` |

### **Dependencies**
- [Sequelize](https://sequelize.org/) to interact with MySQL database.

#### **Performance Considerations**
- Identify optimizations for efficiency, scalability, and security best practices.

#### **Testing Considerations**
- Outline unit tests, integration tests, and any necessary load or security testing strategies.

---

## Notes
-

---

*This document should be maintained and updated regularly as business logic evolves.*
