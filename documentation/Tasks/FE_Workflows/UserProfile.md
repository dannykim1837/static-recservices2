# **UserProfile.html - Workflow**

## **Assigned Group Member**
Paolo Roberto Petrignani
- **Webpage:** userProfile.html
- **UI Elements:** [Assign Week/Due Date]
- **Workflows/User Stories:** [Assign Week/Due Date]
- **API Calls:** [Assign Week/Due Date]
- **Test Cases:** [Assign Week/Due Date]

---
## **Overview**

### **PERSONAL tab**
- This page will display users' personal information the such as:
  - **Profile**:
    - Employee picture
    - First Name
    - Last Name
    - Prefered First Name
    - Email
  - **Detail**
    - Date of Birth
      - Month
      - Day
      - Year
    - Country Code
    - Time Zone
    - Phone Number
    - Home Address
  - **Emergency Contact**
    - Emergency Contact name
    - Relationship
    - Country Code
    - Phone Number
   
  **Save changes**
- This button should be hidden if no changes will accur in any part of this tab, and appear if something get changed.

  **Reset Password**
- This button gives to the user the change to change his password any time


### **WORK tab**
  **Employee detail**
  -  Status: When the employee join the network
  -  Hire date: Month, Day, Year
  -  Employee ID
  -  Preferred hours per week

  **Role**
  - System role:   Admin, Empolyee
  - Locations:     Add location of work
    - Clear all (to deleted the locations added)
  - Position:      Add Positions
    - Clear all (to deleted the positions added)
    - Add all (to add all the positions needed)
  - Gropus:        Add groups of work
    - Clear all (to deleted the positions added)
    - Add all (to add all the positions needed)

  **Time Clock**
  - Enable timeclock:        switch that allows the employee to clkock in and out of their shifts
  - Time clock PIN:          add a unique PIN to use for time tracking through Klosk
  - Hide from the schedule:  switch

### **Document tab**
  - "+ Add document":  button which allow to upload document to the profile
  -  Name:             name of the document
  -  Description:      user will enter a description about the document uploaded
  -  Expiration date:  user will enter the document expiration date
  -  Last modified:    name of the user who edit the information last.
  -  "Submit":         hidden button to save changes

---
## **UI Elements**
There are few UI elements in the different pages:

### **PERSONAL tab**
  * Reset password:  change user's password by adding the old one and choosing a now one.
  * Save changes:    appear after users changes some of his personal information to confirm the changes made.
### **Document tab**
  * "+ Add document": upload user's documents.
  * "Submit":         save new docuemnt and infomration related

---
## **Process & Workflow**
### Reset password
- Click "Reset password" button to be sent to "Reset Password - enter new password"
- Enter old password
- Enter new password twice
- Click "Update Password" button
- If successful, sent back to Personal page
- If not successful, shown error message and asked to try again

### Save changes:
-  Click in any of the fields to modify text
-  Text in the fields will change from gray to black
-  "Save changes" button will apper at the end of the form
-  When done making changes clikc on the "Save changes" button
-  Changes will be sent to the database
-  Text in all fields will back to gray
-  "Save changes" button will disapper

### + Add document
- At the click of the button file expoler will open and allow users to upload one document at the time.
- The field:
  -  Name
  -  Description
  -  Expiration date
  -  Last modified
will become editable and users will need to fill the different part

### Submit
- By click on the submit button, the document will be store in the date base and, all the related information will be desplayed on the page
- Users could re-do the process to upload all their documentation.
 
---
## **API Calls & Data Handling**
- [Define the network interactions on this page, with the data stored in the request (refer to UI elements) and given in the response]
### Reset password
#### Request
- **Purpose:**  Change the existing password.
- **Endpoint:** POST /account/{user-id}/password 
- **Request Payload:**
 ```json
  {
    "oldPassword": "ABcd@1234",
    "newPassword": "EFgh!5678"
  }
  ```
#### Response
- **Success determined by:** new password updated in the database
- **Success:** show the message: Successfully updated password
- **Failure:** show error message: "Password couldn't be updated" and message if given [If back-end specifies: general network error].

### Save changes
#### Request
- **Purpose:**  Change/udate user information and data.
- **Endpoint:** PUT /user/{user-id}/ 
- **Request Payload:**
 ```json
{
  "id": 0,
  "firstame": "string",
  "lastname": "string",
  "preferredName": "string",
  "email": "string",
  "birthMonth": "string",
  "birthDay": "integer",
  "birthYear": "integer",
  "countryCode": "string",
  "timezone": "string",
  "phone": "string",
  "address": "string",
  "emergencyContact": "string",
  "emergencyContactRelationship": "string",
  "emergencyContactPhone": "string",
  "emergencyContactCountryCode": "string",
}
  ```
#### Response
- **Success determined by:** new information updated in the database
- **Success:** show the message: Successfully updated information
- **Failure:** show error message: "Your information wasn't updated. Please, check your information" and message if given [If back-end specifies: general network error].

### Add document
#### Request
- **Purpose:**  Upload documentation.
- **Endpoint:** POST /{user-id}/documents
- **Request Payload:**
 ```json
{
  "id": 0,
  "file": "file",
  "filename": "string",
  "description": "string",
  "expiratinDate": "string",
  "expirationNotificationsEnabled": "boolean",
  "isShared": "boolean",
  "sharedVisibilityOption": "string",
}
  ```
#### Response
- **Success determined by:** new file is updated in the database
- **Success:** show the message: File updated
- **Failure:** show error message: "Impossible to upload file. Please, check your file" and message if given [If back-end specifies: file too large, general network error].

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
