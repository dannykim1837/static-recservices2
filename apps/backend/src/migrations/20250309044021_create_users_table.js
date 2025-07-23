/*
==============================================
  ✅ AUTH.USERS TABLE MIGRATION (ES Modules)
  - Creates the "auth.users" table for local testing
  - Ensures compatibility with Supabase authentication
  - Uses ES Modules for consistency across the project
==============================================
*/

/**
 * Runs the migration to create the "auth.users" table.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    // ✅ Ensure the schema "auth" exists before creating the table
    await knex.raw("CREATE SCHEMA IF NOT EXISTS auth");
  
    await knex.schema.withSchema("auth").createTable("users", (table) => {
      table.uuid("id").primary(); // Matches Supabase UUID format
      table.string("email", 100).unique().notNullable();
    });
  
    console.log("✅ auth.users table created successfully!");
  }
  
  /**
   * Rolls back the migration by dropping the "auth.users" table.
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.withSchema("auth").dropTableIfExists("users");
    console.log("⚠️ auth.users table dropped!");
  }
  