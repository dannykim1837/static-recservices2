### **login.html - Workflow**
AKA Login, Registration, and Password Verification pages for user authentication

#### **Assigned Group Member**
Danny Kim
- **Webpage:** login.html
- **UI Elements:** Login form, Registration form, Password reset form, Verification form, Password visibility toggles
- **Workflows/User Stories:** User login, new account registration, password reset with email verification, form validation, password visibility toggle
- **API Calls:** Supabase authentication APIs (signInWithPassword, signUp), Employee table insert, email verification
- **Test Cases:** Login success/failure, sign-up success/failure, password reset flow, form validation, UI navigation between forms

---
#### **Overview**
- The login page allows users to enter credentials to authenticate, create new accounts, or reset passwords.
- Verification of new accounts and password resets is done via email with verification codes.
- Users can toggle password visibility and navigate between login, registration, and verification sections.

---
#### **UI Elements**
- **Login section:** email/username input, password input, "Show Password" checkbox, "Forgot password?" link, Sign In button, link to Registration section
- **Registration section:** inputs for first name, last name, email, username, password, confirm password, password visibility toggle, Sign Up button, back to Login link
- **Verification section:** input for verification code, Check Link button, back to Login button
- Password visibility toggles on both login and registration forms
- Menu component in header

---
#### **Process & Workflow**

##### Login
1. User enters email/username and password.
2. User clicks "Sign In" button.
3. App sends `signInWithPassword` request to Supabase.
4. On success, user is logged in and redirected to the main application.
5. On failure, an alert shows error message.

##### Registration
1. User clicks "Not a member? Sign up here!" to go to Registration form.
2. User fills in required fields (first name, last name, email, username, password, confirm password).
3. User clicks "Sign Up" button.
4. App sends `signUp` request to Supabase.
5. On success, user record is inserted into `Employee` table.
6. On failure, an alert shows error message.
7. User is prompted to verify email (if implemented) or returned to Login page.

##### Password Reset & Verification
1. User clicks "Forgot password?" link on login form.
2. User navigates to Verification section (verification code input).
3. User enters code sent to their email.
4. On success, user can reset password (not fully implemented in code).
5. On failure, error messages are shown.

##### Password Visibility
- Users can toggle password inputs between text and password type to show/hide entered passwords.

##### Page Navigation
- Navigation between login, registration, and verification forms controlled by internal state (`visiblePage`).

---
#### **API Calls & Data Handling**

- **Sign In**  
  - Endpoint: Supabase `signInWithPassword`  
  - Payload: `{ email: formData.username, password: formData.pwd }`  
  - Response: user data or error message

- **Sign Up**  
  - Endpoint: Supabase `signUp`  
  - Payload: `{ email: formData.email, password: formData.pwdReg }`  
  - Additional: Insert new employee record in `Employee` table with user ID  
  - Response: user data or error message

- **Email Verification**  
  - Triggered via Supabase built-in email verification (not fully shown in code)  
  - User inputs verification code on verification page for confirmation (placeholder)

---
#### **Test Cases & Error Handling**

| Input                               | Process                                | Output                                  | Reasoning                                  |
|-----------------------------------|-------------------------------------|---------------------------------------|-------------------------------------------|
| Valid login credentials           | Send `signInWithPassword` request   | Login success, redirect to app        | User authenticated correctly               |
| Invalid login credentials         | Send `signInWithPassword` request   | Alert with error message               | Authentication failure handled properly    |
| Successful registration           | Send `signUp` and insert employee   | Alert success, redirect to login      | New user created and saved                  |
| Registration with existing email  | Send `signUp` request                | Alert error message                    | Duplicate user error handled                |
| Toggle password visibility        | Toggle input type between text/password | Password shown or hidden               | Improves usability                          |
| Navigate between login/registration/verification | Update `visiblePage` state       | Correct form displayed                 | User can move through flows                 |
| Password reset code entry         | (Placeholder)                        | Show success or error                  | Verifies user email ownership               |
| API failure                      | Supabase returns error               | Alert or error message displayed       | User notified of network/auth errors       |

---
## Notes
*This document should be maintained and updated regularly as workflows develop and evolve.*
