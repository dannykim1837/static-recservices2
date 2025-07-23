/*
==============================================
  ✅ Positions CONTROLLER (Supabase version)
  - Handles API requests for position management
  - Refactored for Supabase (cloud DB)
==============================================
*/

// ✅ Dynamically set database information (moved before imports for consistency)
import { validateData } from "../validation/schemaValidation.js";
import { getDBConfig } from "../config/dbConfig.js";
import { supabase } from "../database/supabase.js";
import { dbQuery } from "../config/dbSwitcher.js";
import { checkSupabaseConnection } from "../utils/checkSupabaseConnection.js";

const dbName = "positions";
const dbConfig = getDBConfig(dbName);

if (!dbConfig) {
  throw new Error(`Database configuration for ${dbName} not found.`);
}

const { DB_TITLE, DB_ID } = dbConfig;

// Check Supabase connection before logging
checkSupabaseConnection(supabase, DB_TITLE, DB_ID);

// ✅ Get all records
// Removed filePath from dbQuery (Supabase does not use file-based storage)
export const getMany = async (req, res, next) => {
  try {
    console.log(`Fetching all records from ${DB_TITLE}`); // Removed dbState from log
    const records = await dbQuery(DB_TITLE, "selectAll");
    res.status(200).json(records);
  } catch (error) {
    console.error(`Error fetching all records from ${DB_TITLE}:`, error);
    res.status(500).json({
      error: `Failed to fetch records from ${DB_TITLE}`,
      details: error.message,
    });
  }
};

// ✅ Get a single record by ID
// Removed filePath from dbQuery (Supabase does not use file-based storage)
export const getOne = async (req, res, next) => {
  try {
    console.log(`Fetching ${DB_TITLE} record with ID: ${req.params.id}`);
    const record = await dbQuery(DB_TITLE, "selectOne", {
      idField: DB_ID,
      id: req.params.id,
    });

    if (!record) {
      return res.status(404).json({
        error: `${DB_TITLE} record with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error(
      `Error fetching ${DB_TITLE} record with ID ${req.params.id}:`,
      error
    );
    res.status(500).json({
      error: `Failed to fetch record from ${DB_TITLE}`,
      details: error.message,
    });
  }
};

// ✅ Create a new record
export const create = async (req, res, next) => {
  try {
    console.log(`Creating new ${DB_TITLE} record...`);

    // Validate request body
    const { error } = validateData(DB_TITLE, req.body);
    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((e) => e.message),
      });
    }

    const record = await dbQuery(DB_TITLE, "insert", {
      record: req.body,
    });

    res
      .status(201)
      .json({ message: `${DB_TITLE} record added successfully`, record });
  } catch (error) {
    console.error(`Error creating ${DB_TITLE} record:`, error);
    return res
      .status(500)
      .json({ error: "Failed to insert record", details: error.message });
  }
};

// ✅ Update an existing record
// Removed filePath from dbQuery (Supabase does not use file-based storage)
export const update = async (req, res, next) => {
  try {
    console.log(`Updating ${DB_TITLE} record with ID: ${req.params.id}`);

    // Validate request body
    const { error } = validateData(DB_TITLE, req.body);
    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((e) => e.message),
      });
    }

    const updatedRecord = await dbQuery(DB_TITLE, "update", {
      idField: DB_ID,
      id: req.params.id,
      record: req.body,
    });

    if (!updatedRecord) {
      return res.status(404).json({
        error: `${DB_TITLE} record with ID ${req.params.id} not found`,
      });
    }

    // Fetch the updated record
    const newRecord = await dbQuery(DB_TITLE, "selectOne", {
      idField: DB_ID,
      id: req.params.id,
    });

    res.status(200).json({
      message: `${DB_TITLE} record updated successfully`,
      record: newRecord,
    });
  } catch (error) {
    console.error(
      `Error updating ${DB_TITLE} record with ID ${req.params.id}:`,
      error
    );
    next(error);
  }
};

// ✅ Delete a record
// Removed filePath from dbQuery (Supabase does not use file-based storage)
export const deleteOne = async (req, res, next) => {
  try {
    console.log(`Deleting ${DB_TITLE} record with ID: ${req.params.id}`);
    const result = await dbQuery(DB_TITLE, "delete", {
      idField: DB_ID,
      id: req.params.id,
    });

    if (result === 0) {
      return res.status(404).json({
        error: `${DB_TITLE} record with ID ${req.params.id} not found`,
      });
    }

    res
      .status(200)
      .json({ message: `${DB_TITLE} record deleted successfully` });
  } catch (error) {
    console.error(
      `Error deleting ${DB_TITLE} record with ID ${req.params.id}:`,
      error
    );
    next(error);
  }
};

// ✅ Export functions for reuse in other controllers
export default {
  getMany,
  getOne,
  create,
  update,
  deleteOne,
};

//
// 🟢 Comments about changes:
// - Removed useExternalDB, dbState, FILE_PATH, and all filePath usage in dbQuery calls because Supabase does not use local file storage or DB switching.
// - Updated logging to reference Supabase only.
// - This makes the controller simpler and focused on cloud DB usage.
