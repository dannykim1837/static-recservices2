/*
==============================================
  ✅ LOCATIONS TABLE MIGRATION (ES Modules)
  - Defines the schema for the "locations" table
  - Uses ES Modules for consistency across the project
==============================================
*/

/**
 * Runs the migration to create the "locations" table.
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable("locations", (table) => {
      table.increments("location_id").primary();
      table.string("location_name", 45).notNullable();
      table.integer("employee_count");
      table.string("physical_address", 80);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  
    console.log("✅ Locations table created successfully!");
  }
  
  /**
   * Rolls back the migration by dropping the "locations" table.
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    await knex.schema.dropTable("locations");
    console.log("⚠️ Locations table dropped!");
  }
  