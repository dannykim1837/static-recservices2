### **dashboard.html - Workflow**
AKA Home page of the webapp, where users are directed after logging in

#### **Assigned Group Member**
Danny Kim
- **Webpage:** dashboard.html
- **UI Elements:** Quick Action Buttons, Employee List, Location Dropdown, Position Dropdown, Employee Shifts List
- **Workflows/User Stories:** Data loading on mount, user filtering, navigation via quick actions
- **API Calls:** Fetch Employees, Shifts, Locations, Positions, and Shifts with Employee Details
- **Test Cases:** Loading states, error handling, data display, user interactions

---
#### **Overview**
- The dashboard page serves as the main landing page after user login.
- It provides an overview of employees, quick actions, locations, positions, and detailed employee shifts.
- Users can navigate to other features such as notifications, schedules, calendar, or add new entries from here.

---
#### **UI Elements**
- Header with navigation menu (Menu component)
- Quick Action Buttons for Notifications, Schedule, Calendar, and Add
- Employee List with selectable rows showing name, status, and toggle switches
- Location and Position dropdown selectors
- Employee Shifts card displaying shift details with employee names, position, location, and times

---
#### **Process & Workflow**
1. When the page loads, it fetches data for employees, shifts, locations, positions, and detailed shifts with employee info.
2. While loading, a loading message is displayed.
3. Once data is loaded, the employee list, dropdowns, and shifts list are rendered.
4. Users can interact with quick action buttons to navigate or perform tasks.
5. Employees can be selected using checkboxes, and toggle switches can be used (currently UI only).
6. Dropdowns allow selection of location and position (filter logic to be implemented).
7. Shift details display dynamically based on fetched data.

---
#### **API Calls & Data Handling**
- `GET /employees`: Fetch list of employees
- `GET /shifts`: Fetch shift data
- `GET /locations`: Fetch available locations
- `GET /positions`: Fetch available positions
- `GET /shifts/detailed`: Fetch shifts combined with employee details

Each API call updates React state and triggers re-render of corresponding UI components.

---
#### **Test Cases & Error Handling**
- **Input:** Page load  
  **Process:** Front-end sends multiple GET requests to fetch required data  
  **Output:** Loading message, then UI renders with data  
  **Reasoning:** Verify data is fetched and displayed properly on page load

- **Input:** API failure for any data fetch  
  **Process:** Front-end receives error response  
  **Output:** Error messages displayed for respective sections  
  **Reasoning:** User must be informed of data loading problems

- **Input:** No employees returned  
  **Process:** API returns empty array  
  **Output:** "No employees found" message displayed  
  **Reasoning:** UI gracefully handles empty data states

- **Input:** No shifts returned  
  **Process:** API returns empty shifts list  
  **Output:** "No shifts found" message displayed  
  **Reasoning:** UI shows appropriate feedback when no shift data exists

- **Input:** User clicks quick action button  
  **Process:** Front-end navigates or opens feature modal  
  **Output:** Corresponding page or modal shown  
  **Reasoning:** Buttons must respond correctly to user clicks

- **Input:** User selects location or position dropdown  
  **Process:** UI updates selection (filtering not implemented yet)  
  **Output:** Dropdown shows selected value  
  **Reasoning:** User interaction with filters must be possible, filtering logic to be added

| Input | Process | Output |  Reasoning |
| :--: | :--: | :--: | :--: |
| Page load | Fetch data from APIs | Display data or loading/errors | Ensure data loads correctly |
| API failure | Receive error | Show error messages | User informed of issues |
| Empty employee list | API returns [] | Show "No employees found" | Handle empty states |
| Empty shifts list | API returns [] | Show "No shifts found" | Handle empty states |
| Click quick action | Trigger navigation/modal | Show related UI | Buttons respond to user |
| Select dropdown | Change selection | Reflect selection in UI | Prepare for filtering |

---
## Notes
*This document should be maintained and updated regularly as workflows develop and evolve.*
