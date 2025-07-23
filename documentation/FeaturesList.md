# Features List

## Description
Details the features each semester of students have worked on, and what features are planned in the future

To Do: How should this be organized? By necessity/priority, HTML page, completion, etc

## Features by Type

### Initial Setup
#### MVP
- [x] Communication between FE and BE
- [x] Communication between BE and DB
- [x] Users can log-in to an Account using Credentials, able to view data related to their Account

### Schedule / Calendar
#### MVP
- [x] Calendar page
- [x] Employees can view Shifts/Events they have been assigned to
- [x] Coordinators can view Shifts for Employees belonging to their Team/Group
- [x] Managers can view Shifts for all Employees
- [x] Editing shifts by clicking on them
- [x] Deleting shifts
- [x] Assigning multiple employees to a shift (creates individual shifts for each employee)
- [x] Shifts display properly for tagged employees
- [x] Employee dropdown populated dynamically

### Time Clock
#### MVP
- [x] Time Clock tab
- [x] Kiosk page

### Documentation
#### MVP
- [x] Developer Guide (architecture, tools, Git workflow, testing, CI/CD, etc.)
- [x] Installation Guide
- [x] User Guide
- [x] Version Description Document (VDD)
- [x] Manual Integration Tests
- [x] Review and finalize all documentation for handoff
- [x] White pages with schema and shift logic

### Project Management / DevOps
- [x] Weekly team meetings
- [x] Defined action items each week
- [x] Branch merge strategies
- [x] Final documentation resides in GitHub
- [x] Backend/Frontend coordination
- [x] Shift database schema debugged and deployed
- [x] Coordinated Supabase permissions and RLS access issues
- [x] Verified Supabase invitation flow and fixed team access
- [x] API tested and debugged for manual ID entry
- [x] React component overhaul (in-progress, under review)
- [x] Merged new React pattern updates to BE-Development
- [x] Refactored static-site/js files to support Supabase syntax
- [x] Defined non-overlapping file assignments for team members
- [x] Created BE-MergeBranch (renamed BE-Testing) for architecture exploration
- [x] Pushed login.js, kiosk.js, menu.js, userProfile.js, calendar.js with Supabase integration tests
- [x] Organized file handoff and documentation via team Google Doc
- [x] Coordinated with FE to pause React overhaul pending alignment

## Features by Semester

### Winter 2025
- [x] Initial Setup MVP
- [x] Schedule MVP
- [x] Time Clock MVP

### Spring 2025
- [x] Finalized calendar layout
- [x] Edit and delete shifts from UI
- [x] Add multiple employees to shifts
- [x] Calendar data persists in Supabase
- [x] Created new layout prototype for Calendar
- [x] Reviewed and refactored React components (ShiftFormPopup, etc.)
- [x] Backend documentation (white pages, VDDs, weekly checklists)
- [x] Integration testing and documentation
- [x] Manual test documentation
- [x] GitHub organization, branch merge, cleanup
- [x] Supabase schema finalized
- [x] Team assigned feature zones to avoid conflicts
- [x] Final push to clean up and document calendar and shift creation
- [x] Shift table configured and debugged
- [x] Fixed employee ID foreign key issues
- [x] Disabled RLS on Shift table temporarily to enable testing
- [x] Added support for shift creation tied to authenticated employees
- [x] Verified API errors and updated manual ID workaround
- [x] Resolved Supabase access and invitation bugs
- [x] Restructured components to follow React best practices (componentized CSS/JSX)
- [x] Added and tested employee dropdown for shift assignment
- [x] Paused React overhaul pending FE review to maintain team alignment
- [x] Refactored old Express.js code to use Supabase syntax
- [x] Assigned specific files for Supabase integration (e.g., login.js, kiosk.js, calendar.js)
