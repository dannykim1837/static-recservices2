// This file handles the actual SQL queries to the MySQL database.
// Each function wraps a single DB operation and is exported to be used in app.js

// Use parameterized queries (with `?`) to avoid SQL injection attacks.
// Uses mysql2's promise API so we can use async/await syntax.

// Insert a new employee into the employees table
const insertEmployee = async (connection, id, first, last, position, location, group, email, wage, salary) => {
  const sql = `
    INSERT INTO employees 
    (employee_id, first, last, position, location, \`group\`, email, wage, Salary)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [id, first, last, position, location, group, email, wage, salary];
  await connection.execute(sql, values);
  console.log(`Inserted employee with ID: ${id}`);
};

// Select and print all employees
const selectEmployees = async (connection) => {
  const [results] = await connection.execute('SELECT * FROM employees');
  console.log('Employees:', results);
};

// Delete an employee by ID
const deleteEmployee = async (connection, id) => {
  const sql = 'DELETE FROM employees WHERE employee_id = ?';
  const [result] = await connection.execute(sql, [id]);
  console.log(`Deleted ${result.affectedRows} employee(s).`);
};

// Search employees by any single allowed field
const searchEmployees = async (connection, field, value) => {
  const allowedFields = ['employee_id', 'first', 'last', 'position', 'location', 'group', 'email', 'wage', 'Salary'];

  // Ensure we don’t allow arbitrary field queries (protect against injection)
  if (!allowedFields.includes(field)) {
    console.log(`Invalid search field: ${field}`);
    return;
  }

  // Query by exact match
  const sql = `SELECT * FROM employees WHERE \`${field}\` = ?`;
  const [results] = await connection.execute(sql, [value]);

  if (results.length === 0) console.log(`No employees found matching ${field} = ${value}`);
  else console.log('Search Results:', results);
};

// Prompt-based update of employee fields
const updateEmployeeFields = async (connection, rl) => {
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log('\nUpdate Employee Information');
  const id = await ask('Enter Employee ID to update: ');

  const [results] = await connection.execute('SELECT * FROM employees WHERE employee_id = ?', [id]);
  if (results.length === 0) {
    console.log('No employee found with that ID.');
    return;
  }

  const employee = results[0];
  console.log('Current Employee Info:', employee);

  const fields = ['first', 'last', 'position', 'location', 'group', 'email', 'wage', 'Salary'];
  const updates = {};

  // Ask user if they want to change each field, keep current if blank
  for (const field of fields) {
    const label = field === 'group' ? 'Group' : field.charAt(0).toUpperCase() + field.slice(1);
    const value = await ask(`Update ${label} [${employee[field] ?? ''}]: `);
    if (value !== '') updates[field] = value;
  }

  if (Object.keys(updates).length === 0) {
    console.log('No changes made.');
    return;
  }

  // Dynamically construct SQL SET clause for only changed fields
  const setClause = Object.keys(updates)
    .map(field => `\`${field}\` = ?`)
    .join(', ');

  const sql = `UPDATE employees SET ${setClause} WHERE employee_id = ?`;
  const values = [...Object.values(updates), id];
  await connection.execute(sql, values);

  console.log('Employee updated successfully.');
};

module.exports = {
  insertEmployee,
  selectEmployees,
  deleteEmployee,
  searchEmployees,
  updateEmployeeFields
};

// =====================
// Pseudocode for future table query functions:
// =====================
// For a departments table:
// insertDepartment(conn, id, name, loc) => INSERT INTO departments (id, name, location) VALUES (?, ?, ?)
// selectDepartments(conn) => SELECT * FROM departments
// updateDepartment(conn, id, fields) => UPDATE departments SET ... WHERE id = ?
// deleteDepartment(conn, id) => DELETE FROM departments WHERE id = ?

// For a roles table:
// insertRole(conn, id, title)
// selectRoles(conn)
// updateRole(conn, id, title)
// deleteRole(conn, id)

// =====================
// Best Practices to Add:
// =====================
// - All queries should eventually be wrapped in try/catch blocks
// - Use logger (like Winston) for DB errors instead of console.log
// - Consider normalizing wage/salary distinction in DB schema
// - Add audit logging to track employee record changes
// - Enforce NOT NULL and constraints at schema level for safety
