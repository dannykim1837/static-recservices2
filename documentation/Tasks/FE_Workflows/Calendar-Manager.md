### **Calendar.html - Manager/Coordinator Workflow**
AKA Schedule, called "Full Schedule" tab in Sling. Managers and Coordinators can view the schedules for all of their Employees. 

#### **Assigned Group Member**
Shandler Rechenberger
- **Webpage:** calendar.html
- **UI Elements:** 3/15/2025 [Winter Week 10]
- **Workflows/User Stories:** 3/15/2025 [Winter Week 10]
- **API Calls:** 3/15/2025 [Winter Week 10]
- **Test Cases:** [Assign Week/Due Date]

---
#### **Overview**
- The Calendar - Manager page allows managers to assign employees certain timeframes to work for a given week.

---
## **UI Elements**
### Previous/Next Week
- Move between weeks, viewing the appropriate data

### Add employee Button
- Allows us to add an employee to a timeframe, displaying this update on both calendars

---
## **Process & Workflow**
### Previous/Next Week
- Click "Previous" or "Next" week button
- Updates "Current Week" display above calendar
- Sends backend request to see data for that employee from those days
- Displays the shifts returned from backend

---
## **API Calls & Data Handling**

### Network Request Name
#### Request
- **Purpose**: Return all shofts for user in timeframe
- **Endpoint**: GET /calendar
```json
{
  "user_id": "12345",
  "startDate": "MM/DD/YYYY", 
  "endDate": "MM/DD/YYYY"
}
```
#### Response
```json
{
  shifts": [ {   "date": "MM/DD/YYYY",
                  "start": "00:00",
                  "end":  "01:00"},
              {   "date": "MM/DD/YYYY",
                  "start": "01:00",
                  "end":  "02:00"},
              {   "date": "MM/DD/YYYY",
                  "start": "00:00",
                  "end":  "01:00"} ]
}
```
  - **Success determined by:** Sucess is determained by recieving all shifts about all users.: including 
  - **Success:** Returns a list of all user's shifts for the frontend to translate. 
  - **Failure:** Display network error code and message.

#### Write
- **Purpose**: Add new users to the sheet
- **Endpoint**: POST /calendar
- **Elements**: Date, Name, Description, Start, End

---
#### **Test Cases & Error Handling**
- [Define actions to test including successes, failures, and edge cases. Describe the input, process the data goes through, expected output, and reasoning]

- **Input:** User input or action (form submitted, button clicked, selection changed)
- **Process:** Define if the data is handled by only the front-end or if it involves a network request to the back-end
- **Output:** Reponse/returned data/changes to the page
- **Reasoning:** Explain the test case, why is it a success/failure

| Input | Process | Output |  Reasoning |
| :--: | :--: | :--: | :--: |
|  |  |  |  |

---
## Notes
*This document should be maintained and updated regularly as workflows develop and evolve.*
