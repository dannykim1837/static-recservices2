## **Kiosk.html - Workflow**
AKA Clock-in/Clock-out page

### **Assigned Group Member**
Paolo Roberto Petrignani
- **Webpage:** kiosk.html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories:** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
### **Overview**
-This page will allow employees to clock in and out of work. Once logged into the system, it will have the ability to notify the various employees about their work shifts, any tardiness, and will notify them via notification about the end of their shift, the start of another assigned task for that day, or the completion of all assigned tasks for that day

---
### **UI Elements**
- #### PIN Prompt Screen
  -  Shows time on the left and a keypad on the right where enter the 4 digit PIN
 
- #### Manager settings page
  - Allow manager to select for which employee enable authentication
  - "Apply" buttons
  - "Employee clock-in" button
  - "Logout" button

- #### Clock-In Screen
  - Shows Employee info only to the one previously selected by the Manager
  - Clock-in button to start the shift
  - X button
  
- #### Clock-Out Screen
  - Shows Employee info only to the one previously selected by the Manager
  - Clock-out button to end the shift
  - X button

---
### **Process & Workflow**
#### PIN Prompt Screen
- User enter their 4 digit unique PIN to login
  - If pin is not correct show “invalid PIN” message and clears the PIN entering input

  **Manager**
  - If pin is correct show manager setting page
 
**Employee**
  - if the pin is correct and the emoloyee is loggin-in to begin his shift, move to clock-in screen
  - if the pin is correct and the employee is loggin-out to end his shift, move to clock-end screen
  - if the pin is related to a user which don't have any shift planned, show message "access denaid: no shif scheduled for this employee"

 #### Manager settings page
- Show multiple employee cathegories selector to enable cathegories to clockin and out
- Apply buttons will enable access to selected cathegories
- Employee "clock-in" button will move the pin page.
- "Logout" button will close Kiosk
  
#### Clock In Screen
- Show Employee's picture and name.
- Show message 
- "Clock-in" button marks the beginning of the shift. At the click:
  - Button change to "Clock-out"
  - Message on the left, under the current date and time, show the clock-in time.
- "X" button to close the screen and go back to PIN screen

#### Clock-Out Screen
- Show Employee's picture and name.
- "Clock-out" button marks the end of the shift. At the click
  - Button become inactive
  - Message on the left, under the current date and time, will add the clock-out time at the previous clock-in time.
- "X" button to close the screen and go back to PIN screen

---
### **API Calls & Data Handling**

#### PIN Prompt Screen
#### Request
- **Purpose:**  Insert the user unique PIN
- **Endpoint:**  PUT /kiosks/users/{user_id}/pin
- **Request Payload:**
```json
  {
    "1234"  
  }
  ```

#### Response
- **Success determined by:** user is able to login
- **Success:** show following page
- **Failure:** show error message: "invalid PIN" and message if given [If back-end specifies: general network error].


#### Manager settings page
#### Request
- **Purpose:**  Give to manager the ability to enable access to specific employee cathegories
- **Endpoint:**  POST /groups/archive
- **Request Payload:**
```json
  {
    "ids": [
        0
      ]
  }
  ```

#### Response
- **Success determined by:** Employees' cathegories are enabled
- **Success:** Employee can login
- **Failure:** Employee can not login


#### Clock In Screen
#### Request
- **Purpose:**  make Employee start their shift
- **Endpoint:**  GET /shifts/tasks/template
- **Request Payload:**
```json
{
  "title": "Open the restaurant",
  "description": "Make sure everything is ready for our clients.",
  "subtasks": [
    "Clean the floor"
  ]
}
  ```

#### Response
- **Success determined by:** Start time showen in the left part of the page and button change from "clock-in" to "clock-out"
- **Success:** Employee can see their shfit start time
- **Failure:** No starting time are showen in the left and button doesn't change from "clock-in" to "clock-out"


#### Clock out Screen
#### Request
- **Purpose:**  make Employee end their shift
- **Endpoint:**  GET /shifts/tasks/istances
- **Request Payload:**
```json
  {

      }
  ```

#### Response
- **Success determined by:** Start time along with the end time showen in the left part of the page and button become inactive (gray).
- **Success:** Employee can see their shfit start and end time
- **Failure:** No ending time are showen in the left and button doesn't change from "clock-out" to inactive (gray).

---
### **Test Cases & Error Handling**
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
