# **[Page Name].html - Workflow**

## **Assigned Group Member**
[Team member name here]
- **Webpage:** [Page Name].html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories:** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
## **Overview**
- [Describe the purpose and expected user interactions for the page.]
- Example: "The login page allows users to enter their credentials and authenticate with the system."

---
## **UI Elements**
- [List the key UI components on the page]

### Can add sections to divide the page's UI elements into groups

---
## **Process & Workflow**
- [Describe user stories in a step-by-step process (or use a flowchart). Include refereces to UI elements being interacted with by the user]

### Workflow name
- Steps in the workflow
- What does the user do?
- How does the system respond?
- A flowchart may be more useful for workflows with many decision (if/else) points

---
## **API Calls & Data Handling**
- [Define the network interactions on this page, with the data stored in the request (refer to UI elements) and given in the response]

### Network Request Name
#### Request
- **Purpose:** Why does a network request need to be sent?
- **Endpoint:** `[POST/GET] [/urlEnding]`
- **Request Payload:**
  ```json
  {
    "key": "value",
    "key2": "value2"
  }
  ```
#### Response
  - **Success determined by:** What causes a successful response (what is the back-end doing)?
- **Response Payload:**
*If requesting data*
  ```json
  {
    "key": "value",
    "key2": "value2"
  }
  ```
Response Handling
  - **Success:** [Action done on success]
  - **Failure:** [Actino done on failure, most likley display an error message (or do nothing)]

---
## **Test Cases & Error Handling**
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
