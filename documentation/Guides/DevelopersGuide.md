# Developer's Guide - Rec Services Time Management Application

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [Custom Hooks](#custom-hooks)
5. [Pages & Components](#pages--components)
6. [Authentication](#authentication)
7. [API Patterns](#api-patterns)
8. [Common Issues & Solutions](#common-issues--solutions)
9. [Development Workflow](#development-workflow)
10. [Best Practices](#best-practices)

## Overview

The Rec Services Time Management Application is a React-based web application that uses Supabase as its backend-as-a-service platform. The application enables recreational services staff to manage schedules, track time, and handle employee operations through an intuitive web interface.

### Key Features
- **Employee Management**: View and edit employee profiles
- **Schedule Management**: Create, view, and modify work shifts
- **Time Tracking**: Clock in/out functionality via kiosk
- **Calendar View**: Visual representation of schedules and events
- **Authentication**: Secure login using Supabase Auth
- **Role-based Access**: Different permissions for employees, coordinators, and managers

### Technology Stack
- **Frontend**: React 18.3.1 with React Router DOM 7.6.2
- **Backend**: Supabase (PostgreSQL with REST API)
- **Authentication**: Supabase Auth with helpers
- **Styling**: Custom CSS modules

## Architecture

### Frontend Structure
```
static-recservices/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Menu.jsx       # Navigation menu
│   │   └── ShiftFormPopup.jsx
│   ├── db/               # Database configuration
│   │   └── supabase.js   # Supabase client setup
│   ├── pages/            # React page components
│   │   ├── calendar.jsx  # Schedule calendar view
│   │   ├── dashboard.jsx # Main dashboard
│   │   ├── kiosk.jsx     # Clock in/out interface
│   │   ├── login.jsx     # Authentication
│   │   └── ...
│   ├── styles/           # CSS stylesheets
│   ├── utils/            # Custom hooks and utilities
│   │   ├── useEmployees.js
│   │   ├── useShifts.js
│   │   └── ...
│   ├── App.jsx           # Main application component
│   └── index.js          # Application entry point
└── package.json
```

### Backend (Supabase)
- **Database**: PostgreSQL with automatic REST API generation
- **Authentication**: Built-in user management with JWT tokens
- **Real-time**: WebSocket connections for live data updates
- **Row Level Security (RLS)**: Fine-grained access control

## Database Schema

### Core Tables

#### Employee Table
Employee information and profile data
- `id` - Primary key, unique employee identifier
- `uid` - Links to Supabase Auth user (nullable)
- `firstName` - Employee's first name
- `lastName` - Employee's last name  
- `email` - Employee's email address (unique)
- `kiosk_pin` - 4-digit PIN for kiosk clock in/out
- `location` - References Location table
- `position` - References Position table
- `active` - Whether employee is currently active
- `created_at` - Record creation timestamp

#### Shift Table
Work shift schedules and assignments
- `id` - Primary key, unique shift identifier
- `employee_id` - References Employee table (nullable)
- `start_time` - When the shift starts
- `end_time` - When the shift ends
- `up_for_trade` - Whether shift is available for employee trade
- `created_at` - Record creation timestamp
- `duration` - Computed field for shift length (in hours)
- `clock_in_time` - Timestamp when employee clocks in
- `clock_out_time` - Timestamp when employee clocks out
- `clocked-duration` - Computed field for actual clocked hours

#### Location Table  
Work locations and facilities
- `id` - Primary key, unique location identifier
- `name` - Location name (e.g., "Main Pool", "Gym")
- `address` - Physical address of location
- `count` - Number of employees assigned to this location

#### Position Table
Job positions and roles
- `id` - Primary key, unique position identifier  
- `name` - Position title (e.g., "Lifeguard", "Manager")
- `count` - Number of employees assigned to this position

### Relationships
- **Employee ↔ Shift**: One-to-Many (Employee can have multiple shifts)
- **Employee ↔ Location**: Many-to-One (Employee belongs to one location)
- **Employee ↔ Position**: Many-to-One (Employee has one position)
- **Employee ↔ auth.users**: One-to-One (Employee linked to Supabase user)

## Custom Hooks

The application uses custom React hooks to manage data fetching and state management for different entities.

### useEmployees Hook
Located in `src/utils/useEmployees.js`

```javascript
const { 
  employees, 
  loading, 
  error, 
  fetchEmployees,
  fetchEmployee,
  updateEmployee,
  createEmployee,
  deleteEmployee 
} = useEmployees();
```

**Key Functions:**
- `fetchEmployees()`: Retrieve all employees
- `fetchEmployee(id)`: Retrieve single employee by ID
- `updateEmployee(id, updates)`: Update employee data
- `createEmployee(employeeData)`: Create new employee
- `deleteEmployee(id)`: Remove employee

### useShifts Hook
Located in `src/utils/useShifts.js`

```javascript
const { 
  shifts, 
  loading, 
  error, 
  fetchShifts,
  createShift,
  updateShift,
  deleteShift 
} = useShifts();
```

### useLocations Hook
```javascript
const { 
  locations, 
  fetchLocation, 
  loading, 
  error 
} = useLocations();
```

### usePositions Hook
```javascript
const { 
  positions, 
  fetchPosition, 
  loading, 
  error 
} = usePositions();
```

### Hook Pattern
All custom hooks follow a consistent pattern:
1. State management using `useState`
2. Memoized functions using `useCallback`
3. Supabase operations with error handling
4. Loading states for async operations

## Pages & Components

### Authentication Pages

#### Login Page (`login.jsx`)
- Handles user authentication via Supabase Auth
- Email/password login
- User registration
- Password visibility toggle
- Redirects to dashboard on successful login

```javascript
const handleLogin = async (event) => {
  event.preventDefault();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.username,
    password: formData.pwd
  });
  // Handle success/error
};
```

### Main Application Pages

#### Dashboard Page (`dashboard.jsx`)
- Main landing page after login
- Announcements and notifications
- Quick access to main features

#### Calendar Page (`calendar.jsx`)
- Visual calendar displaying shifts and events
- Create/edit/delete shifts
- Filter by employee, date range, or event type
- Shift assignment to employees

Key features:
```javascript
const [shiftForm, setShiftForm] = useState({
  date: '',
  start: '',
  end: '',
  description: '',
  employee_id: []
});
```

#### User Profile Page (`userProfile.jsx`)
- View/edit employee information
- Update personal details (name, email, kiosk PIN)
- Form validation for kiosk PIN (4-digit requirement)

#### Kiosk Page (`kiosk.jsx`)
- Simplified interface for employee clock in/out
- 4-digit PIN pad interface
- Touch-friendly design for kiosk terminals

#### Time Clock Page (`timeClock.jsx`)
- Administrative view of time clock data
- Filter shifts by various criteria
- View employee time tracking information

### Reusable Components

#### Menu Component (`Menu.jsx`)
Navigation menu with:
- Responsive hamburger menu
- Route-based active state highlighting
- Material Design icons
- Role-based menu item visibility

```javascript
const menuItems = [
  { text: "Home", link: "/", icon: "home" },
  { text: "Announcements", link: "/dashboard", icon: "notifications" },
  { text: "Time Clock", link: "/time-clock", icon: "schedule" },
  { text: "Calendar", link: "/calendar", icon: "calendar_today" },
  // ...
];
```

## Authentication

### Supabase Auth Integration
The application uses Supabase's built-in authentication system:

```javascript
import { useUser } from '@supabase/auth-helpers-react';

const user = useUser(); // Get current authenticated user
```

### Authentication Flow
1. User submits login credentials
2. Supabase validates credentials
3. JWT token stored in browser
4. User object available throughout app via `useUser()` hook
5. Employee record linked via `uid` field

### Protected Routes
Pages check for authentication status:
```javascript
useEffect(() => {
  if (!user) {
    // Redirect to login or show auth required message
  }
}, [user]);
```

### Employee-User Relationship
Each employee record is linked to a Supabase user:
```javascript
// Fetch employee data based on authenticated user
const fetchEmployeeID = async () => {
  if (user) {
    const { data } = await supabase
      .from("Employee")
      .select("id")
      .eq("uid", user.id)
      .single();
    setEmployeeId(data.id);
  }
};
```

## API Patterns

### Supabase Operations
All database operations use the Supabase client:

#### Create (INSERT)
```javascript
const { data, error } = await supabase
  .from('Employee')
  .insert([employeeData])
  .select();
```

#### Read (SELECT)
```javascript
// Get all records
const { data, error } = await supabase
  .from('Employee')
  .select('*');

// Get single record
const { data, error } = await supabase
  .from('Employee')
  .select('*')
  .eq('id', employeeId)
  .single();

// Join with related tables
const { data, error } = await supabase
  .from('Employee')
  .select('*, Location(*), Position(*)');
```

#### Update (UPDATE)
```javascript
const { data, error } = await supabase
  .from('Employee')
  .update(updates)
  .eq('id', employeeId)
  .select();
```

#### Delete (DELETE)
```javascript
const { data, error } = await supabase
  .from('Employee')
  .delete()
  .eq('id', employeeId);
```

### Error Handling Pattern
```javascript
const performOperation = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const { data, error } = await supabase
      .from('TableName')
      .operation();
      
    if (error) throw error;
    
    // Handle success
    setData(data);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
```

## Common Issues & Solutions

### 1. Infinite Re-renders
**Problem**: Components re-render infinitely due to dependency issues in `useEffect`

**Solution**: 
- Ensure functions in dependency arrays are memoized with `useCallback`
- Include all dependencies that are used inside the effect
- Filter undefined values before database operations

```javascript
// ❌ Wrong - function recreated on every render
useEffect(() => {
  fetchData();
}, [fetchData]); // fetchData changes every render

// ✅ Correct - memoized function
const fetchData = useCallback(async () => {
  // fetch logic
}, [dependency1, dependency2]);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

### 2. "prev.map is not a function" Error
**Problem**: State expected to be array but is an object

**Solution**: 
- Initialize state as empty array: `useState([])`
- Check data type before using array methods
- Ensure API returns consistent data structure

### 3. Database Type Errors ("invalid input syntax for type bigint")
**Problem**: Sending undefined or string values to numeric database fields

**Solution**:
```javascript
// Filter undefined values before database operations
const cleanedData = Object.fromEntries(
  Object.entries(formData).filter(([_, value]) => value !== undefined)
);

// Convert types appropriately
const processedData = {
  ...formData,
  kiosk_pin: formData.kiosk_pin === '' ? null : Number(formData.kiosk_pin)
};
```

### 4. Form State Management
**Problem**: Form inputs not controlled properly

**Solution**:
```javascript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  kiosk_pin: ''
});

// Handle input changes
const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

// Use in JSX
<input
  name="firstName"
  value={formData.firstName}
  onChange={handleInputChange}
/>
```

## Development Workflow

### 1. Adding New Features
1. **Database Schema**: Update Supabase tables if needed
2. **Custom Hook**: Create or modify hooks for data operations
3. **Components**: Build UI components
4. **Pages**: Integrate components into pages
5. **Routing**: Add routes to `App.jsx`
6. **Testing**: Test functionality and edge cases

### 2. Code Organization
- **Hooks**: Place in `src/utils/`
- **Components**: Place in `src/components/`
- **Pages**: Place in `src/pages/`
- **Styles**: Place in `src/styles/`

### 3. Naming Conventions
- **Files**: camelCase for components, kebab-case for utilities
- **Components**: PascalCase
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### 4. Git Workflow
- Create feature branches from main
- Make atomic commits with clear messages
- Test thoroughly before merging
- Use pull requests for code review

## Best Practices

### 1. React Best Practices
- Use functional components with hooks
- Memoize expensive operations with `useMemo`
- Memoize callback functions with `useCallback`
- Keep components small and focused
- Use proper key props in lists

### 2. Supabase Best Practices
- Enable Row Level Security (RLS) for data protection
- Use prepared statements to prevent SQL injection
- Index frequently queried columns
- Use `select()` to return data after insert/update operations
- Handle errors gracefully

### 3. Form Handling
- Always validate user input
- Use controlled components
- Provide clear error messages
- Handle loading states
- Sanitize data before database operations

### 4. Performance Optimization
- Lazy load heavy components
- Optimize re-renders with `React.memo`
- Use proper dependency arrays in hooks
- Minimize API calls with caching
- Use Supabase real-time subscriptions sparingly

### 5. Security Considerations
- Never expose sensitive API keys in frontend code
- Use environment variables for configuration
- Implement proper authentication checks
- Validate all user inputs
- Use HTTPS in production

### 6. Error Handling
- Always handle async operation errors
- Provide user-friendly error messages
- Log errors for debugging
- Implement retry mechanisms for network operations
- Use error boundaries for component errors

## Conclusion

This Developer's Guide provides a comprehensive overview of the Rec Services Time Management Application. The application follows modern React patterns with Supabase integration for a full-stack solution. By following the established patterns and best practices outlined in this guide, developers can efficiently contribute to and maintain the codebase.

For additional support or questions, refer to the project documentation or contact the development team.