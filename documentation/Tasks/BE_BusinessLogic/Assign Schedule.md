### **Assign Schedule - Business Logic**

#### **Assigned Group Member**
- **Input:** Kyle Bunn
- **Process:** Kyle Bunn
- **Output:** Kyle Bunn


#### **Overview**
- This document outlines the "Assign Schedule" operation, which assigns a schedule (a group of hourly shifts) to workers at a specific date and time. This operation ensures proper scheduling distribution, validates scheduling constraints, and maintains data integrity throughout the process.

#### **Input Data & Sources**
##### **Required Fields:**

- **scheduleId**: Unique identifier for the schedule being assigned that is created automaticly 
- **Date**: Year Month and Day of shift to be assigned
- **shifts[]**: Array of shift objects containing:
  - **shiftId**: Long Intiger object used to identify individual shifts that is created automaticly
  - **startTime**: ISO 8601 datetime for shift start
  - **endTime**: ISO 8601 datetime for shift end
  - **assignedEmployee**: Employee id number of the individual employee being added to the schedule
  
#### **Process & Workflow**
1. **Request Validation**
    - Validate all required fields are present
    - Confirm data types and formats are correct
    - Verify shiftId exists in the system
    - Confirm all assignedEmployee correspond to active users
2. **Schedule Validation**
    - Check for scheduling conflicts with existing assigned schedules
    - Validate that shifts comply with Idaho's labor regulations:
        - Maximum consecutive work hours
        - Minimum rest periods between shifts
3. **Schedule Assignment**
    - Create assignment records in the database
    - Set assignment status to "pending" initially
    - Generate notification events
4. **Confirmation**
    - Update assignment status to "active"
    - Return success response with assignment details

#### **Database & Data Handling**
**Database Interactions**
- **READ** operations:
  - Query schedules table to verify schedule existence
  - Query shift table to verify shift status
  - Query users table to verify assignee eligibility
  - Query schedules table to check for conflicts
  - Query users table to verify role eligibility

- **WRITE** operations:
  - Insert new records into schedule_assignments table
  - Update schedules table to mark as assigned
  - Insert notification records into notifications table
  - Insert records into assignment_history table for audit

**Data Transformations**
- Convert all datetime inputs to UTC for storage
- Calculate shift durations from start/end times

#### **API Interactions**
**Request Format**
##### POST /api/schedules/assign
```
{
"scheduleId": "sch_12345abcde",
"date": "2025-04-01",
"shifts": \[
{
"shiftId": "shi_7890abcde",
"startTime": "2025-04-01T09:00:00Z",
"endTime": "2025-04-01T17:00:00Z",
"assignedEmployee": "emp_123abc", 
},
{
"shiftId": "shi_7890abcde",
"startTime": "2025-04-01T09:00:00Z",
"endTime": "2025-04-01T17:00:00Z",
"assignedEmployee": "emp_456bcd", 
}
\],
```
**Response Format**
```
{
"success": true,
"scheduleId": "sch_12345abcde"
"shiftId": "shi_7890abcde",
"date": "2025-04-01",
"totalShifts": 2,
"totalHours": 16,
"assignees": \[
{
"userId": "usr_123",
"name": "John Doe",
"status": "notified"
},
{
"userId": "usr_456",
"name": "Jane Smith",
"status": "notified"
}
\],
```
**Output**

**Success Response**
- HTTP Status: 200 OK
- Body: Assignment details as shown in the response format above

**Events Triggered**
- **AssignmentCreatedEvent**: Triggers notification workflows

**Validation Errors**
- HTTP Status: 400 Bad Request
- Common scenarios:
  - Missing required fields
  - Invalid assigneeIds

