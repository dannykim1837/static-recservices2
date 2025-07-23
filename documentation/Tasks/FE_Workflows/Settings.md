### **Settings.html - Workflow**

#### **Assigned Group Member**
Chad Lipop
- **Webpage:** settings.html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories:** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
#### **Overview**
- [Describe the purpose and expected user interactions for the page.]
There are two user types Employee and Admin.
![Settings](https://github.com/user-attachments/assets/1ec428d8-f82f-4005-a44c-ff9de1d8dbbe)

Employees can change 
- Calendar settings: "Time Format", "First Day of the Week"
- Notification settings for Events: "Upcoming shift, Announcements, and "New shift", "Shift cancelled/time changed".

The Manager or Admin can change additional settings 
- Edit Role/Position list: "Create new", "rename", "Delete"
- Editing Teams: "add or remove Employees to a team"

see the Employee Settings Wireframe for a possible example https://github.com/byui-cse397/2025WinCSE397PCP_RecSrv/blob/main/documentation/wireframes/earlyDesigns/settings-wireframe-small.png
#### **UI Elements**
- [List the key UI components on the page]
Bottons for toggling settings on and off and headings specifying what each settings section relates to.
---
#### **Process & Workflow**
- [Describe user stories in a step-by-step process (or use a flowchart). Include refereces to UI elements being interacted with by the user]
![Role and Settings Synchronization Diagram](https://github.com/user-attachments/assets/7008c289-b695-4091-a97a-ee04331159e7)

---
#### **API Calls & Data Handling**
- [Define the network interactions on this page, with the data stored in the request (refer to UI elements) and given in the response]
not API calls but some suggestions on Data handling
1. Begin by accessing the RolePositionList. 
2. Synchronize the RolePositionList with its corresponding data source. 
3. Access the Employee entity. 
4. Synchronize the Employee entity with its corresponding data source. 
5. Access the CalendarSettings entity. 
6. Synchronize the CalendarSettings entity with its corresponding data source. 
7. Access the Admin entity. 
8. Synchronize the Admin entity with its corresponding data source. 
9. Access the NotificationSettings entity. 
10. Synchronize the NotificationSettings entity with its corresponding data source. 
11. Access the TeamManagement entity. 
12. Synchronize the TeamManagement entity with its corresponding data source.
Of course there need to be some security check in place to make sure only Managers can access the additional settings.
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
