// This file is the CLI entry point for managing employees
// Think of it like the command center for local DB operations
// It's a pretty lightweight menu-driven system using readline
// to navigate and execute queries from `queries.js`

const connectToDatabase = require('./db');
const {
  insertEmployee,
  selectEmployees,
  deleteEmployee,
  searchEmployees,
  updateEmployeeFields
} = require('./queries');
const readline = require('readline');

// Setup terminal input/output interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Wrap readline's question method in a Promise to await user input
const ask = (q) => new Promise(res => rl.question(q, res));

const main = async () => {
  console.log(`Please enter MySQL login info:\n`);

  // Prompt for MySQL credentials to use for connection
  const user = await ask('Username: ');
  const password = await ask('Password: ');

  // Establish a connection to the MySQL database
  const connection = await connectToDatabase(user, password);

  // CLI menu logic
  const menu = async () => {
    console.log('=== RecServices Database CLI ===');
    console.log('1. Insert Employee');
    console.log('2. View All Employees');
    console.log('3. Search Employees');
    console.log('4. Update Employee Info');
    console.log('5. Delete Employee');
    console.log('6. Exit\n');

    const choice = await ask('Select an option: ');

    switch (choice) {
      case '1':
        // Gather data for new employee
        const id = await ask('Employee ID: ');
        const first = await ask('First Name: ');
        const last = await ask('Last Name: ');
        const position = await ask('Position: ');
        const location = await ask('Location: ');
        const group = await ask('Group: ');
        const email = await ask('Email: ');
        const wage = await ask('Wage: ');
        const salary = await ask('Is Salary? (1 for Yes, 0 for No): ');

        // Execute insert operation with gathered values
        await insertEmployee(
          connection,
          parseInt(id),
          first,
          last,
          position,
          location,
          group,
          email,
          parseInt(wage),
          parseInt(salary)
        );
        break;

      case '2':
        // Show all employees
        await selectEmployees(connection);
        break;

      case '3':
        // Search field options
        console.log('\nSearch Employees by:');
        console.log('1. Employee ID');
        console.log('2. First Name');
        console.log('3. Last Name');
        console.log('4. Position');
        console.log('5. Location');
        console.log('6. Group');
        console.log('7. Email');
        console.log('8. Wage');
        console.log('9. Salary');
        console.log();

        const fieldOptions = {
          '1': 'employee_id',
          '2': 'first',
          '3': 'last',
          '4': 'position',
          '5': 'location',
          '6': 'group',
          '7': 'email',
          '8': 'wage',
          '9': 'Salary'
        };

        const fieldChoice = await ask('Choose a field (1-9): ');
        const searchField = fieldOptions[fieldChoice];

        if (!searchField) {
          console.log('Invalid field selection.\n');
          break;
        }

        const searchValue = await ask(`Enter value to search by "${searchField}": `);
        await searchEmployees(connection, searchField, searchValue);
        break;

      case '4':
        // Delegate to update logic
        await updateEmployeeFields(connection, rl);
        break;

      case '5':
        // Delete an employee by ID
        const deleteId = await ask('Employee ID to delete: ');
        await deleteEmployee(connection, parseInt(deleteId));
        break;

      case '6':
        console.log('Exiting...');
        rl.close();
        await connection.end();
        return;

      default:
        console.log('Invalid option. Try again.\n');
        break;
    }

    // Loop the menu after delay
    setTimeout(menu, 300);
  };

  await menu();
};

main();

// =====================
// Pseudocode for other future tables (CRUD examples):
// =====================
// Table: departments
// CREATE TABLE departments (department_id INT PRIMARY KEY, name VARCHAR(100), location VARCHAR(100));
// insertDepartment(conn, id, name, loc)
// selectDepartments(conn)
// updateDepartment(conn, id, fields)
// deleteDepartment(conn, id)

// Table: roles
// CREATE TABLE roles (role_id INT PRIMARY KEY, title VARCHAR(100));
// insertRole(conn, id, title)
// selectRoles(conn)
// updateRole(conn, id, newTitle)
// deleteRole(conn, id)

// =====================
// Future Best Practices:
// =====================
// - Replace readline with inquirer.js for better UX
// - Use .env files to secure database credentials (dotenv)
// - Add input validation for numbers/emails
// - Wrap DB calls in try/catch blocks
// - Consider Prisma or Sequelize for schema migration/ORM ease
// - Add unit tests w/ Jest
// - Eventually dockerize this for isolated deployment