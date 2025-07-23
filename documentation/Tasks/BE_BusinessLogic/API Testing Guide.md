# API Testing Guide  
**Version: JSON-to-JSON (Future Update: JSON/XML Support)**  
_Last Updated: [Insert Date]_

## 1. Introduction  
This guide provides step-by-step instructions for testing the API using **Postman** or **JavaScript Fetch**.

### 🔗 Current API Base URL: https://recservices.onrender.com/api

✅ **Status: Live & Working** – The backend is active and connected to a functioning database.

### ⚠ Important Note on API Availability  
- **Render is a free-tier hosting service**, meaning:
  - If inactive for a while, **it may take up to a minute to respond on the first request**.
  - After the first request, it runs normally.
- **If your request fails in Postman, try the troubleshooting steps before contacting support.**

### 💬 Need Help? 
** Post in BE channel for assistance OR
📞 **BE Team, Michelle** – Call/Text: **435-319-9636**  

FIX: Here is a screenshot of how you need to format a POST:

![image](https://github.com/user-attachments/assets/0cf8a54e-5f3f-4609-bc4f-d60647a90417)

---

## 2. API Overview  
### 📌 Base URL: https://recservices.onrender.com/api

All endpoints expect **JSON requests** and return **JSON responses**.

### 🚀 Future Update  
The backend will support **both JSON & XML**, allowing requests in either format.

### 📌 Common Endpoints  
| **Method** | **Endpoint**                           | **Purpose**                |
|------------|----------------------------------------|----------------------------|
| `GET`      | `/employees`                           | Fetch all employees        |
| `GET`      | `/employees/{id}`                      | Get employee by ID         |
| `POST`     | `/employees`                           | Create a new employee      |
| `PUT`      | `/employees/{id}`                      | Update an employee by ID   |
| `DELETE`   | `/employees/{id}`                      | Delete an employee by ID   |

---

## 3. Postman Troubleshooting Steps (Before Contacting Support)  

If your **GET request** to `https://recservices.onrender.com/api/employees` is **failing**, try these **self-troubleshooting steps**:

### 🔹 Step 1: Refresh Postman (Fixes Cache Issues)  
- **Close Postman** and **reopen it**.
- Try sending the **GET request again**.

**Why?**  
Postman sometimes **caches old sessions** and fails to recognize that the backend is working. Refreshing clears these issues.

---

### 🔹 Step 2: Increase Postman Timeout (Prevents Requests from Timing Out)  
If Render is **spinning up from inactivity**, your request **may take up to a minute**.  
Postman **times out by default in 30 seconds**, so increase the timeout:

#### ✅ How to Increase Timeout in Postman  
1. **Go to Settings (⚙️) → General Tab**  
2. Scroll down to **Request Timeout in ms**.  
3. Set it to **60000 (1 minute) or 120000 (2 minutes)**.  
4. Click **Save** and try the request again.  

---

### 🔹 Step 3: Manually Clear Postman Cache  
If refreshing Postman **did not work**, manually **clear the cache**:

1. **Go to Settings (⚙️) → Data Tab**  
2. Click **Clear Cache**  
3. Close and restart Postman  
4. Try sending your request again  

---

### 🔹 Step 4: Try Sending the Request Twice  
If the first request **times out or fails**, **send it again** immediately.

**Why?**  
The first request might **wake up the backend**, and the second request **should work** once it's running.

---

### 🔹 Step 5: Restart Render or Railway (If Still Not Working)  
If **all of the above fails**, check if **Railway (Database) or Render (Backend) is down**:
- **Check Railway Database**:  
  - Log in to **Railway Dashboard** → Restart the database.
- **Check Render Backend**:  
  - If the backend was manually deployed, redeploy it.

---

### ✅ After These Steps: Contact Support If Needed  
If **GET requests are still failing**, contact:  
** Post in BE channel for assistance OR
📞 **BE Team, Michelle** – Call/Text: **435-319-9636**  
  

---

## 4. How to Test the API in Postman  

### ✅ GET All Employees  
**Endpoint:**  GET https://recservices.onrender.com/api/employees

**Expected JSON Response:**  
```json
[
    {
        "employee_id": 6,
        "first_name": "Emily",
        "last_name": "Carter",
        "email": "emily.carter@example.com",
        "phone_number": "555-987-6543",
        "position_id": 1,
        "location_id": 1,
        "is_hourly": true,
        "is_salaried": false,
        "is_active": true,
        "user_id": null
    }
]
```

## 5. How to Test API with Fetch (example for FE request)
### ✅ Fetch All Employees

```javascript
async function getEmployees() {
    try {
        const response = await fetch('https://recservices.onrender.com/api/employees');
        const data = await response.json();
        console.log('Employees:', data);
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

getEmployees();
```

## 6. Next Steps & Final Notes
### 🚀 Next Steps
The backend will soon support both JSON & XML.
For now, use JSON for all requests and responses.
Partial updates (PUT) will be improved soon.

🎯 Key Takeaways
✔ Temporary API URL: https://recservices.onrender.com/api
✔ Before asking for help, try:

Refreshing Postman (fixes cache issues).
Increasing timeout (prevents early request failures).
Clearing cache manually (fixes persistent issues).
Sending the request twice (ensures backend is active).
✔ Use JSON format (for now)
✔ Test API with Postman or Fetch API
✔ More updates coming soon!




