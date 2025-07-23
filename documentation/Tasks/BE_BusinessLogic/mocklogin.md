# Mock Login API Documentation

## Overview
This document provides a detailed explanation of the **Mock Login API**, its purpose, usage, and implementation details. It is intended for both frontend and backend developers working on the project. This temporary authentication method enables the frontend team to test their login handling logic before real authentication (e.g., Supabase) is integrated. 

## Purpose of the Mock Login API
- Allows frontend developers to **test authentication flow** without a real database.
- Provides a **consistent API response** structure that will remain the same after real authentication is implemented.
- Ensures **seamless transition** when moving from mock authentication to real authentication.

---

## API Endpoint

### **Mock Login Request**
**URL:**
```
POST https://recservices.onrender.com/api/mocklogin
```

### **Request Body (JSON)**
Two mock users are available for testing:
```json
{
  "username": "testuser",
  "password": "password123"
}
```
OR
```json
{
  "username": "regularuser",
  "password": "testpass"
}
```

### **Expected Responses**
#### ✅ **Successful Login Response**
```json
{
  "success": true,
  "token": "mockToken123",
  "user": {
    "id": 1,
    "username": "testuser",
    "role": "admin",
    "expiresIn": "1h"
  }
}
```
For `regularuser`, the response will have **"role": "user"**.

#### ❌ **Invalid Credentials Response**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## Frontend Developer Instructions
- The frontend should **send a POST request** to `/api/mocklogin` with a valid username and password.
- On a **successful login**, the frontend should **store the token** and proceed with authentication-based UI changes.
- On **failure**, the frontend should handle the error appropriately (e.g., display an invalid credentials message).
- **Navigation is handled by the frontend**—the backend only returns responses.
- When real authentication (e.g., **Supabase**) is implemented, **no changes should be required** in the frontend’s login handling.

---

## Backend Developer Instructions

### **Folder Structure**
The mock login functionality follows the backend’s modular architecture and is implemented as follows:
```
backend/
│── controllers/
│   ├── mocklogin.js
│── models/
│   ├── mockUser.js
│── routes/
│   ├── mocklogin.js
│── middleware/
│   ├── errorHandler.js
│── routes/
│   ├── index.js
│── server.js (or index.js)
```

### **Implementation Details**

#### 1️⃣ **Mock User Model** (`models/mockUser.js`)
```javascript
export const mockusers = [
    {
        id: 1,
        username: 'testuser',
        password: 'password123',
        role: 'admin'
    },
    {
        id: 2,
        username: 'regularuser',
        password: 'testpass',
        role: 'user'
    }
];

export const findByUsername = (username) => {
    return mockusers.find(user => user.username === username);
};
```

#### 2️⃣ **Mock Login Controller** (`controllers/mocklogin.js`)
```javascript
import { findByUsername } from '../models/mockUser.js';
import createHttpError from 'http-errors';

export const mockLogin = (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return next(createHttpError(400, 'Username and password are required'));
        }

        const user = findByUsername(username);
        if (!user || user.password !== password) {
            return next(createHttpError(401, 'Invalid credentials'));
        }

        res.json({
            success: true,
            token: 'mockToken123',
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                expiresIn: '1h'
            }
        });
    } catch (error) {
        next(createHttpError(500, 'Internal Server Error'));
    }
};
```

#### 3️⃣ **Mock Login Route** (`routes/mocklogin.js`)
```javascript
import express from "express";
import { mockLogin } from "../controllers/mocklogin.js";

const router = express.Router();

router.post("/", mockLogin);

export default router;
```

#### 4️⃣ **Registering the Mock Login Route** (`routes/index.js`)
```javascript
import express from "express";
import employees from "./employees.js";
import shifts from "./shifts.js";
import locations from "./locations.js";
import positions from "./positions.js";
import mocklogin from "./mocklogin.js";

const router = express.Router();

router.use("/employees", employees);
router.use("/shifts", shifts);
router.use("/locations", locations);
router.use("/positions", positions);
router.use("/mocklogin", mocklogin);

export default router;
```

#### 5️⃣ **Registering Routes in the Main App** (`server.js` or `index.js`)
```javascript
import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/api", routes); // Registers all routes from routes/index.js
app.use(errorHandler); // Global error handler

export default app;
```

---

## Future Considerations
- 🔹 **The test database is MySQL (hosted on Railway) but may change** in the future.
- 🔹 **Supabase Authentication** will be added at some point, but **the frontend should not need to change** when that happens.
- 🔹 When real authentication is implemented, this mock login will be deprecated, and **real JWTs will be issued**.

---
