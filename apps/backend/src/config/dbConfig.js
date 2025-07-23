// Incompatible with supabase

import path from "path";
import { fileURLToPath } from "url";

// ✅ Ensure ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Configuration for all database tables (Expand as needed)
const dbConfigs = {
  employees: {
    DB_TITLE: "Employee",
    DB_ID: "id", // Matches database column name
    FILE_PATH: path.join(__dirname, "../data/employees.json"),
  },
  locations: {
    DB_TITLE: "Location",
    DB_ID: "id", // Matches SupaBase column name
    FILE_PATH: path.join(__dirname, "../data/locations.json"),
  },
  positions: {
    DB_TITLE: "Position",
    DB_ID: "id", // Matches SupaBase column name
    FILE_PATH: path.join(__dirname, "../data/positions.json"),
  },
  shifts: {
    DB_TITLE: "Shift",
    DB_ID: "id", // Matches MySQL column name
    FILE_PATH: path.join(__dirname, "../data/shifts.json"),
  },
};

// ✅ Function to retrieve the correct configuration for any table
export const getDBConfig = (dbName) => {
  // console.log(`[getDBConfig] Requested dbName: '${dbName}'`);
  const validNames = Object.keys(dbConfigs);
  // console.log(`[getDBConfig] Valid config keys: [${validNames.join(", ")}]`);
  if (!dbConfigs[dbName]) {
    console.error(`[getDBConfig] No config found for '${dbName}'.`);
    throw new Error(
      `Database configuration for '${dbName}' not found.\n` +
        `Valid table names are: [${validNames.join(", ")}].\n` +
        `Check for casing or pluralization issues (e.g., 'shifts' vs 'Shift').`
    );
  }
  const config = dbConfigs[dbName];
  // console.log(`[getDBConfig] Found config for '${dbName}':`, config);
  return config;
};
