# User Account - Business Logic

**Assigned Group Member:**
Michelle Markham

**Input:**
Michelle Markham

**Process:**
Michelle Markham

**Output:**
Michelle Markham

---

## **Overview**

The **User Account module** in the **BYU-Idaho Recreational Services Progressive Web Application (PWA)** handles **user authentication, authorization, and profile management**. It ensures that only authorized users can access scheduling, shift management, and administrative functions, replicating (and improving) the core functionality of **Sling**.

The module includes:

- **User Registration & Profile Management** (creating and updating accounts)
- **Authentication** (secure login/logout using JWTs or third-party authentication services)
- **Authorization & Role Management** (assigning permissions to users)
- **Password Management** (secure storage and reset mechanisms if using custom authentication)
- **Session Handling & Token Refreshing** (if applicable)

---

## **Input Data & Sources**

### **1. API Requests:**

- **User Registration:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "role": "employee"
  }
  ```
- **Login:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Profile Updates:**
  ```json
  {
    "firstName": "John",
    "lastName": "Smith",
    "phone": "123-456-7890"
  }
  ```
- **Role Assignment:** (Admin Only)
  ```json
  {
    "userId": "645d78a3b0f4e3",
    "role": "manager"
  }
  ```
- **Password Reset Requests**
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```

### **2. Database Queries:**

- **Fetch user by email (for login)**
- **Create new user (hashed password if applicable)**
- **Update user profile**
- **Assign/revoke roles**
- **Store password reset tokens** (if not using third-party authentication)

### **3. External Integrations:**

- **AWS RDBS** – Primary database for storing user data
- **Authentication Service (AWS Cognito / Firebase Auth / Supabase)** – Manages user authentication, session handling, password hashing, and JWT generation
- **Amazon Simple Email Service (SES)** – Handles email verification & password reset emails
- **Amazon Simple Notification Service (SNS)** – Sends SMS messages for two-factor authentication

**⚠️ Caution Regarding SMS Usage:**
- **Cost Considerations:** SMS messages incur costs per message sent, and charges vary by country and volume. AWS SNS provides a free tier with **100 SMS per month**, but additional usage is billed.
- **Security Limitations:** SMS-based authentication is susceptible to **SIM swapping, phishing, and interception**. While it provides an additional security layer, it is **not the most secure MFA method**.
- **Alternative MFA Methods:** Consider using **email-based authentication (via AWS SES)** or **app-based authentication** (e.g., Google Authenticator, Authy) for stronger security and lower costs.
- **Use Cases for SMS:** SMS should primarily be used for **critical notifications or fallback authentication** rather than the primary method for MFA.

---

## **Database & Data Handling**

### **Tables/Collections:**

- **Users (if not using a fully managed auth service):** (ID, firstName, lastName, email, passwordHash, role, createdAt, updatedAt)
- **Tokens (if managing sessions manually):** (userID, resetToken, expiresAt)

### **Queries:**

- `GET /users/{id}` → Fetch user profile
- `POST /users` → Create user
- `PATCH /users/{id}` → Update user details
- `DELETE /users/{id}` → Soft-delete user (for compliance)
- `POST /auth/login` → Validate credentials & issue token (if applicable)
- `POST /auth/logout` → Invalidate session

---

## **Dependencies**

- **Node.js + Express.js** (Backend framework)
- **AWS RDBS** (Relational database for structured data storage)
- **Authentication Provider** (AWS Cognito / Firebase Auth / Supabase – final choice TBD)
  - If using **AWS Cognito / Firebase Auth / Supabase**, **bcrypt and jsonwebtoken (JWTs) are not required**, as these services handle password hashing and token management.
  - If using a **custom authentication system**, then `bcrypt` (password hashing) and `jsonwebtoken` (JWTs) must be included.
- **Express-validator** (Input validation)
- **AWS SES (Simple Email Service)** (For email verification & password resets)
- **AWS SNS (Simple Notification Service)** (For SMS-based two-factor authentication)

---

## **Performance Considerations**

- **Indexing email & userID** to speed up lookups (if managing users manually)
- **Caching authentication tokens** (if using JWTs)
- **Load balancing** for high-traffic scalability
- **Asynchronous processing** for sending emails (if applicable)

---

## **Final Notes**

This document defines the **business logic** for managing **user accounts** in the new BYU-Idaho Recreational Services PWA. The final authentication provider is still being determined (**AWS Cognito, Firebase Auth, or Supabase**). This decision will impact:

- Whether authentication logic is handled **fully by an external provider** or if some parts (like session management) remain within the Node.js backend.
- The extent to which password hashing, token generation, and authentication queries are handled within the Express API.
- Whether **AWS SES and SNS** will be fully integrated for **email notifications & SMS authentication**, replacing third-party services.
- Whether **bcrypt and jsonwebtoken (JWTs) are needed** or if they can be replaced by the authentication provider's built-in capabilities.
- How **SMS costs and security risks** will be mitigated by promoting email or app-based MFA alternatives.

---

### **🚀 Next Steps**

- Confirm final **authentication provider choice** (AWS Cognito, Firebase, Supabase)
- Define **database schema adjustments** based on authentication method
- Implement authentication and test authorization workflows
- Finalize **AWS SES and SNS integration** for email & SMS notifications

## **Original Template for this document**

#### **Overview**
- Describe the purpose and expected functionality of this business logic.
- Example: "This module processes user authentication by verifying credentials against the database and generating a session token."

#### **Input Data & Sources**
- Define the required input data, including expected formats and sources (e.g., API request payloads, database queries, external integrations).

#### **Process & Workflow**
- Detail the step-by-step logic, including computations, validations, and business rules applied to the input data.

#### **Database & Data Handling**
- Define the database interactions (queries, stored procedures, caching, indexing, etc.).
- Specify data transformations and persistence logic.

#### **API Interactions**
- List necessary API calls, including request formats, expected responses, and error handling.

#### **Output & System Responses**
- Define the expected output, such as API responses, database updates, logs, or notifications.

#### **Edge Cases & Error Handling**
- Identify potential failure scenarios and the system's response (e.g., invalid inputs, service failures, concurrency issues).

#### **Dependencies**
- List required libraries, frameworks, external services, or integrations.

#### **Performance Considerations**
- Identify optimizations for efficiency, scalability, and security best practices.

#### **Testing Considerations**
- Outline unit tests, integration tests, and any necessary load or security testing strategies.

---

## Notes
-

---

*This document should be maintained and updated regularly as business logic evolves.*
