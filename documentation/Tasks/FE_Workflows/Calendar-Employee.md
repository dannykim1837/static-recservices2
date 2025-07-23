### **Calendar.html - Employee Workflow**
AKA Schedule, called "My Schedule" tab in Sling

#### **Assigned Group Member**
Corbin Hughes
- **Webpage:** calendar.html
- **UI Elements:** 3/15/2025 [Winter Week 10]
- **Workflows/User Stories:** 3/15/2025 [Winter Week 10]
- **API Calls:** 3/15/2025 [Winter Week 10]
- **Test Cases:** [Assign Week/Due Date]

---
#### **Overview**
- My Schedule allows employees to view their shifts for a given week.

---
## **UI Elements**
### Previous/Next Week
- Move between weeks, viewing the appropriate data

---
## **Process & Workflow**
### Previous/Next Week
- Click "Previous" or "Next" week button
- Updates "Current Week" display above calendar
- Sends backend request to see data for that employee from those days
- Displays the shifts returned from backend

---
## **API Calls & Data Handling**
- [Define the network interactions on this page, with the data stored in the request (refer to UI elements) and given in the response]


### Get My Shifts
#### Request
- **Purpose:** Return all shifts for user in timeframe
  [could this be elapsed milliseconds instead for easy comparison?]
- **Endpoint:** `GET /calendar?start=MMDDYYYY&end=MMDDYYYY`

#### Response
   - **Response Payload:**
  ```json
  {
    shifts": [ {    "name": "Event Title",
                    "date": "MM/DD/YYYY",
                    "start": "00:00",
                    "end":  "01:00"},
                {   "name": "Event Title2",
                    "date": "MM/DD/YYYY",
                    "start": "01:00",
                    "end":  "02:00"},
                {   "name": "Event Title3...",
                    "date": "MM/DD/YYYY",
                    "start": "00:00",
                    "end":  "01:00"} ]
  }
  ```
- **Success determined by:** valid user id
Response Handling
  - **Success:** Returns list of user's shifts in that date range. If they have none, just return an empty list.
  - **Failure:** Display network error code and message.

### Network Request Name
#### Request
- **Purpose:** Why does a network request need to be sent?
- **Endpoint:** `[POST/GET] [/urlEnding]`
- **Request Payload:**
  ```json
  {
    "key": "value",
    "key2": "value2"
  }
  ```
#### Response
  - **Success determined by:** What causes a successful response (what is the back-end doing)?
Response Handling
  - **Success:** [Action done on success]
  - **Failure:** [Actino done on failure, most likley display an error message (or do nothing)]


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
