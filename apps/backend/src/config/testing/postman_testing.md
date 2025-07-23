# 🚀 Postman API Testing Guide

## 🛠️ Setting Up Postman
1. **Download & Install Postman**:  
   - Go to [Postman](https://www.postman.com/downloads/) and download the desktop app.
   - Install it on your system. No account sign-up is required for local testing.
   
2. **Open Postman** and follow these instructions for testing API endpoints.

---

## **📌 Testing Endpoints (CRUD Operations)**
The following endpoints allow you to interact with the **employees**, **positions**, and **shifts** databases.

### **1️⃣ GET - Retrieve All Employees**
- **Description**: Fetches all employee records from the database.
- **Method**: `GET`
- **URL**:
http://localhost:3000/employees

---

### **1b️⃣ GET - Retrieve All Positions**
- **Description**: Fetches all position records from the database.
- **Method**: `GET`
- **URL**:
http://localhost:3000/positions

---

### **1c️⃣ GET - Retrieve All Shifts**
- **Description**: Fetches all shift records from the database.
- **Method**: `GET`
- **URL**:
http://localhost:3000/shifts

---

### **2️⃣ GET - Retrieve a Single Employee by ID**
- **Description**: Fetches details of a specific employee using their `employee_id`.
- **Method**: `GET`
- **URL Example** (`{id}` is the employee ID):
http://localhost:3000/employees/{id}
- **Example**: To get employee with `id = 1`:
http://localhost:3000/employees/1

---

### **2b️⃣ GET - Retrieve a Single Position by ID**
- **Description**: Fetches details of a specific position using its numeric `position_id`.
- **Method**: `GET`
- **URL Example**:
http://localhost:3000/positions/{id}
- **Example**: To get position with `id = 1`:
http://localhost:3000/positions/1

---

### **2c️⃣ GET - Retrieve a Single Shift by ID**
- **Description**: Fetches details of a specific shift using its numeric `id`.
- **Method**: `GET`
- **URL Example**:
http://localhost:3000/shifts/{id}
- **Example**: To get shift with `id = 99999`:
http://localhost:3000/shifts/99999

---

### **3️⃣ POST - Create a New Employee**
- **Description**: Adds a new employee record.
- **Method**: `POST`
- **URL**:
http://localhost:3000/employees

- **Headers**:
Content-Type: application/json

- **Body (JSON Format)**:
```json
{
  "user_id": null,  // 🔹 Use `null` until Supabase is implemented
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone_number": "123-456-7890",
  "position_id": 1,   // 🔹 1=Manager, 2=Cashier, 3=Technician, 4=Supervisor
  "location_id": 1,
  "is_hourly": true,
  "is_salaried": false,
  "is_active": true
}
```
Expected Response (Success):
```json
{
  "message": "employees record added successfully",
  "record": {
    "employee_id": 5,
    "user_id": null,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "phone_number": "123-456-7890",
    "position_id": 1,
    "location_id": 1,
    "is_hourly": true,
    "is_salaried": false,
    "is_active": true
  }
}
```

### 4️⃣ PUT - Update an Existing Employee
- **Description:** Modifies an employee's information.
- **Method:** PUT
- **URL**:
    - Example ({id} is the employee ID):
http://localhost:3000/employees/{id}
  - Example: To update employee with id = 1:
http://localhost:3000/employees/1

- **Headers**:
Content-Type: application/json

- **Body (JSON Format)**:
```json
{
  "first_name": "Johnathan",
  "last_name": "Doe",
  "email": "johnathan.doe@example.com",
  "phone_number": "321-654-0987",
  "position_id": 2,
  "location_id": 2,
  "is_hourly": false,
  "is_salaried": true,
  "is_active": true
}
```
Expected Response (Success):
```json
{
  "message": "employees record updated successfully",
  "record": {
    "employee_id": 1,
    "first_name": "Johnathan",
    "last_name": "Doe",
    "email": "johnathan.doe@example.com",
    "phone_number": "321-654-0987",
    "position_id": 2,
    "location_id": 2,
    "is_hourly": false,
    "is_salaried": true,
    "is_active": true
  }
}
```

### 5️⃣ DELETE - Remove an Employee
- **Description:** Deletes an employee record.
- **Method:** DELETE
- **URL**:
  - Example ({id} is the employee ID):
http://localhost:3000/employees/{id}
  - Example: To delete employee with id = 1:
http://localhost:3000/employees/1
Expected Response (Success):

```json
{
  "message": "employees record deleted successfully"
}
```

### 5b️⃣ DELETE - Remove a Position
- **Description:** Deletes a position record.
- **Method:** DELETE
- **URL**:
  - Example ({id} is the position ID):
http://localhost:3000/positions/{id}
  - Example: To delete position with id = 20:
http://localhost:3000/positions/20
Expected Response (Success):

```json
{
  "message": "positions record deleted successfully"
}
```

### 5c️⃣ DELETE - Remove a Shift
- **Description:** Deletes a shift record.
- **Method:** DELETE
- **URL**:
  - Example ({id} is the shift ID):
http://localhost:3000/shifts/{id}
  - Example: To delete shift with id = 99999:
http://localhost:3000/shifts/99999
Expected Response (Success):

```json
{
  "message": "shifts record deleted successfully"
}
```

## 📌 Handling Foreign Key Constraints
**🚨 Foreign Key Constraint Error**

If you try to insert a record that references a non-existent user_id, position_id, or location_id, you may get an error like:

```json
{
  "error": "Foreign Key Constraint Failed",
  "message": "A related record is missing. Ensure the referenced data exists before inserting.",
  "sqlMessage": "Cannot add or update a child row: a foreign key constraint fails..."
}
```
- ✅ Fix: Ensure that referenced records exist before inserting an employee.

- Example: Insert valid locations before assigning employees.

```sql
INSERT INTO locations (location_name, employee_count, physical_address)
VALUES ('Main Office', 10, '123 University Blvd, City, ST 12345');
```

# 📌 Postman Best Practices
### Use Collections:

- Create a new Collection in Postman for organizing your API requests.

- Save each endpoint (GET, POST, PUT, DELETE) as a separate request.

- Use Environment Variables:
  - Go to Manage Environments in Postman.
Add a new variable like:

Key: baseUrl
Value: http://localhost:3000
Use {{baseUrl}}/employees instead of hardcoding the full URL.
Use Pre-request Scripts:

Automate UUID generation for user_id before POST requests:

pm.environment.set("user_id", pm.variables.replaceIn("{{$guid}}"));
Then, in your request body:
```json
{
  "user_id": "{{user_id}}",
  "first_name": "John",
  "last_name": "Doe"
}
```
## 🎯 Summary
✅ This guide helps your team test CRUD operations for employees, positions, and shifts using Postman.

✅ Follow best practices to avoid foreign key errors.

✅ Use environment variables and collections in Postman for better organization.