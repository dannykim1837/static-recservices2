# Workflows Documentation

## Overview
This document provides an outline for a structured approach to documenting front-end workflows. It ensures that all user interactions, UI elements, and data exchanges are properly documented for development and review.

### **How to Use This Document**
- This serves as a reference for ALLLLLLLLLL front-end pages.
- Each workflow should be documented using the structured template provided (here and as template.md).
- The Group Leader should assign specific workflow tasks to their team members.
- Updates should be made as necessary to reflect changes in design or implementation.

---
## Workflow Examples
### Sling
[Sling](https://app.getsling.com/) will be used as an *example* of the type of app we are creating. The goal is to make a scheduling app that will work for Rec Services, but is also modular/flexible enough that it can be updated to work for additional BYUI departments or other organizations.

[Sling Kiosk](https://www.youtube.com/watch?v=fllBON_SRUw) - A Manager will setup a kiosk where Employees can clock-in for their Shift.

---
## Task Assignments
### **Initial Creation of Workflow Documents (Excluding Test Cases) [Winter 2025]**
| Workflow | Assignee | Tasks | Notes |
| :- | :- | :- | :- |
| **Login** | [Ashley](https://github.com/Ashley-DeMott) | All sections | Created to determine what information would be useful/what format |
| **Calendar - Employee** | [Corbin](https://github.com/czzzz97) | All except Test Cases | |
| **Calendar - Manager** | [Shandler](https://github.com/ShandlerR) | All except Test Cases | |
| **Kiosk** | [Paolo](https://github.com/prpetrignani) | All except Test Cases | |
| **Settings** | [Chad](https://github.com/clookcode) | All except Test Cases | |
| **TimeClock** | [Chad](https://github.com/clookcode) | All except Test Cases | |
| **UserProfile** | [Paolo](https://github.com/prpetrignani) | All except Test Cases | |

### Creating and Updating Workflows [Spring 2025/change semester]
| Workflow | Assignee | Tasks | Notes |
| :- | :- | :- | :- |
| **Dashboard** | [Assignee] | |  |

### Creating and Updating Workflows [Summer 2025/change semester]
| Workflow | Assignee | Tasks | Notes |
| :- | :- | :- | :- |
### Creating and Updating Workflows [Summer 2025/change semester]
| Workflow   | Assignee  | Tasks        | Notes                          |
| :-         | :-        | :-           | :-                            |
| **Dashboard** | [Danny Kim](https://github.com/dannykim1837) | All sections | Documented Dashboard page with employee list, quick actions, and shift cards |
| **Login**     | [Danny Kim](https://github.com/dannykim1837) | All sections | Documented login, registration, and password reset workflows using React and Supabase |
| **TimeClock** | [Danny Kim](https://github.com/dannykim1837) | All except Test Cases | Documented TimeClock page with search and column toggles |

---
## What to include?
The goal is to better understand the purpose and functions of each page of the webapp. Workflows can be split into different documents depending on the complexity of the page (could split Login.md for "login", "create account", "reset password" sections) or differences in appearance based on permissions (see "Calendar - Manager" and "Calendar - Employee").

### Diagram Alternatives
It might be more useful to have visual representations instead of typing everything out. Here are the types of diagrams that could be used to fulfill the purpose of each section.

| Section | Purpose/Details | Diagram |
| :- | :- | :- |
| Overview | Brief textual summary of the page and its key interactions/purpose to the user | - |
| UI Elements | Describe what items users can interact with (button, checkbox, form, etc) | Wireframe(s) |
| Process & Workflow | Describe how users will interact with the page to accomplish tasks - aka User Stories | Flowchart(s) |
| API Calls and Data Handling | Show how data moves from the front-end to the back-end and vice versa | Data Flow Diagram(s) / Model View Controller |
| Test Cases & Error Handling | Determine what test cases are needed to ensure the page is working. The table format is recommended since it has the input/process/output format of a test case | - |

---
## Template [Instructions are within brackets]
**Template.md:** Contians an example layout for FE workflow documentation (currenlty differs from below)

### **[Webpage Name] - Workflow**
- **Webpage:** [webpageName].html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories:** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
#### **Overview**
- [Describe the purpose and expected user interactions for the given workflow.]
- Example: "The login page allows users to enter their credentials and authenticate with the system."

---
#### **UI Elements**
- [List the key UI elements on the page]
- Example:
  - **Login Form**: Contains fields for username and password.
  - **Submit Button**: Triggers the authentication request.
  - **Error Message**: Displays validation or authentication errors.

---
#### **Process & Workflow**
- [Outline step-by-step user interactions and system responses]
- Example breakdown:
  1. User enters credentials in the login form.
  2. User clicks the submit button.
  3. Front-end validates input.
  4. A request is sent to the back-end API.
  5. UI updates based on the response. [add success/failure details within API Calls section]

---
#### **API Calls & Data Handling**
- [Define the network interactions required for this page]
- Example:
  - **Endpoint:** `POST /api/login`
  - **Request Payload:**
    ```json
    {
      "username": "user123",
      "password": "securePass"
    }
    ```
  - **Response Handling:**
    - Success: Redirect to dashboard.
    - Failure: Display error message.

---
#### **Test Cases & Error Handling**
- [Define actions to test including successes, failures, and edge cases. Describe the input, process the data goes through, expected output, and reasoning]

- **Input:** User input or action (form submitted, button clicked, selection changed)
- **Process:** Define if the data is handled by only the front-end or if it involves a network request to the back-end
- **Output:** Expected reponse, returned data, and/or udpates to the page
- **Reasoning:** Explain the test case, why is it a success/failure

| Input | Process | Output |  Reasoning |
| :--: | :--: | :--: | :--: |
|  |  |  |  |

---
## Notes
- Ensure the UI aligns with the overall design system.
- Keep accessibility best practices in mind.
- Update this documentation as the project evolves.
- "Dependencies" section will be listed in design.md, shouldn't have specific dependencies per page (all require server, etc)
- "Input" and "Output and UI updates" merged into Process and Workflow section

*This document should be maintained and updated regularly as workflows develop and evolve.*
