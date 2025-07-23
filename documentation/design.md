# Design Document

## FrontEnd

### Overview
We are creating a web app that can be used to schedule shifts for the employees of Rec Services. The main pages are the Calendar, Kiosk, and Time Clock pages for Managers and Coordinators to review. Additional pages such as Login, Dashboard, User Profile, and Settings would allow all Employees to use the application. The site is currenlty hosted [privately on GitHub](https://expert-tribble-plvjpnm.pages.github.io/).

### Technologies
- Wireframes created using [Figma](https://www.figma.com/)
- Website hosted using GitHub Pages (privately shared with repository members as a test environment. Can change to public if this becomes production environment)
- HTML, CSS, and JS files in the [/docs](https://github.com/byui-cse397/2025WinCSE397PCP_RecSrv/tree/main/docs) folder
- [proposed production environment] Amazon AWS - Lightbridge or Beanstalk (would need to be setup/integrated with other teams)

### [Figma with Wireframes/Mockups](https://www.figma.com/design/h6BuhsLMqz7VcvrEzkbQKl/FE-Wireframes?node-id=41-3&p=f&t=VOKk7lRgFkSptvSm-0)

### User Flow
- Workflow documents have been created in [/documentation/Tasks/FE_Workflows](https://github.com/byui-cse397/2025WinCSE397PCP_RecSrv/tree/main/documentation/Tasks/FE_Workflows) to describe the UI and user workflows for each HTML page.

---

## BackEnd

### Overview
- Connect database to frontend and backend
- Make calls to database through the backend for automated tasks or tasks that require bypassing Row-Level-Security in the database
- Use data from database calls to display values and add functionality within frontend elements

### Technologies
- ~~Express~~
- Node.js

### Architecture
- [Description of the backend architecture.]


### Authentication and Authorization
- [Methods and tools used.]

---

## Database

### Overview
- [Brief description of the database's role in the system.]

### Technologies
- Supabase

### Schema Design
- [Diagram or description of the database schema.]

### Tables/Collections
- [Description of key tables/collections:]

### Queries
- [Examples of key queries used in the application.]
