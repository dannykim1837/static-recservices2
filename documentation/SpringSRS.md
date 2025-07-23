# Spring 2025 SRS

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
- [Backend Todo List](https://github.com/byui-cse397/2025SprCSE397PCP_RecSrv/blob/main/documentation/ToDo/Backend_ToDo.md)
- Frontend: Fix UI bugs, add any missing elements, and continue styling new pages/progress.
- Database: Add more RLS features to [Supabase](https://supabase.com/dashboard/project/cznflfshoiohzkklmeoo), add tables/sections for notifications, shift change and time off requests, and events.
- Implement additional features as requested by Rec Services

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

### Features missing for MVP
- Event scheduling/viewing
- Notifications and requests for shift changes and time off (including the manager's ability to approve it)
- A way for admins to promote other user accounts
- System for viewing when a user clocked in/out and determining their work status (late/missing) based on those times.
- **Export to XLS or TSV/CSV:** Sling currently allows Employee hours to be exported to an Excel sheet that can be imported into Workday. This is important in ensuring Employees are paid acording to the hours they worked on the time clock.
- Other requirements as listed in the Future Semesters section [above](future-semsters)
