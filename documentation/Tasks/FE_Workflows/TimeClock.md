### **TimeClock.html - Workflow**

#### **Assigned Group Member**
Danny Kim
- **Webpage:** timeClock.html
- **UI Elements:** Search input, column toggle buttons, shifts data table with columns (Name, Date, Location, Position, Shift Start, Clock In/Out, Shift End, Duration, Pay Estimate)
- **Workflows/User Stories:** Viewing shifts, searching/filtering by employee name, toggling visible columns, loading data with detailed employee info
- **API Calls:** Fetch detailed shifts with employee details
- **Test Cases:** Loading states, error display, search filtering, column toggling, empty state

---
#### **Overview**
- The Time Clock page allows employees and managers to view detailed time clock events such as clock-in/out times, hours worked, locations, and pay estimates.
- Users can search shifts by employee name and toggle visibility of various columns.
- Data is loaded asynchronously from a backend API returning shifts with related employee details.

---
#### **UI Elements**
- Search input field for filtering by employee name.
- Buttons to toggle visibility of columns: Shift Start, Shift End, Location, Position, Duration, Pay Estimate.
- Scrollable table displaying shifts with columns including Name, Date, Location, Position, Shift Start, Clock In, Clock Out, Shift End, Duration, Pay Estimate.
- Loading message and error message area.

---
#### **Process & Workflow**
1. On page load, fetch detailed shifts with employee info asynchronously.
2. Show loading indicator while fetching.
3. If error occurs, display error message.
4. Display all fetched shifts in a table format.
5. User can enter text in search input to filter shifts by employee name.
6. User can click toggle buttons to show/hide columns dynamically.
7. If no shifts match the search, show "No results found."
8. Table updates in real time based on filtering and column toggles.

---
#### **API Calls & Data Handling**
- `GET /shifts/detailed` (via `useShiftsWithEmployeeDetails` hook)
  - Request: No parameters (or user auth token as required)
  - Response: Array of shift objects with embedded employee, position, and location details.
- Front-end filters and displays data based on user input and toggles without additional API calls.

---
#### **Test Cases & Error Handling**

| Input                         | Process                            | Output                          | Reasoning                                   |
| :---------------------------: | --------------------------------- | ------------------------------ | ------------------------------------------ |
| Page load                     | Fetch shifts data                 | Display loading, then data     | Verify API data loads correctly             |
| API error                     | Error response                    | Show error message             | User informed of network/backend issue      |
| User types in search input    | Filter shift list by employee name| Table shows filtered rows      | Search functionality works                   |
| User clicks column toggle     | Toggle visibleColumns state       | Show/hide corresponding columns| Dynamic UI update on user interaction       |
| No matching search results    | Filter returns empty array         | Show "No results found" message | Proper empty state handling                   |

---
## Notes
*This document should be maintained and updated regularly as workflows develop and evolve.*
