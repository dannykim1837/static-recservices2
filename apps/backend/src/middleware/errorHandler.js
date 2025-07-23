/*
==============================================
  ✅ GLOBAL ERROR HANDLER (errorHandler.js)
  - Handles validation errors (Joi)
  - Catches MySQL/Knex-specific database errors
  - Returns clear, structured responses
  - Protects production data (hides stack traces)
  - Logs detailed errors for debugging
==============================================
*/

import fs from "fs"; // ✅ For writing error logs to a file
import path from "path"; // ✅ To handle file paths

// ✅ Function to log errors to a file (used in production mode)
const logErrorToFile = (err) => {
  const logPath = path.join("logs", "error.log"); // ✅ File to store errors
  const logMessage = `[${new Date().toISOString()}] ${err.stack || err}\n`; // ✅ Timestamped error message

  // ✅ Append the error to the log file (does not overwrite)
  fs.appendFile(logPath, logMessage, (error) => {
    if (error) console.error("❌ Failed to write to error log:", error);
  });
};

// ✅ Main Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ ERROR TRACE:", err.stack || err); // ✅ Always log errors in development mode

  // ✅ If in production, log error details to a file for debugging
  if (process.env.NODE_ENV === "production") {
    logErrorToFile(err);
  }

  /*
  ===========================================
  ✅ 1️⃣ HANDLE VALIDATION ERRORS (Joi)
  - Catches input validation failures
  - Returns a structured error response
  ===========================================
  */
  if (err.isJoi) {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid request data.",
      details: err.details.map(detail => ({
        field: detail.context.key, // ✅ Shows which field is invalid
        message: detail.message // ✅ Shows specific validation message
      }))
    });
  }

  /*
  ===========================================
  ✅ 2️⃣ HANDLE DATABASE ERRORS (MySQL/Knex)
  - Catches SQL-related failures (unique constraint, foreign key issues)
  - Prevents leaking SQL queries to users
  - Provides meaningful messages
  ===========================================
  */
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      error: "Duplicate Entry",
      message: "This record already exists. Check unique fields like email or user_id.",
      ...(process.env.NODE_ENV === "development" && { sqlMessage: err.sqlMessage }) // ✅ Show SQL message only in dev
    });
  }

  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      error: "Foreign Key Constraint Failed",
      message: "A related record is missing. Ensure the referenced data exists before inserting.",
      ...(process.env.NODE_ENV === "development" && { sqlMessage: err.sqlMessage }) // ✅ Show SQL error only in dev
    });
  }

  if (err.code === "ER_PARSE_ERROR") {
    return res.status(400).json({
      error: "SQL Syntax Error",
      message: "Your SQL query has a syntax error. Check table names and query structure.",
      ...(process.env.NODE_ENV === "development" && { sqlMessage: err.sqlMessage }) // ✅ Show SQL message only in dev
    });
  }

  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({
      error: "Database Connection Failed",
      message: "Could not connect to the database. Ensure MySQL is running and credentials are correct."
    });
  }

  /*
  ===========================================
  ✅ 3️⃣ HANDLE NOT FOUND ERRORS (404) — DYNAMICALLY
  - Dynamically determines the table name from the request URL.
  - Example: `/api/employees/123` → "Employee not found."
  - Example: `/api/positions/5` → "Position not found."
  ===========================================
  */
  if (err.status === 404) {
    const resource = req.baseUrl.split("/").pop() || "Resource"; // ✅ Extracts resource name from URL
    return res.status(404).json({
      error: "Not Found",
      message: `${resource.slice(0, -1)} not found.` // ✅ Converts "employees" → "Employee"
    });
  }

  /*
  ===========================================
  ✅ 4️⃣ HANDLE SERVER ERRORS (500)
  - Catches unexpected failures
  - Shows detailed error in development
  - Hides stack trace in production
  ===========================================
  */
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong.",
    ...(process.env.NODE_ENV === "development" && { details: err.stack }) // ✅ Show stack trace only in development
  });
};

// ✅ Export middleware for global use
export default errorHandler;
