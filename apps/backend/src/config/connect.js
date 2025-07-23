

// Incompatible with supabase









import knex from "knex"; 
import dbConfig from "./knexfile.js"; // ✅ Import dynamically chosen DB config

// ✅ Create a Knex database connection instance using the selected environment config
const db = knex(dbConfig);

export default db;
