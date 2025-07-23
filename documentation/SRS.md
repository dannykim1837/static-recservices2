# Rec Services Time Mangement Application SRS
## Scope
Details about the scope of the project: What does it inculde? What does it not include?
### Winter 2025
#### Schedule
A calendar view showing upcoming and previous shifts
- Can request and view a collection of shifts
- Can filter a collection of shifts (Filters include type of shift/event (meeting, shift, etc), Employee, time period)
- Can create a shift and enter details
- Can view a shift's details (Details include Name, scheuduled start, scheduled end, Employees assigned, type of event)
- Can edit a shift's details
- Can delete a shift
- Can assign an Employee to a shift
- Can unassign an Employee to a shift
#### Time Clock
Tracks clock-in and clock-out events for Employees
- Can view a timeclock item (Details include Employee, clock-in time, clock-out time, scheduled start, scheduled end)
- Can view a collection of timeclock items
- Can filter a collection of timeclock events (Employee, type of event
- Can create a timeclock item per shift per employee assigned
- Can clock-in or clock-out, adding the time to the timeclock item
##### Kiosks
A specific location where an Employee can clock-in/clock-out
- Can enter EmployeeID or select Employee name to clock-in/clock-out
- Would have an Employee list per organization/team

### Future Semesters
- [TODO] Add more details here
- Extra features as requested by Rec Services

## Definitions

### Describing the Application and Team Structure
| Term | Defintion |
| -- | -- |
| App / Application | The software we are creating, including the front-end, back-end, and database code |
| Client | The front-end portion of the Application |
| Database | Where data is remotely stored and updated |
| Server | Where back-end processes happen and the Database is located |
| Front-End Team | The developers responsible for developing the Client-side view, including user interactions, the appearance of the application (as a website and mobile application*), and sending HTTP requests to the Server and interpreting the HTTP respsonses. |
| Back-End Team | The developers responsible for communication between the Client and Database, including [Team lead add more features here], routing requests with url extensions ([url]/login, [url]/employees, [url]/employees/{employee-id}), and recieving HTTP requests and sending requested information back to the Client as an HTTP response. |
| Database Team | The developers responsible for organizing and hosting the data related to the Application, including [Team lead add more features here], and creating a DBMS. |

*The app's front-end is planned to be a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app), meaning it can be saved as an application on a mobile device, but it really is just a website link with extra features. Rec Services is mainly interested in the ability to send notifications to Enployees with upcoming Shifts.

### Data and Feature Definitions
|Term | Definition|
| -- | -- |
| Credentials | A username and password which are used to authenticate a User |
| Account | Information that is related to a specific User, including Credentials, Calendar Events, and User Preferences|
| Event / Shift | An item that has a scheduled begin and end time |
| Event Details | Additional information relevant to a specific Event including title, start time, end time, and Assignees |
| Calendar / Schedule | A collection of Events |
| "My Schedule" | The Schedule for a single Employee. The collection of Events that a specific Employee has been assigned to |
| Assignee | An Employee assigned to a specific Event |
| Time Clock | The part of the Application Employees use to clock in and clock out |
| Team | A collection of Employees. A Manager can assign Employees on their team to Shifts and view all Shifts that Employees on their Team have been assigned to. |
| [insert term] | [insert definition] |

### User Types
| User | Definition |
| -- | -- |
| User | Any person who is using the Application |
| Employee | A User with an Account stored in the Database. They can can view and be assigned to specific Shifts |
| Coordinator | A type of Employee who can schedule Employees to Shifts, create Shifts, approve Shift Swaps, and complete other tasks.(a lower level of access than Manager) A Coordinator cannot change members of their Team? (difference in permissions) |
| Manager / Boss | A type of Emmployee with additional permissions, including those of a Coordinator. A Manager can add or remove Employees from their Team |
| Administrator | A type of User who has access to additional parts of the Application. Can change an Employee's account type (promote to Manager, Coordinator, or Administrator) |

## Requirements
Scheduling
- Managers can create an Event
- Managers can delete an Event
- Managers can update Event Details
- Employees can view Events where they are an Assingee
Timeclock
- Employees can clock in and out using the Time Clock
- Employees will be notified if an Event they are assigned to is starting soon
- Employees can view the number of hours worked over a period of time (current week, last two weeks, monthly, yearly, etc)
Communication
- Managers can send announcements to a group of employees
- Assignees will be notified if an Event's begin or end time has been modified
Administrative
- Admin can change an Employee's account level (upgrade to Manager)

[Listing featuers and user stories can help define app requirements]
### Features
#### Requried for MVP
- Website connected to back-end with a database
- Can create an Employee Account
- Can create an Admin/Boss/Manager Account
- Can view Shifts related to a specific Employee
- Can veiw Shifts related to a specific Team
- [To Do: Add more features]

#### Additional
- [To Do: Add more features, label which ones will be done this semester or by other semesters]
- **Export to XLS or TSV/CSV:** Sling currently allows Employee hours to be exported to an Excel sheet that can be imported into Workday. This is important in ensuring Employees are paid acording to the hours they worked on the time clock.
- 
- **Stretch Goal - Working with other BYUI departments:** Separate Employees into organizations and departments for further separation of groups (example: BYUI is an organization, has Rec Services and other BYUI departments such as ORC). Having an organizational level can help put BYU-I events on the calendar (holidays, devotionals, etc) to better schedule events at a department and team level (being aware of other events going on, when student Employees may be busy with semester finals or when they may leave for winter break).
- **Stretch Goal - Cost Estimations:** NOT a connection/replacement of Workday. This would allow Managers/Coordinators to estimate the costs of scheduling employees based on their hourly wage (taking into account overtime pay). Might better allow Managers to estimate costs before exporting to Workday.

### Users
#### Types of Users
- Administrator: In charge of all Employees
- Manager/Boss: In charge of all Employees within a Team
- Coordinator: In charge of the scheduling of Employees within a Team
- Employee: A singular person who works Shifts

#### User Stories
- A User can create an Account
- A User can login to their Account using their Credentials
- A User can reset their password
- An Employee can view "My Schedule", which has all upcoming and past Shifts they are assigned to
- A Manager can view the "Full Schedule", which shows the Shifts related to ALL Employees within their Team
- [To Do: Add more user stories]


### Spring 2025
#### Technical Migration and Enhancement
A complete modernization of the application architecture and user experience
- Migration from legacy backend to Supabase backend-as-a-service platform
- Frontend rebuild using React.js framework for improved performance and maintainability
- Enhanced kiosk functionality with PIN-based authentication system
- Real-time data synchronization across all application components
- Improved mobile-responsive design for better cross-device compatibility

#### Enhanced Time Clock System
Upgraded timeclock functionality with modern architecture and improved user experience
- PIN-based employee authentication for secure and quick access
- Real-time clock-in/clock-out processing with immediate feedback
- Automatic duration calculation and shift validation
- Early clock-out prevention with manager override capabilities
- Enhanced shift history tracking with detailed time analytics
- Mobile-optimized interface for tablet and smartphone kiosks

#### Database Architecture Modernization
Complete database restructuring using Supabase PostgreSQL with optimized performance
- Migrated employee data to structured Employee table with unique PIN authentication
- Enhanced Shift table with comprehensive timing and scheduling fields
- Implemented efficient indexing for fast PIN lookups and shift queries
- Added automatic timestamp tracking for all clock-in/clock-out events
- Integrated duration calculation fields for real-time shift analytics
- Row-level security implementation for data protection

#### React.js Frontend Implementation
Modern, component-based frontend architecture for improved scalability and maintenance
- Responsive design components optimized for desktop, tablet, and mobile devices
- Real-time state management for live updates across all user interfaces
- Custom hooks for employee data management and API interactions
- Enhanced error handling and user feedback systems
- Progressive Web App capabilities for mobile installation and offline functionality
- Component library for consistent UI/UX across all application pages

#### API Integration and Real-time Features
Seamless integration between frontend and Supabase backend services
- RESTful API implementation using Supabase client libraries
- Real-time subscriptions for live schedule updates
- Optimized database queries with efficient data fetching strategies
- Comprehensive error handling and retry mechanisms
- Authentication and authorization using Supabase Auth
- File upload capabilities for employee profile management

#### Enhanced Kiosk Experience
Redesigned kiosk interface focusing on usability and security
- Touch-optimized virtual keypad for PIN entry
- Visual feedback for all user interactions
- Automatic session timeout and security features
- Support for both keyboard and touch input methods
- Clear status indicators for clock-in/clock-out states
- Recent shift history display for employee reference
- Offline capability with data synchronization when connection resumes