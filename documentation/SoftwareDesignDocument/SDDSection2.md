# SDD Section 2: Front-End: (All parts label by data types)
# Section 2: Front-End Design

## 2.1 Architecture Overview

The front-end of the RecServices application is built using **React**. It follows a component-based architecture to separate UI concerns and enable reusability.  
State management primarily uses React's `useState` and `useEffect` hooks for local state, with context API planned for future global state management.  

The front-end communicates with the back-end via REST APIs to fetch and update shift data, employee details, and user authentication.

## 2.2 User Interface and Navigation

- The main user interface consists of pages such as:
  - **Login Page**: User authentication.
  - **Dashboard**: Overview of scheduled shifts and quick actions.
  - **Time Clock Page**: Displays shift details with search and column filters.
  - **Employee Management**: CRUD operations on employees.
  
Navigation is handled using React Router to allow single-page application behavior with smooth transitions.

## 2.3 Data Types and Data Flow

The front-end uses the following key data types:

| Data Type        | Description                                  | Example Fields                         |
|------------------|----------------------------------------------|--------------------------------------|
| **Employee**     | Represents an employee with personal info.  | id, firstName, lastName, payRate     |
| **Shift**        | Represents a work shift assigned to employee.| id, employeeId, startTime, endTime, location, position |
| **User**         | Authenticated user information.              | userId, username, token               |

Data flow example:
- User logs in → receives JWT token → saved in localStorage  
- Front-end fetches shifts from API → displays in table with employee details  
- User searches or filters shifts → UI updates accordingly

## 2.4 Component Descriptions

### TimeClockPage
- Displays a table of shifts with detailed employee info.
- Supports searching by employee name.
- Allows toggling visibility of columns like Shift Start, Location, Pay Estimate.
- Uses `useShiftsWithEmployeeDetails` custom hook to fetch data.

### Menu
- Navigation bar component with links to other pages.

### ShiftRow
- Represents a single row in the shifts table.
- Displays employee name, date, shift start/end, location, position, duration, and pay estimate.

### SearchBar
- Input box allowing filtering by employee name.

### FilterButtons
- Set of toggle buttons to show/hide specific table columns.

## 2.5 State Management

- Local component states are managed using `useState`.  
- API calls and data fetching are triggered with `useEffect`.  
- State includes:
  - `detailedShifts`: list of shifts with employee details.
  - `search`: string used for filtering shifts.
  - `visibleFields`: object controlling which columns are visible.

## 2.6 User Interaction Flow

1. User opens Time Clock page.
2. `useEffect` triggers data fetch for shifts with employee details.
3. User types in the search box to filter shifts by employee name.
4. User clicks column filter buttons to toggle columns on/off.
5. Table updates dynamically to show filtered data and visible columns.

## 2.7 Error Handling and Feedback

- While data is loading, a loading indicator "Loading shifts..." is shown.
- If an error occurs during data fetch, an error message is displayed in red.
- If no shifts match the search filter, a "No results found." message is shown.

## 2.8 Form Validation

- Forms in the front-end (e.g., login, shift creation) validate inputs on the client side before submission.
- Validation rules ensure required fields are filled and formatted correctly.

## 2.9 External Libraries and API Communication

- **Axios** is used for HTTP requests to the back-end API.
- **React Router** handles routing between pages.
- Custom hooks like `useShiftsWithEmployeeDetails` abstract data fetching logic.
- Communication follows RESTful principles with JSON data.

---

*End of Section 2*
